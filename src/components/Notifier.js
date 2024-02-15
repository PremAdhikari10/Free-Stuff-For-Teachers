import React, { useState, useEffect } from 'react';

export const Notifier = ({ message, setMessage }) => {
    const [notification, setNotification] = useState(false);

    useEffect(() => {
        if (message) {
            setNotification(true);
            const timer = setTimeout(() => {
                setNotification(false);
                setMessage('')
            }, 4000)
            return () => clearTimeout(timer)
        }

    }, [message, setMessage])

    return (
        <div className={`notification ${notification ? 'show' : ''}`}>
            {message}
        </div>
    )
    //const [message, setMessage] = useState("")
    //setMessage("This is Prem")
  //  <Notifier message={message} setMessage={setMessage} />
    //<>
}