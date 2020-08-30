const mongoose = require('mongoose');
const jokerGuild = new mongoose.Schema({
    uid: {type: String, required: true, unique: true},
    serverName: {type: String, required: true},
    joinedAt: {type: String, required: true},
    commandPrefix: {type: String, required: true}
}, {
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000
    }
});
exports.GuildSchema = jokerGuild;