import React from 'react'

export default function Home() {
    return (

        <form method="POST" action="/form-post" id="home-form">
            <div className="form-container">
                <div className="form-sub-container">
                    <input type="text" id="postTitle" name="postTitle" placeholder="Enter the Title of the Post"></input>
                    <input type="text" id="author" name="author" placeholder="Enter the Author's Name"></input>
                </div>
                <div className="form-sub-container">
                    <textarea type="textarea" id="content" name="content" placeholder="Add the content of your post here..." ></textarea>
                </div>
                <div className="form-sub-container">
                    <input type="date" id="date" name="date"></input>
                    <input type="text" id="keyWords" name="keyWords" placeholder="Type some key words here, separated by spaces"></input>
                </div>
                <div className="form-sub-container center">
                    <input id="submit" type="submit"></input>
                </div>
            </div>
        </form>

    )
}
