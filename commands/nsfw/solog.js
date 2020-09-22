const superagent = require("snekfetch");
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class SoloGCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'solog',
      aliases: ['sologpic'],
      group: 'nsfw',
      memberName: 'solog',
      description: 'Replies with nsfw solog picture',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }
run(message) {
//command
if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
superagent.get('https://nekos.life/api/v2/img/solog')
    .end((err, response) => {
  const lewdembed = new Discord.MessageEmbed()
  .setTitle("solog")
  .setImage(response.body.url)
  .setColor(`#000000`)
  .setFooter(`Tags: solog`)
  .setURL(response.body.url);
message.channel.send(lewdembed);
})
}
};
