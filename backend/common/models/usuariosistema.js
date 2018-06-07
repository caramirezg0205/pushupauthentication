'use strict';

module.exports = function(UsuarioSistema) {

    UsuarioSistema.getSistemasByFkUsuario = (fk_usuario, cb) => {

        var ds = UsuarioSistema.dataSource;
        var sql = `select s.id, s.sistema, s.link, s.color, us.ultimo_acceso
                   from usuarios_sistemas us 
                   inner join sistemas s on s.id = us.fk_sistema 
                   and s.baja_logica = true 
                   where us.baja_logica = true and us.fk_usuario = $1`
        ds.connector.query(sql,[fk_usuario], function(err,data){
            console.log(data)
            if(err) console.log(err);
            
            cb(null, data)
        })
    }

    UsuarioSistema.remoteMethod('getSistemasByFkUsuario', {
            accepts: [{
                arg: 'fk_usuario', 
                type: 'string'
              }],
              returns: {
                type: 'array',
                root: true
              },
                  http: {
                verb: 'get'
              },
        })
    

    UsuarioSistema.updateUltimoAcceso = (data, cb) => {
        var ds = UsuarioSistema.dataSource;
        var sql = `update usuarios_sistemas
        set ultimo_acceso = now()
        where fk_usuario = $1 and fk_sistema in (select id from sistemas where link = $2 limit 1)`
        ds.connector.query(sql,[data.fk_usuario,data.url], function(err,data){
            if(err) console.log(err);
            
            cb(null, data)
        })
    }

    UsuarioSistema.remoteMethod('updateUltimoAcceso', {
        accepts: {
            arg: 'data', 
            type: 'object',
            http: { source: 'body' }
          },
        returns: {
            type: 'object',
            root: true
          },
        http: {
            verb: 'post'
          },
    })


        // UsuarioSistema.find({
        //     include: {
        //         relation: "sistemas",
        //         scope: {
        //             fields:["sistema"]
        //         }
        //     }
        // },
        // {where:{fk_usuario: data.fk_usuario}}, function(err, res){
        //     return cb(null, res)
        // })


   
};
