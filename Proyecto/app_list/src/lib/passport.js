const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database')
const help = require('./helpers');
const helpers = require('./helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'pass',
    passReqToCallback: true

}, async (req, username, pass, done) => {

    const rows = await pool.query('select id, foto, username, mail, pass from usuario where username=? or mail=?', [username, username]);

    if (rows.length > 0) {

      const user = rows[0];
      const person = await helpers.matchPs(pass, user.pass);
      if (person === 0) {
        done(null, user, req.flash('quedo', 'Que onda ' + user.username + '! Todo bien? todo correcto?'));
      } else {
        done(null, false, req.flash('message', 'Esa no es tu contraseña'));
      }

    } 
    else {
      return done(null, false, req.flash('message', 'No manches, no existes! :0'));
    }
}));


passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'pass',
    passReqToCallback: true

}, async (req, username, pass, done) =>{

  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  let regexPass = /(?=(.*[0-9]))(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/


  let valido = true;
  const {mail} = req.body;
  var mensajito = "";

  const Uss = {
    username,
    pass,
    mail:mail
  };

  if(!regexEmail.test(mail)){
    valido = false;
    mensajito += "Este Email no es correcto. \r\n";
  }

  if(username.length < 3){
    valido = false;
    mensajito += "El Username debe tener minimo 3 caracteres. \r\n";
    
  }

  if(!regexPass.test(pass)){
    valido = false;
    mensajito += "El Password debe tener Mayuscula - Minicula - Numero - 8 caracteres min. \r\n";
    
  }
  
  if(valido)
  {
    Uss.pass = await helpers.encryptP(pass);
    const resutl = await pool.query('insert into usuario set username = ? , pass = ?, mail = ?', [username, pass, mail]);
    Uss.id = resutl.insertId;
    return done(null, Uss);

  }else{
    mensajito += " Chaleee...  :( "
    done(null, false, req.flash('message', mensajito));
  }

}));

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser(async(id, done)=>{
    const rows = await pool.query('select id, foto, username, mail, pass from usuario where id= ?', [id]);
    done(null, rows[0]);
});
