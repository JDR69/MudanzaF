import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest } from "../api/auth";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    const setUserData = (data) => {
        setUser(data);
    };

    // const signin = async (user) => {
    //     try {
    //         const res = await loginRequest(user);
    //         setUser(res.data);
    //         localStorage.setItem('token', res.data.token);
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    const signin = (data) => {
        // Aquí puedes validar cualquier cosa si quieres, por ahora simulado
        const fakeUser = {
          id: 1,
          name: "Demo User",
          email: data.email,
        };
        setUser(fakeUser);
      };


    useEffect(() => {
    async function checklogin() {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const res = await vericarToken(token);
            if (!res.dat) {
                setLoading(false);
                return;
            }
            setUser(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }

    }

    checklogin();
}, []);

return (
    <AuthContext.Provider value={{
        signin,
        setUserData,
        user,

    }}>
        {children}
    </AuthContext.Provider>

);
};



