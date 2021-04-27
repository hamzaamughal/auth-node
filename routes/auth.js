const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
// const {registerValidation, loginValidation} = require('../validate')



router.post('/register', async (req, res) => {
    // lets validate the data before make a user
    // const { error } = registerValidation(req.body)
    // if (error) return res.status(400).send(error.details[0].message)

    //check if the user email is already exists
    const emailExit = await User.findOne({ email: req.body.email })
    if (emailExit) return res.status(400).send('Email Already Exists..')

    //HASH THE PASSWORD.
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    })
    try {
        const savedUser = await user.save()
        res.send({ user: user._id })
    } catch (err) {
        res.status(400).send(err)
    }
})

//LOGIN
router.post("/login", async (req, res) => {
    //check if the email exists
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Email is not found..')

    //password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send(`Invalid Credentials`)

    //create and assign a token.
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)

    res.send('Logged In')
})

module.exports = router;