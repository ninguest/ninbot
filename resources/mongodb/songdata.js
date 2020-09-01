const mongo = require("./data.js");
const discord = require("discord.js");

class SongData {
    constructor(){};

    async insert(uid, singer, title, anime, msg) {
        await new mongo.default.Song({ 
            uid: uid,
            singer: singer,
            title: title,
            anime: anime,    
        }).save()
            .then(async (saved) => {

                const user = message.author;
                const UserID = user.id;
                const UserNickname = message.guild.member(UserID).nickname;
                
                const UserEmbed = new MessageEmbed()
                .setColor(utils.getrandomColor())
                .setTitle("Anime Song Entry Successfully Completed")
                //.setURL(`https://discordapp.com/channels/@me/${UserID}/`)
                .setAuthor(UserNickname, user.displayAvatarURL())
                //.setDescription(`🏷️UserTag: ${user.tag}`)
                .setThumbnail('https://images-ext-2.discordapp.net/external/-6HBsi17MzRx9oAPtQkvRBUFoBLubMvS2F6uC8cEyjU/https/cdn.discordapp.com/avatars/747360029698424872/e2e04a707539bb9d974dc96ee9308e69.webp')
                //.addField(' Username', user.username, true)
                .addField('Song Provider', user.tag, true)
                .addField('Song Title', title, true)
                .addField('Song Singer', singer, true)
                .addField('Song Anime', anime, true)
                .addField('Current Total Song Exist', await this.count())
                //.setImage(user.displayAvatarURL())
                .setTimestamp();
                //.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
                
                console.log("Song saved");
                message.channel.send(UserEmbed);
                // msg.reply(`***Title :*** __${title}__ \n Data Entry Completed!\`\`\`Total Song Exist: ${await this.count()}\`\`\``);

            }).catch((error) => {
                
                console.log(error);
                msg.reply(`***Title :*** __${title}__ \n Data Entry Failed \`\`\`Reason:Song Exist\`\`\``);
                //console.log(`Duplicate key ${uid}`);
        });
    }

    async count() {
        return await mongo.default.Song.estimatedDocumentCount();
    }

    async readAll(){
        return await mongo.default.Song.find();  
    }
}

exports.SongDataSource = new SongData();

