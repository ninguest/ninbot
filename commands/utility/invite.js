const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { Command } = require('discord.js-commando');
const moment = require('moment');
const discord = require('discord.js')

module.exports = class CheckProfileCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'invite',
      aliases: ['inv'],
	  group: 'utility',
	  guildOnly: false,
      memberName: 'invite',
      description:
        'Get Server Info',
      throttling: {
        usages: 2,
        duration: 10
      }
      
      
    });
  }

  // If you want to restrict nsfw posts, remove the commented out code below

  async run(message) {

	var inv = 'https://discord.com/oauth2/authorize?client_id=747360029698424872&scope=bot&permissions=2146958847';
    var sinv = 'https://discord.gg/DyrdbJW';

    const UserEmbed = new MessageEmbed()
    .setColor('RANDOM')
    .setTitle('NIN BOT INVITE LINK')
    .setURL(`https://discord.com/oauth2/authorize?client_id=747360029698424872&scope=bot&permissions=2146958847`)
    //.setAuthor("User Profile", )
    //.setDescription(`🏷️UserTag: ${user.tag}`)
    .setThumbnail('https://images-ext-2.discordapp.net/external/-6HBsi17MzRx9oAPtQkvRBUFoBLubMvS2F6uC8cEyjU/https/cdn.discordapp.com/avatars/747360029698424872/e2e04a707539bb9d974dc96ee9308e69.webp')
    .addField(' Invite Link: ', inv, true)
    .addField(' Bot Support Server', sinv, false)
    // .addField(' Bot Identifier', user.bot, true)
    // .addField(' Current Presence', user.presence.status, true)
    // .addField(' UserID', UserID)
    // .addField('⏲️ User Created Date', user.createdAt)
    // .setImage(user.displayAvatarURL())
    .setTimestamp();
    //.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
  
  message.channel.send(UserEmbed);
    
};
}
