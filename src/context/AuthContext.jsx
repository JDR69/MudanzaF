import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, 
    obtenerBitacoraRequest, 
    obtenerRolesRequest, 
    obtenerTipoVehiculo,
    obtenerVehiculo,
    obtenerCatalogoVehiculo,
    obtenerChofer,
    obtenerSeguros
} from "../api/auth";

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
    const [roles, setRoles] = useState([]);
    const [bitacora, setBitacora] = useState([])
    const [tipoVehiculo, setTipoVehiculo] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);
    const [catalogoVehiculos, setCatalogoVehiculos] = useState([]);
    const [choferes, setChoferes] = useState([]);
    const [seguros, setSeguros] = useState([]);

    const setUserData = (data) => {
        setUser(data);
    };

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            setUser(res.data.user)
            console.log(res.data);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user',JSON.stringify(res.data.user));
        } catch (err) {
            throw err; 
          }
    }

    
    const cargarDatos = async () =>{
        try {

            const [resRoles,resBitacora, resTipoVehiculo, resVehiculos, resCatalogoVehiculos,resSeguros] = await Promise.all([
                obtenerRolesRequest(),
                obtenerBitacoraRequest(),
                obtenerTipoVehiculo(),
                obtenerVehiculo(),
                obtenerCatalogoVehiculo(),
                obtenerSeguros(),
            ])
            setRoles(resRoles.data)
            setBitacora(resBitacora.data)
            console.log(resTipoVehiculo.data)
            setTipoVehiculo(resTipoVehiculo.data)
            setVehiculos(resVehiculos.data)
            console.log(resVehiculos.data)
            setCatalogoVehiculos(resCatalogoVehiculos.data)
            console.log(resSeguros.data)
            setSeguros(resSeguros.data)
        } catch (err) {
            throw err;
        }
    }

    const cargarChoferes = async () => {
        try {
            const res = await obtenerChofer();
            console.log(res.data)
            setChoferes(res.data)
        } catch (err) {
            throw err;
        }
    }
  

    useEffect(() => {
    async function checklogin() {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem("user");
        if (!token) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            // const res = await vericarToken(token);
            // if (!res.dat) {
            //     setLoading(false);
            //     return;
            // }
            cargarDatos();
            cargarChoferes();
            setUser(JSON.parse(savedUser));
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
        cargarDatos,
        user,
        roles,
        bitacora,
        tipoVehiculo,
        vehiculos,
        catalogoVehiculos,
        choferes,
        cargarChoferes,
        seguros
    }}>
        {children}
    </AuthContext.Provider>

);
};



