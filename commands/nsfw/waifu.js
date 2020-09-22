const superagent = require("snekfetch");
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class WaifuCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'waifu',
      aliases: ['waifupic'],
      group: 'nsfw',
      memberName: 'waifu',
      description: 'Replies with nsfw waifu picture',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }
run(message) {
//command
if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
superagent.get('https://nekos.life/api/v2/img/waifu')
    .end((err, response) => {
  const lewdembed = new Discord.MessageEmbed()
  .setTitle("waifu")
  .setImage(response.body.url)
  .setColor(`#000000`)
  .setFooter(`Tags: waifu`)
  .setURL(response.body.url);
message.channel.send(lewdembed);
})
}
};
