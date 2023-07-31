import React from 'react'
import style from './BackBtn.module.css'

function Btns() {
    return (
        <div className={style.Btns}>
            <button>
                {'<< '}Back
            </button>
            <button>
                next{'>> '}
            </button>
        </div>
    )
}

export default Btns
