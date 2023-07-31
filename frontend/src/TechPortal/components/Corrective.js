import React from 'react'
import style from './Corrective.module.css'

function Corrective(props) {
    let info = [
        {
            id: '3310',
            name: 'Weaving Machine',
            location: 'Main Hall'
        },
        {
            id: '3310',
            name: 'Weaving Machine',
            location: 'Main Hall'
        },
        {
            id: '3310',
            name: 'Weaving Machine',
            location: 'Main Hall'
        },
        {
            id: '3310',
            name: 'Weaving Machine',
            location: 'Main Hall'
        },
        {
            id: '3310',
            name: 'Weaving Machine',
            location: 'Main Hall'
        },
        {
            id: '3310',
            name: 'Weaving Machine',
            location: 'Main Hall'
        },
        {
            id: '3310',
            name: 'Weaving Machine',
            location: 'Main Hall'
        },
        {
            id: '3310',
            name: 'Weaving Machine',
            location: 'Main Hall'
        },
        {
            id: '3310',
            name: 'Weaving Machine',
            location: 'Main Hall'
        },
    ]
    return (
        <table className={style.table}>
            <tr className={style.headers}>
                <th>Corrective</th>
            </tr>
            {
                info.map((obj, i) => {
                    return (
                        <tr className={style.body} key={i}>
                            <td>
                                <button className={style.txtStyle2}>View</button>
                            </td>
                        </tr>
                    )
                })
            }
        </table>
    )
}

export default Corrective