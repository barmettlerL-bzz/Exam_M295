const credentialsManager = (req, res, next) => {
    if (!req.session.token) {
        if (!req.session.authorized) {
            return res.status(403).header({
                'WWW-Authenticate': 'Basic realm="Authenticate yourself!"',
            }).send(req.session);
        }
        req.session.authorized = true;
        try {
            const credentials = globalThis.atob(req.headers.authorization.replace('Basic ', '')).split(':');
            if (credentials[1] === 'm295') {
                req.session.credentials = {
                    email: credentials[0],
                    password: credentials[1],
                };
                req.session.token = '0389420fhdfq3840j23';
                req.session.save();
            } else {
                req.session.authorized = false;
                return res.status(203).send('password wrong');
            }
        } catch {
            return res.status(403).header({
                'WWW-Authenticate': 'Basic realm="Authenticate yourself!"',
            }).send(req.session);
        }
    }

    next();
};

module.exports = credentialsManager