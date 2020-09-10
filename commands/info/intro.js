const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const discord = require('discord.js');

module.exports = class WhoMadeMeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'intro',
      aliases: ['bot-maker', 'bot-creator', 'whomademe'],
      memberName: 'intro',
      group: 'info',
      description: "NIN Bot's Introduction"
    });
  }

  run(message) {
    
    var inv = 'https://discord.com/oauth2/authorize?client_id=747360029698424872&scope=bot&permissions=2146958847';
    const IntroEmbed = new MessageEmbed()
    .setColor('#D2B4DE')
    .setTitle('NIN Bot')
    //.setURL(`https://discordapp.com/channels/@me/${UserID}/`)
    //.setAuthor("User Profile", user.displayAvatarURL())
    //.setDescription(`🏷️UserTag: ${user.tag}`)
    .setDescription(`Hi, I'm NIN Bot. I am a Multi-Functions Discord Bot Application which serve 24/7 in servers.`)
    .setThumbnail('https://images-ext-2.discordapp.net/external/-6HBsi17MzRx9oAPtQkvRBUFoBLubMvS2F6uC8cEyjU/https/cdn.discordapp.com/avatars/747360029698424872/e2e04a707539bb9d974dc96ee9308e69.webp')
    .addField(' Current Presence', `*${this.client.presence.status}*`)
    .addField(' Bot Main Function', '*Entertainment*')
    .addField(' Birthday', '*24 Aug 2020*', true)
    .addField(' Bot Tag', '*NIN#2159*', true)
    .addField('Creator', '*NineGuest#2941*', true)
    //.addField(' UserID', UserID)
    .addField('Bot Supporting Server', 'https://discord.gg/DyrdbJW')
    .addField(' Invite Link: ', inv, true)
    //.setImage(user.displayAvatarURL())
    .setTimestamp();
    //.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
  
    message.channel.send(IntroEmbed);
    // message.say(
    //   'Edited by @NineGuest#2941 with :heart: Original code is available on GitHub https://github.com/galnir/Master-Bot'
    // );
  }
};
