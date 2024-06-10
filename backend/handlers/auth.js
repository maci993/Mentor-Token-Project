const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { create, getByEmail } = require("./pkg/account");
const {
    validate,
    AccountLogin,
    AccountRegister,
} = require("./pkg/account/validate");

const { getSection } = require("./pkg/config");

const login = async (req, res) => {
    try {
        await validate(req.body, AccountLogin);
        const { email, password } = req.body;
        const account = await getByEmail(email);
        if (!account) {
            return res.status(400).send("Account not found!");
        }

        const payload = {
            userName: account.userName,
            email: account.email,
            id: account._id,
            exp: newDate().getTime() / 1000 + 7 * 24 * 60 * 60,
        };
        const token = jwt.sign(payload, getSection("development").jwt_secret);
    } catch (err) {
        res.status(500).send("Internal server error!");
    }
};

const register = async (req, res) => {
    try {
        await validate(req.body);
        return res.status(201).send(acc);
    } catch (err) {
        console.log(err);
        return res.status(err.status).send(err.error);
    };
};

module.exports = {
    login,
    register,
}
