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
        name: 'emoji',
        aliases: ['emo', 'checkemoji', 'searchemoji'],
        group: 'other',
        memberName: 'emoji',
        description:
          'Check Emoji(s) owned by Bot and return emoji details',
        throttling: {
          usages: 2,
          duration: 10
        },
        args: [
          {
            key: 'showemojilist',
            prompt:
              'Do you want to have a list to show all emoji I owned ?\n\n',
            type: 'string',
            // default: 'top',
            validate: function(showemojilist) {
              return (
                showemojilist.toLowerCase() === 'yes' ||
                showemojilist.toLowerCase() === 'no' 
              );
            },
            wait: 30
          },
          
        ]
      });
    }
  
    // If you want to restrict nsfw posts, remove the commented out code below
  
    async run(message, { showemojilist }) {
        // to get emoji info : emojicache.get("<id>").<information you need>
        // Ask bot to send emoji <:emoji_name:emoji_id>, for animated <a:emoji_name:emoji_id>
        
        //If yes return list and prompt index selection
        if(showemojilist == 'yes'){
            
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
                question: "Enter \`index number\` to get emoji details",
                userId: message.author.id,
                max: 1,
                timeout: 120000
            })).first()

            if(!indexbyuser) return message.reply("Time's Up !!");

            indexbyuser = indexbyuser.content;

            if(!utils.ISTHISNUM(indexbyuser)) return message.reply("Please enter a valid index number.");

            if(indexbyuser == 0 || indexbyuser > queue.length) return utils.WarningOnUnvalidIndexInput(queue.length, message);

            let selectedemoji = emojicache.get(queue[indexbyuser - 1]);
            const selectedEmbed = new MessageEmbed()
                .setColor("#6942f5")
                .setThumbnail(selectedemoji.url)
                .setTitle(selectedemoji.name)
                .setURL(selectedemoji.url)
                .addField("ID : ", `\`\`\`${selectedemoji.id}\`\`\``, true)
                .addField("Animated : ", "\`\`\`"+selectedemoji.animated+"\`\`\`", true)
                .addField("Emoji Identifier : ", "\`\`\`"+selectedemoji.identifier+"\`\`\`")
                .addField("Emoji from : ", `\`\`\`${selectedemoji.guild.name}\`\`\``)
                .addField("Emoji CreatedAt : ", `\`\`\`${selectedemoji.createdAt}\`\`\``)
            
            message.channel.send(selectedEmbed);

        }
       
        if(showemojilist == 'no'){
            
            const emojiquestion = new MessageEmbed()
                .setTitle("Enter the \`name of the Emoji\` you want to check with.")

            let emojimention = (await prompt.message(message.channel, {
                question: emojiquestion,
                userId: message.author.id,
                max: 1,
                timeout: 60000
            })).first()

            if(!emojimention) return message.reply("Time's Up !!");

            emojimention = emojimention.content;

            let emojiArray = Array.from(this.client.emojis.cache.values());
            let selectedID = [];
            
            for(let i=0; i<emojiArray.length;i++){
                if(emojiArray[i].name == emojimention){
                    selectedID.push(emojiArray[i].id);
                }
            }

            if(selectedID.length == 0) return message.reply("Sorry, I can't find \`"+emojimention+"\`");

            for(let i=0; i<selectedID.length;i++){
                
                let selectedemoji = this.client.emojis.cache.get(selectedID[i]);

                const selectedEmbed = new MessageEmbed()
                .setColor("#6942f5")
                .setThumbnail(selectedemoji.url)
                .setURL(selectedemoji.url)
                .setTitle(selectedemoji.name)
                .addField("ID : ", `\`\`\`${selectedemoji.id}\`\`\``, true)
                .addField("Animated : ", "\`\`\`"+selectedemoji.animated+"\`\`\`", true)
                .addField("Emoji Identifier : ", "\`\`\`"+selectedemoji.identifier+"\`\`\`")
                .addField("Emoji from : ", `\`\`\`${selectedemoji.guild.name}\`\`\``)
                .addField("Emoji CreatedAt : ", `\`\`\`${selectedemoji.createdAt}\`\`\``)
            
                message.channel.send(selectedEmbed);
            }

        }
     
     
    }
  };