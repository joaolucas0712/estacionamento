const express = require("express");
const cors = require("cors");

const port = 3030;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(port, ()=> console.log ("rodando na porta" + port));

const connection = require('./db.config.js');



app.post('login', (req, res) => {
    const {nome, senha } = req.body
 
    const query = 'SELECT * FROM usuarios WHERE nome = ? AND senha = ?'
 
    connection.query(query, [nome, senha], (err, results) => {
        if (err){
            return res.status(500).json({success: false, message: 'Erro no servidor'})
        }
        if (results.length > 0) {
            res.json({success: true, message: 'Login realizado'})
        } else {
            res.json({success: false, message: 'Nome ou senha incorretos'})
        }
    })
})

app.post('/carros', (req, res) =>{
    const {nome, idade, tipo, dono} = req.body
    const query = 'INSERT INTO carros(placa, modelo) VALUES(?,?)'
    connection.query(query, [placa, carro], (err, result) =>{
        if(err){
            return res.status(500).json({success: false, message: 'Erro ao cadastrar animal'})
        }
        res.json({success: true, messagem: "animal cadastrado", id: result.insertId})
    })
})

app.get('/carros', (req, res) =>{
    const query = 'SELECT * FROM carros'
    connection.query(query, (err, results) => {
        if(err){
            return res.status(500).json({success: false, message: 'Erro ao buscar carro'})
        }
        res.json({success: true, messagem: "carro encontrado", id: results.insertId})
    })
})

app.put('/carros/:id', (req, res) =>{
    const {id} = req.params
    const {placa, modelo} = req.body
    const query = 'UPDTAE carros SET placa= ?, modelo = ?'
    connection.query(query, [placa, modelo, id], (err) =>{
        if(err){
            return res.status(500).json({success: false, message: 'Erro ao atualizar carro'})
        }
        res.json({success: true, messagem: "carro atualizado"})
    })
})

app.delete('/carros:id', (req, res) =>{
    const {id} = req.params
    const query = 'DELETE FROM carros WHERE id = ?'
    connection.query(query, [id], (err) =>{
        if(err){
            return res.status(500).json({success: false, message: 'Erro ao deletar carros'})
        }
        res.json({success: true, messagem: "carro deletado"})
    })
})
