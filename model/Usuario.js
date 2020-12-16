const db = require('../config/db');

class Usuario {

    index() {
        const sql = 'SELECT nomeEmpresa, email, senha, telefone, endereco From Empresas';
        return db.query(sql);
    };

    create(nomeEmpresa, email, senha, telefone, endereco, administrador) {
        const sql = `insert into Empresas (nomeEmpresas, email,senha,telefone, endereco, administrador) values ('${nomeEmpresa}', '${email}', '${senha}', '${telefone}', '${endereco}', '${administrador}');`;
        return db.query(sql);
    }
    find(email, senha) {
        const sql = `SELECT * FROM Empresas WHERE email= '${email}' and senha= '${senha}'`;
        return db.query(sql);
    }
    empresas(nomeEmpresa) {
        const sql = `SELECT * FROM Empresas WHERE nomeEmpresas= '${nomeEmpresa}'`;
        return db.query(sql);
    }
    
    consultar(nomeMotores) {
        const sql = `SELECT * FROM Motores WHERE nomeMotores= '${nomeMotores}'`;
        return db.query(sql);
    }
    consultarMotores(){
        const sql = `SELECT * FROM Motores`;
        return db.query(sql);
    }
    consultarEventos() {
        const sql = `SELECT * FROM Eventos`;
        return db.query(sql);
    }

    getFk(fkEmpresas){
        const sql = ` SELECT * FROM motores WHERE fkEmpresas = '${fkEmpresas}'`;
        return db.query(sql);
    }

    deletarMotores(idMotores){
        const sql = ` DELETE FROM Motores WHERE idMotores = '${idMotores}'`;
        return db.query(sql);
    }
 /*    updateMotores(nomeMotores, descricao, quantidadeMotores, peso){
        const sql = ` `;
        return db.query(sql);
    } */

    createMotores( nomeMotores, descricao, quantidadeMotores, peso, fkEventos, fkEmpresas){
        const sql = ` INSERT INTO Motores ( nomeMotores, descricao, quantidadeMotores, peso, fkEventos, fkEmpresas) values ( '${nomeMotores}','${descricao}', '${quantidadeMotores}','${peso}','${fkEventos}', '${fkEmpresas}')`;
        return db.query(sql);
    }

    createEventos( nomeEvento, localEvento, horaSaida, horaChegada){
        const sql = ` INSERT INTO Eventos ( nomeEvento, localEvento, horaSaida, horaChegada) values ( '${nomeEvento}','${localEvento}', '${horaSaida}','${horaChegada}')`;
        return db.query(sql);
    }
}
module.exports = Usuario;