const superagent = require("snekfetch");
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class CuddleCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'cuddle',
      aliases: ['cuddlepic'],
      group: 'nsfw',
      memberName: 'cuddle',
      description: 'Replies with nsfw cuddle picture',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }
run(message) {
//command
if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
superagent.get('https://nekos.life/api/v2/img/cuddle')
    .end((err, response) => {
  const lewdembed = new Discord.MessageEmbed()
  .setTitle("Cuddle")
  .setImage(response.body.url)
  .setColor(`#000000`)
  .setFooter(`Tags: cuddle`)
  .setURL(response.body.url);
message.channel.send(lewdembed);
})
}
};
