
export default function AppH1Card({ user, type = "home" }) {

    const choosePhrase = () => {
        switch (type) {
            case "home":
                return user?.avatar ? "Welcome back 👋🏻" : "Welcome for the first time 🎉"
            case "profile":
                return "Here you can edit your profile"
            case "friends":
                return "See your friends manager"
            case "avatar":
                return user?.avatar ? "Custom here your avatar" : "Create here your avatar"
        }
    }

    return <article className="header-card text-left max-w-md w-10/12 bg-[#f5c3ef] p-3 rounded-xl m-4">
        <p className="text-sm">
            hi {user?.name},
        </p>
        <h1 className="font-bold text-xl">
            {choosePhrase()}
        </h1>
    </article>
}


