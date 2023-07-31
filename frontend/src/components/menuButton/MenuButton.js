import { useState } from 'react'
import style from './MenuButton.module.css'

function MenuButton(props) {
    const [isOpen, setIsOpen] = useState(false)
    const toggleH = () => {
        setIsOpen(!isOpen)
        props?.func()
    }
    return (
        <div onClick={toggleH} className={isOpen ? `${style.open} ${style.navIcon1}` : style.navIcon1}>
            <span></span>
            <span></span>
            <span></span>
        </div>

    )
}

export default MenuButton
