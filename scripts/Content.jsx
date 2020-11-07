
import React, {useEffect} from 'react';
import { socket } from './Socket';

export function Content() {
    useEffect(() => {
        socket.emit("key_up", {"note": 'a', "instrument": "instrument"})
        socket.on("key_up", (data) => {
            console.log(data)
        })
    }, [])

    return (
        <div>
            <button>Send</button>
        </div>
    );
}
