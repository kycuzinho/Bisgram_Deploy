import "./userInfo.css"
import { useUserStore } from "../../../lib/userStore";
import { auth } from "../../../lib/firebase";
import { useState } from "react";
import MorePage from "./morePage/MorePage";

const Userinfo = () => {

    const {currentUser} = useUserStore();

    const [moreMode, setMoreMode] = useState(false);

    return ( 
        <div className="userInfo">
            <div className="user">
                <img src={currentUser.avatar || "./avatar.png"} alt="" />
                <h2>{currentUser.username}</h2>
            </div>
            <div className="icons">
                <img src={moreMode ? "./more_a.png" : "./more.png"}  alt="" className="more"
                onClick={() => setMoreMode(prev=>!prev)}/>

                <img src="./video.png" alt="" />
                <img src="./edit.png" alt="" />
            </div>
            <button className="logout" onClick={()=> auth.signOut()}>Logout</button>

            {moreMode &&  <MorePage/>}
        </div> 

    );
}
 
export default Userinfo