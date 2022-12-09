import { v4 as uuidv4 } from 'uuid';

export class MenuItem
{
    #id = null;
    #name = '';
    #url = '';

    constructor(id, name, url){
        this.#id = id || uuidv4();
        this.#name = name;
        this.#url = url;
    }

    getId(){
        return this.#id;
    }

    getName(){
        return this.#name;
    }

    setName(name){
        this.#name = name;
    }

    getUrl(){
        return this.#url;
    }

    setUrl(url){
        this.#url = url;
    }
}