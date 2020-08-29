const { CommandoClient } = require('discord.js-commando');
const { Structures } = require('discord.js');
const { MessageEmbed } = require ('discord.js');
const path = require('path');
const { prefix, token, discord_owner_id } = require('./config.json');
const utils = require('./resources/utils.js');

Structures.extend('Guild', function(Guild) {
  class MusicGuild extends Guild {
    constructor(client, data) {
      super(client, data);
      this.musicData = {
        queue: [],
        isPlaying: false,
        nowPlaying: null,
        songDispatcher: null,
        volume: 1
      };
      this.triviaData = {
        isTriviaRunning: false,
        wasTriviaEndCalled: false,
        triviaQueue: [],
        triviaScore: new Map()
      };
    }
  }
  return MusicGuild;
});

const client = new CommandoClient({
  commandPrefix: prefix,
  owner: discord_owner_id // value comes from config.json
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['music', '🎶Music Command Group'],
    ['gifs', '✨Gif Command Group'],
    ['other', '💬random types of commands group'],
    ['guild', '🔥Guild related commands'],
    ['nsfw', '🔞NSFW related commands'],
    
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    eval: false,
    prefix: false,
    commandState: false
  })
  .registerCommandsIn(path.join(__dirname, 'commands'));


client.once('ready', () => {
  console.log('Hello There! I am Ready to serve!');
  client.user.setActivity(`${prefix} as Bot Prefix`, {
    type: 'STREAMING',
    url: 'https://www.twitch.tv/meowychan'
  });
});

client.on('voiceStateUpdate', async (___, newState) => {
  if (
    newState.member.user.bot &&
    !newState.channelID &&
    newState.guild.musicData.songDispatcher &&
    newState.member.user.id == client.user.id
  ) {
    newState.guild.musicData.queue.length = 0;
    newState.guild.musicData.songDispatcher.end();
    return;
  }
  if (
    newState.member.user.bot &&
    newState.channelID &&
    newState.member.user.id == client.user.id &&
    !newState.selfDeaf
  ) {
    newState.setSelfDeaf(true);
  }
});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'general'); // change this to the channel name you want to send the greeting to
  if (!channel) return;
  channel.send(`Welcome ${member}!`);
});


function getRandomColor() {
  var length = 6;
  var chars = '0123456789ABCDEF';
  var hex = '0x';
  while(length--) hex += chars[(Math.random() * 16) | 0];
  return hex;
}

//more hidden bot commands
client.on('message', message => {

  //check user avatar
  if (message.content.startsWith("cav")|| message.content.startsWith("checkavatar")){
    const user = message.mentions.users.first() || message.author;
    const avatar2Embed = new MessageEmbed()
      .setColor(utils.getrandomColor()) 
      .setFooter(user.username + " 's Avatar")
      .setImage(user.displayAvatarURL());

    message.channel.send(avatar2Embed);
  }

});




client.login(process.env.TOKEN);
//client.login(token);