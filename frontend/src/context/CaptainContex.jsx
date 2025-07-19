import React from 'react'

export const CaptainDataContext = React.createContext();

const CaptainContex = ({ children }) => {
    const [captainData, setCaptainData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const updateCaptain = (captainData) => {
        setCaptainData(captainData);
    }

    const values = {
        captainData,
        setCaptainData,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain   
    }

  return (
    <>
      <CaptainDataContext.Provider value={values}>
        { children }
      </CaptainDataContext.Provider>
    </>
  )
}

export default CaptainContex
