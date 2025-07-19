import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContex';
import axios from 'axios';

const CaptainProtectWrapper = ({ children }) => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate();
    const { captainData, setCaptainData } = React.useContext(CaptainDataContext);
    const { isLoading, setIsLoading } = React.useContext(CaptainDataContext);

    useEffect(() => {
        if(!token){
        navigate("/captain-login")

    }}, [token])

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 200) {
            setCaptainData(response.data.data.captain);
            setIsLoading(false);
        }
    }).catch((error) => {
        console.error("Error fetching captain profile:", error);
        localStorage.removeItem("token");
        setCaptainData({});
        setIsLoading(false);
        navigate("/captain-login");
    })

    if(isLoading) {
        return <div>Loading...</div>
    }


  return (
    <>
      { children }
    </>
  )
}

export default CaptainProtectWrapper
