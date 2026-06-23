const LoginAdmin = require("../models/LoginAdmin");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");


const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log("Username dari Thunder:", username);

        const admin = await LoginAdmin.findOne({ username });

        console.log("Data admin dari MongoDB:", admin);

        if (!admin) {
            return res.status(404).json({
                message: "Admin tidak ditemukan"
            });
        }
const isMatch = await bcrypt.compare(
    password,
    admin.password
);

if (!isMatch) {
    return res.status(401).json({
        message: "Password salah"
    });
}

        const token = jwt.sign(
            {
                id: admin._id,
                username: admin.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login berhasil",
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { loginAdmin };