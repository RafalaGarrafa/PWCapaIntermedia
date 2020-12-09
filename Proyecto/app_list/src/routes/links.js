const express = require('express');
const router = express.Router();

const pool = require('../database');

const {isLogged} = require('../lib/auth')


router.get('/add', isLogged, (req, res) => {
    res.render('links/add');
});

//cuando agrega
router.post('/add',  isLogged, async(req, res) => {
    //const id_usu = req.user.id;
    const { title, description, estatus} = req.body;
   await pool.query('INSERT INTO list set ?', {listname: title, resumen:description, estatus:estatus, id_usuario:req.user.id});
    req.flash('quedo', 'Se ha guardado correctamente!');
    res.redirect('/links');
});

//cuando muestra las listas
router.get('/', isLogged,  async (req, res) => {
    const ll = await pool.query('select id, listname, resumen, created from list where id_usuario=?', [req.user.id]);
    res.render('links/list', {links:ll});
});

//cuando elimina
router.get('/delete/:id', isLogged, async (req, res) => {
    const {id} = req.params;
    await pool.query('delete from list where id =?', [id]);
    req.flash('quedo', 'Se ha elimando 1 elemento... :c');
    res.redirect('/links');
});

//Cuando muestra los datos a editar
router.get('/edit/:id', isLogged, async (req, res) => {
    const {id} = req.params;
    const ll = await pool.query('select id, listname, resumen, estatus, created from list where id=?', [id]);

    const edit = {
        id:ll[0].id,
        listname:ll[0].listname,
        resumen:ll[0].resumen,
        estatus:ll[0].estatus
    }
    res.render('links/edit', {link:ll[0]});
});

//cuando editó
router.post('/edit/:id', isLogged, async(req, res) => {
    const { title, description, estatus} = req.body;
    const { id } = req.params;
    const editate = {
        listname: title, 
        resumen: description,
        estatus:estatus
    }
    await pool.query('update list set ? where id = ?', [editate, id]);
    req.flash('quedo', 'Se ha actualizado una parte de mi!');
    res.redirect('/links');
});


//cuando edita perfil
router.get('/perfil',  isLogged, async(req, res) => {
    const id_usu = req.user.id;
    const ll = await pool.query('select id, foto, username, mail, pass from usuario where username=?', [id_usu]);

    res.render('links/perfil', {link:ll[0]});
});

//cuando editó
router.post('/perfil/:id', isLogged, async(req, res) => {
    const id_usu = req.user.id;
    const { foto, mail, username, pass} = req.body;
    const editate = {
        foto,
        mail, 
        username,
        pass
    }
    await pool.query('update usuario set ? where id = ?', [editate, id_usu]);
    req.flash('quedo', 'Se ha actualizado una parte de mi!');
    res.redirect('/profile');
});


module.exports = router;