const superagent = require("snekfetch");
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class NekoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'spank',
      aliases: ['spankpic'],
      group: 'nsfw',
      memberName: 'spank',
      description: 'Replies with nsfw spank picture',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }
run(message) {
//command
if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
superagent.get('https://nekos.life/api/v2/img/spank')
    .end((err, response) => {
  const lewdembed = new Discord.MessageEmbed()
  .setTitle("spank")
  .setImage(response.body.url)
  .setColor(`#000000`)
  .setFooter(`Tags: spank`)
  .setURL(response.body.url);
message.channel.send(lewdembed);
})
}
};
