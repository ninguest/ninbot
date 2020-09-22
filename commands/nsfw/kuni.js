const superagent = require("snekfetch");
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class KuniCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'kuni',
      aliases: ['kunipic'],
      group: 'nsfw',
      memberName: 'kuni',
      description: 'Replies with nsfw kuni picture',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }
run(message) {
//command
if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
superagent.get('https://nekos.life/api/v2/img/kuni')
    .end((err, response) => {
  const lewdembed = new Discord.MessageEmbed()
  .setTitle("Kuni")
  .setImage(response.body.url)
  .setColor(`#000000`)
  .setFooter(`Tags: kuni`)
  .setURL(response.body.url);
message.channel.send(lewdembed);
})
}
};
