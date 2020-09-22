const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const utils = require('../../resources/utils.js');

module.exports = class ShortQueueCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'shortqueue',
      aliases: ['shortsong-list', 'sq', 'shortlist'],
      group: 'music',
      memberName: 'shortqueue',
      guildOnly: true,
      description: 'Display a short queue up list for 5 songs'
    });
  }

  run(message) {

    if (message.guild.triviaData.isTriviaRunning == true){
       message.say("⚠️ You can't check queue while playing music quiz! That is Cheating");
      return;
    }

    
    if (message.guild.musicData.queue.length == 0)
      return message.say('⚠️ There are no songs in queue!');

    //combine NowPlaying & Queue List to one Array with [map1].concat(map2)
    // const nowP = message.guild.musicData.nowPlaying;
    // const queueP = message.guild.musicData.queue;
    // const queue = [nowP].concat(queueP);
    const queue = message.guild.musicData.queue;

    const titleArray = [];
    /* eslint-disable */
    // display only first 5 items in queue
    queue.slice(0, 5).forEach(obj => {
      titleArray.push(obj.title);
    });
    /* eslint-enable */
    var queueEmbed = new MessageEmbed()
      .setColor(utils.getrandomColor())
      .setTitle(`Music Queue - ${queue.length} items`);
    for (let i = 0; i < titleArray.length; i++) {
      queueEmbed.addField(`${i + 1}:`, `${titleArray[i]}`);
    }
    return message.say(queueEmbed);
  }
};
