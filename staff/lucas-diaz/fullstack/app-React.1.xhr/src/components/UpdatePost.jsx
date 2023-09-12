import { context } from "../ui";
import updatePost from "../logic/updatePost";
import retrievePostByPostId from "../logic/retrievePostByPostId";
import { useEffect, useState } from "react";
import Form from "./library/Form";


export default function UpdatePost({ postId, onUpdatedPost, onCancelClick }) {
    const [post, setPost] = useState()

    useEffect(() => {
        try {
            retrievePostByPostId(context.token, postId, (error, post) => {
                if (error) {
                    alert(error.message);
                    return;
                }
                setPost(post)

            });
        } catch (error) {
            alert(error.message);
        }
    }, [])


    function handleUpdatePost(event) {
        event.preventDefault();
        try {
            let image = event.target.url.value
            let text = event.target.text.value

            console.log(image)
            console.log(text)
            console.log(context.token)
            console.log(postId)

            updatePost(context.token, postId, image, text, error => {
                if (error) {
                    alert(error.message);
                    return;
                }
                onUpdatedPost()
            });
        } catch (error) {
            alert(error.message);
        }
    }

    function handleCancelClick(event) {
        event.preventDefault();
        onCancelClick()
    }


    return <section className="post-modal">
        <Form onSubmit={handleUpdatePost}>
            {post && <>
                <label className="basis-full text-center text-xl" htmlFor="url">Edit post:</label>
                <input type="url" className="form-item text-black basis-11/12 rounded p-2" name="url" defaultValue={post.image} />
                <input type="hidden" className="home-edit-hidden-input" name="postId" />
                <textarea className="text-black basis-11/12 rounded p-2" name="text" cols="30" rows="5" defaultValue={post.text}></textarea>
            </> || <>
                    <label className="basis-full text-center text-xl" htmlFor="url">Loading...</label>
                    <input type="url" className="form-item basis-11/12 rounded p-2" name="url" disabled placeholder="Loading..." style={{ backgroundColor: "white" }} />
                    <input type="hidden" className="home-edit-hidden-input" name="postId" />
                    <textarea className="basis-11/12 rounded p-2" name="text" cols="30" rows="5" disabled placeholder="Loading..." style={{ backgroundColor: "white" }}></textarea>
                </>}


            <div className="form-buttons">
                <button type="button" className="form-button mr-5 active:red" onClick={handleCancelClick}>Cancel</button>
                <button type="submit" className="form-button active:green">Save</button>
                <p className="fail-warning red"></p>
            </div>
        </Form>
    </section>
}
