const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { Command } = require('discord.js-commando');
const moment = require('moment');
const discord = require('discord.js');
const utils = require('../../resources/utils.js');

module.exports = class InviteCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'invite',
      aliases: ['inv'],
	  group: 'info',
	  guildOnly: false,
      memberName: 'invite',
      description:
        'Get Invite link from NIN Bot',
      throttling: {
        usages: 2,
        duration: 10
      }
      
      
    });
  }

  

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
    //.setTimestamp();
    .setFooter(`Message CreatedAt: ${utils.GetTimeZoneDate()}`);
  
  message.channel.send(UserEmbed);
    
};
}
