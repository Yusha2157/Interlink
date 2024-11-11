import {Routes , Route, Navigate} from "react-router-dom";
import Chat from "./pages/chat";
import Register from "./pages/register";
import Login from "./pages/login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
import Sidebar from "./components/sidebar";
import Main from "./pages/Main";



function App() {

  const { user } = useContext(AuthContext);

  return (
    <div className="mainBody">
      <ChatContextProvider user = {user}>
        <Sidebar />
        <div className="mainContainer">
            <Routes>
            <Route path="/" element = {user ?<Main /> : <Login/>} />
            <Route path="*" element = {<Navigate to="/" />} />
            <Route path="/login" element = {user ? <Main /> : <Login />} />
            <Route path="/register" element = {user ? <Main /> : <Register />} />
            <Route path="/chat" element = { user ? <Chat /> : <Login/>}  />
          </Routes>
        </div>
      </ChatContextProvider>
    </div>
  )
}

export default App
