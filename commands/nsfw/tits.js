const superagent = require("snekfetch");
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class TitsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'tits',
      aliases: ['titspic'],
      group: 'nsfw',
      memberName: 'tits',
      description: 'Replies with nsfw tits picture',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }
run(message) {
//command
if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
superagent.get('https://nekos.life/api/v2/img/tits')
    .end((err, response) => {
  const lewdembed = new Discord.MessageEmbed()
  .setTitle("tits")
  .setImage(response.body.url)
  .setColor(`#000000`)
  .setFooter(`Tags: tits`)
  .setURL(response.body.url);
message.channel.send(lewdembed);
})
}
};
