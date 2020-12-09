
create database api;
use api;
create table usuario(
    id      	int(11)         not null    primary key     auto_increment,
    foto 		text,
    username    varchar(20)     not null,
    mail		varchar(50)		not null 	unique,
    pass    	varchar(20)     not null

);

alter table usuario auto_increment = 3; 
alter table list auto_increment = 3; 


select id, foto, username, mail, pass from usuario where username = 5 or mail = "heda@the100.com";

-- describe usuario;
-- drop table list;
-- describe links;
-- drop table usuario;

Create table list(
	id      	int(11)         not null    primary key     auto_increment,
    listname    varchar(20)     not null,
    resumen		text,
    created 	timestamp		not null 	default current_timestamp,
    estatus 	varchar(10)		not null,

    id_usuario int(11),
    
    constraint fk_user foreign key(id_usuario) references usuario(id)
);

select * from list;
select * from usuario;
update usuario set foto = "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png" where id = 3;

update links set id_usuario = 10 where id= 14;

insert into usuario set username = 'SunHeda', pass= 7;

delete from usuario where id = 9;

select id, username, pass from usuario where username = 'Win';

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '72727LmCc';
flush privileges;

insert into links set linkname = 'Rhino', url='https://shop.rhinoshield.io', resumen = 'dddd';



create table if not exists games
(
    id int(11) NOT NULL auto_increment primary key,
    titulo varchar(180),
    descripcion varchar(255),
    imagen varchar(255),
    precio varchar(10),
    comprado bit default false,
    fecha_creacion timestamp default current_timestamp,
    
    id_list int(11),
	constraint fk_links foreign key(id_list) references list(id)
);

drop table games;
drop table ListID;

select * from games;

create table if not exists ListID
(
	id_lista int default -1
);

insert into ListID set id_lista = 2;
select * from ListID;

