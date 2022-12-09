import { v4 as uuidv4 } from 'uuid';

export class Prize {
    uuid = null;
    name = '';

    constructor(name, uuid)
    {
        this.uuid = uuid || uuidv4();
        this.name = name;
    }

    getName(){
        return this.name;
    }

    getId(){
        return this.uuid;
    }
}