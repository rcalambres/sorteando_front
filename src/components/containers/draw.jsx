import React, {useState, useRef} from 'react';
import { Participant } from '../../model/draw/participant.class';
import { Prize } from '../../model/draw/prize.class';
import { Draw } from '../../model/draw/draw.class';
import ParticipantListComponent from './participantList';
import PrizeListComponent from './prizetList';
import PropTypes from 'prop-types';
import ResultComponent from './result';
import TypeComponent from '../pure/type';
import { DrawStorageManager } from '../../model/draw/drawStorage.class';

const DrawComponent = (props) => {
    
    const [participantsCount, upParticipant] = useState(props.draw.getParticipants().length);
    const [prizesCount, upPrize] = useState(props.draw.getPrizes().length);
    const [participants, setParticipant] = useState(props.draw.getParticipants());
    const [prizes, setPrize] = useState(props.draw.getPrizes());
    const [result, setResult] = useState(props.draw.getResult());
    const [triesCount, upTries] = useState(0);
    const [type, setType] = useState(props.draw.getType());
    const newParticipantRef = useRef('');
    const newPrizeRef = useRef('');

    const addParticipant = (e) =>{
        e.preventDefault();
        var keycode = (e.keyCode ? e.keyCode : e.which);
        var participantValue = newParticipantRef.current.value.replace(',','');
        if((keycode === 13 || keycode === 188) 
                && participantValue.length > 0){ // enter or comma
            upParticipant(participantsCount + 1);
            props.draw.addParticipant(new Participant(participantValue));
            newParticipantRef.current.value = null;
            setParticipant(props.draw.getParticipants());
        }
        return false;
    }

    const addPrize = (e) =>{
        e.preventDefault();
        var keycode = (e.keyCode ? e.keyCode : e.which);
        var prizeInputValue = newPrizeRef.current.value.replace(',','');
        if((keycode === 13 || keycode === 188) 
                && prizeInputValue.length > 0){ // enter or comma
            upPrize(prizesCount + 1);
            props.draw.addPrize(new Prize(prizeInputValue));
            newPrizeRef.current.value = null;
            setPrize(props.draw.getPrizes());
        }
        return false;
    }

    const raffle = () => {
        let localResult = props.draw.raffle();
        setResult(localResult)
        upTries(triesCount + 1);
        saveStorage();
    }   

    const delParticipant = (participant) => {
        props.draw.delParticipant(participant);
        upParticipant(participantsCount - 1);
        setParticipant(props.draw.getParticipants());
    }

    const delPrize = (prize) => {
        props.draw.delPrize(prize);
        setPrize(props.draw.getPrizes());
        upPrize(prizesCount - 1);
    }

    const swapMultiple = () => {
        props.draw.swapType();
        setType(props.draw.getType());
    }

    const saveStorage = () => {
        // localStorage.setItem(props.draw.getId(), props.draw.toStorage());    
        DrawStorageManager.init();
        DrawStorageManager.setItem(props.draw);
    }

    return (
        <div className='draw'>
            <p className='drawTitle'>Sorteo: {props.draw.getId()}</p>
            <div><TypeComponent type={type} swapMultiple={swapMultiple}></TypeComponent></div>
            <div>
                <div className='panel leftPanel'>
                    <div>
                        <fieldset className='participantList'>
                            <legend>Participantes</legend>
                            <input ref={newParticipantRef} type='text' placeholder='&#xf234; Añadir participante (con intro o coma)' className='itemList participantInput' onKeyUp={addParticipant} title='Añadir participante (con intro o coma)'></input>
                            <ParticipantListComponent participantsList={participants} delParticipant={delParticipant}></ParticipantListComponent>
                        </fieldset>
                    </div>
                    <div>
                        <fieldset className='prizesList'>
                            <legend>Premios</legend>
                            <input ref={newPrizeRef} type='text' placeholder='&#xf091; Añadir premio (con intro o coma)' className='itemList prizeInput' onKeyUp={addPrize} title='Añadir premio (con intro o coma)'></input>
                            <PrizeListComponent prizesList={prizes} delPrize={delPrize}></PrizeListComponent>
                        </fieldset>
                    </div>
                </div>
                <div className='panel rightPanel'>
                    <div className='drawResult'>
                        <ResultComponent result={result}></ResultComponent>
                    </div>
                </div>
            </div>
            <div className='finalButton'><button className='raffleButton' onClick={raffle}>Sortear</button></div>
        </div>
    );
};

DrawComponent.propTypes = {
    draw: PropTypes.instanceOf(Draw)
};


export default DrawComponent;