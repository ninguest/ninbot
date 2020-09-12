const { CommandoClient } = require('discord.js-commando');
const { Structures } = require('discord.js');
const { MessageEmbed, Message, User, GuildMember } = require('discord.js');
const songdata = require('./resources/mongodb/songdata.js').SongDataSource;
const path = require('path');
//const { prefix, token, discord_owner_id } = require('./config.json');
const utils = require('./resources/utils.js');
const MongoDB = require('./resources/mongodb/data.js');
const fs = require('fs');
const ytvalid = require('youtube-validate');
const songinput = require('./resources/mongodb/songdata.js').SongDataSource;
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
        volume: 0.4, 
        loop: 1,
        voiceConnection: null
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
    ['music', '🎶 Play Music Anytime, Anywhere'],
    ['nsfw', '🔞 Alert! NSFW Ahead!'],
    ['game', '🎮 Small Games'],
    ['guild', '🔥 Guild Commands'],
    ['gifs', '✨ GIF Area'],
    ['info', 'ℹ️ Information Centre'],
    ['admin', '☘ Bot Admin'],
    ['other', '💬 Random Commands']
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    help: true,
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

//more hidden bot commands
client.on('message', message => {

  //Admin Restart (process.exit())
  if (message.content == "ninrestart"){
    
    const useridcheck = 432425500208791554;
    
    function restartbot() {
        process.exit();
      }
    
    if (message.author.id == useridcheck){
        message.say(`⚠️Bot Client will be restart\n\`\`\`${utils.GetTimeZoneDate()}: Restart Request Success\`\`\``);
        console.log(`${utils.GetTimeZoneDate()} : Bot Restart from a Restart Request`);

        setTimeout(restartbot, 500);
       return;
     }
    else{
        message.reply("You have no PERMISSION to restart NIN Bot");
        console.log(`${utils.GetTimeZoneDate()} : ${message.author.username} is trying toRestart NIN Bot`);

    }
  }

  //Check NIN Bot's version
  if(message.content == 'ninbot' || message.content == '宁'){
    message.channel.send(`**Hi,** __${message.author}__ **. NIN Bot is currently Online and ready to serve.**\n\`\`\` \nNINBOT Version: Beta\nLast Update: September 2020\n \`\`\` `);
  }
});


client.login(process.env.TOKEN);
//client.login(token);