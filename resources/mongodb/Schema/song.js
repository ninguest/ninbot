const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    uid: {type: String, required: true, unique: true},
    singer: {type: String, required: true},
    title: {type: String, required: true},
    anime: {type: String, required: true}
}, {
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000
    }
});
exports.SongSchema = songSchema;