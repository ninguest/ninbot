const superagent = require("snekfetch");
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class NekoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'randam_hentai_gif',
      aliases: ['randomhentaigif'],
      group: 'nsfw',
      memberName: 'random_hentai_gif',
      description: 'Replies with nsfw random_hentai_gif picture',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }
run(message) {
//command
if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
superagent.get('https://nekos.life/api/v2/img/Random_hentai_gif')
    .end((err, response) => {
  const lewdembed = new Discord.MessageEmbed()
  .setTitle("random Hentai")
  .setImage(response.body.url)
  .setColor(`#000000`)
  .setFooter(`Tags: random Hentai`)
  .setURL(response.body.url);
message.channel.send(lewdembed);
})
}
};
