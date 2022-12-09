import React from 'react';
import { DrawType } from '../../model/draw/drawType.class';


const TypeComponent = (props) => {
    const type = props.type === DrawType.MULTIPLE_DRAW_TYPE ? 'checked' : ''; 
    console.log("type component:" , type);
    return (
        <div>
            <input type="checkbox" value='{DrawType.MULTIPLE_DRAW_TYPE}}' checked={type} onChange={props.swapMultiple}/>Sorteo múltiple
        </div>
    );
}

export default TypeComponent;
