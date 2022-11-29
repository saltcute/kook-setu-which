import { AppCommand, AppFunc, BaseSession } from 'kbotify';
import axios from 'axios';
import auth from 'configs/auth';
import { bot } from 'init/client';

class WhichSearch extends AppCommand {
    code = 'search'; // 只是用作标记
    trigger = 'search'; // 用于触发的文字
    help = '`.echo kmd 内容`'; // 帮助文字
    intro = '复读你所说的文字, 并用kmarkdown格式返回。';
    func: AppFunc<BaseSession> = async (session) => {
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
                if (data.results[0].header.similarity > 85) {
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