import React from 'react';
import { useParams } from 'react-router-dom';
import DrawComponent from '../../components/containers/draw';
import { Draw } from '../../model/draw/draw.class';
import { DrawStorageManager } from '../../model/draw/drawStorage.class';

const DrawPage = () => {
    const {uuid} = useParams();
    let storageRetrieved = false;
    let draw = new Draw();

    if (uuid){
        const storagedDraw = DrawStorageManager.getItem(uuid);
        if (storagedDraw){
            storageRetrieved = true;
            draw = storagedDraw;
        }
    }
    
    return (
        <div>
            <h1 className='titlePage'>Draw Page</h1>
            <div className='lastDraws'>
                <a href='/draw/list'>
                    <p><span>&#xf1da;</span> Sorteos recientes</p>
                </a>
            </div>
            { 
                (uuid && !storageRetrieved) 
                && <h6 className='errorStoragedDraw'>El sorteo <span>{uuid}</span> no se ha podido recuperar</h6>
            }
            <DrawComponent draw={draw}  />        
        </div>
    );
}

export default DrawPage;
