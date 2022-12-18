import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Auth({ target }) {
    const token = localStorage.getItem("name")
    if (token) return target
    return <Navigate to='/login' />
}

