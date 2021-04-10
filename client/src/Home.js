import { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

/** Home Component
 *
 *  Props: NONE
 *
 *  State:
 *    - roomName: string received by user input
 *
 *  App -> Home
 */
function Home() {
  const [roomName, setRoomName] = useState(null);

  function handleChange(evt) {
    setRoomName(evt.target.value);
  }

  return (
    <div className="Home-div text-center">
      <div>
        <h1 style={{ color: "#575fd8", fontWeight: "bold" }} className="mb-1">
          Welcome to Chatney
        </h1>
        <p className="sub mb-5">Kinda like chutney but a bit more saucy</p>
        <div className="formField inputDiv col-8 mx-auto">
          <input
            required
            onChange={handleChange}
            className="Home-input col-12"
          />
          <label className="formLabel col-12 text-left">Enter Room Name</label>
        </div>
        <div className="btnDiv col-5 mx-auto px-0">
          <Link to={`/${roomName}`} className="Home-btn">
            Join Room
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
