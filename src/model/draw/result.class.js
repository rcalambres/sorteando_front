import { v4 as uuidv4 } from 'uuid';

export class Result
{
    #winners = [];
    #error = false;

    constructor(winners){
        this.#winners = winners || [];
    }

    addWinner(prize, winner){
        this.#winners.push({prize: prize, winner: winner, key: uuidv4()})
    }

    addError(error){
        this.#error = {'error': error.message}
    }

    getError(){
        return this.#error;
    }

    setError(error){
        this.#error = error;
    }

    getWinners(){
        return this.#winners;
    }
}