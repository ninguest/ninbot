const mongo = require("./data.js");
const discord = require("discord.js");
const { MessageEmbed, Message, User, GuildMember } = require('discord.js');
const { Client } = require("discord.js-commando");

class anChannelData {
    constructor(){};

    async insert(uid, msg) {
        await new mongo.default.anChannel({ 
            uid: uid,
            // singer: singer,
            // title: title,
            // anime: anime,    
        }).save()
            .then(async (saved) => {
                
                console.log(`Announcement Channel \`${uid}\` saved`);
                const chembed = new MessageEmbed()
                    .setTitle("Data Entry Completed!")
                    .setThumbnail("https://images-ext-2.discordapp.net/external/xL5jLW8LPlnGzm-7leMrGP2U_ayxetHgVNzhlL0ctdM/https/images-ext-2.discordapp.net/external/-6HBsi17MzRx9oAPtQkvRBUFoBLubMvS2F6uC8cEyjU/https/cdn.discordapp.com/avatars/747360029698424872/e2e04a707539bb9d974dc96ee9308e69.webp")
                    .setDescription("A Channel had been saved as NIN Bot Announcement Channel")
                    .addField("_ _", "_ _")
                    .addField("__Total Channel Subscribed__", `\`\`\`${await this.count()}\`\`\``)
                    .setTimestamp()
                // msg.reply(`Data Entry **Completed!**\nA Channel had been saved as NIN Bot Announcement Channel\`\`\`Total Channel Subscribed: ${await this.count()}\`\`\``);
                msg.reply(chembed);

            }).catch((error) => {
                
                console.log(error);
                msg.reply(`Channel ID: \`${uid}\` => Data Entry **Failed**\n\nThe Reason for this problem is due to ***Exist Channel ID*** in database or the **Stupid Owner** has made a mistake somewhere\n\nYou can contact \`NineGuest#2941\` or use NIN Bot <\`9fb\`> command to submit a report`);
                //console.log(`Duplicate key ${uid}`);
        });
    }

    async count() {
        return await mongo.default.anChannel.estimatedDocumentCount();
    }

    async readAll(){
        return await mongo.default.anChannel.find({});  
    }

    async remove(uid, msg){
        // await mongo.default.anChannel.remove({uid:`${uid}`});
        // msg.reply(`success`);
        await mongo.default.anChannel.deleteOne({uid:`${uid}`}, function(err){
            if (err) return msg.reply("Error");
            else return msg.reply(`Operation Success, Channel ID: \`${uid}\` successfully **Unsubscribe** NIN Bot Announcement.`);
        });
    }
}

exports.anChannelDataSource = new anChannelData();

