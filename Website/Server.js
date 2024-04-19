const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');
// const Server = require('Server');
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const tasks = [];
let idCounter = 0;

app.use(session({
    secret: 'CatKeyboard'
}))

const credentialsManager = (req, res, next) => {
    if (!req.session.token) {
        if (!req.session.authorized) {
            req.session.authorized = true;
            return res.status(403).header({
                'WWW-Authenticate': 'Basic realm="Authenticate yourself!"',
            }).send(req.session);
        }
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

app.post('/login', (req, res) => {
    console.log(req.body);
    try {
        if (req.body.email && req.body.password === 'zli123') {
            req.session.credentials = {
                "email": req.body.email,
                "passowrd": req.body.password,
            };
            req.session.authorized = true;
            req.session.token = '12um34hd12h3443356f7';
            req.session.cookie.maxAge = 300000;
            req.session.save();
            res.send('logged in');
        } else {
            return res.status(203).send('Password is wrong or email required');
        }
    } catch {
        return res.status(400).send('data missing or wrong');
    }
});

app.delete('/logout', (req, res) => {
    if (req.session.token) {
        req.session.cookie.maxAge = 0;
        res.send('logged out');
    } else {
        res.send('you\'re already logged out');
    }
});
app.get('/verify', credentialsManager, (req, res) => {
    if (req.session.token) {
        res.send(req.session.credentials);
    } else {
        res.send('you\'re not logged in');
    }
});

app.get('/tasks',credentialsManager, (req, res)=>{
    res.status(200).send(tasks);
})

app.post('/tasks',credentialsManager, (req, res)=>{
    const body = req.body;
    if (body.Titel && body.DueDate){
        tasks.push({
            "ID": idCounter++,
            "Titel": body.Titel,
            "Beschreibung": body.Beschreibung,
            "Done": false,
            "CreatonDate": new Date(),
            "DueDate": body.DueDate
        })
        res.status(201).send(tasks);
    }else{
        res.status(400).send('missing or false set data');
    }
})

app.get('/task/:id',credentialsManager, (req, res)=>{
    const ID = parseInt(req.params.id, 10);
    const target = tasks.find((task) => task.ID === ID)
    if (target){
        res.send(target)
    }else{
        res.status(400).send(`There is no task with ID: ${ID}`)
    }
})

app.put('/task/:id',credentialsManager, (req, res)=>{
    const ID = parseInt(req.params.id, 10);
    let target = tasks.find( task => task.ID === ID);
    if (target){
        let index = tasks.indexOf(target)
        if (req.body.Titel && req.body.DueDate) {
            tasks[index] = {
                "ID": target.ID,
                "Titel": req.body.Titel,
                "Beschreibung": req.body.Beschreibung,
                "Done": false,
                "CreatonDate": target.CreatonDate,
                "DueDate": req.body.DueDate
            }
            res.send(tasks[index])
        }else{
            res.status(400).send('missing or false set data');
        }
    }
    else{
        res.status(400).send(`There is no task with ID: ${ID}`)
    }
})

app.delete('/task/:id',credentialsManager, (req, res)=>{
    const ID = req.params.id;
    tasks.map(task => {
        if(task.ID === ID) {
            task.pop()
            res.send(tasks)
        }
    })
    res.status(400).send(`There is no task with ID: ${ID}`)
})

app.listen(port, ()=>{
    console.log(`listening on port: ${port}`)
})