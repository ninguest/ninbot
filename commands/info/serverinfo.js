const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { Command } = require('discord.js-commando');
const moment = require('moment');
const discord = require('discord.js')

const verificationLevels = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: '(╯°□°）╯︵ ┻━┻',
	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻',
};

const regions = {
	brazil: 'Brazil',
	europe: 'Europe',
	hongkong: 'Hong Kong',
	india: 'India',
	japan: 'Japan',
	russia: 'Russia',
	singapore: 'Singapore',
	southafrica: 'South Africa',
	sydney: 'Sydney',
	'us-central': 'US Central',
	'us-east': 'US East',
	'us-west': 'US West',
	'us-south': 'US South',
};

module.exports = class ServerInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'serverinfo',
      aliases: ['guild', 'server'],
	  group: 'info',
	  guildOnly: true,
      memberName: 'serverinfo',
      description:
        'Get Server Info',
      throttling: {
        usages: 2,
        duration: 10
      }
      
      
    });
  }

  // If you want to restrict nsfw posts, remove the commented out code below

  async run(message) {

    const guild = message.guild;
		const members = guild.members.cache;
		const channels = guild.channels.cache;
		const emojis = guild.emojis.cache;

		const embed = new MessageEmbed()
			.setColor('#EE82EE')
			.setThumbnail(guild.iconURL({ dynamic: true }))
			.setTitle('Guild Information')
			.addFields(
				{ name: 'Guild Name', value: `\`\`\`${guild.name}\`\`\``, inline:true },
				{ name: 'Guild ID', value: `\`\`\`${guild.id}\`\`\``, inline:true },
				{ name: 'Guild Owner', value: `\`\`\`${guild.owner.user.tag}\`\`\`` },
				{ name: 'Verification Level', value: `\`\`\`${verificationLevels[guild.verificationLevel]}\`\`\``, inline:true },
				{ name: 'Region', value: `\`\`\`${regions[guild.region]}\`\`\``, inline:true },
				{ name: `Member Count [${guild.memberCount}]`, value: `\`\`\`${members.filter(member => !member.user.bot).size} Users | ${members.filter(member => member.user.bot).size} Bots\`\`\`` },
				{ name: `Channels [${channels.filter(ch => ch.type === 'text').size + channels.filter(channel => channel.type === 'voice').size}]`, value: `\`\`\`${channels.filter(channel => channel.type === 'text').size} Text ${channels.filter(channel => channel.type === 'voice').size} Voice\`\`\`` },
				{ name: 'Guild Boost Tier', value: `\`\`\`Tier ${guild.premiumTier}\`\`\``, inline:true },
				{ name: 'Guild Boost Count', value: `\`\`\`${guild.premiumSubscriptionCount}\`\`\``, inline:true },
				{ name: `Emoji Count [${emojis.size}]`, value: `\`\`\`${emojis.filter(emoji => !emoji.animated).size} Regular ${emojis.filter(emoji => emoji.animated).size} Animated\`\`\`` },
				{ name: 'Created', value: `\`\`\`${moment(guild.createdTimestamp).format('MMMM Do YYYY, h:mm:ss')} | ${Math.floor((Date.now() - guild.createdTimestamp) / 86400000)} day(s) ago\`\`\`` },
			)
			.setFooter(`Requested by ${message.author.tag} `)
			.setTimestamp();
		message.channel.send(embed);
    
};
}
