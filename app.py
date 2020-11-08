import os
import flask
import flask_socketio
import threading
import time

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")

items = []


@socketio.on("key_up")
def key_up(key_data):
    socketio.emit(
        "key_up",
        {"note": key_data["note"], "instrument": key_data["instrument"]},
    )


@socketio.on("key_down")
def key_down(key_data):
    socketio.emit(
        "key_down",
        {"note": key_data["note"], "instrument": key_data["instrument"]},
        include_self=False,
    )


@socketio.on("restart_upcoming")
def key_down():
    socketio.emit(
        "upcoming_note",
        [{"note": "piano C", "delay": "0s"}, {"note": "piano G", "delay": "4s"}],
    )


@socketio.on("connect")
def connect():
    print("Conected")
    socketio.emit(
        "key_down",
        {"note": "aa", "instrument": "instrument"},
    )


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
