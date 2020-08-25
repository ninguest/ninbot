const superagent = require("snekfetch");
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class NekoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'feet',
      aliases: ['feetpic'],
      group: 'nsfw',
      memberName: 'feet',
      description: 'Replies with nsfw feet picture',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }
run(message) {
//command
if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
superagent.get('https://nekos.life/api/v2/img/feet')
    .end((err, response) => {
  const lewdembed = new Discord.MessageEmbed()
  .setTitle("Feet")
  .setImage(response.body.url)
  .setColor(`#000000`)
  .setFooter(`Tags: feet`)
  .setURL(response.body.url);
message.channel.send(lewdembed);
})
}
};
