import PropTypes from 'prop-types';
import React from 'react';
import { Prize } from '../../model/draw/prize.class';
import PrizeComponent from '../pure/prize';

const PrizeListComponent = (props) => {
    const prizesList = props.prizesList;
    
    return (
        <span>
            { prizesList.map((prize, i) => {
                return (
                    <PrizeComponent key={prize.uuid} prize={prize} delPrize={props.delPrize}></PrizeComponent>
                );
            })}
        </span>
    );
};

PrizeListComponent.propTypes = {
    prizesList: PropTypes.arrayOf(PropTypes.instanceOf(Prize))
};

export default PrizeListComponent;
