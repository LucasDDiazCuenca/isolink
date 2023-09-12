import retrieveUser from "../logic/retrieveUser";
import { context } from "../ui"
import { useState, useEffect } from "react";
import Posts from "../components/Posts"
import AddPostModal from "../components/AddPostModal";
import UpdateAvatar from "../components/UpdateAvatar";
import UpdatePassword from "../components/UpdatePassword";
import UpdatePost from "../components/UpdatePost";



export default function Home({ onLogOutClick }) {
    const [view, setView] = useState("posts");
    const [modal, setModal] = useState(null);
    const [postId, setPostId] = useState(null);
    const [lastPostUpdate, setLastPostUpdate] = useState(Date.now())
    const [user, setUser] = useState();
    const [avatar, setAvatar] = useState(null)


    useEffect(() => {
        try {
            retrieveUser(context.token, (error, user) => {
                if (error) {
                    alert(error.message)
                    return;
                }
                setUser(user);
            })
        } catch (error) {
            alert(error.message)
        }
    }, [])


    //? SETTINGS, LOG OUT Y HOME
    const handleSettingsClick = () => setView(null);
    const handleLogOutClick = () => {
        delete context.token
        onLogOutClick();
    }
    const handleHomeClick = () => setView("posts")
    //? SETTINGS --> AVATAR 
    const handleAvatarAnchor = (event) => {
        event.preventDefault();
        setView("avatar");
        setLastPostUpdate(Date.now());
    }
    const handleUpdatedAvatar = (url) => {
        setAvatar(url)
        setView("posts")
    }

    const handleCancelUpdatedAvatar = () => setView("posts")

    //? SETTINGS --> PASSWORD 
    const handlePasswordAnchor = (event) => {
        event.preventDefault();
        setView("password");
    }
    const handleUpdatedPassword = () => setView("posts");
    const handleCancelUpdatedPassword = () => setView("posts");

    //? ADD POST MODAL 
    const handleFooterButtonClick = () => setModal("addPost")
    const handleCancelAddPost = () => setModal(null)
    const handleCreatedPost = () => {
        setModal(null);
        setLastPostUpdate(Date.now())
    }

    //? UPDATE POST  MODAL
    const openEditPostModal = (id) => {
        setModal("updatePost")
        setPostId(id)
    }
    const CloseUpdatePostModal = () => setModal(null)

    const HandleUpdatedPost = () => {
        setModal(null);
        setLastPostUpdate(Date.now());
    }
    //? SAVE POSTS 
    const handleFooterFavButtonClick = () => setView("savedPosts")
    //? USER POSTS
    const handleFooterUserPostsClick = () => setView("userPosts")


    console.log("Home -> render")

    return <div className="home h-0">
        <header className="home-header">
            <h1 className="px-3 text-3xl cursor-pointer" onClick={handleHomeClick}>Home</h1>
            <div className="flex gap-3 p-2">
                <img className="w-10 h-10 filter invert cursor-pointer rotate-slow" src="https://www.iconpacks.net/icons/2/free-settings-icon-3110-thumb.png" alt="" onClick={handleSettingsClick} />
                <button className="form-button active:red" onClick={handleLogOutClick} >Log out</button>
            </div>
            <div className="flex basis-full items-center">
                {user && <>
                    <img className="w-14 h-14 rounded-full transition-all duration-200 hover:scale-150 mx-4 mb-3" src={avatar || user.avatar} alt="default avatar" />
                    <h2 className="text-xl">{user.name}</h2>
                </>}
            </div>
            <nav className={`home-menu ${view === null ? "home-menu-transition" : ""} ${view === "avatar" || view === "posts" || view === "password" || view === "savedPosts" || view === "userPosts" ? "" : "home-menu-transition"}`}>
                <ul className="basis-full flex gap-6 bg-zinc-700 p-4 rounded-md">
                    <li><a href="" className="hover:green" onClick={handlePasswordAnchor}>change password</a></li>
                    <li><a href="" className="hover:green" onClick={handleAvatarAnchor}>Avatar</a></li>
                    <li><a href="" className="home-menu-option3 hover:green">option 3</a></li>
                </ul>
            </nav>
        </header>

        <main className={`container ${modal === "addPost" || view === null || modal === "updatePost" ? "fade" : ""} ${view === "avatar" || view === "posts" || view === "password" || modal === null ? "" : "fade"}`}>

            {view === "posts" && <Posts
                onEditPostButtonClick={openEditPostModal}
                lastPostsUpdate={lastPostUpdate}
                view={view}
            />}
            {view === "savedPosts" && <Posts
                onEditPostButtonClick={openEditPostModal}
                lastPostsUpdate={lastPostUpdate}
                view={view}
            />}
            {view === "userPosts" && <Posts
                onEditPostButtonClick={openEditPostModal}
                lastPostsUpdate={lastPostUpdate}
                view={view}
            />}
            {view === "avatar" && <UpdateAvatar
                onUpdatedAvatar={handleUpdatedAvatar}
                onCancelClick={handleCancelUpdatedAvatar}
            />}
            {view === "password" && <UpdatePassword
                onUpdatedPassword={handleUpdatedPassword}
                onCancelClick={handleCancelUpdatedPassword}
            />
            }
        </main>

        <footer className="footerArea">
            {modal === "updatePost" && <UpdatePost
                postId={postId}
                onUpdatedPost={HandleUpdatedPost}
                onCancelClick={CloseUpdatePostModal}
            />}
            {modal === "addPost" && <AddPostModal
                onCancelClick={handleCancelAddPost}
                onCreatedPost={handleCreatedPost}
            />}

            <button className="form-button" onClick={handleHomeClick}><span className="material-symbols-outlined">home</span></button>
            <button className="form-button"><span className="material-symbols-outlined">sell</span></button>
            <button className="form-button" onClick={handleFooterButtonClick}><p className="p-1">+</p></button>
            <button className="form-button" onClick={handleFooterFavButtonClick}><span className="material-symbols-outlined">bookmarks</span></button>
            <button className="form-button" onClick={handleFooterUserPostsClick}><span className="material-symbols-outlined">account_circle</span></button>
        </footer>
    </div>

}
