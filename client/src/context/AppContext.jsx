import { Children, createContext } from "react";

export const AppContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [userData, setUserData] = useState({});

const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData
}

export const AppContextProvider = ({children}) => {
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}



