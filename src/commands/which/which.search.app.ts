import { BaseCommand, CommandFunction, BaseSession } from 'kasumi.js';
import axios from 'axios';
import auth from 'configs/auth';
import { bot } from 'init/client';

class WhichSearch extends BaseCommand {
    name = 'search';
    func: CommandFunction<BaseSession, any> = async (session) => {
        axios({
            url: "https://saucenao.com/search.php",
            method: "GET",
            params: {
                api_key: auth.sauceNAOKey,
                url: session.args[0],
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
                    session.send(`.pixiv detail ${data.results[0].data.pixiv_id}`);
                } else {
                    session.reply("没有找到可信结果");
                }
            } else {
                session.reply("没有找到结果")
            }
        }).catch((err) => {
            bot.logger.error(err.response.data);
            session.reply("搜索图片出错");
        })
    };
}

export const whichSearch = new WhichSearch();
