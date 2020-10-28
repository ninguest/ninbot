const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const utils = require('../../resources/utils.js')

module.exports = class UptimeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'uptime',
      aliases: ['alive', 'up'],
      memberName: 'uptime',
      group: 'info',
      description: "Replies with the bot's total uptime."
    });
  }
  run(message) {
    var seconds = parseInt((this.client.uptime / 1000) % 60),
      minutes = parseInt((this.client.uptime / (1000 * 60)) % 60),
      hours = parseInt((this.client.uptime / (1000 * 60 * 60)) % 24);
    // prettier-ignore
    hours = (hours < 10) ? ('0' + hours) : hours;
    // prettier-ignore
    minutes = (minutes < 10) ? ('0' + minutes) : minutes;
    // prettier-ignore
    seconds = (seconds < 10) ? ('0' + seconds) : seconds;
    
    const UptimeEmbed = new MessageEmbed()
    .setColor('#D2B4DE')
    //.setTitle('NIN Bot')
    //.setURL(`https://discordapp.com/channels/@me/${UserID}/`)
    //.setAuthor("User Profile", user.displayAvatarURL())
    //.setDescription(`🏷️UserTag: ${user.tag}`)
    //.setDescription(`Hi, I'm NIN Bot. I am a Multi-Functions Discord Bot Application which serve 24/7 in servers.`)
    //.setThumbnail(this.client.user.displayAvatarURL())
    .addField('📈 Uptime (Bot Running for)', `**${hours}** hours, **${minutes}** minutes and **${seconds}** seconds`)
    .addField("_ _", "_ _")
    .addField('📊 Memory Usage', `*${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB*`)
    .addField("_ _", "_ _")
    .setFooter(`${utils.GetTimeZoneDate()}`, this.client.user.displayAvatarURL());
  
    message.channel.send(UptimeEmbed);
  }


};
