export default function Form({ children, ...props }) {
    return <form className="text-white max-w-sm p-5 text-base gap-y-3 flex flex-col justify-center z-10 m-auto w-full h-2/5" {...props}>
        {children}
    </form>
}