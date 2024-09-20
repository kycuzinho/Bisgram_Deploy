import "./morePage.css"
import { auth } from "../../../../lib/firebase";

const MorePage = () => {
    return ( 
        <div className="options"> 
            
            <button className="logout" onClick={()=> auth.signOut()}>Logout</button>

        </div> );
        
}
 
export default MorePage;