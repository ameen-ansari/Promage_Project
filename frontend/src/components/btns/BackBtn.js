import React from 'react'
import style from './BackBtn.module.css'

function BackBtn() {
    return (
        <div className={style.backBtn}>
            <button>
                {'<< '}Back
            </button>
        </div>
    )
}

export default BackBtn
