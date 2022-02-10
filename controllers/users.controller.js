const bcrypt = require("bcryptjs");
const services = require("../services/users.services");


exports.reigster = (req, res, next) => {
    //settng the value
    const { password } = req.body;
    const salt = bcrypt.genSalt(10);

    req.body.password = bcrypt.hashSync(password, salt);

    services.register(req.body, (error, result) => {
        if (error) {
            return next(error)
        }
        return res.status(200).send({
            message: "Great Success",
            data: result,
        })
    })
}

exports.login = (req, res, next) => {
    const { username, password } = req.body;

    services.login({ username, password }, (error, result) => {
        if (error) {
            return next(error)
        }
        return res.status(200).send({
            message: "Great Success",
            data: result,
        })
    })

}
exports.userProfile = (req, res, next) => {
    return res.status(200).json({ message: "Access Granted! Authorized user:)" });
}
