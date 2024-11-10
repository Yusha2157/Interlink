import {Routes , Route, Navigate} from "react-router-dom";
import Chat from "./pages/chat";
import Register from "./pages/register";
import Login from "./pages/login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
import Sidebar from "./components/sidebar";
;


function App() {

  const { user } = useContext(AuthContext);

  return (
    <div className="mainBody">
      <ChatContextProvider user = {user}>
        <Sidebar />
        <div className="mainContainer">
            <Routes>
            <Route path="/" element = {user ?<Chat /> : <Login/>} />
            <Route path="*" element = {<Navigate to="/" />} />
            <Route path="/login" element = {user ? <Chat /> : <Login />} />
            <Route path="/register" element = {user ? <Chat /> : <Register />} />
          </Routes>
        </div>
      </ChatContextProvider>
    </div>
  )
}

export default App
