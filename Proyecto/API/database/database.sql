#create database api;

use api;

drop table if exists games;

create table if not exists games
(
    id int(11) NOT NULL auto_increment primary key,
    titulo varchar(180),
    descripcion varchar(255),
    imagen varchar(255),
    precio varchar(10),
    comprado int default 0,
    fecha_creacion timestamp default current_timestamp
);


describe games;