const { Command } = require('discord.js-commando');
const discord = require('discord.js');

module.exports = class VolumeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'volume',
      aliases: ['change-volume', 'v'],
      group: 'music',
      memberName: 'volume',
      guildOnly: true,
      description: 'Check Current Bot Volume ot Set Volume (from 0 to 200) ',
      throttling: {
        usages: 1,
        duration: 5
      },
      // args: [
      //   {
      //     key: 'wantedVolume',
      //     prompt: `What volume would you like to set? from 1 to 200`,
      //     type: 'integer',
      //     validate: function(wantedVolume) {
      //       return wantedVolume >= 1 && wantedVolume <= 200;
      //     }
      //   }
      // ]
    });
  }

  run(message) {

    const args = message.content.split(' ');
    if (!args[1]) return message.channel.send(`**Current Volume :** ${message.guild.musicData.volume * 100} %`)

    //const voiceChannel = message.member.voice.channel;
    //if (!voiceChannel) return message.reply('Join a channel and try again');

    // if (
    //   typeof message.guild.musicData.songDispatcher == 'undefined' ||
    //   message.guild.musicData.songDispatcher == null
    // ) {
    //   return message.reply('⚠️ There is no song playing right now!');
    // } else if (voiceChannel.id !== message.guild.me.voice.channel.id) {
    //   message.reply(
    //     `⚠️ You must be in the same voice channel as the bot's in order to use that!`
    //   );
    //   return;
    // }

    
    const volume = Number(args[1]) / 100;
    message.guild.musicData.volume = volume;
    
    if(message.guild.musicData.songDispatcher){
      message.guild.musicData.songDispatcher.setVolume(volume);
    }
    
    message.say(`I set the volume to: ${Number(args[1])}%`);
  }
};
