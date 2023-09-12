import deletePost from "../logic/deletePost.js";
import toggleLikePost from "../logic/toggleLikePost.js";
import toggleSavePostInUser from "../logic/toggleSavePostInUser.js";
import toggleHidePost from "../logic/toggleHidePost.js";
import { useContext } from "react";
import Context from "../AppContext.js";

export default function Post({ post, user, onEditPostButton, onLikeClick, onDeleteClick, OnSavedPostClick, onHidenPostClick }) {
    const { alert, freeze, unFreeze } = useContext(Context)

    const day = new Date(post.date).getDate();
    const month = new Date(post.date).getMonth() + 1;
    const year = new Date(post.date).getFullYear();
    const hour = new Date(post.date).getHours();
    const minutes = new Date(post.date).getMinutes();
    const fullDate = `${day}/${month}/${year} ${hour}:${minutes} `

    function openEditPostModal() {
        onEditPostButton(post._id);
    }

    function handleHeartClick() {
        try {
            freeze()
            toggleLikePost(post._id)
                .then(() => {
                    unFreeze()
                    onLikeClick()
                })
                .catch(error => alert(error))

        } catch (error) {
            alert(error.message)
            unFreeze()
        }
    }

    function handleDeleteClick() {
        try {
            deletePost(post._id)
                .then(() => onDeleteClick())
                .catch(error => alert(error))

        } catch (error) {
            alert(error.message)
        }
    }

    function handleSavePostClick() {
        try {
            freeze()
            toggleSavePostInUser(post._id)
                .then(() => {
                    unFreeze()
                    OnSavedPostClick()
                })
                .catch(error => alert(error))

        } catch (error) {
            alert(error.message)
        }
    }

    function handleHidePostClick() {
        try {
            freeze()
            toggleHidePost(post._id)
                .then(() => {
                    unFreeze()
                    onHidenPostClick()
                })
                .catch(error => alert(error))

        } catch (error) {
            alert(error.message)
        }
    }

    console.log("Post -> render")

    return <article className="home-post-content-article">
        <div className="flex basis-1/2 items-center gap-2">
            <img className="w-12 h-12 rounded-full m-2" src={post.author.avatar} />
            <p className="text-emerald-400 text-center">{post.userName}</p>
        </div>

        {post.userProperty ? <span className="material-symbols-rounded lockimg" onClick={handleHidePostClick}>
            {post.visibility === "public" ? "lock_open_right" : "lock"}
        </span> : null}

        {post.userProperty ? <span className="material-symbols-rounded bin" onClick={handleDeleteClick}>
            delete
        </span> : null}

        {post.userProperty ? <button className="edit-button" onClick={openEditPostModal}>Edit</button> : null}
        <div className="w-full flex relative pb-3-4">
            <img className="w-full h-full absolute object-contain" src={post.image} />
        </div>
        <div className="flex gap-1">
            <span className={post.likeCounter ? "material-symbols-rounded material-symbols-rounded-liked" : "material-symbols-rounded"} onClick={handleHeartClick}>favorite</span>
            <p className="self-center text-sm">{post.likeCounterNumber} {post.likeCounterNumber === 1 ? "like" : "likes"}</p>
        </div>

        <button className="bg-transparent border-none text-right" onClick={handleSavePostClick}><span className={`material-symbols-rounded ${user?.savedPosts.includes(post._id) ? "filled" : ""}`}>bookmark</span></button>

        <p className="text-white text-sm basis-full text-left bg-zinc-800 p-1.5 pl-3">{post.text}</p>
        <time className="basis-full text-right text-xs text-gray-500 pr-3 pb-2">{fullDate}</time>
    </article>
}  