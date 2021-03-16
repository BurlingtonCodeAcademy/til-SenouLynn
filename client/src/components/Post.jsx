import React from 'react'
import { useEffect, useState } from 'react'
import Edit from './Edit'

export default function Post(props) {
    //<----- Sates ----->//

    const [stopLoop, setStopLoop] = useState(true)
    const [importAll, setImportAll] = useState([])

    const [editButt, setEditButt] = useState(false)



    //<----- Import Document for Specific Post ----->//

    console.log("REF: React match.params: ", props.match.params.id)
    useEffect(() => {
        if (stopLoop) {
            fetch(`/facts/${props.match.params.id}`)
                .then((res) => res.json())
                .then((list) => {
                    console.log(list)
                    setImportAll(list)

                })
        } setStopLoop(false)
    })

    //<----- Toggle Edit Visibililty ----->//

    function toggleEdit(evt) {
        setEditButt(!editButt)
    }

    let editDiv;
    if (editButt) {
        editDiv = (
            <div>
                <button className="butt" onClick={toggleEdit}>Edit Post</button>
                <Edit postObj={importAll} />
            </div>
        )
    } else {
        editDiv = <button className="butt" onClick={toggleEdit}>Edit Post</button>
    }

    //<----- Data Sanitization ----->//
    let year;
    let month;
    let day;
    if (importAll.date) {
        year = importAll.date.slice(0, 4)
        month = importAll.date.slice(5, 7)
        day = importAll.date.slice(8, 10)
        console.log(year, month, day)
    }

    return (
        <div>
            <div className="searchRes" >
                <div><h3>{importAll.postTitle}</h3></div>
                <div>By: {importAll.author}</div>
                <hr></hr>
                <div>{importAll.postContent}</div>
                <hr></hr>
                <div>Posted on: {month}/{day}/{year}</div>
                {editDiv}
            </div>


        </div>

    )
}