
export default function AppHeader({ ...props }) {
    return <header className="flex justify-center border-b-2 border-zinc-100" {...props}>
        <div className="logo w-16 h-16">
            <img src="./image/IsoLink-logo.png" />
        </div>
    </header>
}
