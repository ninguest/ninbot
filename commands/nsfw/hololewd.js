const superagent = require("snekfetch");
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class NekoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'hololewd',
      aliases: ['hololewdpic'],
      group: 'nsfw',
      memberName: 'hololewd',
      description: 'Replies with nsfw hololewd picture',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }
run(message) {
//command
if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
superagent.get('https://nekos.life/api/v2/img/hololewd')
    .end((err, response) => {
  const lewdembed = new Discord.MessageEmbed()
  .setTitle("HoloLewd")
  .setImage(response.body.url)
  .setColor(`#000000`)
  .setFooter(`Tags: hololewd`)
  .setURL(response.body.url);
message.channel.send(lewdembed);
})
}
};
