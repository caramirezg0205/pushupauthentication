'use strict';

module.exports = function(Usuario) {
  var jwt = require('jsonwebtoken');
  var sha256 = require('js-sha256');
  var resp = {}

  Usuario.authenticate = (data, cb) => {
    Usuario.findOne({where: {username: data.username, baja_logica: true}}).then(function(usuario) {
      if (!usuario) {
        resp.type = 'error';
        resp.msg = 'Usuario no encontrado'
        resp.token = ''
        return cb(null, resp);
      }
      var passcrypted = sha256.hmac('pushupkey', data.password);
      console.log(passcrypted)
      console.log(usuario.password)
      if (usuario.password != passcrypted) {
        resp.type = 'error';
        resp.msg = 'Password incorrecto'
        resp.token = ''
        return cb(null, resp);
      }

      var payload = {
        fk_usuario: usuario.id,
        username: usuario.username, 
        nombres: usuario.nombres, 
        apellidos: usuario.apellidos, 
        foto: usuario.foto};
      var token = '';
      if(data.remember){
        token = jwt.sign(payload, 'llave', {expiresIn:  10000});
      }else{
        token = jwt.sign(payload, 'llave', {expiresIn:  30});
      }
    
      resp.type = 'success';
      resp.msg = 'Autenticación exitosa';
      resp.token = token

      return cb(null, resp);
    });
  }

  Usuario.verifyToken = (data, cb) => {
    var resp = {}
    if (!data.token) {
      resp.type = 'error'
      resp.msg = 'Token no proporcionado'
      return cb(null,resp)
    }else{
      jwt.verify(data.token, 'llave', function(err, res) {
        if (err) {
          resp.type = 'error'
          resp.msg = err.message
          return cb(null,resp)
        }else{
          resp.type = 'success'
          resp.msg = 'done'
          cb(null, resp);
        }
      });
    }
  }

  Usuario.decodeToken = (token, cb) => {
    var decoded = jwt.decode(token);
    return cb(null, decoded);
  }

  Usuario.remoteMethod('verifyToken', {
    accepts: {
      arg: 'data', 
      type: 'object', 
      http: { source: 'body'},
      required: true      
    },
    returns: {
      arg: 'obj', 
      type: 'object'
    },
    http: {
      verb: 'post'
    }
  });

  Usuario.remoteMethod('authenticate', {
    accepts: [{
      arg: 'data', 
      type: 'object', 
      http: { source: 'body' }
    }],
    returns: {
      arg: 'obj', 
      type: 'string'
    },
		http: {
      verb: 'post'
    },
  });

  Usuario.remoteMethod('decodeToken', {
    accepts: { 
      arg: 'token', 
      type: 'string'
    },
    returns: { 
      arg: 'obj', 
      type: 'object'},
    http: { 
      verb: 'get'
    }
  });
};
