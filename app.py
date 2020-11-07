import flask, os
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, join_room, leave_room, emit, rooms as r

app = flask.Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on("key_up")
def key_up(key_data):
    emit(
        "key_up",
        {"note": key_data["note"], "instrument": key_data["instrument"]},
    )

@socketio.on("key_down")
def key_down(key_data):
    emit(
        "key_down",
        {"note": key_data["note"], "instrument": key_data["instrument"]},
    )

if __name__ == "__main__":
    socketio.run(
        app,
        port=int(os.getenv("PORT", 8080)),
        host=os.getenv("IP", "0.0.0.0"),
        debug=True,
    )