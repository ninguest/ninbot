"use strict";
const mongoose = require('mongoose');

const jokerGuild = require('./Schema/guild.js');
const songSchema = require('./Schema/song.js');
const anChannelSchema = require('./Schema/anchannel.js');
const playlistSchema = require('./Schema/playlist.js');


const dotenv = require("dotenv");
dotenv.config();

class MongoDB{
    constructor(){
    }

    async start(){
        try {
            this.uri = process.env.URI;
            //console.log(this.uri);
            const options = {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true
            };
            
            this.client = mongoose.connect(`${this.uri}`, options);
            
            this.Guild = mongoose.model('guild', jokerGuild.GuildSchema);
            this.Song = mongoose.model('song', songSchema.SongSchema);
            this.anChannel = mongoose.model('anchannel', anChannelSchema.AnCHANNELSchema);
            this.Playlist = mongoose.model('playlist', playlistSchema.PLAYLISTSchema);
            
                        
            console.log("Connected to MongoDB");
            return true;
            
        } 

        catch (error) {

            console.log(`MongoDB connection error: ${error}`);
            return false;

        }
    }

    isConnected(){
        return this.client.connection.readyState === 1;
    }



}

const MongoNigga = new MongoDB();
exports.default = MongoNigga;


