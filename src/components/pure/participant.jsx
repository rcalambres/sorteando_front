import React from 'react';
import PropTypes from 'prop-types';
import { Participant } from '../../model/draw/participant.class';


const ParticipantComponent = (props) => {
    const participant = props.participant;
    return (
        <span className='itemList'>&#xf007; {participant.name}<span className='itemDel' onClick={event => props.delParticipant(participant)}>&#xf057;</span></span>
    );
};

ParticipantComponent.propTypes = {
    participant: PropTypes.instanceOf(Participant)
};

ParticipantComponent.propTypes = {
    participant: PropTypes.instanceOf(Participant)
}

export default ParticipantComponent;
