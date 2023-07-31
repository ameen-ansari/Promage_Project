import style from './Sidebar.module.css'
import logo from '../../assets/images/sidebar/logo.svg'
import MenuButton from '../menuButton/MenuButton'
import { useState } from 'react'
import TechPortalDropDown from '../dropdowns/TechPortalDropDown'

function TechPortalSidebar() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className={`${style.sidebarParent}`}>
            <div className={style.logo}>
                <img className={`${style.logoImg}`} src={logo} alt="logo" />
                <div>
                    <MenuButton func={() => {
                        setIsOpen(!isOpen)
                    }} />
                </div>
            </div>
            <div className={ isOpen? `${style.offcanvas} ${style.block}` : style.offcanvas}>
                <TechPortalDropDown />
            </div>
        </div>
    )
}

export default TechPortalSidebar
