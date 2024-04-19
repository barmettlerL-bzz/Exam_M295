const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');
// Const Server = require('Server');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const tasks = [];
let idCounter = 0;

app.use(session({
    authorized:false,
	secret: 'CatKeyboard',
}));

const credentialsManager = require('./ServerParts/CredentailsManager');
const AccountActions = require('./ServerParts/AccountActions')


app.post('/login', AccountActions.login);

app.delete('/logout', AccountActions.logout);

app.get('/verify', AccountActions.verify);

app.get('/tasks', credentialsManager, (req, res) => {
	res.status(200).send(tasks);
});

app.post('/tasks', credentialsManager, (req, res) => {
	const {body} = req;
	if (body.Titel && body.DueDate) {
		tasks.push({
			ID: idCounter++,
			Titel: body.Titel,
			Beschreibung: body.Beschreibung,
			Done: false,
			CreatonDate: new Date(),
			DueDate: body.DueDate,
		});
		res.status(201).send(tasks);
	} else {
		res.status(400).send('missing or false set data');
	}
});

app.get('/task/:id', credentialsManager, (req, res) => {
	const ID = parseInt(req.params.id, 10);
	const target = tasks.find(task => task.ID === ID);
	if (target) {
		res.send(target);
	} else {
		res.status(400).send(`There is no task with ID: ${ID}`);
	}
});

app.put('/task/:id', credentialsManager, (req, res) => {
	const ID = parseInt(req.params.id, 10);
	const target = tasks.find(task => task.ID === ID);
	if (target) {
		const index = tasks.indexOf(target);
		if (req.body.Titel && req.body.DueDate) {
			tasks[index] = {
				ID: target.ID,
				Titel: req.body.Titel,
				Beschreibung: req.body.Beschreibung,
				Done: false,
				CreatonDate: target.CreatonDate,
				DueDate: req.body.DueDate,
			};
			res.send(tasks[index]);
		} else {
			res.status(400).send('missing or false set data');
		}
	} else {
		res.status(400).send(`There is no task with ID: ${ID}`);
	}
});

app.delete('/task/:id', credentialsManager, (req, res) => {
	const ID = req.params.id;
	tasks.map(task => {
		if (task.ID === ID) {
			task.pop();
			res.send(tasks);
		}
	});
	res.status(400).send(`There is no task with ID: ${ID}`);
});

app.listen(port, () => {
	console.log(`listening on port: ${port}`);
});
