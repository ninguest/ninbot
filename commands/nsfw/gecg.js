const superagent = require("snekfetch");
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class GECGCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'gecg',
      aliases: ['gecgpic'],
      group: 'nsfw',
      memberName: 'gecg',
      description: 'Replies with nsfw gecg picture',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }
run(message) {
//command
if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
superagent.get('https://nekos.life/api/v2/img/gecg')
    .end((err, response) => {
  const lewdembed = new Discord.MessageEmbed()
  .setTitle("GECG")
  .setImage(response.body.url)
  .setColor(`#000000`)
  .setFooter(`Tags: gecg`)
  .setURL(response.body.url);
message.channel.send(lewdembed);
})
}
};
