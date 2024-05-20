import React from 'react'
//import { useEffect, useState } from 'react'
import './calendar.css'
import Navbar from './navbar'
const Calendar = () => {

   let dummy = [
    { day: 1, name: 'Day 1' },
    { day: 2, name: 'Day 2' },
    { day: 1, name: 'Day 1' },
    { day: 2, name: 'Day 2' },
    { day: 1, name: 'Day 1' },
    { day: 2, name: 'Day 2' },
    { day: 1, name: 'Day 1' },
    { day: 2, name: 'Day 2' },
    { day: 1, name: 'Day 1' },
    { day: 2, name: 'Day 2' },
    { day: 1, name: 'Day 1' },
    { day: 2, name: 'Day 2' },
    { day: 1, name: 'Day 1' },
    { day: 2, name: 'Day 2' },
    { day: 1, name: 'Day 1' },
    { day: 2, name: 'Day 2' },
    { day: 1, name: 'Day 1' },
    { day: 2, name: 'Day 2' },
    { day: 1, name: 'Day 1' },
    { day: 2, name: 'Day 2' },
    { day: 1, name: 'Day 1' },
    { day: 2, name: 'Day 2' },
    { day: 1, name: 'Day 1' },
    { day: 2, name: 'Day 2' },
    { day: 1, name: 'Day 1' },
    { day: 2, name: 'Day 2' },
    { day: 1, name: 'Day 1' },
    { day: 2, name: 'Day 2' },
    { day: 1, name: 'Day 1' },
    { day: 2, name: 'Day 2' },
    { day: 1, name: 'Day 1' },];
    

    return (
        <div className='card ' style={{border:'none', height : '100vh'}}>
            <div className='d-flex flex-wrap justify-content-around align-items-stretch h-100'>
                <div className='col-2'>
                    <Navbar/>
                </div>
                <div className='col-10'>
                    <div className='grid-container'>
                    {/* <div className='d-flex flex-wrap bg-warning justify-content-start align-items-stretch h-100' style={{overflow: 'scroll',gap:"0"}}> */}
                    {dummy.map((d,i) => (
                        // <div key={i} className='col-sm-1 m-4 col-12 bg-light card border-primary' style={{width : "7vw"}}>
                        <div key={i} className='grid-cell'>
                            <h1>{i+1}</h1>
                            <div>{d.name}</div>
                        </div>
                    ))}
                    </div>

                </div>

            </div>
        </div>
    );
}


export default Calendar;