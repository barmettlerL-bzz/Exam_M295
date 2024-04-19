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
// benötigt ist "password" und beliebige "email"
app.post('/login', AccountActions.login);

//löscht die jetzige session und logt dich damit aus
app.delete('/logout', AccountActions.logout);

//zeigt deine Logindaten in der Session falls eingelogt, sonst sagt es du bist nicht eingelogt
app.get('/verify', AccountActions.verify);

//Für alle folgede Daten muss man eingeloggt sein

//zeigt alle tasks an
app.get('/tasks', credentailsManager, ManageTasks.getTasks);

//zeigt eine task an mit der entsprechenden ID
app.get('/task/:id', credentailsManager, ManageTasks.getID);

//fügt eine Task hinzu, braucht einen "Titel" und valides "DueDate", Id wird automatisch hinzugefügt.
app.post('/tasks', credentailsManager, ManageTasks.postTask);

//ersetzt die task mit der neuen task, braucht ebenfalls einen "Titel"
app.put('/task/:id', credentailsManager, ManageTasks.putTask);

//löscht eine Task mit der ID
app.delete('/task/:id', credentailsManager, ManageTasks.deleteTask);


app.listen(port, () => {
	console.log(`listening on port: ${port}`);
});
