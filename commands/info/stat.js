const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = class SayCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'stat',
      aliases: ['status', 'bot-status'],
      memberName: 'stat',
      guildOnly: true,
      group: 'info',
      description: 'Return with NIN Bot Full Status',
    //   args: [
    //     {
    //       key: 'text',
    //       prompt: 'What do you want the bot to say?',
    //       type: 'string'
    //     }
    //   ]
    });
  }

  

  run(message) {
  

    var cmemberCount = message.guild.members.cache.filter(member => !member.user.bot).size;
    
    var botCount = message.guild.memberCount - cmemberCount;
    
    const thisdate = this.client.readyAt.toLocaleString("zh-SG", {timeZone: "Asia/Singapore"});

    const StatEmbed = new MessageEmbed()
      .setColor('#FF00FF')
      .setTitle("✨__NIN Bot Status__")
      //.setDescription(`🏷️UserTag: ${user.tag}`)
      .setThumbnail(this.client.user.displayAvatarURL())
      .addField(' Total Serving Guild', `***${this.client.guilds.cache.size}***`)
      .addField(' Total Users in Current Server', `***${cmemberCount}***`)
      .addField(' Total Bots in Current Server', `***${botCount}***`)
      .addField(' Bot WebSocket Ping', `***${this.client.ws.ping} ms***`)
      .addField(' Interaction Ping',`***${Date.now() - message.createdTimestamp} ms***` )
      .addField(' Bot Last Restart Time', `\`\`\`${thisdate}\`\`\``)
      
      .setTimestamp();

    message.channel.send(StatEmbed);
 
  }
};