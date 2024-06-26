const login = (req, res) => {
	try {
		if (req.body.email && req.body.password === 'm295') {
			req.session.credentials = {
				email: req.body.email,
				password: req.body.password,
			};
			req.session.authorized = true;
			req.session.token = '12um34hd12h3443356f7';
			req.session.save();
			return res.send('logged in');
		}

		return res.status(203).send('Password is wrong or email required');
	} catch (err) {
		console.log(err);
		return res.status(400).send('data missing or wrong');
	}
};

const logout = (req, res) => {
	if (req.session.token) {
		req.session.cookie.maxAge = 0;
		return res.send('logged out');
	}

	return res.send('you\'re already logged out');
};

const verify = (req, res) => {
	if (req.session.token) {
		return res.send(req.session);
	}

	return res.send('you\'re not logged in');
};

module.exports = {
	login,
	logout,
	verify,
};
