const superagent = require("snekfetch");
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class FutanariCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'futanari',
      aliases: ['futanaripic'],
      group: 'nsfw',
      memberName: 'futanari',
      description: 'Replies with nsfw futanari picture',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }
run(message) {
//command
if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
superagent.get('https://nekos.life/api/v2/img/futanari')
    .end((err, response) => {
  const lewdembed = new Discord.MessageEmbed()
  .setTitle("Futanari")
  .setImage(response.body.url)
  .setColor(`#000000`)
  .setFooter(`Tags: futanari`)
  .setURL(response.body.url);
message.channel.send(lewdembed);
})
}
};
