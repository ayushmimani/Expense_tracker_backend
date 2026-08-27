const userModel = require("../models/User");

exports.getme = async (req, res) => {
    try {
        const user = req.user;   // ✅ auth middleware se already mila hua hai

        if (!user) {
            return res.status(400).json({
                message: "user not found",
                status: false
            });
        }

        return res.status(200).json({
            status: true,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    } catch (error) {
        return res.status(500).json({   // ⚠️ 'res.send(500)' galat tha, 'res.status(500)' hona chahiye
            status: false,
            message: "Something went wrong " + error
        });
    }
};