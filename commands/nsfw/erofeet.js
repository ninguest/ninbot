const superagent = require("snekfetch");
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class EroFeetCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'erofeet',
      aliases: ['erofeetpic'],
      group: 'nsfw',
      memberName: 'erofeet',
      description: 'Replies with nsfw erofeet picture',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }
run(message) {
//command
if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
superagent.get('https://nekos.life/api/v2/img/erofeet')
    .end((err, response) => {
  const lewdembed = new Discord.MessageEmbed()
  .setTitle("EroFeet")
  .setImage(response.body.url)
  .setColor(`#000000`)
  .setFooter(`Tags: erofeet`)
  .setURL(response.body.url);
message.channel.send(lewdembed);
})
}
};
