
const express = require('express');
const app = express();
const PORT = 9090;

app.use(express.json())

const url = 'http://localhost:${PORT}`';

app.listen(
    PORT,
    () => console.log(` it's alive on http://localhost:${PORT}`)
);

app.get('/tshirt',(req, res) => {
    res.status(200).send({
        tshirt : '👕',
        size : 'large'
    })
})


app.post('/tshirt/:id', (req,res) =>{
    
    const{id} =req.params;
    const{logo} = req.body;

    if (!logo){
        res.status(418).send({ message: 'We need a shirt logo'})
    }
    res.send({
        tshirt: `👕 with your logo ${logo} and ID of ${id}`, 
    })
}) 



app.delete('/tshirt/', (req,res) =>{
    res.send({
        tshirt: `👕 has been deleted`});
}) 