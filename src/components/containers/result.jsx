import PropTypes from 'prop-types';
import React from 'react';
import { Result } from '../../model/draw/result.class';
import WinnerComponent from '../pure/winner';

const ResultComponent = (props) => {

    const result = props.result;
    const winnersResult = result.getWinners();
    const errorResult = result.getError();

    if (winnersResult !== undefined && winnersResult.length > 0){
        return(
            <div>
                <p>Listado de ganadores:</p>
                {   result.getWinners().map((winner, i) => {
                        return <WinnerComponent key={winner.key} winner={winner}></WinnerComponent>
                    })
                }
                
            </div>
        )
    }else{
        if (!errorResult){
            return (
                <div>

                </div>
            );
        }

    }
    const errorMessage = errorResult.error;

    return (    
        
        <div>
            <p className='errorResult'><span>Error:</span> {errorMessage}</p>
        </div>
    );
};

ResultComponent.propTypes = {
    result: PropTypes.instanceOf(Result)
};

export default ResultComponent;
