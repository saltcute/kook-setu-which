import { Card, MenuCommand } from 'kbotify';
import { whichSearch } from './which.search.app';

class WhichMenu extends MenuCommand {
    code = 'which';
    trigger = 'which';
    help = '';

    intro = '复读菜单';
    menu = new Card()
        .setTheme('info')
        .setSize('lg')
        .addText("```plain\n.reminder search <image link>\n```\n使用图片链接进行反向搜索")
        .addText("Which 会自动抓取频道中的图片并尝试在 Pixiv 上找到其来源（若有），此功能暂时无法关闭（咕咕咕）")
        .toString();
    useCardMenu = true; // 使用卡片菜单
}

export const whichMenu = new WhichMenu(whichSearch);
