const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000; //Where we delpoy our project might use another port, thats why 

app.use(express.json()); //since we are using JSON better let them know now!
app.use(express.urlencoded({extended: true})); //having form 

const scenariosData = JSON.parse(fs.readFileSync('scenarios.json'));//it takes the info then parse it and store it in SenarioData

app.get('/random', (req,res)=>{//this is how randumly we send a post to people like fall 
    const randomIndex = Math.floor(Math.random() * scenariosData.length);//it generate a rundom number (0-1)*scenarioData
    const randomScenario = scenariosData[randomIndex];//from among radom index ; now it gives one
    res.json(randomScenario)
});

app.post('/createtask',(req,res)=>{
    const newTask = req.body;//it can come body or postman like a post or something
    const newTaskId = Date.now().toString();//it gives new id each time  
    newTask.taskID = newTaskId;//for the newTask's taskID comes from json file and put equal to genrated id

    scenariosData.push(newTask); //we push it in arry that we made above
    fs.writeFileSync('scenarios.json', JSON.stringify(scenariosData, null, 2));
    res.send("Task created successfully");
})

app.listen(PORT, ()=>{
    console.log("Server is running on PORT: "+PORT);
})