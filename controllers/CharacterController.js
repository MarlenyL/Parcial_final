var Personaje = require('../models/personaje');
var debug = require('debug')('blog:personaje_controller');

module.exports.getOne = (req, res, next) => {
    debug("Search Character", req.params);
    Personaje.findOne({
            Nombre: req.params.nombre
        })
        .then((foundPersonaje) => {
            if (foundPersonaje)
                return res.status(200).json(foundPersonaje);
            else
                return res.status(400).json(null)
        })
        .catch(err => {
            next(err);
        });
}


module.exports.getAll = (req, res, next) => {
    var perPage = Number(req.query.size) || 10,
        page = req.query.page > 0 ? req.query.page : 0;

    var sortProperty = req.query.sortby || "createdAt",
        sort = req.query.sort || "desc";

    debug("Character List",{size:perPage,page, sortby:sortProperty,sort});

    Personaje.find({})
        .limit(perPage)
        .skip(perPage * page)
        .sort({ [sortProperty]: sort})
        .then((personajes) => {
           return res.status(200).json(personajes)
        }).catch(err => {
            next(err);
        })

}

module.exports.register = (req, res, next) => {
    console.log("HOLA");
    debug("New Character", {
        body: req.body
    });
    Personaje.findOne({
            Nombre: req.body.nombre
        })
        .then((foundCharacter) => {
            if (foundCharacter) {
                debug("Character duplicado");
                throw new Error(`Character duplicado ${req.body.nombre}`);
            } else {
                let newCharacter = new Personaje({
                    Nombre: req.body.nombre,
                    Faccion: req.body.faccion || "",
                    Actor: req.body.actor || "",
                    Divergente: req.body.divergente
                });
                return newCharacter.save(); // Retornamos la promesa para poder concater una sola linea de then
            }
        }).then(character => { // Con el usario almacenado retornamos que ha sido creado con exito
            return res
                .header('Location', '/characters/' + character._id)
                .status(201)
                .json({
                    nombre: character.nombre
                });
        }).catch(err => {
            next(err);
        });
}
module.exports.update = (req, res, next) => {
    debug("Update Character", {
        Nombre: req.params.nombre,
        ...req.body
    });

    let update = {
        ...req.body
    };

    Personaje.findOneAndUpdate({
            Nombre: req.params.nombre
        }, update, {
            new: true
        })
        .then((updated) => {
            if (updated)
                return res.status(200).json(updated);
            else
                return res.status(400).json(null);
        }).catch(err => {
            next(err);
        });
}

module.exports.delete = (req, res, next) => {

    debug("Delete character", {
        Nombre: req.params.nombre,
    });

    Personaje.findOneAndDelete({Nombre: req.params.nombre})
    .then((data) =>{
        if (data) res.status(200).json(data);
        else res.status(404).send();
    }).catch( err => {
        next(err);
    })
}