import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, 
    obtenerBitacoraRequest, 
    obtenerRolesRequest, 
    obtenerTipoVehiculo,
    obtenerVehiculo,
    obtenerCatalogoVehiculo,
    obtenerChofer,
    obtenerSeguros,
    obtenerCategoriasRequest,
    obtenerMateriales,
    obtenerInmuebles,
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
    const [inmuebles, setInmuebles] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [materiales, setMateriales] = useState([]);

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

            const [resRoles,resBitacora, resTipoVehiculo, resVehiculos, resCatalogoVehiculos,resSeguros,resInmuebles,resCategorias,resMateriales] = await Promise.all([
                obtenerRolesRequest(),
                obtenerBitacoraRequest(),
                obtenerTipoVehiculo(),
                obtenerVehiculo(),
                obtenerCatalogoVehiculo(),
                obtenerSeguros(),
                obtenerInmuebles(),
                obtenerCategoriasRequest(),
                obtenerMateriales()
            ])
            setRoles(resRoles.data)
            setBitacora(resBitacora.data)
            setTipoVehiculo(resTipoVehiculo.data)
            setVehiculos(resVehiculos.data)
            setCatalogoVehiculos(resCatalogoVehiculos.data)
            console.log(resCatalogoVehiculos.data)
            setSeguros(resSeguros.data)
            setInmuebles(resInmuebles.data)
            setCategorias(resCategorias.data)
            setMateriales(resMateriales.data)
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
        seguros,

        inmuebles,
        setInmuebles,
        categorias,
        setCategorias,
        materiales,
        setMateriales


    }}>
        {children}
    </AuthContext.Provider>

);
};



