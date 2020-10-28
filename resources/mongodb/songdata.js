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
                
                console.log("Song saved");
                
                msg.reply(`Data Entry Completed!\n***Title :*** __${title}__ \n***Singer :*** __${singer}__\n***Anime :*** __${anime}__\`\`\`Total Song Exist: ${await this.count()}\`\`\``);

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

