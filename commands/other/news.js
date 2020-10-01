const { MessageEmbed, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');
const { newsAPI } = require('../../config.json');
const { Command } = require('discord.js-commando');
const prompt = require('discordjs-prompter');
const utils = require('../../resources/utils.js');

module.exports = class GlobalNewsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'news',
      aliases: ['global-news', 'reuters', 'gnews'],
      group: 'other',
      memberName: 'news',
      description: 'Check news from *NewsAPI.org*',
      throttling: {
        usages: 2,
        duration: 10
      }
    });
  }

  async run(message) {
    
    
    //Prompt Question when Command start
    const questionEmbed = new MessageEmbed()
          .setColor('#eb3489')
          //.setAuthor(this.client.user.tag, this.client.user.displayAvatarURL())
          //.setThumbnail(this.client.user.displayAvatarURL())
          .setTitle(`News Search Menu`)
          .addField("_ _", "_ _")
          .addField("1️⃣  __Search News by Keywords__", "_ _")
          .addField("2️⃣  __Search for the Top-Headlines__", "_ _")
          .addField("3️⃣  __Cancel__", "_ _")
          .addField("_ _", "_ _")
          .setFooter(`powered by NewsAPI.org`, message.author.displayAvatarURL())
  
    // Question Function
    let questionP = (await prompt.message(message.channel, {
      question: questionEmbed,
      userId: message.author.id,
      max: 1,
      timeout: 60000
    })).first();

    if(!questionP)            //time's up
    {
      message.reply("Time's Up !!");
    }

    questionP = questionP.content;

    let result;
    //Choice will be made
    if(questionP =='1'||questionP=='one') // when Search by keywords
    {
      let language = 'all';
      let query = '\`Waiting for User Input\`'

      let queryembed = new MessageEmbed()
        .setColor('#eb3489')
        .setTitle('**Search News by Keywords**')
        .setDescription(`_ _\nLanguage: \`${language}\`\nSearching For: \`${query}\``)

      message.channel.send(queryembed);

      let asklan = (await prompt.message(message.channel, {
        question: `Do you want to change the **__Language__** for the news? (\`yes\` or \`no\`)`,
        userId: message.author.id,
        max: 1,
        timeout: 30000
      })).first();

      if(!asklan)            //time's up
      {
        message.reply("Time's Up !!");
      }
      asklan = asklan.content;

      if(asklan == 'yes'){
        
        asklan = (await prompt.message(message.channel, {
          question: `What language you want to change to?\nPossible options: \`ar\` \`de\` \`en\` \`es\` \`fr\` \`he\` \`it\` \`nl\` \`no\` \`pt\` \`ru\` \`se\` \`ud\` \`zh\` \nLink to check all possible options: https://datahub.io/core/language-codes/r/0.html`,
          userId: message.author.id,
          max: 1,
          timeout: 60000
        })).first();

        if(!asklan) return message.reply("Time's Up !!");

        asklan = asklan.content;

        language = asklan;

        message.channel.bulkDelete(3);
        queryembed.setDescription(`_ _\nLanguage: \`${language}\`\nSearching For: ${query}`)
        message.channel.send(queryembed);
      }
      else message.channel.send("**language** remains *unchanged*")
    
      let asksearch = (await prompt.message(message.channel, {
        question: `What news you are searching for?`,
        userId: message.author.id,
        max: 1,
        timeout: 120000
      })).first(); 

      if(!asksearch) return message.reply("Time's Up !!");

      query = asksearch.content;

      message.channel.bulkDelete(4);
      queryembed.setDescription(`_ _\nLanguage: \`${language}\`\nSearching For: ***${query}***`)
      message.channel.send(queryembed);

      result = `https://newsapi.org/v2/everything?`;
      
      result = result + `q=${query}`;
      
      if(language != 'all'){
        result = result + `&language=${language}`;
      }
      
    }

    else if(questionP == '2'||questionP==`two`) //Search for the Top-Headlines
    {
      let category = 'not set';
      let country = 'not set';
      
      let queryembed = new MessageEmbed()
        .setColor('#eb3489')
        .setTitle('**Search for the Top-Headlines**')
        .setDescription(`_ _\nCategory: \`${category}\`\nCountry: \`${country}\``)

      message.channel.send(queryembed);

      let askcategory = (await prompt.message(message.channel, {
        question: "what is the category you want to get headlines for? \nPossible options: \`business\` \`entertainment\` \`general\` \`health\` \`science\` \`sports\` \`technology\`",
        userId: message.author.id,
        max: 1,
        timeout: 60000
      })).first();
  
      if(!askcategory) return message.reply("Time's Up !!");

      category = askcategory.content;

      let askcountry = (await prompt.message(message.channel, {
        question: "What is the 2-letter ISO 3166-1 code of the country you want to get headlines for? (type \`cancel\` to skip this parameter) \nPossible options: \`ae\` \`ar\` \`at\` \`au\` \`be\` \`bg\` \`br\` \`ca\` \`ch\` \`cn\` \`co\` \`cu\` \`cz\` \`de\` \`eg\` \`fr\` \`gb\` \`gr\` \`hk\` \`hu\` \`id\` \`ie\` \`il\` \`in\` \`it\` \`jp\` \`kr\` \`lt\` \`lv\` \`ma\` \`mx\` \`my\` \`ng\` \`nl\` \`no\` \`nz\` \`ph\` \`pl\` \`pt\` \`ro\` \`rs\` \`ru\` \`sa\` \`se\` \`sg\` \`si\` \`sk\` \`th\` \`tr\` \`tw\` \`ua\` \`us\` \`ve\` \`za\` ",
        userId: message.author.id,
        max: 1,
        timeout: 60000
      })).first();
      
      if (!askcountry) return message.reply("Time's Up !!");

      country = askcountry.content;

      message.channel.bulkDelete(3);
      queryembed.setDescription(`_ _\nCategory: \`${category}\`\nCountry: \`${country}\``);
      message.channel.send(queryembed);

      result = `https://newsapi.org/v2/top-headlines?category=${category}`;

      if(country!='cancel'){
        result = result + `&country=${country}`;
      }

    }

    else return message.channel.send("❌ canceled")
    // powered by NewsAPI.org
    try {
      
      let postnumber = (await prompt.message(message.channel, {
        question: "How many news post you want?",
        userId: message.author.id,
        max: 1,
        timeout: 60000
      })).first();

      if(!postnumber) return message.reply("Time's Up !!");
      postnumber = postnumber.content;
      if(!utils.ISTHISNUM(postnumber)) return message.reply("Please Enter valid number");

      const response = await fetch(result+`&pageSize=${postnumber}&apiKey=${newsAPI}`);  //example of result is `https://newsapi.org/v2/top-headlines?sources=reuters&pageSize=5&apiKey=${newsAPI}`

      const json = await response.json();
      const articleArr = json.articles;
      let processArticle = article => {
        const embed = new MessageEmbed()
          .setColor('RANDOM')
          .setTitle(article.title)
          .setURL(article.url)
          .setAuthor(article.author)
          .setDescription(article.description)
          .setTimestamp(article.publishedAt)
          .setFooter('powered by NewsAPI.org');

        if(utils.isURL(article.urlToImage)) embed.setThumbnail(article.urlToImage);
        return embed;
      };

      async function processArray(array) {
        for (const article of array) {
          const msg = await processArticle(article);
          message.say(msg);
        }
      }

      await processArray(articleArr);
    } catch (e) {
      message.say('Something failed along the way');
      return console.error(e);
    }
  }
};
