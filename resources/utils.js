const message = require("discord.js");
const { MessageEmbed } = require('discord.js');

exports.getrandomColor = () =>{
    
    /*var length = 6;
    var chars = '0123456789ABCDEF';
    var hex = '0x';
    while(length--) hex += chars[(Math.random() * 16) | 0];
    console.log('hex:' + hex);
    console.log('math random' + Math.random());
    return hex;*/


    //return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);

    
    var colour = "#"+((1<<24)*Math.random()|0).toString(16);
    //console.log("Random Colour produced: "+ colour);
    return colour;
}

exports.YTUIDGet = (url) =>{

    const re = /^(https?:\/\/)?(([a-z]+\.)?(youtube(-nocookie)?|youtube.googleapis)\.com.*(v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-z-]+)/i;
        return url.match(re);
}

exports.GetTimeZoneDate = () =>{
    const date = new Date();
    const dateTZ = date.toLocaleString("zh-SG", {
            timeZone: "Asia/Singapore"
    });

    return dateTZ;
}

exports.MakeID = (length) =>{
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

exports.PlaylistFlipPageList = (queue, message, title, footer, footerpic) =>{
    
        const generatedEmbed = start => {
          const end = queue.length < 10 ? queue.length : start+10;
          const current = queue.slice(start, end);
  
          const embed = new MessageEmbed()
            .setTitle(title)
            .setColor("RANDOM")
            .setFooter(footer, footerpic)
      
          const result = current.map((playlist, index)=>{
            const name = playlist.playlist;
              return `**${start+index+1}.**   ${name}`;
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
  
      
}

exports.SongsFlipPageList = (queue, message, title, numbersongs) =>{
    
  const generatedEmbed = start => {
    const end = queue.length < 10 ? queue.length : start+10;
    const current = queue.slice(start, end);

    const embed = new MessageEmbed()
      .setTitle(title)
      .setColor("RANDOM")
      .setFooter(`Total Songs Exist: ${numbersongs}`)
      

    const result = current.map((song, index)=>{
      const name = song;
        return `**${start+index+1}.**   ${name}`;
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

}

exports.ISTHISNUM = (num) =>{
  return !isNaN(num);
}

