import React from 'react';
import PropTypes from 'prop-types';

const MenuLinkComponent = ({name, url}) => {
    return (
        <a href={url} className='menu-link'>
            <p><span>&#xf144;</span> {name}</p>
        </a>
    );
}

export default MenuLinkComponent;

MenuLinkComponent.propTypes = {
    name: PropTypes.string,
    url: PropTypes.string
};