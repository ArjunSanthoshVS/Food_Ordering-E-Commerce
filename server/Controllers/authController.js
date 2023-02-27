const authController = require('express').Router()
const {User} = require('../Models/UserSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//Register

authController.post('/register', async (req, res) => {
    try {
        console.log('kkkkkkkkkkkkk');
        const isExisting = await User.findOne({ email: req.body.email })
        if (isExisting) {
            return res.status(409).send({ message: "User with given email already Exist!" });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = await User.create({ ...req.body, password: hashedPassword })
        const { password, ...others } = newUser._doc
        const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET, { expiresIn: "5h" })
        return res.status(201).json({ others, token })
    } catch (error) {
        return res.status(500).send({ message: "Register work aavanilla" });
    }
})

authController.post('/login', async (req, res) => {
    try {
        console.log('fffffff');
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            throw new Error("User credentials are wrong")
        }
        const checkPass = await bcrypt.compare(req.body.password, user.password)
        if (!checkPass) {
            throw new Error("User credentials are wrong")
        }

        const { password, ...others } = user._doc
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "5h" })
        return res.status(201).json({ others, token })

    } catch (error) {
        return res.status(500).send({ message: "Login work aavanilla" });
    }
})

module.exports = authController