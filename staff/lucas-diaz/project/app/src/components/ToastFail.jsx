export default function ToastFail({ message }) {
    return (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-10/12 h-20 sm:h-24 z-50 bg-[#F3A0A0] rounded-3xl">
            <p className="px-5 pt-3">
                <strong>Opps...something went wrong 😞</strong>
            </p>
            <p className="px-6 pt-3">{message}</p>
        </div>
    );
}
