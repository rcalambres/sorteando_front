import React from 'react';
import { Draw } from '../../model/draw/draw.class';

const DrawItemListComponent = ({storagedDraw}) => {
    const draw = Draw.fromStorage(storagedDraw);
    console.log("item list", draw.getDate().toLocaleDateString("es-ES"));
    const url = '/draw/'+draw.getId();
    const dateOptions = {
        hour: "numeric",
        minute: "numeric"
      };
    const date = draw.getDate().toLocaleDateString("es-ES", dateOptions);
    return (
        <div>
            <a href={url}>
                <p><span>&#xf144;</span> {draw.getId()} - {date}</p>
            </a>
        </div>
    );
}

export default DrawItemListComponent;
