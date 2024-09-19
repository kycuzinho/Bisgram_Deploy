import "./register.css"
import { useState } from "react";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload";

const Register = ({ onToggle }) => {

    const[avatar, setAvatar] = useState({
        file:null,
        url:""
    });

    const [loading, setLoading] = useState(false)

    const handleAvatar = (e) =>{
        if(e.target.files[0]){
            setAvatar({
                file:e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    };
    
    const handleRegister = async e =>{
        e.preventDefault()
        setLoading(true);
        
        const formData = new FormData(e.target)

        const {username, email, password} = Object.fromEntries(formData);

        try{

            const res = await createUserWithEmailAndPassword(auth, email, password);

            const imgUrl = await upload(avatar.file);

            await setDoc(doc(db, "users", res.user.uid), {
                username,
                email,
                avatar: imgUrl,
                id: res.user.uid,
                blocked:[]
            });
            
            await setDoc(doc(db, "userchats", res.user.uid), {
                chats:[],
            });

            toast.success("Account created")

        }catch(err){
            console.log(err)
            toast.error(err.message)
        } finally{
            setLoading(false);
        } 
    };

    return ( 
        <div className="register">
            <div className="item">
                <h2>Registar</h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor="file">
                        <img src={avatar.url || "./avatar.png"} alt="" />
                        Adicionar Foto</label>
                    <input type="file" id = "file" style={{display:"none"}} onChange={handleAvatar}/>
                    <input type="text" placeholder="Nome do Usuario" name = "username"/>
                    <input type="text" placeholder="Email" name = "email"/>
                    <input type="password" placeholder="Password" name = "password"/>
                    <button disabled={loading}>{loading ? "Loading" : "Sign Up"}</button>
                </form> 
                
                <div className="toggle-container">
                    <span className="toggle-text">
                        Já tens uma conta? <span className="clickable-text"  onClick={onToggle}>Logar</span>
                    </span>
                </div>
            </div>
        </div>
    );
}
 
export default Register;   