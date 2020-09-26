const { MessageEmbed, MessageFlags } = require('discord.js');
const utils = require('../../resources/utils.js');
const prompt = require('discordjs-prompter');
const fetch = require('node-fetch');
const { newsAPI } = require('../../config.json');
const { Command, util } = require('discord.js-commando');
const dotenv = require('dotenv');
const { get } = require('mongoose');
dotenv.config();

module.exports = class EmojiCommand extends Command {
    constructor(client) {
      super(client, {
        name: 'semoji',
        aliases: ['semo', 'sendemoji'],
        group: 'other',
        memberName: 'semoji',
        description:
          'Send Emoji owned by Bot',
        throttling: {
          usages: 2,
          duration: 10
        }
      });
    }
  
    // If you want to restrict nsfw posts, remove the commented out code below
  
    async run(message) {

        message.delete();
        // to get emoji info : emojicache.get("<id>").<information you need>
        // Ask bot to send emoji <:emoji_name:emoji_id>, for animated <a:emoji_name:emoji_id>
        
        //If yes return list and prompt index selection
       
            
            //Get emoji cache from discord
            let emojicache = this.client.emojis.cache;
            
            //Get emoji id from array [i]
            let emojiidarray = Array.from(emojicache.keys());

            let queue = emojiidarray;

            const generatedEmbed = start => {
                const end = queue.length < 10 ? queue.length : start+10;
                const current = queue.slice(start, end);
            
                const embed = new MessageEmbed()
                  .setTitle("Emoji Owned by \`"+ this.client.user.tag + "\`")
                  .setColor("#4287f5")
                  .setFooter(`Total Emoji Exist: ${queue.length}`)
                  
            
                const result = current.map((id, index)=>{
                  const name = emojicache.get(id).name;
                  
                  let emojishown = `<:${name}:${id}>`
                  
                  if(emojicache.get(id).animated){
                      emojishown = `<a:${name}:${id}>`
                  }

                    return `**${start+index+1}.**   ${emojishown}  -  ${name}`;
                });
                embed.setDescription(result);
                  return embed;
              }
            
              let currentPage = 1;
            
              message.channel.send(generatedEmbed(0)).then(msg => {
                if(queue.length <= 10) return;
            
                msg.react('⬅').then(r => {
                  msg.react('➡');
            
                  const prevFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
                  const nextFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;
            
                  const prevCollector = msg.createReactionCollector(prevFilter, {time: 300000});
                  const nextCollector = msg.createReactionCollector(nextFilter, {time: 300000});
            
                  
                  prevCollector.on('collect', (r, u) => {
                      if(currentPage === 1) return r.users.remove(r.users.cache.filter(u => u === message.author).first());
                      currentPage--;
                      msg.edit(generatedEmbed((currentPage-1)*10));
                      r.users.remove(r.users.cache.filter(u => u === message.author).first());
                  });
                  
                  
                  nextCollector.on('collect', (r, u) => {
                      if(currentPage === Math.ceil((queue.length/10))) return r.users.remove(r.users.cache.filter(u => u === message.author).first());
                      currentPage++;
                      msg.edit(generatedEmbed((currentPage-1)*10));
                      r.users.remove(r.users.cache.filter(u => u === message.author).first());
                  });
                });
              });


            //Show list done next prompt user to get details by index
            let indexbyuser = (await prompt.message(message.channel, {
                question: "Enter \`index number\` to send emoji",
                userId: message.author.id,
                max: 1,
                timeout: 120000
            })).first()

            if(!indexbyuser){ 
              message.reply("Time's Up !!");
              
            }

            indexbyuser = indexbyuser.content;

            if(!utils.ISTHISNUM(indexbyuser)){

              message.reply("Please enter a valid index number.");
              
            }

            if(indexbyuser == 0 || indexbyuser > queue.length){ 
              utils.WarningOnUnvalidIndexInput(queue.length, message);
              
            }

            let selectedemoji = emojicache.get(queue[indexbyuser - 1]);
            
            let emojisend = `<:${selectedemoji.name}:${selectedemoji.id}>`;
            if(selectedemoji.animated){
              emojisend = `<a:${selectedemoji.name}:${selectedemoji.id}>`;
            }

            message.channel.bulkDelete(2);
            message.channel.send(emojisend);
            

        }
     
    
  };