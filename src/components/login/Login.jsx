import { useState, useEffect } from "react";
import "./login.css"
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload";

const Login = ({onToggle}) => {

    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) =>{
        e.preventDefault()
        setLoading(true);

        const formData = new FormData(e.target)

        const {email, password} = Object.fromEntries(formData);

        try{
        
            await signInWithEmailAndPassword(auth, email, password);

        }catch(err){
            console.log(err)
            toast.error(err.message)
        }
        finally{
            setLoading(false);
        }

    }

    return ( 
        <div className="login">
            <div className="item">
                <h2>Bem vindo de volta...</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Email" name = "email"/>
                    <input type="password" placeholder="Password" name = "password"/>
                    <button disabled={loading}>{loading ? "Loading" : "Log In"}</button>
                </form> 

                <div className="toogle-container">
                    <span className="toggle-text">
                        Não tens uma conta? <span className="clickable-text"  onClick={onToggle}>Registar</span>
                    </span>
                </div>
            </div>
        </div>
    );
}
 
export default Login;   