import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import "./detail.css"

const Detail = () => {

    const {chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock} = useChatStore();
    const {currentUser} = useUserStore();

    const handleBlock = async ()=>{
        if(!user) return;

        const userDocRef = doc(db, "users", currentUser.id) 

            try{
                await updateDoc(userDocRef, {
                    blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
                })

                changeBlock()
            }catch(err){
                console.log(err);
            }
    }
    return ( 
        <div className="detail">
            <div className="user">
                <img src={user?.avatar || "./avatar.png"} alt="" />
                <h2>{user?.username}</h2>
                <p>aSd adsad aw dswd msdm mksl..</p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Privacidade e Ajuda</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Fotos partilhadas</span>
                        <img src="./arrowDown.png" alt="" />
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://forbes.com.br/wp-content/uploads/2023/09/Melhores-Fotos-Espaciais.webp" alt="" />
                                <span>phorasa 2</span>
                            </div>
                            <img src="./download.png" alt="" className="icon" />
                        </div>
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://forbes.com.br/wp-content/uploads/2023/09/Melhores-Fotos-Espaciais.webp" alt="" />
                                <span>phorasa 2</span>
                            </div>
                            <img src="./download.png" alt=""   className="icon"/>
                        </div>
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://forbes.com.br/wp-content/uploads/2023/09/Melhores-Fotos-Espaciais.webp" alt="" />
                                <span>phorasa 2</span>
                            </div>
                        <img src="./download.png" alt=""  className="icon"/>
                        </div>
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://forbes.com.br/wp-content/uploads/2023/09/Melhores-Fotos-Espaciais.webp" alt="" />
                                <span>phorasa 2</span>
                            </div>
                        <img src="./download.png" alt=""  className="icon"/>
                        </div>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Ficheiros Partilhados</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <button onClick={handleBlock}>{
                    isCurrentUserBlocked ? "Estás bloqueado" : isReceiverBlocked ? "Desbloquear" : "Bloquear"
                }
                </button>
                <button className="logout" onClick={()=> auth.signOut()}>Logout</button>
            </div>
        </div> 

    );
}
 
export default Detail