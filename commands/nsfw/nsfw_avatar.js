const superagent = require("snekfetch");
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class NekoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'nsfw_avatar',
      aliases: ['nsfwavatar'],
      group: 'nsfw',
      memberName: 'nsfw_avatar',
      description: 'Replies with nsfw avatar picture',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }
run(message) {
//command
if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
superagent.get('https://nekos.life/api/v2/img/nsfw_avatar')
    .end((err, response) => {
  const lewdembed = new Discord.MessageEmbed()
  .setTitle("NSFW Avatar")
  .setImage(response.body.url)
  .setColor(`#000000`)
  .setFooter(`Tags: nsfw_avatar`)
  .setURL(response.body.url);
message.channel.send(lewdembed);
})
}
};
