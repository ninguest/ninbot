const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

const { youtubeAPI } = require('../../config.json');
const Youtube = require('simple-youtube-api');
const youtube = new Youtube(youtubeAPI);
const ytdl = require('ytdl-core');

const utils = require('../../resources/utils.js');
const fetch = require('node-fetch');
const moment = require('moment');
const discord = require('discord.js');
const prompt = require('discordjs-prompter');
const { playSong } = require('./play');
const { util } = require('simple-youtube-api');
const { default: data } = require('../../resources/mongodb/data');

const databaseplaylist = require('../../resources/mongodb/playlistdata.js').PlaylistDataSource;



module.exports = class PlaylistCommand extends Command {
    constructor(client) {
      super(client, {
        name: 'playlist',
        aliases: ['pl'],
        group: 'music',
        memberName: 'playlist',
        description:
          'Amazing Playlist controlled by NIN Bot',
        throttling: {
          usages: 2,
          duration: 10
        },
        
      });
    }

    async run(message){

        const questionEmbed = new MessageEmbed()
          .setColor('#eb3489')
          //.setAuthor(this.client.user.tag, this.client.user.displayAvatarURL())
          .setThumbnail(this.client.user.displayAvatarURL())
          .setTitle(`Playlist Function Menu`)
          .addField("_ _", "_ _")
          .addField("1️⃣  __Get My Playlist__", "_ _")
          .addField("2️⃣  __Create Playlist__", "_ _")
          .addField("3️⃣  __Delete playlist__", "_ _")
          .addField("4️⃣  __Edit Playlist__", "_ _")
          .addField("_ _", "_ _")
          .addField("❌ cancel", "_ _")
          .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())

        const choice4Embed = new MessageEmbed()
          .setColor('#eb3489')
          //.setAuthor(this.client.user.tag, this.client.user.displayAvatarURL())
          .setThumbnail(this.client.user.displayAvatarURL())
          .setTitle(`What do you want to do with this playlist?`)
          .addField("_ _", "_ _")
          .addField("1️⃣  __Add Song(s)__", "_ _")
          .addField("2️⃣  __Delete Song(s)__", "_ _")
          .addField("_ _", "_ _")
          .addField("❌ cancel", "_ _")
          //.addField("_ _", "Note: *Error will occur when nothing is entered!*")
          .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())

        const common = new MessageEmbed()
          .setColor('#eb3489')
          .setDescription("Which Playlist you want to edit?")
          //.addField("_ _", "\`Error may occur if nothing is entered\`")
          .setFooter("Enter index to select")
            
        const common2 = new MessageEmbed()
          .setColor('#eb3489')
          .setDescription("How many song(s) you want to **ADD** to this Playlist?")
          //.addField("_ _", "\`Error may occur if nothing is entered\`")

        const common3 = new MessageEmbed()
          .setColor('#eb3489')
          .setDescription("Select an index to **DELETE** song")
          //.addField("_ _", "\`Error may occur if nothing is entered\`")

          
        let rp = (await prompt.message(message.channel, {
          question: questionEmbed,
          userId: message.author.id,
          max: 1,
          timeout: 60000
        })).first();

        if(!rp)            //time's up
        {
          message.reply("Time's Up !!");
        }

        rp = rp.content;

        if(rp =='1'|| rp =='one')            //Get Playlist
        {    
          let playlistavailable = await databaseplaylist.SearchThisUserForPlaylists(message.author.id);
          if(!playlistavailable || playlistavailable.length == 0) return message.reply("There is no playlist available. Please create one first");
          utils.PlaylistFlipPageList(playlistavailable, message, "Available Playlist", message.author.tag, message.author.displayAvatarURL());

          let selectedp = (await prompt.message(message.channel, {
            question: "Select One Playlist from above",
            userId: message.author.id,
            max: 1,
            timeout: 120000
          })).first();

         if(!selectedp) return message.reply("Time's Up !!");
         selectedp = selectedp.content;
         if(utils.ISTHISNUM(selectedp)){
           if(selectedp == 0 || selectedp > playlistavailable.length) return utils.WarningOnUnvalidIndexInput(playlistavailable.length, message);
           selectedp = playlistavailable[selectedp - 1].playlist;
         }

         let songsavailable = await databaseplaylist.SearchSpecificPlaylist(message.author.id, selectedp);
         if(!songsavailable || songsavailable.length == 0) return message.reply(`There is no \`${selectedp}\` playlist`);
         if(songsavailable.get("musics").length == 0) return message.reply(`Hey, There is no songs available in this playlist. Please add songs first.`);

         let currentplaylist = selectedp;
         let queueid = songsavailable.get("musics");
         let queue = songsavailable.get("musicsname");
         utils.SongsFlipPageList(queue, message, "Songs Available", queue.length);

         selectedp = (await prompt.message(message.channel, {
           question: "Select Song with index to play or type \`all\` to play all songs in this playlist.",
           userId: message.author.id,
           max: 1,
           timeout: 120000
         })).first()

         if(!selectedp) return message.reply("Time's Up !!");
         selectedp = selectedp.content;

         if (!utils.ISTHISNUM(selectedp) && selectedp == 'all'){
           for(let i = 0; i< queueid.length; i++){
             await this.client.registry.commands.get("play").run(message, {query: `https://youtu.be/${queueid[i]}`});
           }
           return;
         }

         if(utils.ISTHISNUM(selectedp)){
          if(selectedp == 0 || selectedp > queueid.length) return utils.WarningOnUnvalidIndexInput(queueid.length, message);
          selectedp = selectedp - 1;
          this.client.registry.commands.get("play").run(message, {query: `https://youtu.be/${queueid[selectedp]}`});
          return;
        }



        }

        else if(rp =="2"||rp =='two')     //Create Playlist
        {
          const question2embed = new MessageEmbed()
            .setDescription("Enter a **Name** for your new Playlist")
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())

          let r2p = (await prompt.message(message.channel, {
            question: question2embed,
            userId: message.author.id,
            max: 1,
            timeout: 120000
          })).first();

          if(!r2p) return message.reply("Time's Up !!");


          r2p = r2p.content;
          if (utils.ISTHISNUM(r2p)) return message.reply("Sorry, You can't use numnber to name a playlist");

          let checkr2p = await databaseplaylist.SearchSpecificPlaylist(message.author.id, r2p);
          console.log(checkr2p);
          if(!checkr2p || checkr2p.length==0){
              
            let newid = utils.MakeID(20);
            await databaseplaylist.insert(newid, message.author.id, r2p, message);
          }
          else{
            return message.reply(`There is a playlist named \`${r2p}\` available in database. Please try again with another name for creating new playlist`);
          }
        }

        else if(rp == '3'|| rp == 'three')      //Delete Playlist
        {
          let queue = await databaseplaylist.SearchThisUserForPlaylists(message.author.id);
          
          if(!queue||queue.length==0) return message.reply("Currently you haven't create any playlist yet. Please create a playlist first.");

          utils.PlaylistFlipPageList(queue, message, "Available Playlist", message.author.tag, message.author.displayAvatarURL());

          let response = (await prompt.message(message.channel, {
            question: "Which Playlist you want to delete? (enter playlist name)",
            userId: message.author.id,
            max: 1,
            timeout: 120000
          })).first();

          if (!response) return message.reply("Time's Up !!");

          response = response.content;

          if(utils.ISTHISNUM(response)){
            if(response == 0||response > queue.length) return utils.WarningOnUnvalidIndexInput(queue.length, message);
            response = queue[response - 1].playlist;
          }

          let valid = await databaseplaylist.SearchSpecificPlaylist(message.author.id, response);
          
          if(!valid || valid.length==0) return message.reply(`Hey, There is no playlist named \`${response}\``)

          await databaseplaylist.DeletePlaylist(message.author.id, response, message);
        }

        else if(rp == '4'|| rp =='four')      //Edit playlist
        {

          //Check whether is it empty queue
          let queue = await databaseplaylist.SearchThisUserForPlaylists(message.author.id);
          if(!queue || queue.length == 0) return message.reply("Currently you don't have any playlist yet. Please create a playlist first.");
          
          //If Queue available, return Embed flipPage 
          const title = "Available Playlist";
          const footer = message.author.tag;
          const footerpic = message.author.displayAvatarURL();
          utils.PlaylistFlipPageList(queue, message, title, footer, footerpic);

          //prompt user to enter playlist name 
          let choice4 = (await prompt.message(message.channel, {
            question: common,
            userId: message.author.id,
            max: 1,
            timeout: 120000
          })).first();
          
          if(!choice4 || choice4 == null) return message.reply("Time's Up");
          //check valid playlist name
          choice4 = choice4.content;

          if(utils.ISTHISNUM(choice4)){
            if(choice4 == 0 || choice4 > queue.length) return utils.WarningOnUnvalidIndexInput(queue.length, message)
            choice4 = (queue[choice4 - 1].playlist);
          }

          let valid = await databaseplaylist.SearchSpecificPlaylist(message.author.id, choice4);
          
          if(!valid || valid.length == 0) return message.reply(`Hey, There is no playlist named \`${choice4}\``);
          
          let validsongs = valid.get("musicsname");
          let currentplaylist = choice4;
          let total = validsongs.length;
          utils.SongsFlipPageList(validsongs, message, currentplaylist, total);

          let bchoice4 = (await prompt.message(message.channel, {
          question: choice4Embed,
          userId: message.author.id,
          max: 1,
          timeout: 60000
          })).first();

           if(!bchoice4 || bchoice4 == null) return message.reply("Time's Up !!");

          bchoice4 = bchoice4.content;
          if (bchoice4 == '1' || bchoice4 =='one') {
              let bbchoice4 = (await prompt.message(message.channel,{
                question: common2,
                userId: message.author.id,
                max: 1,
                timeout: 60000
              })).first();
              
              if(!bbchoice4 || bbchoice4 == null) return message.reply("Time's Up !!");

              bbchoice4 = bbchoice4.content;
              if(utils.ISTHISNUM(bbchoice4) == false) return message.reply("Please give a valid number.");

              let urls = (await prompt.message(message.channel, {
                question: `You may start entering ${bbchoice4} music url now.`,
                userId: message.author.id,
                max: bbchoice4,
                timeout:(45000 * bbchoice4) 
              }))

              if(!urls) return message.reply("Time's Up !!");
              
              for(let value of urls.values()){
                
                //If there are suckers who type in playlist url, get videos url one by one
                if(
                  value.content.match(
                  /^(?!.*\?.*\bv=)https:\/\/www\.youtube\.com\/.*\?.*\blist=.*$/
                ))
                {
                  //value.content is playlist (one of the input)
                  let query = value.content;

                  //use API to check the playlist
                  const playlist = await youtube.getPlaylist(query).catch(function() {
                    message.say('Playlist is either private or it does not exist!');
                    return;
                  });

                  //While getting broken url
                  const videosArr = await playlist.getVideos().catch(function() {
                    message.say(
                      'There was a problem getting one of the videos in the playlist!'
                    );
                    return;
                  });

                  //Fetching each videos in Playlist to MongoDB database
                  for (let i = 0; i < videosArr.length; i++) {

                    //if video url invalid
                    if (videosArr[i].raw.status.privacyStatus == 'private') {
                      
                      //ignore error
                      continue;
                    } else {
                      try {
                        const video = await videosArr[i].fetch();
                        await databaseplaylist.AddSongintoArray(message.author.id, currentplaylist, video.id, video.title, message);
                      } catch (err) {
                        return console.error(err);
                      }
                    }
                  } // end of data entry loop 


                }
                else
                {
                  let videoid = utils.YTUIDGet(value.content);
                  
                  if(!videoid) {
                    message.reply(`Invalid URL inserted !!\n\n\`${value.content}\``);
                    continue;
                  }

                  //let info = (await ytdl.getInfo(value.content)).videoDetails.title
                  let getvideowithAPI = await youtube.getVideo(value.content);

                  if(!getvideowithAPI) return message.reply("I failed to get video info from \`"+ value.content+"\`");
                  getvideowithAPI = getvideowithAPI.title
                  
                  //Can choose info retrieve method (API or YTDL)
                  await databaseplaylist.AddSongintoArray(message.author.id, currentplaylist, videoid[7], getvideowithAPI, message);
                }
             }    
             
          }


          else if (bchoice4 == '2' || bchoice4 == 'two'){
            
            if(total == 0) return message.reply("There is no song for you delete.")

            let deleteindex = (await prompt.message(message.channel,{
              question: common3,
              userId: message.author.id,
              max: 1,
              timeout: 120000
            })).first()

            if(!deleteindex){
              message.reply("Time's Up !!");
            }

            deleteindex = deleteindex.content;
            if(utils.ISTHISNUM(deleteindex) == false) return message.reply("Please give a valid index number !");
            
            if(deleteindex == 0 || deleteindex > total) return utils.WarningOnUnvalidIndexInput(total, message);

            deleteindex = deleteindex - 1;

            let validsonguid = valid.get("musics");

            await databaseplaylist.DeleteSongfromArray(message.author.id, currentplaylist, validsonguid[deleteindex], validsongs[deleteindex], message)



          }
          
          else{
            message.reply("Playlist Request Canceled ❌")
          }

          
      }

        
        else                    //cancel 
        {

          return message.channel.send("Playlist Request Canceled ❌");
        
        }
        
    }    
}




// client.registry.commands.get("play").run(message, url);