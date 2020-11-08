import os
import logging
import flask
import flask_socketio
import threading
import time

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")
logging.getLogger("werkzeug").setLevel(logging.ERROR)


items = []

users = {}

instruments = ["accordion",  "acoustic_grand_piano", "acoustic_guitar_nylon", "steel_drums", "alto_sax", "synth_drum"]

song = [{ "note": "E4", "delay": "0s", "instrument":instruments  },
    { "note": "E4", "delay": "0.5s", "instrument":instruments },
    { "note": "F4", "delay": "1.0s", "instrument":instruments },
    { "note": "G4", "delay": "1.5s", "instrument":instruments },
    { "note": "G4", "delay": "2.0s", "instrument":instruments },
    { "note": "F4", "delay": "2.5s", "instrument":instruments },
    { "note": "E4", "delay": "3.0s", "instrument":instruments },
    { "note": "D4", "delay": "3.5s", "instrument":instruments },
    { "note": "C4", "delay": "4.0s", "instrument":instruments },
    { "note": "C4", "delay": "4.5s", "instrument":instruments },
    { "note": "D4", "delay": "5.0s", "instrument":instruments },
    { "note": "E4", "delay": "5.5s", "instrument":instruments },
    { "note": "E4", "delay": "6.0s", "instrument":instruments },
    { "note": "D4", "delay": "6.5s", "instrument":instruments },
    { "note": "D4", "delay": "7.0s", "instrument":instruments },

    { "note": "C4", "delay": "0s", "instrument":["acoustic_bass"] },
    { "note": "E4", "delay": "0s", "instrument":["acoustic_bass"] },
    { "note": "G4", "delay": "0s", "instrument":["acoustic_bass"] },

    { "note": "C4", "delay": "3s", "instrument":["acoustic_bass"] },
    { "note": "E4", "delay": "3s", "instrument":["acoustic_bass"] },
    { "note": "G4", "delay": "3s", "instrument":["acoustic_bass"] },

    { "note": "C4", "delay": "6s", "instrument":["acoustic_bass"] },
    { "note": "E4", "delay": "6s", "instrument":["acoustic_bass"] },
    { "note": "G4", "delay": "6s", "instrument":["acoustic_bass"] },


    ],

@socketio.on("key_up")
def key_up(key_data):
    socketio.emit(
        "key_up",
        key_data,
        include_self=False,
    )


@socketio.on("key_down")
def key_down(key_data):
    print(key_data)
    if key_data["name"] not in users:
        users[flask.request.sid] = {
            "name": key_data["name"],
            "instrument": key_data["instrument"],
        }
        socketio.emit(
            "all_users",
            users,
            include_self=False,
        )
    key_data["sid"] = flask.request.sid
    socketio.emit(
        "key_down",
        key_data,
        include_self=False,
    )


@socketio.on("restart_upcoming")
def key_down():
    socketio.emit(
        "upcoming_note",
        song
    )


@socketio.on("disconnect")
def disconnect():
    del users[flask.request.sid]


@app.route('/get_music')
def get_music():
    return song

@app.route("/")
def hello():
    return flask.render_template("index.html")


if __name__ == "__main__":
    socketio.run(
        app,
        host=os.getenv("IP", "0.0.0.0"),
        port=int(os.getenv("PORT", 8080)),
        debug=True,
    )
