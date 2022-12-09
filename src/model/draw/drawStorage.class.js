import { Draw } from "./draw.class";

export class DrawStorageManager {

    static #identificator = 'Draw';

    static getItems(){
        var items = JSON.parse(localStorage.getItem(this.#identificator));
        
        if (!(items instanceof Array)) items = [];

        //items.forEach((element, index) => {items[index] = JSON.parse(element)});
        
        return items;
    }

    static init(){
        if (this.getItems().length === 0){
            localStorage.setItem(this.#identificator, JSON.stringify({}));
        }
    }

    static getItem(uuid){
        var items = this.getItems();
        var drawFound = null;

        items.forEach(element => {
            if (element.id === uuid){
                drawFound = element;
                return;
            }
        });

        if (drawFound === null) return false;

        return Draw.fromStorage(drawFound);
    }

    static setItem(drawToStore){
        var uuid = drawToStore.getId();
        var items = this.getItems();
        var found = false;

        items.forEach((element, index) => {
            
            if (element.id === uuid){
                items[index] = drawToStore.toStorage();
                found = true;
                return;
            }
        });

        if (!found){
            items.push(drawToStore.toStorage());
        }

        localStorage.setItem(this.#identificator, JSON.stringify(items));

    }

    static clear(){
        localStorage.setItem(this.#identificator, JSON.stringify({}));
    }
}