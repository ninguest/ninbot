const mongo = require("./data.js");

class GuildData {
    constructor(){};

    async insert(id, sn, ja, cp) {
        await new mongo.default.Guild({ uid: id,
            serverName: sn,
            joinedAt: ja,
            commandPrefix: cp
        }).save()
            .then((saved) => {
                console.log(saved);
            }).catch((error) => {
                //console.log(error);
                console.log(`Duplicate key ${id}`);
        });
    }

    async count() {
        return await mongo.default.Guild.estimatedDocumentCount();
    }
}

exports.GuildDataSource = new GuildData();

