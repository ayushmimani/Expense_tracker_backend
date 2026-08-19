require('dotenv').config();
const mongoose = require('mongoose');
const UserModel = require('./models/User');   // apna actual path daalo

mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log("DB connected, creating user...");
    
    try {
        const user = await UserModel.create({
            name: "Test",
            email: "test123@example.com",
            password: "test123",
            gender: "male"
        });
        console.log("SUCCESS:", user);
    } catch (err) {
        console.log("FULL ERROR:", err);
    }
    
    process.exit();
});