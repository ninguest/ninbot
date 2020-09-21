const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({                    // the declared thingy here will be export after "=" in last line
    uid: {type: String, required: true, unique: true},         // What you want in document
    creator: {type: String, required: true},
    playlist: {type: String, required: true},
    musics: {type: Array, required: false},
    musicsname: {type: Array, required: false},
    music:{type: Map, of: String, required: false}

}, {
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000
    }
});
exports.PLAYLISTSchema = playlistSchema;                      // exports.<export name> = declared schema name