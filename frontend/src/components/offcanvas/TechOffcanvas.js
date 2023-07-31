import style from './Offcanvas.module.css'
import TechPortalDropDown from '../dropdowns/TechPortalDropDown'

function TechOffcanvas(props) {
    return (
        <div className={props.status ? `${style.sidebarParent} ${style.mkvisiable}` : `${style.sidebarParent}`}>
            <div className={`${style.offcanvas} ${style.block}`}>
                <TechPortalDropDown />
            </div>
        </div>
    )
}

export default TechOffcanvas
