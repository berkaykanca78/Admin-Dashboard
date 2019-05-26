// Modules
const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const fs = require('fs');
const winston = require('winston');
const logConfig = {
    'transports': [
        new winston.transports.File({
            filename: './logs/activity-logs.log'
        })
    ]
};
const logger = winston.createLogger(logConfig);
exports.getRegister = (req, res, next) => {
    if (req.session.isAuthenticated == true) {
        res.redirect('/');
    } else {
        res.render('account/register', {
            title: 'Register'
        });
    }
}
exports.postRegister = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const repassword = req.body.repassword;
    if (password != repassword) {
        res.render('account/register', {
            title: 'Register',
            errorMessage: "Your passwords don't match."
        });
    } else {
        User.findOne({
                email: email
            })
            .then(user => {
                if (user) {
                    res.render('account/register', {
                        title: 'Register',
                        errorMessage: 'Previously registered with this e-mail address.'
                    });
                } else {
                    bcrypt.hash(password, 10)
                        .then((hashedPassword) => {
                            const user = new User({
                                firstName: firstName,
                                lastName: lastName,
                                email: email,
                                password: hashedPassword,
                                imgUrl: 'avatar.png'
                            });
                            user.save()
                                .then(() => {
                                    let date = new Date(Date.now());
                                    date = date.toLocaleString('tr-TR');
                                    logger.info(user.firstName + " " + user.lastName + " - Register - " + date);
                                    res.redirect('/login?action=save');
                                    // Mail Settings
                                    let transporter = nodemailer.createTransport({
                                        service: 'gmail',
                                        secure: false,
                                        port: 25,
                                        auth: {
                                            user: 'brkyknc@gmail.com',
                                            pass: 'Kanca_678'
                                        },
                                        tls: {
                                            rejectUnauthorized: false
                                        }
                                    });
                                    let HelperOptions = {
                                        form: '"Berkay Kanca" <brkyknc@gmail.com>',
                                        to: email,
                                        subject: 'Kayıt Başarılı',
                                        html: '<h1>Hesabınız başarılı bir şekilde oluşturuldu.</h1>'
                                    }
                                    transporter.sendMail(HelperOptions, (error, info) => {
                                        if (error) {
                                            return console.log(error);
                                        }
                                        console.log("E-mail sent successfully.")
                                    });
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        });
                }
            }).catch(err => console.log(err));
    }
}
exports.getLogin = (req, res, next) => {
    if (req.session.isAuthenticated == true) {
        res.redirect('/');
    } else {
        res.render('account/login', {
            title: 'Login',
            action: req.query.action
        });
    }

}
exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({
            email: email
        })
        .then(user => {
            if (!user) {
                res.render('account/login', {
                    title: 'Login',
                    errorMessage: 'There are no registered users.'
                });
            } else {
                bcrypt.compare(password, user.password)
                    .then((isSuccess) => {
                        if (isSuccess) {
                            req.session.Id = mongoose.Types.ObjectId(user._id).toString();
                            req.session.username = user.firstName + " " + user.lastName;
                            req.session.email = user.email;
                            req.session.imgUrl = user.imgUrl;
                            req.session.role = user.role;
                            let date = new Date(Date.now());
                            date = date.toLocaleString('tr-TR');
                            console.log('You have successfully login.');
                            logger.info(req.session.username + " - Login - " + date);
                            req.session.isAuthenticated = true;
                            var url = req.session.redirectTo;
                            delete req.session.redirectTo;
                            res.redirect(url);
                        } else {
                            res.render('account/login', {
                                title: 'Login',
                                errorMessage: 'Your e-mail address or password is incorrect.'
                            });
                        }
                    }).catch(err => {
                        console.log(err);
                    })
            }
        })
        .catch(err => console.log(err));
}
exports.getReset = (req, res, next) => {
    if (req.session.isAuthenticated == true) {
        res.redirect('/');
    } else {
        res.render('account/reset', {
            title: 'Reset Password'
        });
    }
}
exports.postReset = (req, res, next) => {
    const email = req.body.email;
    User.findOne({
            email: email
        })
        .then(user => {
            if (!user) {
                res.render('account/reset', {
                    title: 'Reset Password',
                    errorMessage: 'E-mail Address Not Found.'
                });
            } else {
                crypto.randomBytes(32, (err, buffer) => {
                    if (err) {
                        console.log(err);
                        return res.redirect('/reset-password');
                    }
                    const token = buffer.toString('hex');
                    user.resetToken = token;
                    user.resetTokenExpiration = Date.now() + 3600000;
                    user.save();
                    res.redirect('/login');
                    // Mail Settings
                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        secure: false,
                        port: 25,
                        auth: {
                            user: 'brkyknc@gmail.com',
                            pass: 'Kanca_678'
                        },
                        tls: {
                            rejectUnauthorized: false
                        }
                    });
                    let HelperOptions = {
                        form: '"Berkay Kanca" <brkyknc@gmail.com>',
                        to: email,
                        subject: 'Şifre Değiştirme',
                        html: `
                        <p>Parolanızı Güncellemek İçin Aşağıdaki Linki Tıklayınız.</p>
                        <a href="http://localhost:3000/reset-password/${token}">Reset Password</a>
                    `
                    }
                    transporter.sendMail(HelperOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log("E-mail sent successfully")
                    });
                })
            }
        }).catch(err => console.log(err));
}
exports.getNewPassword = (req, res, next) => {
    const token = req.params.token;
    User.findOne({
        resetToken: token,
        resetTokenExpiration: {
            $gt: Date.now()
        }
    }).then((user) => {
        res.render('account/new-password', {
            title: 'Reset Password',
            userId: user._id.toString(),
            passwordToken: token
        })
    }).catch(err => {
        console.log(err);
    });
}
exports.postNewPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const rePassword = req.body.repassword;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    if (newPassword == rePassword) {
        User.findOne({
                resetToken: passwordToken,
                resetTokenExpiration: {
                    $gt: Date.now()
                },
                _id: userId
            }).then(user => {
                _user = user;
                return bcrypt.hash(newPassword, 10);
            }).then(hashedPssword => {
                _user.password = hashedPssword;
                _user.resetToken = undefined;
                _user.resetTokenExpiration = undefined;
                let date = new Date(Date.now());
                date = date.toLocaleString('tr-TR');
                logger.info(_user.firstName + " " + _user.lastName + " - Change Password - " + date);
                return _user.save();
            }).then(() => {
                res.redirect('/login');
                console.log("Your Password Has Been Changed Successfully.");
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        console.log('Your passwords do not match.');
        res.redirect(`reset-password/${passwordToken}`);
    }
}
exports.getProfile = (req, res, next) => {
    User.findOne({
        email: req.session.email
    }).then(user => {
        res.render('account/profile', {
            title: 'Profile',
            username: req.session.username,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            email: req.session.email,
            imgUrl: req.session.imgUrl,
            role: res.locals.role
        })
    }).catch(err => console.log(err));
}
exports.postProfile = (req, res, next) => {
    User.find({
            email: {
                $nin: req.session.email
            }
        })
        .then((users) => {
            let arr = [];
            Object.keys(users).map(function (key, index) {
                arr.push(users[key].email);
            });
            if (arr.indexOf(req.body.emailProfile) == -1) {
                User.findOne({
                    email: req.session.email
                }).then(user => {
                    bcrypt.compare(req.body.oldPasswordProfile, user.password, function (err, result) {
                        if (result == false) {
                            User.findOne({
                                email: req.session.email
                            }).then(user => {
                                return res.render('account/profile', {
                                    title: 'Profile',
                                    username: req.session.username,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    password: user.password,
                                    email: req.session.email,
                                    imgUrl: req.session.imgUrl,
                                    role: res.locals.role,
                                    errorMessage: 'Your password wrong.'
                                })
                            }).catch(err => console.log(err));
                        } else {
                            if (req.body.newPasswordProfile == req.body.newPasswordAgainProfile) {
                                bcrypt.hash(req.body.newPasswordProfile, 10, function (err, hash) {
                                    const image = req.file;
                                    User.findOne({
                                            email: req.session.email
                                        })
                                        .then((user) => {
                                            user.email = req.body.emailProfile;
                                            user.firstName = req.body.firstNameProfile;
                                            user.lastName = req.body.lastNameProfile;
                                            user.password = hash;
                                            if (image) {
                                                if (user.imgUrl != 'avatar.png') {
                                                    fs.unlink('public/img/' + user.imgUrl, err => {
                                                        if (err) {
                                                            console.log(err);
                                                        }
                                                    });
                                                }
                                                user.imgUrl = image.filename;
                                            }
                                            return user.save();
                                        }).then(() => {
                                            req.session.username = req.body.firstNameProfile + " " + req.body.lastNameProfile;
                                            req.session.email = req.body.emailProfile;
                                            if (image) {
                                                req.session.imgUrl = image.filename;
                                            }
                                            console.log('You have successfully update your profile.');
                                            let date = new Date(Date.now());
                                            date = date.toLocaleString('tr-TR');
                                            logger.info(req.session.username + " - Update Profile - " + date);
                                            res.render('account/profile', {
                                                title: 'Profile',
                                                username: req.session.username,
                                                firstName: req.body.firstNameProfile,
                                                lastName: req.body.lastNameProfile,
                                                password: user.password,
                                                email: req.body.emailProfile,
                                                imgUrl: req.session.imgUrl,
                                                role: res.locals.role,
                                                successMessage: 'You have successfully update your profile.'
                                            })
                                            req.session.email = req.body.emailProfile;
                                        }).catch(err => console.log(err));
                                });
                            } else {
                                User.findOne({
                                    email: req.session.email
                                }).then(user => {
                                    return res.render('account/profile', {
                                        title: 'Profile',
                                        username: req.session.username,
                                        firstName: user.firstName,
                                        lastName: user.lastName,
                                        password: user.password,
                                        email: req.session.email,
                                        imgUrl: req.session.imgUrl,
                                        role: res.locals.role,
                                        errorMessage: "Your new passwords don't match"
                                    })
                                }).catch(err => console.log(err));
                            }
                        }
                    });
                }).catch(err => console.log(err));
            } else {
                User.findOne({
                    email: req.session.email
                }).then(user => {
                    return res.render('account/profile', {
                        title: 'Profile',
                        username: req.session.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        password: user.password,
                        email: req.session.email,
                        imgUrl: req.session.imgUrl,
                        role: res.locals.role,
                        errorMessage: 'The mail address you want to change is already registered.'
                    })
                }).catch(err => console.log(err));
            }
        });
}
exports.getLogout = (req, res, next) => {
    let date = new Date(Date.now());
    date = date.toLocaleString('tr-TR');
    logger.info(req.session.username + " - Logout - " + date);
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
}
exports.getActivityLogs = (req, res, next) => {

    var data = fs.readFileSync('./logs/activity-logs.log', 'utf8');
    var result = data.split("\r\n");
    result.pop();
    let str = "";
    let arr = [];
    let dates = [];
    for (j = 0; j < result.length; j++) {
        str = "";
        for (i = 12; i < result[j].length - 17; i++) {
            str += result[j][i];
        }
        arr.push(str);
    }
    let arr2 = [];
    for (i = 0; i < arr.length; i++) {
        if (arr[i].indexOf(req.session.username) != -1) {
            arr2.push(arr[i]);
        }
    }
    res.render('account/activity-logs', {
        title: 'Activity Logs',
        username: req.session.username,
        imgUrl: req.session.imgUrl,
        role: res.locals.role,
        result: arr2
    });
}