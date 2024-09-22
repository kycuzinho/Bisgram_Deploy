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
    const [isPhotosOpen, setIsPhotosOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null); // State for the selected photo

    useEffect(() => {
        if (!chatId) return;

        const chatDocRef = doc(db, "chats", chatId);

        const unsubscribe = onSnapshot(chatDocRef, (snapshot) => {
            if (snapshot.exists()) {
                const chatData = snapshot.data();
                const photoMessages = chatData.messages.filter((message) => message.img);
                setPhotos(photoMessages.map((msg) => msg.img));
            }
        });

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

    const togglePhotos = () => {
        setIsPhotosOpen(prev => !prev);
    };

    const openPhoto = (photoUrl) => {
        setSelectedPhoto(photoUrl); // Set the selected photo to be displayed in the modal
    };

    const closeModal = () => {
        setSelectedPhoto(null); // Clear the selected photo to close the modal
    };

    return (
        <div className="detail">
            <div className="user">
                <img src={user?.avatar || "./avatar.png"} alt="" />
                <h2>{user?.username}</h2>
                <p>(Descição)</p>
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
                    {isPhotosOpen && (
                        <div className="photos">
                            {photos.length > 0 ? (
                                photos.map((photoUrl, index) => (
                                    <div className="photoItem" key={index} >
                                        <div className="photoDetail">
                                            <img src={photoUrl} alt={`shared-img-${index}`} onClick={() => openPhoto(photoUrl)}/>
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
            </div>

            {selectedPhoto && ( // Modal for displaying the selected photo
            <div className="modal" onClick={closeModal}>
                <img src={selectedPhoto} alt="Larger view" />
                <span className="close" onClick={closeModal}>&times;</span>
            </div>
)}
        </div>
    );
};

export default Detail;
