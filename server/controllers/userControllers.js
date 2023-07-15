const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck)
            return res.json({ msg: "Username already used", status: false });
        const emailCheck = await User.findOne({ email });
        if (emailCheck)
            return res.json({ msg: "Email already used", status: false });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        });
        delete user.password;
        return res.json({ status: true, user });
    } catch (error) {
        next(error);
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user)
            return res.json({ msg: "Incorrect email or password", status: false });
        const isPassword = await bcrypt.compare(password, user.password)
        if(!isPassword)
            return res.json({ msg: "Incorrect email or password", status: false });
        delete user.password;
        return res.json({ status: true, user });
    } catch (error) {
        next(error);
    }
};

module.exports.setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id
        const avatarImg = req.body.image
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatar: true,
            avatarImg
        })
        return res.json({
            isSet: userData.isAvatar,
            image: userData.avatarImg
        })
    } catch (error) {
        next(error)
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: {$ne: req.params.id }}).select([
            "email",
            "username",
            "avatarImg",
            "_id"
        ])
        return res.json(users)
    } catch (error) {
        next(error)
    }
}