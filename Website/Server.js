const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const tasks = [];
let idCounter = 0;

app.get('/tasks', (req, res)=>{
    res.status(200).send(tasks);
})

app.post('/tasks', (req, res)=>{
    const body = req.body;
    if (body.Titel && body.DueDate){
        tasks.push({
            "ID": idCounter++,
            "Titel": body.Titel,
            "Beschreibung": body.Beschreibung,
            "Done": false,
            "DueDate": body.DueDate
        })
        res.send(201, tasks);
    }else{
        res.send(400, 'missing or false set data');
    }
})

app.get('/task/:id', (req, res)=>{
    const ID = parseInt(req.params.id, 10);
    const target = tasks.find((task) => task.ID === ID)
    if (target){
        res.send(target)
    }else{
        res.send(400, `There is no task with ID: ${ID}`)
    }
})

app.put('/task/:id', (req, res)=>{
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
                "DueDate": req.body.DueDate
            }
            res.send(tasks[index])
        }else{
            res.send(400, 'missing or false set data');
        }
    }
    else{
        res.send(400, `There is no task with ID: ${ID}`)
    }
})

app.delete('/task/:id', (req, res)=>{
    const ID = req.params.id;
    tasks.map(task => {
        if(task.ID === ID) {
            task.pop()
            res.send(tasks)
        }
    })
    res.send(400, `There is no task with ID: ${ID}`)
})

app.listen(port, ()=>{
    console.log(`listening on port: ${port}`)
})