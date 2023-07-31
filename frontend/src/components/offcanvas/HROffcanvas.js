import Dropdown from '../dropdowns/DropDowns'
import style from './HROffcanvas.module.css'

function HROffcanvas(props) {
    return (
        <div className={props.status ? `${style.sidebarParent} ${style.mkvisiable}` : `${style.sidebarParent}`}>
            <div className={`${style.offcanvas} ${style.block}`}>
                <Dropdown />
            </div>
        </div>
    )
}

export default HROffcanvas
