const superagent = require("snekfetch");
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class BJCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'bj',
      aliases: ['bjpic'],
      group: 'nsfw',
      memberName: 'bj',
      description: 'Replies with nsfw bj picture',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }
run(message) {
//command
if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
superagent.get('https://nekos.life/api/v2/img/bj')
    .end((err, response) => {
  const lewdembed = new Discord.MessageEmbed()
  .setTitle("Bj")
  .setImage(response.body.url)
  .setColor(`#000000`)
  .setFooter(`Tags: bj`)
  .setURL(response.body.url);
message.channel.send(lewdembed);
})
}
};
