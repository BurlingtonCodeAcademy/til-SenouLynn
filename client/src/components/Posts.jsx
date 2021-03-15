import React from 'react'
import { useEffect, useState } from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'


export default function Posts() {
    const [stopLoop, setStopLoop] = useState(true)
    const [importAll, setImportAll] = useState([])


    //<----- Importing All docs from dB ----->//
    useEffect(() => {
        if (stopLoop) {
            fetch('/facts')
                .then((res) => res.json())
                .then((list) => {
                    console.log(list)
                    setImportAll(list)
                })
        } setStopLoop(false)
    })
    //<----- Programatically Adding Unique ClassName ------>//
    let count = 0;



    return (
        <div id="all-posts">
            {importAll.map((obj) => {
                if (importAll !== []) {
                    count++
                    console.log(count)
                    let linkVar = `/facts/${obj._id}`

                    //<----- Data Sanitization ----->//
                    let year;
                    let month;
                    let day;
                    if (obj.date) {
                        year = obj.date.slice(0, 4)
                        month = obj.date.slice(5, 7)
                        day = obj.date.slice(8, 10)
                        console.log(year, month, day)
                    }
                    return (

                        <div>
                            <Link to={linkVar}><h3>{obj.postTitle}</h3></Link>
                            <div>By: {obj.author}</div>
                            <hr></hr>
                            <h5>Today I learned:</h5>
                            <div>{obj.postContent}</div>
                            <hr></hr>
                            <div>Posted on: {month}/{day}/{year}</div>
                            <div className="keywords" >{obj.keyWords.map((keyWords) => {
                                return (
                                    <form method="POST" action="/searchBar">
                                        <input type="hidden" name="searchField" value="keyWords" />
                                        <input type="hidden" name="searchValue" value={keyWords} />
                                        <input className="butt" type="submit" value={`#${keyWords}`} />
                                    </form>
                                )
                            })}</div>
                        </div>

                    )
                }

            }, count = 0)}
        </div>


    )
}
