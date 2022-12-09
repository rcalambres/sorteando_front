import React from 'react';
import PropTypes from 'prop-types';
import { Prize } from '../../model/draw/prize.class';


const PrizeComponent = (props) => {

    const prize = props.prize;

    return (
        <span className='itemList'>&#xf091; {prize.name}<span className='itemDel' onClick={event => props.delPrize(prize)}>&#xf057;</span></span>
    );
};


PrizeComponent.propTypes = {
    prize: PropTypes.instanceOf(Prize)
};


export default PrizeComponent;
