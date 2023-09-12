export default function Form ({children, ...props}){
    return <form className="text-white text-base gap-y-3 flex flex-row
    flex-wrap justify-center h-4/5  gap-7 " {...props}>
        {children}
    </form>
}