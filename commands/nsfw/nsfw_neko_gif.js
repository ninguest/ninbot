const superagent = require("snekfetch");
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class NekoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'nsfw_neko_gif',
      aliases: ['nsfwnekogif'],
      group: 'nsfw',
      memberName: 'nsfw_neko_gif',
      description: 'Replies with nsfw neko gif picture',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }
run(message) {
//command
if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
superagent.get('https://nekos.life/api/v2/img/nsfw_neko_gif')
    .end((err, response) => {
  const lewdembed = new Discord.MessageEmbed()
  .setTitle("NSFW Neko GIF")
  .setImage(response.body.url)
  .setColor(`#000000`)
  .setFooter(`Tags: nsfw_neko_gif`)
  .setURL(response.body.url);
message.channel.send(lewdembed);
})
}
};
