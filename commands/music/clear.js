const { Command } = require('discord.js-commando');

module.exports = class LeaveCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'clear',
      aliases: ['end'],
      group: 'music',
      memberName: 'clear',
      guildOnly: true,
      description: 'Clear all music in queue'
    });
  }

  run(message) {
    var voiceChannel = message.member.voice.channel;
    
    if (message.guild.triviaData.isTriviaRunning == true) {
      //message.say("I won't leave before you end the music quiz");
      message.say("Command declined. To stop music quiz use the command: __***endquiz***__");
      return;
    }

    if (!voiceChannel) {
      message.reply('⚠️ Join a channel and try again');
      return;
    } 
    else if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      message.reply('⚠️ There is no song playing right now!');
      return;
    }
      
    else if (message.guild.musicData.songDispatcher == 0) {
      message.reply('⚠️ There is no song playing right now!');
      return;
    }
    else if (voiceChannel.id !== message.guild.me.voice.channel.id) {
      message.reply(
        `You must be in the same voice channel as the bot's in order to use that!`
      );
      return;
    } else if (!message.guild.musicData.queue) {
      message.reply('⚠️ There are no songs in queue');
      return;
    } else if (message.guild.musicData.songDispatcher.paused) {
      

      message.guild.musicData.queue.length = 0;
      message.guild.musicData.songDispatcher.end();
      message.reply("I ***cleared everything*** in the queue!");

      return;
    } else {
      message.guild.musicData.songDispatcher.end();
      message.guild.musicData.queue.length = 0;
      message.reply("I ***cleared everything*** in the queue!");
      return;
    }
  }
};
