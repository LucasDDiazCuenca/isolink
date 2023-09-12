import { useState } from "react";
import createPost from "../logic/createPost.js"
import { context } from "../ui.js";
import Form from "./library/Form.jsx";

export default function AddPostModal(props) {
    const [errorMessage, setErrorMesagge] = useState("");

    function handleCancelClick(event){
        event.preventDefault();
        props.onCancelClick();
    }
    function handleCreatePost(event){
        event.preventDefault();

        let image = event.target.url.value
        let text = event.target.text.value 

        try{
            createPost(context.token, image, text, (error) => {
                if (error){
                    setErrorMesagge(error.message)
                    return;
                }
                props.onCreatedPost();
            });
            
            
        }catch(error){
            setErrorMesagge(error.message)
        }
    }

    return <section className="post-modal">
        <Form  onSubmit={handleCreatePost}>
            <label className="basis-full text-center text-xl" htmlFor="url">Create post:</label>
            <input type="url" className="form-item text-black basis-11/12 rounded p-2" name="url" placeholder="Enter an image by typing a url" />
            <textarea className="text-black basis-11/12 rounded p-2" name="text" cols="30" rows="5" placeholder="What do yo want to say ??"></textarea>
            <div className="form-buttons">
            {errorMessage && <p className="fail-warning red">{errorMessage}</p>}
                <button type="button" className="form-button mr-5 active:red" onClick={handleCancelClick}>Cancel</button>
                <button type="submit" className="form-button active:green">Create post</button>
            </div>
        </Form>
    </section>
}