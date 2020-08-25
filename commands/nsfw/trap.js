const superagent = require("snekfetch");
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class NekoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'trap',
      aliases: ['trappic'],
      group: 'nsfw',
      memberName: 'trap',
      description: 'Replies with nsfw trap picture',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }
run(message) {
//command
if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
superagent.get('https://nekos.life/api/v2/img/trap')
    .end((err, response) => {
  const lewdembed = new Discord.MessageEmbed()
  .setTitle("trap")
  .setImage(response.body.url)
  .setColor(`#000000`)
  .setFooter(`Tags: trap`)
  .setURL(response.body.url);
message.channel.send(lewdembed);
})
}
};
