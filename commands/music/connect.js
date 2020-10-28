const { Command } = require('discord.js-commando');
const discord = require('discord.js');

module.exports = class ConnectCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'connect',
      aliases: ['join','c'],
      group: 'music',
      memberName: 'connect',
      guildOnly: true,
      description: 'Connect to voice channel user is in'
    });
  }

  run(message) {
    var voiceChannel = message.member.voice.channel;
    
    if (message.guild.triviaData.isTriviaRunning == true) {
      message.say("Hello! I'm here hosting music quiz.");
      return;
    }

    if (!voiceChannel) {
      message.reply('⚠️ Join a channel and try again');
      return;
    }
    
    voiceChannel.join()
    .then(message.say('🔗 **Connected!**'))
    .catch(console.error);
  }
};
