const superagent = require("snekfetch");
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class FeetGCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'feetg',
      aliases: ['feetgpic'],
      group: 'nsfw',
      memberName: 'feetg',
      description: 'Replies with nsfw feetg picture',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }
run(message) {
//command
if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
superagent.get('https://nekos.life/api/v2/img/feetg')
    .end((err, response) => {
  const lewdembed = new Discord.MessageEmbed()
  .setTitle("FeetG")
  .setImage(response.body.url)
  .setColor(`#000000`)
  .setFooter(`Tags: feetg`)
  .setURL(response.body.url);
message.channel.send(lewdembed);
})
}
};
