const superagent = require("snekfetch");
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class NekoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'holoero',
      aliases: ['holoeropic'],
      group: 'nsfw',
      memberName: 'holoero',
      description: 'Replies with nsfw holoero picture',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }
run(message) {
//command
if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
superagent.get('https://nekos.life/api/v2/img/holoero')
    .end((err, response) => {
  const lewdembed = new Discord.MessageEmbed()
  .setTitle("HoloEro")
  .setImage(response.body.url)
  .setColor(`#000000`)
  .setFooter(`Tags: holoero`)
  .setURL(response.body.url);
message.channel.send(lewdembed);
})
}
};
