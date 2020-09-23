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
      name: 'nekos',
      aliases: ['nekoslife'],
      group: 'nsfw',
      memberName: 'nekos',
      description: 'Send AMAZING PICS which get from \`nekos.life\`',
      throttling: {
        usages: 2,
        duration: 10
      },
      args: [{
        key: 'getsort',
        prompt:
          `What posts do you want to see? (Provided by: \`nekos.life\`)\n\nType in \`help\` or Use <\`${process.env.PREFIX}nekos help\`> to check out what you can find with this command.\n\n_ _`,
        type: 'string',
        // default: 'top',
        validate: function(sort) {
          return (
            sort === 'help' ||
            sort === 'anal' ||                              
            sort === 'avatar' ||
            sort === 'bj' ||
            sort === 'blowjob' ||
            sort === 'boobs'||
            sort === 'cat' ||
            sort === 'classic' ||
            sort === 'cuddle' ||
            sort === 'cum' ||
            sort === 'cum_jpg' ||
            sort === 'ero' ||
            sort === 'erofeet' ||
            sort === 'erok' ||
            sort === 'erokemo' ||
            sort === 'eron' ||
            sort === 'eroyuri' ||
            sort === 'feed' ||
            sort === 'feet' ||
            sort === 'feetg' ||
            sort === 'femdom' ||
            sort === 'fox_girl' ||
            sort === 'futanari' ||
            sort === 'gasm' ||
            sort === 'gecg' ||
            sort === 'hentai' ||
            sort === 'holo' ||
            sort === 'holoero' ||
            sort === 'hololewd' ||
            sort === 'hug' ||
            sort === 'kemonomimi' ||
            sort === 'keta' ||
            sort === 'kiss' ||
            sort === 'kuni' ||
            sort === 'les' ||
            sort === 'lewd' ||
            sort === 'lewdk' ||
            sort === 'lewdkemo' ||
            sort === 'lizard' ||
            sort === 'meow' ||
            sort === 'neko' ||
            sort === 'ngif' ||
            sort === 'nsfw_avatar' ||
            sort === 'nsfw_neko_gif' ||
            sort === 'owoify' ||
            sort === 'pat' ||
            sort === 'poke' ||
            sort === 'pussy' ||
            sort === 'pussy_jpg' ||
            sort === 'pwankg' ||
            sort === 'Random_hentai_gif' ||
            sort === 'slap' ||
            sort === 'smallboobs' ||
            sort === 'solo' ||
            sort === 'solog' ||
            sort === 'spank' ||
            sort === 'tickle' ||                                          
            sort === 'tits' ||
            sort === 'trap' ||
            sort === 'waifu' ||
            sort === 'wallpaper' ||
            sort === 'yuri' 
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
    .setTitle("Nekos.Life available 'poison'")
    .setURL("https://www.rubydoc.info/github/Nekos-Life/nekos.rb/master/NekosLife/Client")
    .setColor(`#eb5534`)
    .setDescription("**anal\n avatar\n bj\n blowjob\n boobs\n cat\n classic\n cuddle\n cum\n cum_jpg\n ero\n erofeet\n erok\n erokemo\n eron\n eroyuri\n feed\n feet\n feetg\n femdom\n fox_girl\n futanari\n gasm\n gecg\n hentai\n holo\n holoero\n hololewd\n hug\n kemonomimi\n keta\n kiss\nkuni\n les\n lewd\n lewdk\n lewdkemo\n lizard\n meow\n neko\n ngif\n nsfw_avatar\n nsfw_neko_gif\n pat\n poke\n pussy\n pussy_jpg\n pwankg\n Random_hentai_gif\n slap\n smallboobs\n solo\n solog\n spank\n tickle\n tits\n trap\n waifu\n wallpaper\n yuri\n**")
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

    superagent.get(`https://nekos.life/api/v2/img/${getsort}`)
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
