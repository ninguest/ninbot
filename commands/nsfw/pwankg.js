const superagent = require("snekfetch");
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class NekoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'pwankg',
      aliases: ['pwankgpic'],
      group: 'nsfw',
      memberName: 'pwankg',
      description: 'Replies with nsfw pwankg picture',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }
run(message) {
//command
if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
superagent.get('https://nekos.life/api/v2/img/pwankg')
    .end((err, response) => {
  const lewdembed = new Discord.MessageEmbed()
  .setTitle("PWANKG")
  .setImage(response.body.url)
  .setColor(`#000000`)
  .setFooter(`Tags: pwankg`)
  .setURL(response.body.url);
message.channel.send(lewdembed);
})
}
};