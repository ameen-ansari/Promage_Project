import style from './Offcanvas.module.css'
import DropdownForTrainerpor from '../dropdowns/DropdownForTrainerpor'

function Offcanvas(props) {
    return (
        <div className={props.status ? `${style.sidebarParent} ${style.mkvisiable}` : `${style.sidebarParent}`}>
            <div className={`${style.offcanvas} ${style.block}`}>
                <DropdownForTrainerpor />
            </div>
        </div>
    )
}

export default Offcanvas
