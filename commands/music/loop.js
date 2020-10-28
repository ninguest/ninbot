const { Command } = require('discord.js-commando');

module.exports = class LoopCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'loop',
      group: 'music',
      memberName: 'loop',
      aliases: ['repeat'],
      guildOnly: true,
      description: 'Loop the current playing song',
      args: [
        {
          key: 'numOfTimesToLoop',
          default: 1,
          type: 'integer',
          prompt: 'How many times do you want to loop the song?'
        }
      ]
    });
  }

  run(message, { numOfTimesToLoop }) {

    if(numOfTimesToLoop <= 0){
      message.reply("Sorry, I'm not going to let you do that. \n(*__Number of Loop__ should be above **0***)");
      return;
    }

    if (message.guild.triviaData.isTriviaRunning == true) {
      message.say('Command declined while running music quiz');
      return;
    }

    if (!message.guild.musicData.isPlaying) {
      return message.say('⚠️ There is no song playing right now!');
    } else if (
      message.guild.musicData.isPlaying &&
      message.guild.triviaData.isTriviaRunning
    ) {
      return message.say('⚠️ You cannot loop over a trivia!');
    } else if (
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    ) {
      message.reply(
        `⚠️ You must be in the same voice channel as the bot's in order to use that!`
      );
      return;
    }

    const npq = message.guild.musicData;
    npq.loop = numOfTimesToLoop + 1;

    
    // for (let i = 0; i < numOfTimesToLoop; i++) {
    //   message.guild.musicData.queue.unshift(message.guild.musicData.nowPlaying);
    // }

    // prettier-ignore
    message.channel.send(
      `${message.guild.musicData.nowPlaying.title} will be looping for ${numOfTimesToLoop} ${
        (numOfTimesToLoop == 1) ? 'more time' : 'more times'
      }`
    );
    return;
  }
};
