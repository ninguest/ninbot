const MongoDB = require('./data.js');
const guildDataSource = require("./guilddata").GuildDataSource;

MongoDB.default.start();

async function main() {
    await guildDataSource.insert('1210', 'Legend no Joke', 'today', '~');
    guildDataSource.count().then((cnt) => {
        console.log(cnt);
    });
}

main();