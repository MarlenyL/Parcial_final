const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PersonajeSchema = Schema({
    Alias: {
        type: String,
        required: true,
        unique: true
    },
    Nombre: {
        type: String,
        required: true
    },
    Faccion: {
        type: String,
        enum: ['Osadia', 'Verdad','Erudicion','Abnegacion','Cordialidad','Sin Faccion'],
        required: true
    },
    Actor: {
        type: String,
        required: true
    },
    Divergente: {
        type: Boolean,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Personaje", PersonajeSchema);