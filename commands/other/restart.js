const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { default: data } = require('../../resources/mongodb/data');

module.exports = class SayCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'restart',
      memberName: 'restart',
      group: 'other',
      description: 'Restart NIN Bot (Only Admin)',
    //   args: [
    //     {
    //       key: 'text',
    //       prompt: 'What do you want the bot to say?',
    //       type: 'string'
    //     }
    //   ]
    });
  }

  

  run(message) {
  
    const useridcheck = 432425500208791554;
    
    function restartbot() {
        process.exit();
      }
    
    if (message.author.id == useridcheck){
        message.say("⚠️Bot Client will be restart very soon");
        console.log(`${Date.now()} : Bot Restart from a Restart Request`);
        setTimeout(restartbot, 500);
       return;
     }
    else{
        message.say("You have no PERMISSION to restart NIN Bot");
        console.log(`${message.author.username} is trying to Restart NIN Bot`);

    }
 
  }
};