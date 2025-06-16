import React,{useState} from "react"
import axios from "axios";
import {useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";


function Register(){

     const API="https://ecommerce-backend-lygx.onrender.com";
    const navigate=useNavigate();
    
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
            const res=await axios.post(`${API}/api/register`,form);
            if(res.status===200){
                alert(res.data.message)
            navigate("/login");
            }else{
                alert("Registration failed")
            }
            
        }catch(err){
            if(err.response&&err.response.data&&err.response.data.message){
                alert(`Error:${err.response.data.message}`);
            }else{
                alert("Registration Unsuccessfull")
            }
            console.error("Registration Failed",err);
        }
    }
   
    return(
        <Container maxWidth="xs" >
            <Box component="form" onSubmit={handleSubmit } mt={8}>
            <Typography variant="h5" mb={2}>Register</Typography>
                <TextField fullWidth name="username" type="text" onChange={handleChange} placeholder="username" value={form.username}/>
                <TextField  fullWidth name="password" type="text" onChange={handleChange} placeholder="password" value={form.password}/>
                <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>Register</Button>
                <Button fullWidth onClick={() => navigate("/login")} sx={{ mt: 1 }}>Login</Button>                                                                                                                                                                                                         `
            </Box>
        </Container>
        
    );
}
export default Register;