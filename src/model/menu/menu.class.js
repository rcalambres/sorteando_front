import { v4 as uuidv4 } from 'uuid';
import { MenuItem } from './menuItem.class';

export class Menu{

    #id = null;
    #items = [];

    constructor(id, menuItems){
        this.#id = id || uuidv4();
        this.#items = menuItems || [];
    }

    getItems(){
        return this.#items;
    }

    addItem(item){
        if (!item.instanceOf(MenuItem)){
            throw new Error ("El elemento no es del tipo MenuItem");
        }

        this.#items.push(item);
    }
}