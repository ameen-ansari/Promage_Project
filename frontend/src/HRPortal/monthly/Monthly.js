import style from './Monthly.module.css'
import SideBar from '../../components/sidebar/SideBar'
import search from '../../assets/images/employees/Search.svg'
import add from '../../assets/images/employees/Application Add.svg'
import ProfileUser from '../../components/profileUser/ProfileUser'
import { useNavigate } from 'react-router-dom'
import Btns from '../../components/btns/Btns'
function Monthly() {
    const navigate = useNavigate()
    const data = [
        'January',
        'January',
        'January',
        'January',
        'January',
        'January',
        'January',
        'January',
    ];
    let next = 'Next page >>'
    return (
        <div className={style.parent}>
            <div className={style.sidebar}>
                <SideBar tab={"monthlyPlan"} />
            </div>
                <ProfileUser />
            <div className={style.subparent}>
                <div className={style.searchbar}>
                    <div className={style.sec1}>
                        <img src={search} alt="" />
                        <input type="text" placeholder='Search Employee by name or id' />
                    </div>
                </div>
                <div className={style.tableParent2}>
                    <table className={style.table}>
                        <tr className={style.headers}>
                            <td>Month</td>
                            <td>Action</td>
                        </tr>
                        {
                            data.map((month, i) => {
                                return (
                                    <tr className={style.tablebody} key={i}>
                                        <td>
                                            <p>{month}</p>
                                        </td>
                                        <td ><button onClick={()=>{
                                            navigate('/hr/trainingweeks')
                                        }} className={style.view}>
                                            View
                                        </button></td>
                                    </tr>
                                )

                            })
                        }
                    </table>
                </div>
               <Btns />
            </div>
        </div>
    )
}

export default Monthly
