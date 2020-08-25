const superagent = require("snekfetch");
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class NekoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'pussy',
      aliases: ['pussypic'],
      group: 'nsfw',
      memberName: 'pussy',
      description: 'Replies with nsfw pussy picture',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }
run(message) {
//command
if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
superagent.get('https://nekos.life/api/v2/img/pussy')
    .end((err, response) => {
  const lewdembed = new Discord.MessageEmbed()
  .setTitle("Pussy")
  .setImage(response.body.url)
  .setColor(`#000000`)
  .setFooter(`Tags: pussy`)
  .setURL(response.body.url);
message.channel.send(lewdembed);
})
}
};
