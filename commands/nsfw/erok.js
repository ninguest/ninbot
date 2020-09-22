const superagent = require("snekfetch");
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class ErokCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'erok',
      aliases: ['erokpic'],
      group: 'nsfw',
      memberName: 'erok',
      description: 'Replies with nsfw erok picture',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }
run(message) {
//command
if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
superagent.get('https://nekos.life/api/v2/img/erok')
    .end((err, response) => {
  const lewdembed = new Discord.MessageEmbed()
  .setTitle("Erok")
  .setImage(response.body.url)
  .setColor(`#000000`)
  .setFooter(`Tags: erok`)
  .setURL(response.body.url);
message.channel.send(lewdembed);
})
}
};
