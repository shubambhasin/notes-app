import React from 'react'
import { useNote } from '../../context/noteContext'

export const colors = ["red", "green", "blue", "yellow", "orange", "white"]


const GetColors = ({color}) => {

    const { setSearchQuery} = useNote()
    return (
        <div onClick={() => setSearchQuery(color)} className={`circle-1rem pointer ${color}`}>
            
        </div>
    )
}

export default GetColors
