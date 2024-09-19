import { useEffect, useState } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List"; 
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";

const App = () => {

  const {currentUser, isLoading, fetchUserInfo} = useUserStore()
  const {chatId} = useChatStore()

  // State to toggle between Login and Register
  const [showRegister, setShowRegister] = useState(false);

  useEffect(()=> {
    const unSub = onAuthStateChanged(auth, (user)=>{
      fetchUserInfo(user?.uid);
    });

    return ()=> {
      unSub();
    }
  },[fetchUserInfo]);

  if (isLoading) return <div className="loading">Loading...</div>;

  const handleToggle = () => setShowRegister((prev) => !prev);

  return (
    <div className="container">
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      ) : (
        showRegister ? (
          <Register onToggle={handleToggle} />
        ) : (
          <Login onToggle={handleToggle} />
        )
      )}
      <Notification />
    </div>
  );

  /* return (
    <div className='container'>
      { currentUser ? (
          <>
            <List/>
            {chatId && <Chat/>}
            {chatId && <Detail/>}
          </>
        ) : (<Login/>)
      }
      <Notification/>
    </div>
  ) */

  
};


export default App