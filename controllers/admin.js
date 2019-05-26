const User = require('../models/user');
const Role = require('../models/role');
const Capability = require('../models/capability');
exports.getUsers = (req, res, next) => {
    let user = "";
    let arr = [];
    let roleArr = [];
    User.find()
        .then((users) => {
            for (var i = 0; i < users.length; i++) {
                if (users[i].firstName + " " + users[i].lastName) {
                    arr.push(users[i]);
                }
            }
            Role.find()
                .then(roles => {
                    for (var i = 0; i < roles.length; i++) {
                        roleArr.push(roles[i].roleName);
                    }
                    //if (res.locals.role == "Admin" || res.locals.role =="Super Admin") {
                    if(res.locals.capabilities.includes("Users")){
                        res.render('admin/users', {
                            title: 'Users',
                            path: '/admin',
                            username: req.session.username,
                            imgUrl: req.session.imgUrl,
                            role: res.locals.role,
                            result: arr,
                            action: req.query.action,
                            roles: roleArr,
                            localId: req.session.Id
                        });
                    } else {
                        res.redirect('/');
                    }
                }).catch(err => console.log(err));
        }).catch(err => console.log(err));
}
exports.postEditUsers = (req, res, next) => {
    const firstName = req.body.inputFirstName;
    const lastName = req.body.inputLastName;
    const email = req.body.inputEmail;
    const role = req.body.inputRole;
    User.updateOne({
        _id: req.body.inputId
    }, {
        $set: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: role
        }
    }).then(() => {
        if (req.body.inputId == req.session.Id) {
            req.session.username = firstName + " " + lastName;
            req.session.email = email;
            req.session.role = role;
        }
        res.redirect('/users?action=edit');
    }).catch(err => next(err));
}
exports.getAuthorizations = (req, res, next) => {
    let roleArr = [];
    let capArr = [];
    Role.find()
        .then(roles => {
            for (var i = 0; i < roles.length; i++) {
                roleArr.push(roles[i]);
            }
            Capability.find()
                .then(capabilities => {
                    for (var i = 0; i < capabilities.length; i++) {
                        capArr.push(capabilities[i].capName);
                    }
                    //if (res.locals.role == "Admin" || res.locals.role =="Super Admin") {
                    if(res.locals.capabilities.includes("Authorizations")){
                        res.render('admin/authorizations', {
                            title: 'Authorizations',
                            path: '/admin',
                            username: req.session.username,
                            imgUrl: req.session.imgUrl,
                            role: res.locals.role,
                            roles: roleArr,
                            capabilities: capArr,
                            action: req.query.action
                        });
                    } else {
                        res.redirect('/');
                    }
                }).catch(err => console.log(err));
        }).catch(err => console.log(err));
}
exports.postAddAuthorizations = (req, res, next) => {
    const roleName = req.body.inputRoleName;
    let str = req.body.Lists;
    str = str.split(",");
    const role = new Role({
        roleName: roleName,
        capabilities: str
    });
    role.save()
        .then(() => {
            res.redirect('/authorizations?action=add');
        }).catch(err => next(err));
}
exports.postEditAuthorizations = (req, res, next) => {
    let str = req.body.List;
    str = str.split(",");
    Role.updateOne({
            _id: req.body.inputId
        }, {
            $set: {
                capabilities: str
            }
        })
        .then(() => {
            res.redirect('/authorizations?action=edit');
        }).catch(err => next(err));
}
exports.getDeleteUser = (req, res, next) => {
    const id = req.params.id;
    User.deleteOne({
            _id: id
        })
        .then(() => {
            res.redirect('/users?action=delete');
        }).catch(err => {
            console.log(err);
        });
}
exports.getDeleteRole = (req, res, next) => {
    const id = req.params.id;
    Role.deleteOne({
            _id: id
        })
        .then(() => {
            res.redirect('/authorizations?action=delete');
        }).catch(err => {
            console.log(err);
        });
}