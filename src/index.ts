import { bot } from 'init/client';
import { whichMenu } from './commands/which/which.menu';
import axios from 'axios';
import auth from 'configs/auth';

bot.logger.addStream({
    name: "kook-setu-which",
    level: 30,
    stream: process.stdout
})

bot.on("imageMessage", (event) => {
    axios({
        url: "https://saucenao.com/search.php",
        method: "GET",
        params: {
            api_key: auth.sauceNAOKey,
            url: event.content,
            "dbs[]": 5,
            output_type: 2,
            numres: 16
        },
        headers: {
            'Accept-Encoding': "deflate"
        }
    }).then((res) => {
        const data = res.data;
        if (data.results) {
            if (data.results[0].header.similarity > 80) {
                bot.logger.info(`${event.content} | Found ${data.results[0].data.pixiv_id}, similarity ${data.results[0].header.similarity}`);
                bot.API.message.create(9, event.channelId, `.pixiv detail ${data.results[0].data.pixiv_id}`, event.msgId, "429949279");
            } else {
                bot.logger.info(event.content + "| Not enough similarity");
            }
        }
    }).catch((err) => {
        bot.logger.error(err.response.data);
    })
})

bot.addCommands(whichMenu);

bot.connect();

bot.logger.debug('system init success');
