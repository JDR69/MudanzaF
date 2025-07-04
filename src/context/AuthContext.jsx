import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, 
    obtenerBitacoraRequest, 
    obtenerUsuariosRequest,
    obtenerRolesRequest, 
    obtenerPermisosRequest,
    obtenerTipoVehiculo,
    obtenerVehiculo,
    obtenerCatalogoVehiculo,
    obtenerChofer,
    obtenerSeguros,
    obtenerCategoriasCompletaRequest,
    obtenerCategoriasRequest,
    obtenerMaterialesRequest,
    obtenerMaterialesCompletasRequest,
    obtenerInmuebles,
    obtenerBackups,/**CGGC **** */
    obtenerComentarios
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
    const [user, setUser] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
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
    const [materialesActivos, setMaterialesActivos] = useState([]);
    const [categoriasActivos, setCategoriasActivos] = useState([]);
    const [backups,setBackups]=useState([]);/***********CGGC */
    const [comentarios,setComentarios]=useState([])
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

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    }

    
    const cargarDatos = async () =>{
        try {

            const [
                resRoles,
                resBitacora,
                resTipoVehiculo, 
                resVehiculos, 
                resCatalogoVehiculos,
                resSeguros,
                resInmuebles,
                resCategorias,
                resMateriales,
                resMaterialesActivos,
                resCategoriasActivos,
                resUsuarios,
                resPermisos,
            ] = await Promise.all([
                obtenerRolesRequest(),
                obtenerBitacoraRequest(),
                obtenerTipoVehiculo(),
                obtenerVehiculo(),
                obtenerCatalogoVehiculo(),
                obtenerSeguros(),
                obtenerInmuebles(),
                obtenerCategoriasCompletaRequest(),
                obtenerMaterialesCompletasRequest(),
                obtenerMaterialesRequest(),
                obtenerCategoriasRequest(),
                obtenerUsuariosRequest(),
                obtenerPermisosRequest(),
            ])
            setRoles(resRoles.data)
            console.log(resBitacora.data)
            setBitacora(resBitacora.data)
            setTipoVehiculo(resTipoVehiculo.data)
            setVehiculos(resVehiculos.data)
            console.log(resCatalogoVehiculos.data)
            setCatalogoVehiculos(resCatalogoVehiculos.data)
            setSeguros(resSeguros.data)
            setInmuebles(resInmuebles.data)
            setCategorias(resCategorias.data)
            setMateriales(resMateriales.data)
            setMaterialesActivos(resMaterialesActivos.data)
            setCategoriasActivos(resCategoriasActivos.data)
            setUsuarios(resUsuarios.data)
            console.log(resPermisos.data)
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

    /*******CGGC******/
    const cargarBackup=async ()=>{
        try{
            const res=await obtenerBackups();
            const data=await res.json()
            console.log(data)
            setBackups(data)
        }catch(error){
            console.log("Error Backup")
            throw error;
        }
    }
    const cargarComentarios=async ()=>{
        try{
            const res=await obtenerComentarios();
            console.log(res.data)
            setComentarios(res.data)
        }catch(error){
            console.log("Error comentario")
            throw error;
        }
    }
  

    useEffect(() => {
    async function checklogin() {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem("user");
        if (!token) {
            setLoading(false);
            setUser(null);
            return;
        }
        try {
            setLoading(true);
            cargarDatos();
            cargarChoferes();
            ////*******CGGC */
            cargarBackup();
            cargarComentarios();
            setUser(JSON.parse(savedUser));
            setLoading(false);
        } catch (error) {
            console.error(error);
            logout();
            setLoading(false);
            navigate('/login');
        }

    }

    checklogin();
}, []);

return (
    <AuthContext.Provider value={{
        signin,
        
        usuarios,
        setUsuarios,

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
        
        backups,
        setBackups,
        comentarios,
        setComentarios,
        inmuebles,
        setInmuebles,
        categorias,
        setCategorias,
        materiales,
        setMateriales,
        materialesActivos,
        setMaterialesActivos,
        categoriasActivos,
        setCategoriasActivos,

        logout


    }}>
        {children}
    </AuthContext.Provider>

);
};



