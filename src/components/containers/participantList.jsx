import React from 'react';
import { Participant } from '../../model/draw/participant.class';
import ParticipantComponent from '../pure/participant';
import PropTypes from 'prop-types';


const ParticipantListComponent = (props) => {

    const participantsList = props.participantsList;
    return (
        <div>
            { participantsList.map((participant, i) => {
                return (
                    <ParticipantComponent key={participant.uuid} participant={participant} delParticipant={props.delParticipant}></ParticipantComponent>
                );
            })}
        </div> 
        
    );
};

ParticipantListComponent.propTypes = {
    participantsList: PropTypes.arrayOf(PropTypes.instanceOf(Participant))
};

export default ParticipantListComponent;
