create database estacionamento;
use estacionamento;
create table carros(
	id int auto_increment primary key not null,
    modelo varchar(255) not null,
    placa varchar(255) not null,
	entrada timestamp not null,
    saida varchar(255)
);
create table usuarios(
	id int auto_increment primary key not null,
    nome varchar(255),
    senha varchar(255) 
);
insert into usuarios(nome, senha)
values( "iuri", "1998");
 
insert into cars( modelo, placa)
values( "corsa rebaixado", "iur1998");