import style from './Monthly.module.css'
import SideBar from '../../components/sidebar/SideBar'
import Search from '../../assets/images/employees/Search.svg'
import add from '../../assets/images/employees/Application Add.svg'
import ProfileUser from '../../components/profileUser/ProfileUser'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import HROffcanvas from '../../components/offcanvas/HROffcanvas'
import axios from 'axios'
import BackBtn from '../../components/btns/BackBtn'
import Btns from '../../components/btns/Btns'
function Monthly() {
    const [offcanvas, setOffcanvas] = useState(false)
    const navigate = useNavigate();
    const { planId } = useParams();
    const [planToShow, setPlanToShow] = useState(null);

    useEffect(()=>{
        axios.get("/readYearlyPlan").then((response)=>{
            const yearlyPlansList = response.data.data;
            for (let index = 0; index < yearlyPlansList.length; index++) {
                if (yearlyPlansList[index]._id === planId) {
                    setPlanToShow(yearlyPlansList[index]);
                }
                
            }
        })
    }, [])



    return (
        <div className={style.parent}>
            <div className={style.sidebar}>
                <Navbar func={() => {
                    setOffcanvas(!offcanvas)
                }} />
                <HROffcanvas status={offcanvas} />
                <SideBar tab={"yearlyPlans"}  />
            </div>
            <ProfileUser path='/hr/profile' />
            <div className={style.subparent}>
                <div className={style.searchbar}>
                    <div className={style.sec1}>
                        
                    </div>
                </div>
                <div className={style.tableParent2}>
                    <table className={style.table}>
                        <tr className={style.headers}>
                            <td>Month</td>
                            <td>Action</td>
                        </tr>
                        {
                            planToShow?.Month.map((month, i) => {
                                return (
                                    <tr className={style.tablebody} key={i}>
                                        <td>
                                            <p>{month.MonthName}</p>
                                        </td>
                                        <td ><button onClick={() => {
                                            navigate(`/hr/trainingweeks/${planToShow._id}/${month.MonthName}`)
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
