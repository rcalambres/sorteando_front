import { v4 as uuidv4 } from 'uuid';
import { DrawType } from './drawType.class';
import { Participant } from './participant.class';
import { Prize } from './prize.class';
import { Result } from './result.class';

export class Draw {

    #id = null;
    #participants = [];
    #type = DrawType.SIMPLE_DRAW_TYPE;
    #prizes = [];
    #result = null
    #date = null;

    constructor(id, participants, prizes, type, result, date){
        this.#id = id || uuidv4();
        this.#type = type || DrawType.SIMPLE_DRAW_TYPE;
        this.#participants = participants || [];
        this.#prizes = prizes || [];
        this.#result = result || new Result();
        this.#date = date || new Date();
    }

    getId(){
        return this.#id;
    }

    setParticipants(participants){
        this.#participants = participants;
    }

    getParticipants(){
        return this.#participants;
    }

    addParticipant(participant){
        this.#participants.push(participant);
    }

    delParticipant(participant){

        const uuidSearched = participant.getId();
        const findParticipantIndex = (participant) => participant.getId() === uuidSearched;

        let foundPosition = this.#participants.findIndex(findParticipantIndex);
        if (foundPosition !== -1){
            this.#participants.splice(foundPosition, 1);
            return true;
        }

        throw new Error("Participante no encontrado")
    }

    setPrizes(prizes){
        this.#prizes = prizes;
    }

    getPrizes(){
        return this.#prizes;
    }

    addPrize(prize){
        this.#prizes.push(prize);
    }

    delPrize(prize){
        const uuidSearched = prize.getId();

        const findPrizeIndex = (prize) => prize.getId() === uuidSearched;

        let foundPosition = this.#prizes.findIndex(findPrizeIndex);
        if (foundPosition !== -1){
            this.#prizes.splice(foundPosition, 1);
            return true;
        }

        throw new Error("Premio no encontrado")
    }

    getResult(){
        return this.#result;
    }

    getType(){
        return this.#type;
    }

    getDate(){
        return this.#date;
    }

    swapType(){
        if (this.#type === DrawType.SIMPLE_DRAW_TYPE){
            this.#type = DrawType.MULTIPLE_DRAW_TYPE;
            return;
        }

        this.#type = DrawType.SIMPLE_DRAW_TYPE;
    }

    validate(){
        if (this.#participants.length === 0){
            throw new Error('No hay participantes para iniciar el sorteo')
        }

        if (this.#prizes.length === 0){
            throw new Error('No hay premios para sortear')
        }

        if (this.#type === DrawType.SIMPLE_DRAW_TYPE && this.#prizes.length > this.#participants.length){
            throw new Error('El número de premios es mayor que el de participantes')
        }

        return true;
    }

    raffleSimpleType(){

        const clonedParticipants = [...this.#participants];

        this.#prizes.forEach(prize => {
            let randomPosition = Math.floor(Math.random() * clonedParticipants.length);
            this.#result.addWinner(prize, clonedParticipants[randomPosition]);
            clonedParticipants.splice(randomPosition, 1); // delete prized participant
        })
    }

    raffleMultipleType(){
        this.#prizes.forEach(prize => {
            let randomPosition = Math.floor(Math.random() * this.#participants.length);
            this.#result.addWinner(prize, this.#participants[randomPosition])
        })
    }

    raffle(){
        
        this.#result = new Result(); // restart result
        
        try{
            this.validate();
        }catch(error){
            this.#result.addError(error);
            return this.getResult();
        }

        if (this.#type === DrawType.SIMPLE_DRAW_TYPE){
            this.raffleSimpleType();
        }else{
            this.raffleMultipleType();
        }

        return this.getResult();
    }

    toStorage(){
        return (
            {
                id: this.#id,
                type: this.#type,
                date: this.#date,
                participants: this.#participants,
                prizes: this.#prizes,
                result: {winners: this.#result.getWinners()}
            }
        )
    }

    static fromStorage(storagedDraw){
        var idDraw = storagedDraw.id;
        var typeDraw = storagedDraw.type;
        var resultDraw = new Result();
        var date = new Date(storagedDraw.date);

        storagedDraw.result.winners.forEach((winner) => {
            var prize = new Prize(winner.prize.name, winner.prize.uuid);
            var participant = new Participant(winner.winner.name, winner.winner.uuid);
            resultDraw.addWinner(prize, participant);
        });
        var participantsDraw = [];
        storagedDraw.participants.forEach((participant) => {participantsDraw.push(new Participant(participant.name, participant.uuid))});
        var prizesDraw = []; 
        storagedDraw.prizes.forEach((prize) => {prizesDraw.push(new Prize(prize.name, prize.uuid))});
        
        return new Draw(idDraw, participantsDraw, prizesDraw, typeDraw, resultDraw, date);
        
    }
    
}