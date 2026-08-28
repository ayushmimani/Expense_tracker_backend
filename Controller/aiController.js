const groq = require("../config/groq");
const Expense = require("../models/Expense"); // adjust path to your model

// Step 1: Ask the LLM to extract structured filters from the user's question
const extractFilters = async (question) => {
  const today = new Date().toISOString().split("T")[0];

  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "system",
        content: `You extract search filters from expense questions.
Today's date is ${today}.
Respond ONLY with valid JSON, no markdown, no explanation.
Format: { "startDate": "YYYY-MM-DD" | null, "endDate": "YYYY-MM-DD" | null, "category": string | null }
If the question doesn't mention a time period, set both dates to null (means "all time").
If it doesn't mention a category, set category to null.`,
      },
      { role: "user", content: question },
    ],
    temperature: 0,
  });

  try {
    return JSON.parse(response.choices[0].message.content);
  } catch (e) {
    return { startDate: null, endDate: null, category: null };
  }
};

// Step 2 + 3 + 4: Retrieve matching expenses, then generate an answer
const getInsights = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    // Step 1: extract filters
    const filters = await extractFilters(question);

    // Step 2: build MongoDB query, scoped to logged-in user
    const query = { user: req.user.id };
    if (filters.category) {
      query.category = { $regex: filters.category, $options: "i" };
    }
    if (filters.startDate || filters.endDate) {
      query.date = {};
      if (filters.startDate) query.date.$gte = new Date(filters.startDate);
      if (filters.endDate) query.date.$lte = new Date(filters.endDate);
    }

    const expenses = await Expense.find(query).sort({ date: -1 }).limit(100);

    if (expenses.length === 0) {
      return res.json({
        answer: "I couldn't find any expenses matching that question.",
        expenseCount: 0,
      });
    }

    // Step 3: format retrieved data as context (keep it compact — token limits)
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    const byCategory = expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {});

    const context = `
Total expenses found: ${expenses.length}
Total amount: ₹${total}
Breakdown by category: ${JSON.stringify(byCategory)}
Sample transactions: ${expenses.slice(0, 15).map(e => 
  `₹${e.amount} - ${e.category} - ${e.date.toISOString().split("T")[0]}${e.description ? " - " + e.description : ""}`
).join("; ")}
`;

    // Step 4: generate natural-language answer
    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content: "You are a helpful personal finance assistant. Answer the user's question using ONLY the expense data provided. Be concise, use ₹ for currency, and give specific numbers.",
        },
        {
          role: "user",
          content: `Expense data:\n${context}\n\nQuestion: ${question}`,
        },
      ],
      temperature: 0.3,
    });

    res.json({
      answer: response.choices[0].message.content,
      expenseCount: expenses.length,
      totalAmount: total,
    });
  } catch (error) {
    console.error("AI Insights error:", error);
    res.status(500).json({ message: "Failed to generate insights" });
  }
};

module.exports = { getInsights };