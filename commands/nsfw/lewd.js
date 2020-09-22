const superagent = require("snekfetch");
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class LewdCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'lewd',
      aliases: ['lewdpic'],
      group: 'nsfw',
      memberName: 'lewd',
      description: 'Replies with nsfw lewd picture',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }
run(message) {
//command
if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
superagent.get('https://nekos.life/api/v2/img/lewd')
    .end((err, response) => {
  const lewdembed = new Discord.MessageEmbed()
  .setTitle("Lewd")
  .setImage(response.body.url)
  .setColor(`#000000`)
  .setFooter(`Tags: lewd`)
  .setURL(response.body.url);
message.channel.send(lewdembed);
})
}
};
