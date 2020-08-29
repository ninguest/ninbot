const { Command } = require('discord.js-commando');
const discord = require('discord.js');

module.exports = class DisconnectCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'disconnect',
      aliases: ['leave', 'dc'],
      group: 'music',
      memberName: 'disconnect',
      guildOnly: true,
      description: 'Leave voice channel'
    });
  }

  
    
  

  run(message) {
    var voiceChannel = message.member.voice.channel;
    
    if (message.guild.triviaData.isTriviaRunning == true) {
      message.say("I won't leave before you end the music quiz");
      return;
    }
    
    if (!voiceChannel) {
      message.reply('⚠️ Join a channel and try again');
      return;
    }
    
    voiceChannel.leave()
    message.say('👋 Bye!');
    
    
  }
};
