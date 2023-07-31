import React from 'react'
import style from './Table2.module.css'

function Table2(props) {
    let info = [
        {
            status: 'Selected'
        },
        {
            status: 'Selected'
        },
        {
            status: 'Selected'
        },
        {
            status: 'Selected'
        },
        {
            status: 'Selected'
        },
        {
            status: 'Selected'
        },
        {
            status: 'Selected'
        },
        {
            status: 'Selected'
        },
        {
            status: 'Selected'
        },
    ]
    return (
        <table className={style.table}>
            <tr className={style.headers}>
                <th colSpan={3} >{props.value}</th>
            </tr>
            <tr className={style.headers}>
                <th>Status</th>
                <th>{props.th}</th>
                <th>Records</th>
            </tr>
            {
                info.map((obj, i) => {
                    return (
                        <tr className={style.body} key={i}>
                            <td className={style.txtStyle1}>
                                {obj.status}
                            </td>
                            <td><button onClick={props.startfunc} className={style.txtStyle2}>Start</button></td>
                            <td><button onClick={props.viewfunc} className={style.txtStyle3}>View</button></td>
                        </tr>
                    )
                })
            }
        </table>
    )
}

export default Table2
