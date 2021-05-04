import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./Home";
import ChatRoom from "./ChatRoom";

/** App Component
 *
 *  Props: NONE
 *
 *  State: NONE
 *
 *  App -> { ChatRoom -> { useChat(roomId), Form }, Home } 
 */
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/:roomName">
          <ChatRoom />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
