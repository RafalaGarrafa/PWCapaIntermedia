create database api;

use api;

create table game
(
    id int(11) NOT NULL auto_increment primary key,
    titulo varchar(180),
    descripcion varchar(255),
    imagen varchar(255),
    fecha_creacion timestamp default current_timestamp
);

rename table game to games;

describe games;