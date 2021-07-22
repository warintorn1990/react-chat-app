import React, { useState, useEffect } from "react";

import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://localhost:9000");

export default function Chat() {
  const [username, setUsername] = useState();
  const [message, setMessage] = useState();
  const [showNameUser, setshowNameUser] = useState("None");
  const [listMessage, setListMessage] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setListMessage((listMessage) => [...listMessage, data]);
    });
  }, []);

  const onTypingMessage = (e) => {
    setMessage(e.target.value);
  };

  const onChangeName = (e) => {
    setUsername(e.target.value);
  };

  const changeName = () => {
    socket.emit("change_username", { username: username });
    setshowNameUser(username);
  };

  const sendMessage = () => {
    socket.emit("new_message", { message: message });
    setMessage('');
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">{showNameUser}</div>
        <div className="card-body">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Change your username"
              onChange={onChangeName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-warning"
                type="button"
                id="usernameBtn"
                value={username}
                onClick={changeName}
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* List Message*/}
      <div className="message-box">
        <ul className="list-group list-group-flush" id="message-list">
          {listMessage.map((data, index) => (
            <li key={index}>
              {data.username} : {data.message}{" "}
            </li>
          ))}
        </ul>
        <div className="info" />
      </div>
      <div className="card-footer">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            id="message"
            value={message}
            placeholder="Send new message"
            onChange={onTypingMessage}
          />
          <button
            className="btn btn-success"
            type="button"
            id="messageBtn"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
