import { useState } from 'react'
import style from './ProfileUser.module.css'
import circularuser from '../../assets/images/hrprofile/UserCircle.svg'
import profileImg from '../../assets/images/hrprofile/Dropdown.svg'
import logout from '../../assets/images/hrprofile/Logout.svg'
import { useNavigate } from 'react-router-dom'
function ProfileUser(props) {
    const [isOpen, setIsOpen] = useState(false)
    let navigate = useNavigate()
    const toggler = () => {
        if (isOpen) {
            setIsOpen(false)
        } else {
            setIsOpen(true)
        }
    }
    const pushProfile = () => {
        navigate(props.path)
        toggler()
    }
    return (
        <div className={style.parent}>
            <img src={profileImg} onClick={toggler} alt="" />
            {
                isOpen ?
                    <div className={style.dropdown}>
                        <div onClick={pushProfile}>
                            <img src={circularuser} alt="" />
                            <p>Profile</p>
                        </div>
                        <div>
                            <img src={logout} alt="" />
                            <p>Logout</p>
                        </div>
                    </div> : null
            }

        </div>
    )
}

export default ProfileUser
