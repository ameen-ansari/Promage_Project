import style from './SidebarForTrainerpor.module.css'
import logo from '../../assets/images/sidebar/logo.svg'
import MenuButton from '../menuButton/MenuButton'
import { useState } from 'react'
import DropdownForTrainerpor from '../dropdowns/DropdownForTrainerpor'

function SidebarForTrainerpor({tab}) {
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
                <DropdownForTrainerpor tab={tab} />
            </div>
        </div>
    )
}

export default SidebarForTrainerpor
