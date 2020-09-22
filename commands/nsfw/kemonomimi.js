const superagent = require("snekfetch");
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class KemonoMimiCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'kemonomimi',
      aliases: ['kemonomimipic'],
      group: 'nsfw',
      memberName: 'kemonomimi',
      description: 'Replies with nsfw kemonomimi picture',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }
run(message) {
//command
if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
superagent.get('https://nekos.life/api/v2/img/kemonomimi')
    .end((err, response) => {
  const lewdembed = new Discord.MessageEmbed()
  .setTitle("Kemonomimi")
  .setImage(response.body.url)
  .setColor(`#000000`)
  .setFooter(`Tags: kemonomimi`)
  .setURL(response.body.url);
message.channel.send(lewdembed);
})
}
};
