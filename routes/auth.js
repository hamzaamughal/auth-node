const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcryptjs')
// const {registerValidation} = require('../validate')



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
        res.send(savedUser)
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router;