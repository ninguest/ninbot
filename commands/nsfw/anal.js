const superagent = require("snekfetch");
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class AnalCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'anal',
      aliases: ['analpic'],
      group: 'nsfw',
      memberName: 'anal',
      description: 'Replies with nsfw anal picture',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }
run(message) {
//command
if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
superagent.get('https://nekos.life/api/v2/img/anal')
    .end((err, response) => {
  const lewdembed = new Discord.MessageEmbed()
  .setTitle("Anal")
  .setImage(response.body.url)
  .setColor(`#000000`)
  .setFooter(`Tags: anal`)
  .setURL(response.body.url);
message.channel.send(lewdembed);
})
}
};
