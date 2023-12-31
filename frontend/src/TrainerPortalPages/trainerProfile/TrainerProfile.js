import style from './TrainerProfile.module.css'
import user from '../../assets/images/hrprofile/user.svg'
import selectImg from '../../assets/images/hrprofile/selectImg.svg'
import larr from '../../assets/images/hrprofile/larr.svg'
import lock from '../../assets/images/hrprofile/lock.svg'
import mail from '../../assets/images/hrprofile/mail.svg'
import man from '../../assets/images/hrprofile/man.svg'
import ProfileUser from '../../components/profileUser/ProfileUser'
import SidebarForTrainerpor from '../../components/sidebar/SidebarForTrainerpor'
import Navbar from '../../components/navbar/Navbar'
import Offcanvas from '../../components/offcanvas/Offcanvas'
import { useState } from 'react'
import BackBtn from '../../components/btns/BackBtn'


function TrainerProfile() {
    const [offcanvas, setOffcanvas] = useState(false)

    return (
        <div className={style.parent}>
            <div className={`${style.sidebar}`}>
                <Navbar func={() => {
                    setOffcanvas(!offcanvas)
                }} />
                <Offcanvas status={offcanvas} />
                <SidebarForTrainerpor />
            </div>
            <div className={style.profile}>
                <ProfileUser />
                <p>Trainer Profile</p>
                <div className={style.hrInfo}>
                    <div>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div>
                        <p>Taskeen Chaudary</p>
                        <p>Front End Developer</p>
                    </div>
                    <div>
                        <img src={user} alt="" />
                    </div>
                    <div>
                        <img src={selectImg} alt="" />
                    </div>
                </div>
                <div className={style.cardParent}>
                    <div className={style.card1}>
                        <div className={style.card1headers}>
                            <div>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div>
                                <p>Info</p>
                            </div>
                        </div>
                        <div className={style.card1body}>
                            <div>
                                <img src={man} alt="" />
                                <div>
                                    <p className={style.card1para}>Name</p>
                                    <p className={style.card1para2}>Albert Robin</p>
                                </div>
                            </div>
                            <div>
                                <img src={mail} alt="" />
                                <div>
                                    <p className={style.card1para}>Email</p>
                                    <p className={style.card1para2}>Albertrobin23@gmail.com</p>
                                </div>
                            </div>
                            <div>
                                <img src={lock} alt="" />
                                <div>
                                    <p className={style.card1para}>Password</p>
                                    <p className={style.card1para2}>***********</p>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className={style.card2}>
                        <div className={style.card2headers}>
                            <p>Role</p>
                            <img src={larr} alt="" />
                            <p>Trainer</p>
                        </div>
                        <div className={style.card2body}>
                            <input type="text" placeholder='Change password' />
                            <input type="text" placeholder='Confirm Password' />
                            <button>Update Password</button>
                        </div>
                    </div>
                </div>
                <BackBtn />
            </div>
        </div>
    )
}

export default TrainerProfile
