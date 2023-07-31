import React from 'react'
import style from './Table.module.css'

function Table1(props) {
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
                <th>Machinery Id</th>
                <th>Machinery Name</th>
                <th>Machinery Location</th>
            </tr>
            {
                info.map((obj, i) => {
                    return (
                        <tr className={style.body} key={i}>
                            <td>
                                <p>
                                    {obj.id}
                                </p>
                            </td>
                            <td className={style.txtStyle2}>{obj.name}</td>
                            <td className={style.txtStyle3}>{obj.location}</td>
                        </tr>
                    )
                })
            }
        </table>
    )
}

export default Table1
