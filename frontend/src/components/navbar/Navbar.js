import style from './Navbar.module.css'
import logo from '../../assets/images/sidebar/logo.svg'
import MenuButton from '../menuButton/MenuButton'
import { useState } from 'react'
// import DropdownForTrainerpor from '../dropdowns/DropdownForTrainerpor'

function Navbar(props) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className={`${style.sidebarParent}`}>
            <div className={style.logo}>
                <img className={`${style.logoImg}`} src={logo} alt="logo" />
                <div>
                    <MenuButton func={props.func} />
                </div>
            </div>
            
        </div>
    )
}

export default Navbar