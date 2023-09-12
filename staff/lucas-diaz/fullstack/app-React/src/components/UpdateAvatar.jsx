import { useState } from "react";
import updateUserAvatar from "../logic/updateUserAvatar";
import Form from "./library/Form";


export default function UpdateAvatar(props) {
    const [errorMessage, setErrorMessage] = useState("");

    function handleUpdateAvatar(event) {
        event.preventDefault();

        try {
            let url = event.target.url.value

            updateUserAvatar(url)
                .then(() => props.onUpdatedAvatar(url))
                .catch(error => alert(error))

        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    function handleCancelClick(event) {
        event.preventDefault();
        props.onCancelClick();
    }

    return <div className="flex flex-wrap flex-row justify-center basis-11/12 p-4 text-white gap-4 bg-zinc-800 rounded-lg">
        <h3 className="p-2 text-xl text-emerald-600">UPDATE AVATAR</h3>
        <p className=" text-center">To update avatar, please provide a link that contains an image .png or .jpeg</p>
        <Form onSubmit={handleUpdateAvatar}>
            <label className="basis-full" htmlFor="url">Avatar's URL: </label>
            <input type="url" className="basis-full rounded p-2 text-black" name="url" placeholder="Enter url" />
            <div className="form-buttons mt-5">
                {errorMessage && <p className="fail-warning basis-full text-center red">{errorMessage}</p>}
                <button className="form-button mx-3" onClick={handleCancelClick}>Cancel</button>
                <button type="submit" className="form-button">Update avatar</button>
            </div>
        </Form>
    </div>
}