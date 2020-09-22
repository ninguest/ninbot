const superagent = require("snekfetch");
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class HugCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'hug',
      aliases: ['hugpic'],
      group: 'nsfw',
      memberName: 'hug',
      description: 'Replies with nsfw hug picture',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }
run(message) {
//command
if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
superagent.get('https://nekos.life/api/v2/img/hug')
    .end((err, response) => {
  const lewdembed = new Discord.MessageEmbed()
  .setTitle("Hug")
  .setImage(response.body.url)
  .setColor(`#000000`)
  .setFooter(`Tags: hug`)
  .setURL(response.body.url);
message.channel.send(lewdembed);
})
}
};
