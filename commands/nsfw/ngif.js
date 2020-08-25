const superagent = require("snekfetch");
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class NekoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ngif',
      aliases: ['ngifpic'],
      group: 'nsfw',
      memberName: 'ngif',
      description: 'Replies with nsfw ngif picture',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }
run(message) {
//command
if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
superagent.get('https://nekos.life/api/v2/img/ngif')
    .end((err, response) => {
  const lewdembed = new Discord.MessageEmbed()
  .setTitle("NGIF")
  .setImage(response.body.url)
  .setColor(`#000000`)
  .setFooter(`Tags: ngif`)
  .setURL(response.body.url);
message.channel.send(lewdembed);
})
}
};
