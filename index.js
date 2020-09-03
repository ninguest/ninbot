const { CommandoClient } = require('discord.js-commando');
const { Structures } = require('discord.js');
const { MessageEmbed, Message, User, GuildMember } = require('discord.js');
const songdata = require('./resources/mongodb/songdata.js').SongDataSource;
const path = require('path');
//const { prefix, token, discord_owner_id } = require('./config.json');
const utils = require('./resources/utils.js');
const MongoDB = require('./resources/mongodb/data.js');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();


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
  commandPrefix: process.env.PREFIX,
  owner: process.env.OID, // value comes from env
  invite: 'https://discord.gg/DyrdbJW',
  unknownCommandResponse: false,
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['music', '🎶 Music'],
    ['gifs', '✨ Gif'],
    ['game', '🎮 Game'],
    ['nsfw', '🔞 NSFW'],
    ['guild', '🔥 Guild'],
    ['other', '💬 Random'],
    ['admin', '☘ Bot Admin']
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
  MongoDB.default.start();
  client.user.setActivity(`${process.env.PREFIX} as Bot Prefix`, {
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
  if (message.content.match("cup")|| message.content.startsWith("checkprofile")){
    
    const user = message.mentions.users.first() || message.author;
    const UserID = user.id;
    const UserNickname = message.guild.member(UserID).nickname;
      
    const UserEmbed = new MessageEmbed()
      .setColor(utils.getrandomColor())
      .setTitle(UserNickname)
      .setURL(`https://discordapp.com/channels/@me/${UserID}/`)
      .setAuthor("User Profile", user.displayAvatarURL())
      //.setDescription(`🏷️UserTag: ${user.tag}`)
      .setThumbnail('https://images-ext-2.discordapp.net/external/-6HBsi17MzRx9oAPtQkvRBUFoBLubMvS2F6uC8cEyjU/https/cdn.discordapp.com/avatars/747360029698424872/e2e04a707539bb9d974dc96ee9308e69.webp')
      .addField(' Username', user.username, true)
      .addField(' UserTag', user.tag, true)
      .addField(' Bot Identifier', user.bot, true)
      .addField(' Current Presence', user.presence.status, true)
      .addField(' UserID', UserID)
      .addField('⏲️ User Created Date', user.createdAt)
      .setImage(user.displayAvatarURL())
      .setTimestamp();
      //.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
    
    message.channel.send(UserEmbed);
  }

});




client.login(process.env.TOKEN);
//client.login(token);