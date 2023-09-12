export default function Alert ({message, onAccept}){
    console.log("Alert -> render")


    function handleAcceptAlertClick () {
        onAccept()
    }


    return <div>
    <p>{message}</p>
    <button onClick={handleAcceptAlertClick}>Accept</button>
    </div>
}