import React,{useState} from "react"
import axios from "axios";
import {useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

function Login(){

    const API="http://localhost:4000";
    const navigate=useNavigate();
    const {login}=useContext(AuthContext);
    const [form,setform]=useState({
        username:"",
        password:""
    });


    function handleChange(event){
        const{name,value}=event.target;
        setform((prev)=>({...prev,[name]:value}));
    }

    async function  handleSubmit(event){
        event.preventDefault();
        try{
            const res=await axios.post(`${API}/api/login`,form);
            const token=res.data.token;
            login(token);
            alert("Login Successfull");
            navigate("/products",{state:{refresh:true}});
        }catch(err){
            alert("Login failed");
            console.error("Login Failed",err);
        }
    }
   
    return(
        <Container maxWidth="xs" >
            <Box component="form" onSubmit={handleSubmit } mt={8}>
            <Typography variant="h5" mb={2}>Login</Typography>
                <TextField fullWidth name="username" type="text" onChange={handleChange} placeholder="username" value={form.username}/>
                <TextField  fullWidth name="password" type="text" onChange={handleChange} placeholder="password" value={form.password}/>
                <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>Login</Button>
                <Button fullWidth onClick={() => navigate("/register")} sx={{ mt: 1 }}>Register</Button>                                                                                                                                                                                                         `
            </Box>
        </Container>
        
        
    );
}
export default Login;