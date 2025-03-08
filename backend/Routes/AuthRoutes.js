const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const myuser = await prisma.user.findUnique({ where: { email } });
        if (myuser) return res.status(400).json({ error: "User already exists" });
        const hashpas = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { username, email, password: hashpas },
        });
        res.status(201).json({ message: "User create success", user });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: "user not found" });
        }
        const passcheck = await bcrypt.compare(password, user.password);
        if (!passcheck) {
            return res.status(400).json({ error: "wrong password" });
        }
        const payload = {user: { id: user.id } }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7h" });
        res.json({ message: "Login success", token, payload });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;
