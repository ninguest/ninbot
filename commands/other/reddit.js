const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const decodehtml = require('decode-html');
const { Command } = require('discord.js-commando');

module.exports = class RedditCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'reddit',
      aliases: ['subreddit', 'reddit-search'],
      group: 'other',
      memberName: 'reddit',
      description:
        'Replies with Reddit post',
      throttling: {
        usages: 2,
        duration: 10
      },
      args: [
        {
          key: 'subreddit',
          prompt: 'What **__subreddit__** would you like to search?\n',
          type: 'string',
          // default: 'all',
          max: 50,
          wait: 30
        },
        {
          key: 'sort',
          prompt:
            'What posts do you want to see? Select from **best** / **hot** / **top** / **new** / **controversial** / **rising**\n',
          type: 'string',
          // default: 'top',
          validate: function(sort) {
            return (
              sort === 'best' ||
              sort === 'hot' ||
              sort === 'new' ||
              sort === 'top' ||
              sort === 'controversial' ||
              sort === 'rising'
            );
          },
          wait: 10
        },
        {
          key: 'limit',
          prompt: 'How many result post you need (Limit)?\n',
          type: 'integer',
          wait: 10
        },
      ]
    });
  }

  // If you want to restrict nsfw posts, remove the commented out code below

  async run(message, { subreddit, sort, limit }) {

   fetch(`https://www.reddit.com/r/${subreddit}/${sort}/.json?limit=${limit}`) 
    .then(res => res.json())
    .then(json => {

          const offset = json.data.dist - limit;

          const dataArr = json.data.children;
          for (let i = offset; i < dataArr.length; i++) {
            // if (dataArr[i].data.over_18 === true) {
            //   message.say(':no_entry: nsfw :no_entry:');
            // } else {
            message.say(embedPost(dataArr[i].data));
            //}
          }
        })
        .catch(err => {
          message.say('The subreddit you asked for was not found');
          return console.error(err);
        });

      function embedPost(data) {

        const url = (data.preview) ? decodehtml(data.preview.images[0].source.url) : null;

        if (data.title.length > 255) {
          data.title = data.title.substring(0, 252) + '...'; // discord.js does not allow embed title lengths greater than 256
        }
        
        return new MessageEmbed()
          .setColor("RANDOM") // if post is nsfw, color is red
          .setTitle(data.title)
          .setURL(`https://www.reddit.com${data.permalink}`)
          .setImage(url)
          .setFooter(`Upvotes: ${data.score} :thumbsup: `)
          .setAuthor(data.author);
      }
   
  }
};
