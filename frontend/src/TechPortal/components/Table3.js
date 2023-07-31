import React from 'react'
import style from './Table3.module.css'

function Table3(props) {
    let info = [
        {
            id: '3310',
            name: 'Weaving Machine',
            location: 'Main Hall',
            range:'320'
        },
        {
            id: '3310',
            name: 'Weaving Machine',
            location: 'Main Hall',
            range:'320'
        },
        {
            id: '3310',
            name: 'Weaving Machine',
            location: 'Main Hall',
            range:'320'
        },
        {
            id: '3310',
            name: 'Weaving Machine',
            location: 'Main Hall',
            range:'320'
        },
        {
            id: '3310',
            name: 'Weaving Machine',
            location: 'Main Hall',
            range:'320'
        },
        {
            id: '3310',
            name: 'Weaving Machine',
            location: 'Main Hall',
            range:'320'
        },
        {
            id: '3310',
            name: 'Weaving Machine',
            location: 'Main Hall',
            range:'320'
        },
        {
            id: '3310',
            name: 'Weaving Machine',
            location: 'Main Hall',
            range:'320'
        },
        {
            id: '3310',
            name: 'Weaving Machine',
            location: 'Main Hall',
            range:'320'
        },
    ]
    return (
        <table className={style.table}>
            <tr className={style.headers}>
                <th>Measuring Device Id</th>
                <th>Measuring Device Name</th>
                <th>Measuring Device Location</th>
                <th>Range</th>
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
                            <td className={style.txtStyle3}>{obj.range}</td>
                        </tr>
                    )
                })
            }
        </table>
    )
}

export default Table3
