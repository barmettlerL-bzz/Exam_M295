const login = (res, req) => {
    try {
        if (req.body.email && req.body.password === 'm295') {
            req.session.credentials = {
                email: req.body.email,
                passowrd: req.body.password,
            };
            req.session.authorized = true;
            req.session.token = '12um34hd12h3443356f7';
            req.session.save();
            res.send('logged in');
        } else {
            return res.status(203).send('Password is wrong or email required');
        }
    } catch {
        return res.status(400).send('data missing or wrong');
    }
}

const logout = (req, res)=>{
    if (req.session.token) {
        req.session.cookie.maxAge = 0;
        res.send('logged out');
    } else {
        res.send('you\'re already logged out');
    }
}

const verify = (req, res)=>{
    if (req.session.token) {
        res.send(req.session);
    } else {
        res.send('you\'re not logged in');
    }
}

module.exports = {
    login,
    logout,
    verify
}