const User = require('../../models/user');
const bcrypt = require('bcrypt');
const { createUserSchema, updateUserSchema, loginUserSchema } = require("../../validations/user");
const { generateToken } = require('../../lib/genTok');
const { validation } = require("../../middleware/validation_joi");
const router = require('express').Router();






router.get('/', list);
router.get('/:id', findById)


router.post('/signup', validation(createUserSchema), signup)

router.post('/login', validation(loginUserSchema), login);
router.post('/logout', logout);


router.put('/:id', validation(updateUserSchema), update)

router.delete('/:id', deleteUser);














async function list(req, res) {
    try {
        const data = await User.find();
        res.json({ data });


    } catch (err) {
        res.status(422).json({ message: " An error occured" })
    }
}

async function findById(req, res) {
    try {

        const user = await User.findById(req.params.id)
        res.json({ user });


    } catch (err) {
        console.log(err)
        res.status(404).json({ message: "Page not Found!" })
    }
}



async function signup(req, res) {
    try {
        const { email, firstName, lastName, position, isFrom } = req.body;

        const salt = await bcrypt.genSalt();

        const password = await bcrypt.hash(req.body.password, salt);

        let newUser = await new User({
            email, firstName, lastName, position, isFrom, password
        })
        await newUser.save();

        // res.json(User.format(newUser))
        res.json(newUser)

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Signup failed!" });
    }
}

async function update(req, res) {
    try {
        const { firstName, middleName, lastName, email, sex, age, isFrom, position, notes, projects, programs } = req.body;
        let password = req.body.password;
        if (password) {
            const salt = await bcrypt.genSalt();
            password = await bcrypt.hash(password, salt);
        }
        const toUpdate = {
            ...(email && { email }),
            ...(firstName && { firstName }),
            ...(middleName && { middleName }),
            ...(isFrom && { isFrom }),
            ...(position && { position }),
            ...(notes && { notes }),
            ...(projects && { projects }),
            ...(lastName && { lastName }),
            ...(password && { password }),
            ...(sex && { sex }),
            ...(age && { age }),
            ...(programs && { programs }),
        };

        const updatedUser = await User.findOneAndUpdate({ _id: req.params.id }, toUpdate, {
            new: true,
        });
        res.status(201).json(updatedUser);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "An error occured",
        });
    }
}


async function deleteUser(req, res) {
    try {
        const deletedUser = await User.findOneAndRemove(req.params.id);
        res.status(201).json(deletedUser);


    } catch (err) {
        res.status(500).json({ message: "Signup failed!" });
    }
}

async function login(req, res) {
    try {
        const { password, email } = req.body;
        const user = await User.findOne({ email });
        console.log(User.findOne({ email }))
        //console.log(password, user.password)
        await bcrypt.compare(password, user.password, (err, data) => {
            if (err) { throw err };
            if (data) {
                const token = generateToken(user._id);
                console.log(token);
                res.setHeader('access_token', token);
                return res.json({ user, token })
            } else {
                return res.status(401).json({ message: "Invalid credencial" });
            }
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: "User not exist" });
    }
}

async function logout(req, res) {
    try {
        res.setHeader("access_token", null);
        return res.status(200).json();
    } catch (error) {
        res.status(500).json({
            message: "An error occured",
        });
    }
}



module.exports = router
