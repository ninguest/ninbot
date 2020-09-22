const superagent = require("snekfetch");
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class PatCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'pat',
      aliases: ['patpic'],
      group: 'nsfw',
      memberName: 'pat',
      description: 'Replies with nsfw pat picture',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }
run(message) {
//command
if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
superagent.get('https://nekos.life/api/v2/img/pat')
    .end((err, response) => {
  const lewdembed = new Discord.MessageEmbed()
  .setTitle("Pat")
  .setImage(response.body.url)
  .setColor(`#000000`)
  .setFooter(`Tags: pat`)
  .setURL(response.body.url);
message.channel.send(lewdembed);
})
}
};
