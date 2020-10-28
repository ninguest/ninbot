const superagent = require("snekfetch");
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const prompt = require('discordjs-prompter');
const utils = require('../../resources/utils.js');
const dotenv = require('dotenv');
dotenv.config();;

module.exports = class FutanariCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'lolis',
      aliases: ['lolislife'],
      group: 'nsfw',
      memberName: 'lolis',
      description: 'Send AMAZING PICS which get from \`lolis.life\`',
      throttling: {
        usages: 2,
        duration: 10
      },
      args: [{
        key: 'getsort',
        prompt:
          `What posts do you want to see? (Provided by: \`lolis.life\`)\n\nType in \`help\` or Use <\`${process.env.PREFIX}nekos help\`> to check out what you can find with this command.\n\n_ _`,
        type: 'string',
        // default: 'top',
        validate: function(sort) {
          return (
            sort === 'help' ||
            sort === 'random' ||                              
            sort === 'neko' ||
            sort === 'kawaii' ||
            sort === 'pat' ||
            sort === 'lewd'||
            sort === 'slave' ||
            sort === 'monster' ||
            sort === 'futa' 
          );
        },
        wait: 20
      }]
    });
  }
async run(message, { getsort }) {
//command
// if (!message.channel.nsfw) return message.channel.send('You can use this command in an NSFW Channel!')
const helpembed = new Discord.MessageEmbed()
    .setTitle("Lolis.Life available 'poison'")
    .setURL("https://api.lolis.life/")
    .setColor(`#eb5534`)
    .setDescription("**random\nneko\nkawaii\npat\nlewd\nslave\nmonster\nfuta**")
if(getsort == 'help') return message.channel.send(helpembed);

let howmany = (await prompt.message(message.channel, {
    question: "How many post(s) you want?",
    userId: message.author.id,
    max: 1,
    timeout: 60000
  })).first();

if(!howmany) return message.reply("Time's Up !!");

howmany = howmany.content;

if(!utils.ISTHISNUM(howmany)) return message.reply("Please enter valid number !!")

for(let i = 0; i<howmany; i++){

    superagent.get(`https://api.lolis.life/${getsort}`)
        .end((err, response) => {
    const lewdembed = new Discord.MessageEmbed()
    .setTitle("Nekos.Life \`<#"+getsort+">\`")
    .setImage(response.body.url)
    .setColor(`RANDOM`)
    .setFooter(`Tags: ${getsort}`)
    .setURL(response.body.url);
    message.channel.send(lewdembed);
    })
    }
}
};
