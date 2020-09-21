const mongo = require("./data.js");
const discord = require("discord.js");
const { MessageEmbed, Message, User, GuildMember } = require('discord.js');
const { Client } = require("discord.js-commando");
const dotenv = require('dotenv');
dotenv.config();

class PlaylistData {
    constructor(){};

    async insert(uid, creator, playlist, msg) {
        await new mongo.default.Playlist({ 
            
            uid: uid,
            creator: creator,
            playlist: playlist,
            //videoid: videoid

        }).save()
            .then(async (saved) => {
                
                console.log(`UID: ${creator} > Playlist ${playlist} saved successfully`);
                
                msg.reply(`Playlist \`${playlist}\` created Successfully !! Now you can use <\`${process.env.PREFIX}playlist\`> to edit this playlist.`);

            }).catch((error) => {
                
                console.log(error);
                msg.reply(`Failed Operation`); //Happens when uid identical conflict
                
        });
    }

    async countAll() {
        return await mongo.default.Playlist.estimatedDocumentCount();
    }

    async readAll(){
        return await mongo.default.Playlist.find();  
    }

    //Find User ID return All playlist available
    async SearchThisUserForPlaylists(creatorid){
        return await mongo.default.Playlist.find({creator: creatorid});
    }

    async SearchSpecificPlaylist(creatorid, playlistname){
        return await mongo.default.Playlist.findOne({creator: creatorid, playlist: playlistname})
    }

    async AddSongintoArray(creatorid, playlistname, videoid, title, message){
        try{
            await mongo.default.Playlist.updateOne(
                {
                    creator: creatorid,
                    playlist: playlistname
                },
                {
                    $addToSet: {musics: videoid}
                }
            );

            await mongo.default.Playlist.updateOne(
                {
                    creator: creatorid,
                    playlist: playlistname
                },
                {
                    $addToSet: {musicsname: title}
                }
            );

            message.channel.send(`The Song, \`${title}\`, saved into your \`${playlistname}\``);
        }
        catch(err){
            message.channel.send(err+" > Operation Failed ! Please Try Again!");
        }
        
    }

    async DeleteSongfromArray(creatorid, playlistname, videoid, title, message){
        try{
            await mongo.default.Playlist.updateOne(
                {
                    creator: creatorid,
                    playlist: playlistname
                },
                {
                    $pull: {musics: videoid}
                }
            );
            await mongo.default.Playlist.updateOne(
                {
                    creator: creatorid,
                    playlist: playlistname
                },
                {
                    $pull: {musicsname: title}
                }
            );
            message.channel.send(`The Song, \`${title}\`, deleted from your \`${playlistname}\``);
        }
        catch(err){
            message.channel.send(err+" > Operation Failed ! Please Try Again!");
        }
    }

    async DeletePlaylist(creatorid, playlistname, msg){
        await mongo.default.Playlist.deleteOne({creator: creatorid, playlist: playlistname}, function(err){
            if (err) return msg.reply("Error");
            else return msg.reply(`UID: ${creatorid} > Operation Success, Playlist \`${playlistname}\` deleted.`);
        });
    }


}

exports.PlaylistDataSource = new PlaylistData();

