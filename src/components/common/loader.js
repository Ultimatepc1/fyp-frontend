
import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

export default function Loader() {
  return (
    <div style={{
      textAlign: "center", 
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh"
    }}>
      <CircularProgress color="secondary" />
    </div>
  )
}
