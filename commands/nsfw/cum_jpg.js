const superagent = require("snekfetch");
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class CumJPGCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'cum_jpg',
      aliases: ['cumjpg'],
      group: 'nsfw',
      memberName: 'cum_jpg',
      description: 'Replies with nsfw cum_jpg picture',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }
run(message) {
//command
if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
superagent.get('https://nekos.life/api/v2/img/cum_jpg')
    .end((err, response) => {
  const lewdembed = new Discord.MessageEmbed()
  .setTitle("Cum_JPG")
  .setImage(response.body.url)
  .setColor(`#000000`)
  .setFooter(`Tags: cum_jpg`)
  .setURL(response.body.url);
message.channel.send(lewdembed);
})
}
};
