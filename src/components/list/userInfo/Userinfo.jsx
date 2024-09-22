import "./userInfo.css"
import { useUserStore } from "../../../lib/userStore";
import { useState } from "react";
import MorePage from "./morePage/MorePage";
import EditNamePage from "./editNamePage/EditNamePage"

const Userinfo = () => {

    const {currentUser} = useUserStore();
    const [moreMode, setMoreMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    
    
    return ( 
        <div className="userInfo">
            <div className="user">
                <img src={currentUser.avatar || "./avatar.png"} alt="" />
                <h2>{currentUser.username}</h2>
            </div>
            <div className="icons">
                <img src={editMode ? "./edit.png" : "./edit.png" } alt="" className="edit"
                onClick={() => setEditMode(prev=>!prev)}/>
                
                <img src={moreMode ? "./more_a.png" : "./more.png"}  alt="" className="more"
                onClick={() => setMoreMode(prev=>!prev)}/>
                
            </div>

            {moreMode &&  <MorePage/>}
            {editMode &&  <EditNamePage/>}
        </div> 

    );
}
 
export default Userinfo