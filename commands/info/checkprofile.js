const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { Command } = require('discord.js-commando');
const moment = require('moment');
const discord = require('discord.js');
const utils = require('../../resources/utils.js');

module.exports = class CheckProfileCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'checkprofile',
      aliases: ['cup', 'profileinfo'],
	  group: 'info',
	  guildOnly: true,
      memberName: 'checkprofile',
      description:
        'Get mentioned client profile or check your own profile',
      throttling: {
        usages: 2,
        duration: 10
      }
      
      
    });
  }

  // If you want to restrict nsfw posts, remove the commented out code below

  async run(message) {

	  const user = message.mentions.users.first() || message.author;
    const UserID = user.id;
    const UserNickname = message.guild.member(UserID).nickname;
      
    const UserEmbed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle(UserNickname)
      .setURL(`https://discordapp.com/channels/@me/${UserID}/`)
      .setAuthor("User Profile", user.displayAvatarURL())
      //.setDescription(`🏷️UserTag: ${user.tag}`)
      .setThumbnail('https://images-ext-2.discordapp.net/external/-6HBsi17MzRx9oAPtQkvRBUFoBLubMvS2F6uC8cEyjU/https/cdn.discordapp.com/avatars/747360029698424872/e2e04a707539bb9d974dc96ee9308e69.webp')
      .addField(' Username', user.username, true)
      .addField(' UserTag', user.tag, true)
      .addField(' Bot Identifier', user.bot, true)
      .addField(' Current Presence', user.presence.status, true)
      .addField(' UserID', UserID)
      .addField('⏲️ User Created Date', user.createdAt)
      .setImage(user.displayAvatarURL())
      .setTimestamp();
      //.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
    
    message.channel.send(UserEmbed);
    
};
}
