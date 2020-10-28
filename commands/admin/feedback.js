const { Command } = require('discord.js-commando');
const { MessageEmbed, Message, User, GuildMember } = require('discord.js');
const discord = require('discord.js');
const moment = require('moment');
const fetch = require('node-fetch');
const utils = require('../../resources/utils.js');
const dotenv = require('dotenv');
dotenv.config();
//const songinput = require('../../resources/mongodb/songdata.js').SongDataSource;
 

module.exports = class FeedBackCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'feedback',
      aliases: ['fb'],
      memberName: 'feedback',
      group: 'admin',
      description: 'Send Feedback or Request to The Creator/Owner of NIN Bot',
      args: [
        {
          key: 'title',
          prompt: '\nEnter __**Title of Subject**__ for your REPORT\n \n_ _',
          type: 'string'
        },
        {
            key: 'content',
            prompt: '\nEnter __**Content of Feedback**__ for your REPORT\n \n_ _',
            type: 'string'
        }
      ]
    });
  }

  

  async run(message, { title, content }) {
  

    const IC = process.env.OID;
    const usertrigger = message.author;
    const FeedBackEmbed = new MessageEmbed()
      .setColor('RANDOM')
      //.setTitle(`${title}`)
      .setAuthor(`${usertrigger.tag}`, usertrigger.displayAvatarURL()) 
      //.setDescription(content)
      .addField("__Title of Subject__", "*"+title+"*")
      .addField("__Content__", "*"+content+"*")
      .setFooter(utils.GetTimeZoneDate());
    
    try{
      this.client.users.cache.get(IC).send(FeedBackEmbed);
      console.log(`${usertrigger.username} Successfully Sent a REPORT/REQUEST to Person-In-Charge`);
      message.author.send("<@"+usertrigger.id+">"+"  You've Submitted a FeedBack to NIN Bot Creator on "+utils.GetTimeZoneDate()+ "!   :thumbsup: ")
    
    } catch(e){
      message.channel.send("ERROR Detected! Please Try Again. We sincerely apologize for the inconvenience caused.")
      console.log(e);
    }
  }
  
};
