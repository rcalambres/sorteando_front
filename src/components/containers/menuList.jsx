import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from '../../model/menu/menu.class';
import MenuLinkComponent from '../pure/menuLink';


const MenuListComponent = ({menu}) => {
    return (
    
        <div className='menuOptions'>
            { menu.getItems().map((menuItem, i) => {
                return (
                    <MenuLinkComponent key={menuItem.getId()} name={menuItem.getName()} url={menuItem.getUrl()}></MenuLinkComponent>
                );
            })}
        </div>
    
    );
};


MenuListComponent.propTypes = {
    menu: PropTypes.instanceOf(Menu)
};


export default MenuListComponent;
