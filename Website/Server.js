const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    authorized:false,
	secret: 'CatKeyboard',
}));

const credentailsManager = require('./ServerParts/CredentailsManager');
const AccountActions = require('./ServerParts/AccountActions')
const ManageTasks = require('./ServerParts/ManageTasks')

// mit JSON kann man sich hier einloggen:
// benötigt ist passwort und beliebige email
app.post('/login', AccountActions.login);

app.delete('/logout', AccountActions.logout);

app.get('/verify', AccountActions.verify);

app.get('/tasks', credentailsManager, ManageTasks.getTasks);

app.post('/tasks', credentailsManager, ManageTasks.postTask);

app.get('/task/:id', credentailsManager, ManageTasks.getID);

app.put('/task/:id', credentailsManager, ManageTasks.putTask);

app.delete('/task/:id', credentailsManager, ManageTasks.deleteTask);

app.listen(port, () => {
	console.log(`listening on port: ${port}`);
});
