//Waiting to be apply
const songdata = require('./resources/mongodb/songdata.js').SongDataSource;
const fs = require('fs');
const ytvalid = require('youtube-validate');


//Discord Builds (Bot Structures)
const { CommandoClient } = require('discord.js-commando');
const { Structures } = require('discord.js');

const databasePlaylist = require('./resources/mongodb/playlistdata.js').PlaylistDataSource;


//Discord Ultilities (Bot Settings)
const { MessageEmbed, Message, User, GuildMember } = require('discord.js');
const path = require('path');
const utils = require('./resources/utils.js');
const MongoDB = require('./resources/mongodb/data.js');
const prompt = require('discordjs-prompter');
const ytdl = require('ytdl-core');
const channelget = require('./resources/mongodb/anchanneldata.js').anChannelDataSource;
const dotenv = require('dotenv');
const { sub } = require('ffmpeg-static');
dotenv.config();


/*
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
||                                                                                 ||
||                       Structures for Discord-Commando                           ||
||                                                                                 ||
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
*/


// A Structure with extra Declaration for Music Dispatcher (MusicGuild Set-Up)
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


// Discord-Commando Special Bot Setting
const client = new CommandoClient({
  commandPrefix: process.env.PREFIX,
  owner: process.env.OID, // value comes from env
  invite: 'https://discord.gg/DyrdbJW',
  unknownCommandResponse: false,
  disableEveryone: true
});


// Bot Commands Registry
client.registry
  .registerDefaultTypes()
  .registerGroups([
      ['music', '🎶 Play Music Anytime, Anywhere'],
      ['game', '🎮 Small Games'],
      ['gifs', '✨ GIF Area'],
      ['guild', '🔥 Guild Commands'],
      ['info', 'ℹ️ Information Centre'],
      ['other', '💬 Random Commands'],
      ['admin', '☘ Bot Admin'],
      ['nsfw', '🔞 Alert! NSFW Ahead!'],
    ])
  .registerDefaultGroups()
  .registerDefaultCommands({
      help: true,
      eval: false,
      prefix: false,
      commandState: false
    })
  .registerCommandsIn(path.join(__dirname, 'commands'));


/*
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
||                                                                                 ||
||                        Bot Client ON Events & Commands                          ||
||                                                                                 ||
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
*/


// Things Going to Happen when Bot is Ready Up
client.once('ready', () => {
  console.log('Hello There! I am Ready to serve!');
  MongoDB.default.start();
  client.user.setActivity(`${process.env.PREFIX} as Bot Prefix`, {
    type: 'STREAMING',
    url: 'https://www.twitch.tv/meowychan'
  });
});



// When Bot is Joining a Voice Channel
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



//Things Going to Happen when Someone is Joining A Server
client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'general'); // change this to the channel name you want to send the greeting to
  if (!channel) return;
  channel.send(`Welcome ${member}!`);
});



//The Bot is Checking the Message Content (Hidden Commands which not Show in the help page)
client.on('message', async message => {

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

  //AnnounceMent to subscribed channels
  if(message.content=="ninan"){

    const questionEmbed = new MessageEmbed()
      .setColor('#5e03fc')
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setTitle(`Announcement Request`)
      .addField("_ _", "_ _")
      .addField("1️⃣ Embed Message", "*make announcement with Embed Message*")
      .addField("2️⃣ Direct Message", "*make announcement with Direct Message*")
      .addField("_ _", "_ _")
      .addField("❌ cancel", "_ _")
      
    let subject = null;
    let description = null;
    let rp = await prompt.choice(message.channel, {
        question: questionEmbed,
        choices:['1️⃣','2️⃣','❌'],
        userId: message.author.id,
        timeout: 60000
    })
    if(rp =='1️⃣'){

      subject = (await prompt.message(message.channel,{
        question: 'Enter Announcement Subject',
        userId: message.author.id,
        max: 1,
        timeout: 60000,
      })).first();

      if(!subject) return message.reply("Hmm, I didn't receive anything for \`Subject\`");
      subject = subject.content;
    
      description = (await prompt.message(message.channel, {
        question: 'Enter Announcement Description',
        userId: message.author.id,
        max: 1,
        timeout: 12000,
      })).first();

      if(!description) return message.reply("Hmm, I didn't receive anything for \`Description\`");
      description = description.content;

      const AnnounceEmbed = new MessageEmbed()
      .setColor('#5e03fc')
      .setTitle(subject)
      .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
      .setDescription(`${description}`)
      .setFooter(`${utils.GetTimeZoneDate()}`, client.user.displayAvatarURL());

      const channelArray = await channelget.readAll()
    
      for(let i=0; i<channelArray.length; i++){
        client.channels.cache.get(`${channelArray[i].uid}`).send(AnnounceEmbed);
     }
    }
    else if(rp =='2️⃣'){
      subject = (await prompt.message(message.channel,{
        question: 'Enter Announcement Subject',
        userId: message.author.id,
        max: 1,
        timeout: 60000,
      })).first().content;
    
      description = (await prompt.message(message.channel, {
        question: 'Enter Announcement Description',
        userId: message.author.id,
        max: 1,
        timeout: 12000,
      })).first().content;

     
      const channelArray = await channelget.readAll()
      
      for(let i=0; i<channelArray.length; i++){
        client.channels.cache.get(`${channelArray[i].uid}`).send(`**__${subject}__**\n\n${description}`);
     }
    }

    else if(!rp){
      message.reply("Time's Up !!");
    }
   
    else{
      return message.reply("Announcement Request Canceled ❌")
    }
  }
});

/*
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
||                                                                                 ||
||                                 Bot Login Token                                 ||
||                                                                                 ||
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
*/


//The Bot is Logging with the Linked Token
client.login(process.env.TOKEN);
