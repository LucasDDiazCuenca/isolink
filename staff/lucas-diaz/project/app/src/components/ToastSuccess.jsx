export default function ToastSuccess({ message }) {
    return (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-10/12 h-20 sm:h-24 z-50 bg-[#5EEFB2] rounded-3xl">
            <p className="px-5 pt-3">
                <strong>Task completed succesfully 👍🏻 </strong>
            </p>
            <p className="px-6 pt-3">{message}</p>
        </div>
    );
}
