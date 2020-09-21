const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const utils = require('../../resources/utils.js');

module.exports = class QueueCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'queue',
      aliases: ['song-list', 'next-songs', 'q', 'list'],
      group: 'music',
      memberName: 'queue',
      guildOnly: true,
      description: 'Check songs which will be played next'
    });
  }

  run(message) {

    if (message.guild.triviaData.isTriviaRunning == true){
       message.say("⚠️ You can't check queue while playing music quiz! That is Cheating");
      return;
    }

    
     if (message.guild.musicData.queue.length == 0 && !message.guild.musicData.nowPlaying)
       return message.say('⚠️ There are no songs in queue!');

      const queue = message.guild.musicData.queue;

      const generatedEmbed = start => {
      const end = queue.length < 10 ? queue.length : start+10;
      const current = queue.slice(start, end);

      
      const embed = new MessageEmbed()
        .setTitle(`💠 Music Queue`)
        .setColor("RANDOM")
        .setFooter("Music-On!", this.client.user.displayAvatarURL())
        //.setFooter(`Use ${guild.commandPrefix}showlist <name> or <index> to check songs in list`);
      const result = current.map((song, index)=>{
        const name = song.title;
        return `**${start+index+1}.**   ${name}`;
      });
    embed.setDescription(result);
    return embed;
    }
      
    let currentPage = 1;

    message.channel.send(generatedEmbed(0)).then(msg => {
        if(queue.length <= 10) return;

          msg.react('⬅').then(r => {
              msg.react('➡');

              const prevFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
              const nextFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;

              const prevCollector = msg.createReactionCollector(prevFilter, {time: 300000});
              const nextCollector = msg.createReactionCollector(nextFilter, {time: 300000});

              prevCollector.on('collect', (r, u) => {
                  if(currentPage === 1) return r.users.remove(r.users.cache.filter(u => u === message.author).first());
                  currentPage--;
                  msg.edit(generatedEmbed((currentPage-1)*10));
                  r.users.remove(r.users.cache.filter(u => u === message.author).first());
              });
              nextCollector.on('collect', (r, u) => {
                  if(currentPage === Math.ceil((queue.length/10))) return r.users.remove(r.users.cache.filter(u => u === message.author).first());
                  currentPage++;
                  msg.edit(generatedEmbed((currentPage-1)*10));
                  r.users.remove(r.users.cache.filter(u => u === message.author).first());
              });
          });
      });
  }
};
