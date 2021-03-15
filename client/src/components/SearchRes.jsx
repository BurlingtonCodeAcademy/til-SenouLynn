import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function SearchRes() {
    console.log("You're in the search page")

    const [stopLoop2, setStopLoop2] = useState(true)
    const [searchReturn, setSearchReturn] = useState([])

    //<----- Importing Search Results ----->//
    useEffect(() => {
        if (stopLoop2) {
            fetch('/searchReturn')
                .then((res) => res.json())
                .then((list) => {
                    console.log(list)
                    setSearchReturn(list)
                })
        } setStopLoop2(false)
    })



    return (
        <div>
            <div id="search-posts">
                <form className="search-form-container" method="POST" action="/searchBar">
                    <input className="search-input" type="text" name="searchValue" placeholder="Type Search Here..."></input>
                    <select name="searchField">
                        <option value="author">Author</option>
                        <option value="postTitle">Title</option>
                        <option value="keyWords">Key Word</option>
                    </select>
                    <input className="butt" type="submit" />
                </form>

                <div >
                    {searchReturn.map((obj) => {
                        if (searchReturn !== []) {
                            console.log("IMPORTING")
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
                                <div className="searchRes">
                                    <h3><Link id="post-title" to={linkVar}>{obj.postTitle}</Link></h3>
                                    <div id="author-click">By: {obj.author}</div>
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

                    })}
                </div>
            </div>
        </div>
    )
}

