import React from "react";

export const LoginContext = React.createContext({
    isAuth: false,
    isRegister: false,
    setIsAuth: () => {},
    setIsRegister: () => {}
});