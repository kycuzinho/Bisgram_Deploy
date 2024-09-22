import "./userInfo.css"
import { useUserStore } from "../../../lib/userStore";
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
                <img src="./edit.png" alt="" />
                
                <img src={moreMode ? "./more_a.png" : "./more.png"}  alt="" className="more"
                onClick={() => setMoreMode(prev=>!prev)}/>
                
            </div>

            {moreMode &&  <MorePage/>}
        </div> 

    );
}
 
export default Userinfo