const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');
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
const ManageTasks = require('./ServerParts/ManageTasks')


app.post('/login', AccountActions.login);

app.delete('/logout', AccountActions.logout);

app.get('/verify', AccountActions.verify);

app.get('/tasks', credentialsManager, ManageTasks.getTasks);

app.post('/tasks', credentialsManager, ManageTasks.postTask);

app.get('/task/:id', credentialsManager, ManageTasks.getID);

app.put('/task/:id', credentialsManager, ManageTasks.putTask);

app.delete('/task/:id', credentialsManager, ManageTasks.deleteTask);

app.listen(port, () => {
	console.log(`listening on port: ${port}`);
});
