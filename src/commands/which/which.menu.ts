import { Card, BaseMenu } from 'kasumi.js';
import { whichSearch } from './which.search.app';

class WhichMenu extends BaseMenu {
    name = 'which';
    prefix = './';
}

export const whichMenu = new WhichMenu(whichSearch);
