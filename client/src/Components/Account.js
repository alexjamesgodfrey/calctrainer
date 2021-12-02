import React from 'react'
import { useAuth } from '../Contexts/AuthContext'
import Button from 'react-bootstrap/Button'

export default function Account() {
    const { currentUser, logout } = useAuth()
    return (
        <div>
            Welcome, {currentUser.displayName}
            <Button 
                onClick={() => logout()} 
                variant="danger"
            >
                sign out
            </Button>
        </div>
    )
}
