import UserModel from "../model/AuthModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// signup

export const SignUp = async(req, res) => {
    const { username, email, password } = req.body
    try {
        const existUser = await UserModel.findOne({ email })
        if (existUser) return res.status(400).json({ message: "user already exists" })
        if (!username) return res.status(400).json({ message: "username is required" })
        if (!email) return res.status(400).json({ message: "email is required" })
        if (!password) return res.status(400).json({ message: "password is required" })
        const hashpassword = await bcrypt.hash(password, 12)
        const result = await UserModel.create({ username, email, password: hashpassword })
        const token = jwt.sign({ id: result._id, email: result.email }, process.env.SECURE_KEY, { expiresIn: "5hr" })
        res.status(200).json({ result, token })
    } catch (error) {
        res.status(404).json({ message: error.message, stack: error.stack })
    }
}

export const SignIn = async(req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (!user) return res.status(400).json({ message: "user not found" })
        if (!password) return res.status(400).json({ message: "please enter password" })
        const isPassword = await bcrypt.compare(password, user.password)
        if (!isPassword) return res.status(404).json({ message: 'invalid creditnals' })
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECURE_KEY, { expiresIn: "5hr" })
        res.status(200).json({ result: user, token })
    } catch (error) {
        res.status(404).json({ message: error.message, stack: error.stack })
    }
}