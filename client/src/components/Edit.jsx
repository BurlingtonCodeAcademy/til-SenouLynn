import React from 'react'
import { useEffect, useState } from 'react'


export default function Edit(props) {
    //<----- Dig into passed info -----//
    let info = props.postObj

    //<----- Toggle Delete Button ----->//
    const [delButt, setDelButt] = useState(false)
    function toggleDel(evt) {
        setDelButt(!delButt)
    }
    let delDiv;
    if (delButt) {
        delDiv = (
            <div>
                <div>
                    <h3>Are you sure you want to delete this post permanently?</h3>
                    <div className="leftify">
                        <button className="butt" onClick={toggleDel}>No</button>
                        <form action="/post-delete" method="POST">
                            <input type="hidden" name="postId" value={info._id} />
                            <input className="butt" type="submit" value="Yes" />
                        </form>
                    </div>

                </div>
            </div>
        )
    } else {
        delDiv = (
            <button className="butt" onClick={toggleDel}>Delete Post</button>
        )
    }

    return (
        <div>
            <h4>Edit Info:</h4>
            <form className="form-container" method="POST" action="/form-update">
                <div className="form-sub-container">
                    <input type="text" id="postTitle" name="postTitle" placeholder={`Title: ${info.postTitle}`}></input>
                    <input type="text" id="author" name="author" placeholder={`Author: ${info.author}`}></input>
                </div>

                <div className="form-sub-container">
                    <textarea type="text" id="content" name="postContent" placeholder={info.postContent}></textarea>
                </div>

                <div className="form-sub-container">
                    <input type="date" id="date" name="date" placeholder={info.date}></input>
                    <input type="text" className="keyWords" name="keyWords" placeholder={`Keywords: ${info.keyWords}`}></input>
                </div>

                <input type="hidden" name="postId" value={info._id} />

                <div className="form-sub-container center">
                    <input id="submit" type="submit"></input>
                </div>
            </form>
            {delDiv}
        </div>
    )
}
