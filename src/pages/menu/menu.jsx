import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from "../../model/menu/menu.class";
import MenuListComponent from '../../components/containers/menuList';

const MenuComponent = ({menu}) => {
    return (
        <div>
            <h1 className='titlePage'>Elige un sorteo</h1>
            <MenuListComponent menu={menu}></MenuListComponent>
        </div>
    );
};

MenuComponent.propTypes = {
    menu: PropTypes.instanceOf(Menu)
};

export default MenuComponent;
