const { Command } = require('discord.js-commando');
const utils = require('../../resources/utils.js');
const channelinput = require('../../resources/mongodb/anchanneldata.js').anChannelDataSource;
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const moment = require('moment');
const discord = require('discord.js');

 

module.exports = class SetAnnounceCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'unsetan',
      aliases: ['unsetannouncechannel'],
      memberName: 'unsetan',
      group: 'admin',
      description: '**UnSet** Current or Mentioned Channel to be NIN Bot Annoucement Channel',
    //   args: [
    //     {
    //       key: 'url',
    //       prompt: 'Enter __**Url**__ for Data Entry',
    //       type: 'string'
    //     },
    //     {
    //         key: 'singer',
    //         prompt: 'Enter __**singer**__ for Data Entry',
    //         type: 'string'
    //     },
    //     {
    //         key: 'title',
    //         prompt: 'Enter **__title__** for Data Entry',
    //         type: 'string'
    //     },
    //     {
    //         key: 'anime',
    //         prompt: 'Enter **__anime__** for Data Entry',
    //         type: 'string'
    //     }
    //   ]
    });
  }

  

  async run(message) {

    const channelc = message.mentions.channels.first() || message.channel;
    const ChannelID = channelc.id;
    
    await channelinput.remove(ChannelID, message);
    
    
    // await channelinput.insert(getuid, singer, title, anime, message);
    //message.reply(`***Title :*** __${title}__ \n Data Entry Completed!`)
    
  }
};
