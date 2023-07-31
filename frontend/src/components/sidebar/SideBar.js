import style from './Sidebar.module.css'
import logo from '../../assets/images/sidebar/logo.svg'
import DropDowns from '../dropdowns/DropDowns'
import MenuButton from '../menuButton/MenuButton'
import { useState } from 'react'

function SideBar({tab}) {
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
                <DropDowns tab={tab} />
            </div>
        </div>
    )
}

export default SideBar
