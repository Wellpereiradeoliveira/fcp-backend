const express = require('express');
const bodyParser = require('body-parser');
const Usuario = require('./model/Usuario');
const cors = require('cors');
const morgan = require('morgan')

const server = express();
server.use(express.json());

server.use(express.static(__dirname + '/public'));
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

server.use(cors());
server.use(morgan('dev'));

server.post('/motores', async function(req,res){

    const nomeMotores = req.body.nomeMotores;
    const descricao = req.body.descricao;
    const quantidadeMotores = req.body.quantidadeMotores;
    const peso = req.body.peso;
    const fkEvento = req.body.fkEventos;
    const fkEmpresa = req.body.fkEmpresas;
    const usuario = new Usuario();
    await usuario.createMotores( nomeMotores, descricao, quantidadeMotores, peso, fkEvento,fkEmpresa).then(function(usuario){
        res.status(201).send(' Motor cadastrado com sucesso !');
    }).catch(function(error){
        res.status(400).send(' Erro ao cadastrar motores');
    })
   
});

server.post('/require/eventos', async function(req,res){

    const nomeEvento = req.body.nomeEvento;
    const localEvento = req.body.localEvento;
    const horaChegada = req.body.horaChegada;
    const horaSaida = req.body.horaSaida;
    const usuario = new Usuario();
    await usuario.createEventos( nomeEvento, localEvento, horaChegada, horaSaida).then(function(usuario){
        res.status(201).send(' Evento cadastrado com sucesso !');
    }).catch(function(error){
        res.status(400).send(' Erro ao cadastrar eventos');
    })
   
});

server.post('/motores/:fk', async function( req, res){
    const fk = req.params.fk;
    const usuario = new Usuario();
    await usuario.getFk(fk).then(function(usuario){
        res.status(201).send(usuario);
    }).catch(function(error){
        res.status(400).send(' Erro ao trazer motores pelo fk');
    })

})

server.post('/:idEmpresas', async function(req, res) {

    const usuario = new Usuario();
    await usuario.consultar(req.params.nome).then(function(resultado){
        if (resultado.length > 0) {
            res.status(200).send(resultado)
        } else if (resultado.length < 1) {
            res.status(400).send('Motor não encontrado');
        }
    }).catch(function(error){
        res.status(500).send(" Erro ")
    })
})

server.get('/require/eventos', async function(req, res){
    const usuario = new Usuario();
    await usuario.consultarEventos().then(function(resultado){
        if (resultado.length > 0){
            res.status(200).send(resultado)
        } else if (resultado.length < 1) {
            res.status(400).send('Evento não encontrado');
        }
    }).catch(function(error){
        res.status(500).send(" Erro ")
    })
})

server.get('/require/motores', async function(req, res){
    const usuario = new Usuario();
    await usuario.consultarMotores().then(function(resultado){
        if (resultado.length > 0){
            res.status(200).send(resultado)
        } else if (resultado.length < 1) {
            res.status(400).send('Motor não encontrado');
        }
    }).catch(function(error){
        res.status(500).send(" Erro ")
    })
})

server.delete('/motores/:idMotores', async function(req,res){

    const usuario = new Usuario();
    await usuario.deletarMotores(req.params.idMotores).then(function(usuario){
        res.status(201).send('Motor deletado com sucesso')
    }).catch( function( error){
        res.status(400).send(" Erro ao deletar motor");
    });
})

server.post('/require/cadastro', async function(req, res) {
    const nomeEmpresa = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;
    const tel = req.body.telefone;
    const endereco = req.body.endereco;
    const admin = 0;

    const usuario = new Usuario();
    await usuario.create(nomeEmpresa, email, senha, tel, endereco, admin).then(function(usuario){
        res.status(201).send('Cadastro realizado com sucesso !')
    }).catch( function( error){
        res.status(400).send(" Erro ao cadastrar !");
    });
});    

server.post('/require/login', async function(req, res) {

    const email = req.body.email;
    const senha = req.body.senha;
    const usuario = new Usuario();
    await usuario.find(email, senha).then(function(resultado){
        if (resultado.length > 0) {
            res.status(200).send(resultado)
        } else if (resultado.length < 1) {
            res.status(400).send('E-mail ou senha inválidos');
        }
    }).catch(function(error){
        res.status(500).send(" Erro ")
    })
})

server.post('/empresas/:empresas', async function(req, res) {

    const usuario = new Usuario();
    await usuario.empresas(req.params.empresas).then(function(resultado){
        if (resultado.length > 0) {
            res.status(200).send(resultado)
        } else if (resultado.length < 1) {
            res.status(400).send('Empresa não encontrada');
        }
    }).catch(function(error){
        res.status(500).send(" Erro ")
    })
})




server.listen(8080);