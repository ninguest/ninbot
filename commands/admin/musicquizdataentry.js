const { Command } = require('discord.js-commando');
const utils = require('../../resources/utils.js');
const songinput = require('../../resources/mongodb/songdata.js').SongDataSource;
 

module.exports = class MusicEntryCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'musicquizdataentry',
      aliases: ['mentry'],
      memberName: 'musicquizdataentry',
      group: 'admin',
      description: 'Anime Music Quiz Data Entry',
      args: [
        {
          key: 'url',
          prompt: 'Enter __**Url**__ for Data Entry',
          type: 'string'
        },
        {
            key: 'singer',
            prompt: 'Enter __**singer**__ for Data Entry',
            type: 'string'
        },
        {
            key: 'title',
            prompt: 'Enter **__title__** for Data Entry',
            type: 'string'
        },
        {
            key: 'anime',
            prompt: 'Enter **__anime__** for Data Entry',
            type: 'string'
        }
      ]
    });
  }

  

  async run(message, { url, singer, title, anime }) {
  
    var getuid = utils.YTUIDGet(url);
    await songinput.insert(getuid, singer, title, anime, message);
    //message.reply(`***Title :*** __${title}__ \n Data Entry Completed!`)
    
  }
};
