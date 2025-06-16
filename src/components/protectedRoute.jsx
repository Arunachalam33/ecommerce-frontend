import React,{useContext} from "react";
import {Navigate} from  "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function ProtectedRoute({children}){
    const {isAuthenticated}=useContext(AuthContext);

    if(!isAuthenticated){
        navigate("/login", { state: { from: location } });

    }
    return children;
}