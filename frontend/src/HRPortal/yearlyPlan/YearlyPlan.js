import style from './YearlyPlan.module.css'
import SideBar from '../../components/sidebar/SideBar'
import Search from '../../assets/images/employees/Search.svg'
import add from '../../assets/images/employees/Application Add.svg'
import ProfileUser from '../../components/profileUser/ProfileUser'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import HROffcanvas from '../../components/offcanvas/HROffcanvas'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Btns from '../../components/btns/Btns'
function YearlyPlan() {
    const [offcanvas, setOffcanvas] = useState(false)
    const [yearlyPlans, setYearlyPlans] = useState(null);

    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(8);

    const [allDataArr, setAllDataArr] = useState(null);

    useEffect(() => {
        axios.get("/readYearlyPlan").then((response) => {
            setAllDataArr(response.data.data);
            setYearlyPlans(response.data.data.slice(startIndex, endIndex))
        })
    }, [])

    const navigate = useNavigate()

    const nextPage = () => {
        setStartIndex(startIndex + 8);
        setEndIndex(endIndex + 8);
        
    }

    const backPage = () => {
        setStartIndex(startIndex - 8);
        setEndIndex(endIndex - 8);
        

    }

    useEffect(()=>{

        setYearlyPlans(allDataArr?.slice(startIndex, endIndex))
    }, [startIndex, endIndex])

    const search = (event)=>{
        if (event.target.value !== "") {
            console.log(event.target.value);
            
            const searchedList = allDataArr?.filter((obj) => {
                return (

                    obj.Year.toString().includes(event.target.value)
                    )
                
            })
            
            console.log(searchedList);
            setYearlyPlans(searchedList);
        } else {
            setYearlyPlans(allDataArr?.slice(startIndex, endIndex))
        }
    }

    return (
        <div className={style.parent}>
            <div className={style.sidebar}>
                <Navbar func={() => {
                    setOffcanvas(!offcanvas)
                }} />
                <HROffcanvas status={offcanvas} />
                <SideBar tab={"yearlyPlans"} />
            </div>
            <ProfileUser path='/hr/profile' />
            <div className={style.subparent}>
                <div className={style.searchbar}>
                    <div className={style.sec1}>
                        <img src={Search} alt="" />
                        <input onChange={search} type="number" placeholder='Search year in numbers ' />
                    </div>
                    <div onClick={() => {
                        navigate('/hr/giveplan')
                    }} className={style.sec2}>
                        <img src={add} alt="" />
                        <p>Add New</p>
                    </div>
                </div>
                <div className={style.tableParent2}>
                    <table className={style.table}>
                        <tr className={style.headers}>
                            <td>Year</td>
                            <td>Action</td>
                        </tr>
                        {
                            yearlyPlans?.map((yearlyPlan, i) => {
                                return (
                                    <tr className={style.tablebody} key={i}>
                                        <td>
                                            <p>{yearlyPlan.Year}</p>
                                        </td>
                                        <td ><button onClick={() => {
                                            navigate(`/hr/selectmonth/${yearlyPlan._id}`)
                                        }} className={style.view}>
                                            View
                                        </button></td>
                                    </tr>
                                )

                            })
                        }
                    </table>
                </div>
                <div className={style.Btns}>
                        {startIndex > 0 && (

                            <button onClick={backPage}>
                                {'<< '}Back
                            </button>
                        )}
                        {allDataArr?.length > endIndex && (

                            <button onClick={nextPage}>
                                next{'>> '}
                            </button>
                        )}
                    </div>
            </div>
        </div>
    )
}

export default YearlyPlan
