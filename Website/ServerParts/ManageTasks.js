const tasks = [];
let idCounter = 0;
const postTask = (req, res) => {
	const {body} = req;
	if (body.Titel && new Date(body.DueDate) > 0) {
		tasks.push({
			ID: idCounter++,
			Titel: body.Titel,
			Beschreibung: body.Beschreibung,
			Done: false,
			CreatonDate: new Date(),
			DueDate: body.DueDate,
		});
		return res.status(201).send(tasks);
	}

	return res.status(400).send('missing or data invalid');
};

const getTasks = (req, res) => res.send(tasks);

const getID = (req, res) => {
	const ID = parseInt(req.params.id, 10);
	const target = tasks.find(task => task.ID === ID);
	if (target) {
		return res.send(target);
	}

	return res.status(400).send(`There is no task with ID: ${ID}`);
};

const putTask = (req, res) => {
	const ID = parseInt(req.params.id, 10);
	const target = tasks.find(task => task.ID === ID);
	if (target) {
		const index = tasks.indexOf(target);
		if (req.body.Titel && new Date(req.body.DueDate) > 0) {
			tasks[index] = {
				ID: target.ID,
				Titel: req.body.Titel,
				Beschreibung: req.body.Beschreibung,
				Done: false,
				CreatonDate: target.CreatonDate,
				DueDate: req.body.DueDate,
			};
			return res.send(tasks[index]);
		}

		return res.status(400).send('missing or false set data');
	}

	return res.status(400).send(`There is no task with ID: ${ID}`);
};

const deleteTask = (req, res) => {
	const ID = req.params.id;
     tasks.map(task => {
		if (task.ID === ID) {
			task = undefined
			return res.send(tasks);
		}
	});
	return res.status(400).send(`There is no task with ID: ${ID}`);
};

module.exports = {
	postTask,
	getTasks,
	putTask,
	getID,
	deleteTask,
};

