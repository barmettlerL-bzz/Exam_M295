const postTask = (req, res)=>{
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
        return res.status(201).send(tasks);
    } else {
        return res.status(400).send('missing or false set data');
    }
}
const getTasks = (req, res)=>{
    return res.send(tasks)
}
const getID = (req, res)=>{
    const ID = parseInt(req.params.id, 10);
    const target = tasks.find(task => task.ID === ID);
    if (target) {
        return res.send(target);
    } else {
        return res.status(400).send(`There is no task with ID: ${ID}`);
    }
}
const putTask = (req, res)=>{
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
            return res.send(tasks[index]);
        } else {
            return res.status(400).send('missing or false set data');
        }
    } else {
        return res.status(400).send(`There is no task with ID: ${ID}`);
    }
}
const deleteTask = (res, req)=>{
    const ID = req.params.id;
    tasks.map(task => {
        if (task.ID === ID) {
            task.pop();
            return res.send(tasks);
        }
    });
    return res.status(400).send(`There is no task with ID: ${ID}`);
}

module.exports = {
    postTask,
    getTasks,
    putTask,
    getID,
    deleteTask
}
