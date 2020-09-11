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

    const botid = this.client.user.id;
	  var inv = `https://discord.com/oauth2/authorize?client_id=${botid}&scope=bot&permissions=2146958847`;
    var sinv = 'https://discord.gg/DyrdbJW';
    
    const UserEmbed = new MessageEmbed()
    .setColor('RANDOM')
    .setTitle('NIN BOT INVITE LINK')
    .setURL(`https://discord.com/oauth2/authorize?client_id=${botid}&scope=bot&permissions=2146958847`)
    //.setAuthor("User Profile", )
    //.setDescription(`🏷️UserTag: ${user.tag}`)
    .setThumbnail(this.client.user.displayAvatarURL())
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
