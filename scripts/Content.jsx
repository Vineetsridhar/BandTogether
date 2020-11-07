
import * as React from 'react';

import { socket } from './Socket';

export function Content() {
    React.useEffect(() => {
        socket.emit("key_up", {"note": 'a', "instrument": "instrument"})
        socket.on("key_up", (data) => {
            console.log(data)
        })
    }, [])
    return (
        <div>
            <h1>Grocery List</h1>
            <button>Send</button>
        </div>
    );
}
