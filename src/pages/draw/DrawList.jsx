import React from 'react';
import DrawItemListComponent from '../../components/pure/drawItemList';
import { DrawStorageManager } from '../../model/draw/drawStorage.class';

const DrawListPage = () => {
    const storagedDraws = DrawStorageManager.getItems();

    return (
        <div className='drawList'>
            <h1 className='titlePage'>Draw List Page</h1>
            {
                storagedDraws.map( draw => (
                    <DrawItemListComponent key={draw.id} storagedDraw={draw}></DrawItemListComponent>
                )
                )
            }        
        </div>
    );
}

export default DrawListPage;
