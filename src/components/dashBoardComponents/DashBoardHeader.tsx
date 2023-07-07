import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../store/hooks'



export default function DashBoardHeader() {

    const { text } = useAppSelector(state => state.theme)

    const [date, setDate] = useState<Date>(new Date())
    useEffect(() => {
        setInterval(() => {
            setDate(new Date())
        }, 1000)
    }, [])


    return (
        <div className={`p-5 ${text}`}>
            <h2 className='text-5xl m-5 font-bold'>Today</h2>
            <p className='text-2xl m-5 font-semibold'>
                {date.toLocaleString('en-US', { weekday: 'long' })}
                &nbsp;{date.getDay().toString().length === 1 ? '0' + date.getDay() : date.getDay()},
                &nbsp;{date.getFullYear()} |
                &nbsp;{date.getHours().toString().length === 1 ? '0' + date.getHours() : date.getHours()}:
                {date.getMinutes().toString().length === 1 ? '0' + date.getMinutes() : date.getMinutes()}
                &nbsp;{date.toLocaleString('en-US', { hour: 'numeric', hour12: true }).slice(-2)}
            </p>
        </div>
    )
}
