const superagent = require("snekfetch");
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class SmallBoobsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'smallboobs',
      aliases: ['smallboobspic'],
      group: 'nsfw',
      memberName: 'smallboobs',
      description: 'Replies with nsfw smallboobs picture',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }
run(message) {
//command
if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
superagent.get('https://nekos.life/api/v2/img/smallboobs')
    .end((err, response) => {
  const lewdembed = new Discord.MessageEmbed()
  .setTitle("smallboobs")
  .setImage(response.body.url)
  .setColor(`#000000`)
  .setFooter(`Tags: smallboobs`)
  .setURL(response.body.url);
message.channel.send(lewdembed);
})
}
};
