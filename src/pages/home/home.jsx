import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuListComponent from '../../components/containers/menuList';
import logo from '../../img/raffle.png';
import { Menu } from "../../model/menu/menu.class";
import { MenuItem } from '../../model/menu/menuItem.class';
import DrawPage from '../draw/Draw';
import DrawListPage from '../draw/DrawList';
import NotFoundPage from '../errors/NotFound';
import MenuComponent from '../menu/menu';
import SecretSantaPage from '../secretSanta/SecretSanta';

const HomePage = () => {
    const menuItems = [];
    menuItems.push(new MenuItem(undefined, 'Home', '/'));
    menuItems.push(new MenuItem(undefined, 'Draw', '/draw'));
    menuItems.push(new MenuItem(undefined, 'Secret Santa', '/secret-santa'));
    const appMenu = new Menu(undefined, [...menuItems]); // burguer menu
    menuItems.shift(); // delete home
    const homeMenu = new Menu(undefined, menuItems); // home page

    return (
        <div className="App">
            <nav className='App-header'>
                <div class="navbar">
                    <div class="container nav-container">
                        <input class="checkbox" type="checkbox" name="" id=""></input>
                        <div class="hamburger-lines">
                        <span class="line line1"></span>
                        <span class="line line2"></span>
                        <span class="line line3"></span>
                        </div>  
                    <div class="logo">
                        <a href='/'><img src={logo} className="App-logo" alt="logo" /></a>
                        <a href='/'><p>Sorteando</p></a>
                    </div>
                    <div class="menu-items">
                        <MenuListComponent menu={appMenu}></MenuListComponent>
                    </div>
                    </div>
                </div>
            </nav>
            <div className='App-body'>
                {/* Conditional pages by route */}
                <Router>
                    <Routes>
                        <Route exact path='/' element={<MenuComponent menu={homeMenu}></MenuComponent>}/>
                        <Route path='/secret-santa' element={<SecretSantaPage />}/>
                        <Route path='/draw' element={<DrawPage />}/>
                        <Route path='/draw/:uuid' element={<DrawPage />}/>
                        <Route exact path='/draw/list' element={<DrawListPage />}/>
                        <Route path='*' element={<NotFoundPage />} />
                    </Routes>
                </Router>
            </div>
            <footer className="App-footer">
                <div>&#169; Rubén Martín { new Date().getFullYear()} </div>
            </footer>
        </div>
    );
}

export default HomePage;
