var router = require('express').Router()
var jwt     = require('jsonwebtoken')
var bcrypt  = require('bcrypt')

var config = require('../../../config')
var User = require('../../models/user').User

// GET ./api/user
router.get('/user', function(req, res) {
    User.find({}, function(err, users) {
        if (err)
            return res.json({error: "Error fetching users"});
        else if (!users)
            return res.json({error: "Error finding users"});
        //console.log('users', users);
        res.send(users);
    })
})

// GET ./api/user/:id

// POST ./api/user/register
router.post('/user/register', function(req, res, next) {
    //console.log('register user: ' + req.body)
    const email = req.body.email
    const password = req.body.password
    const splitmail = email.split("@")
    const username = splitmail[0]
    //console.log('username, email, password', username, email, password, '\n')
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) { next(err) }
        var user = new User({
            email: email,
            login: {
                username: username,
                password: hash
            }
        })
        user.save(function (err) {
            if (err) { next(err) }
            res.sendStatus(201)
        })
    })
})

// POST ./api/user/signin
router.post('/user/signin', function(req, res, next) {
    // we could check for existence of username first, and use that if no email
    const email = req.body.email
    const password = req.body.password
    User.findOne({email: email}, function(err, user) {
        if (err) { return next(err) }
        if (!user) { return res.sendStatus(401) }
        bcrypt.compare(password, user.login.password, function (err, valid) {
            if (err) { return next(err) }
            if (!valid) { return res.sendStatus(401) }
            var token = jwt.sign({email: email}, config.secretisimo)
            res.json(token)
        })
    })
})

// Update account, profile
// PUT ./api/user/update

// DELETE ./api/user/delete

module.exports = router
