import { arrayRemove, arrayUnion, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useChatStore } from "../../lib/chatStore";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import "./detail.css";

const Detail = () => {
    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore();
    const { currentUser } = useUserStore();
    const [photos, setPhotos] = useState([]);
    const [isPhotosOpen, setIsPhotosOpen] = useState(false);  // Estado para controlar abertura da aba de fotos

    // Set up a real-time listener to fetch chat photos
    useEffect(() => {
        if (!chatId) return;

        const chatDocRef = doc(db, "chats", chatId);

        // Listen for real-time updates
        const unsubscribe = onSnapshot(chatDocRef, (snapshot) => {
            if (snapshot.exists()) {
                const chatData = snapshot.data();
                // Filter messages that contain images and update the photos state
                const photoMessages = chatData.messages.filter((message) => message.img);
                setPhotos(photoMessages.map((msg) => msg.img));
            }
        });

        // Cleanup the listener when the component unmounts or chatId changes
        return () => unsubscribe();
    }, [chatId]);

    const handleBlock = async () => {
        if (!user) return;

        const userDocRef = doc(db, "users", currentUser.id);

        try {
            await updateDoc(userDocRef, {
                blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
            });

            changeBlock();
        } catch (err) {
            console.log(err);
        }
    };

    // Função para alternar a visibilidade da aba de fotos
    const togglePhotos = () => {
        setIsPhotosOpen(prev => !prev);  // Alterna entre aberto e fechado
    };

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
                    <div className="title" onClick={togglePhotos}>
                        <span>Fotos Partilhadas</span>
                        <img src={isPhotosOpen ? "./arrowUp.png" : "./arrowDown.png"} alt="Toggle" />
                    </div>
                    {isPhotosOpen && (  // Condicional para exibir a aba de fotos
                        <div className="photos">
                            {photos.length > 0 ? (
                                photos.map((photoUrl, index) => (
                                    <div className="photoItem" key={index}>
                                        <div className="photoDetail">
                                            <img src={photoUrl} alt={`shared-img-${index}`} />
                                            <span>Foto {index + 1}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Nenhuma Foto Partilhada</p>
                            )}
                        </div>
                    )}
                </div>
                <div className="option">
                    <div className="title">
                        <span>Ficheiros Partilhados</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <button onClick={handleBlock}>
                    {isCurrentUserBlocked ? "Estás bloqueado" : isReceiverBlocked ? "Desbloquear" : "Bloquear"}
                </button>
                {/* <button className="logout" onClick={()=> auth.signOut()}>Logout</button> */}
            </div>
        </div>
    );
};

export default Detail;
