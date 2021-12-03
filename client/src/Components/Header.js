import React from 'react'
import { useAuth } from '../Contexts/AuthContext'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'

export default function Header() {
    const { currentUser, googleSignup } = useAuth()
    console.log(currentUser)
    return (
        <div style={{ borderBottom: '2px solid black', marginBottom: '10px' }}>
            <Navbar style={{ margin: '0px 20px'}}>
                    <Navbar.Brand>
                    <Link to="/user/problems">
                        <div className="d-flex flex-column">
                            <strong style={{lineHeight: 1, marginTop: '3px'}}>calctrainer</strong>
                            <strong style={{fontSize: '17px', textAlign: 'right', lineHeight: 0.75}}>beta</strong>
                        </div>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    {currentUser ? 
                        <Link to="/user/account">
                            <Navbar.Text 
                                style={{ color: 'black', margin: '0px 10px', cursor: 'pointer'}}
                            >
                                account
                            </Navbar.Text>
                        </Link>
                    :
                        <Link to="/user/login">
                            <Navbar.Text 
                                style={{ color: 'black', margin: '0px 10px', cursor: 'pointer'}}
                            >
                                login
                            </Navbar.Text>
                        </Link>
                }
                    <Link to="/user/submit">
                        <Navbar.Text 
                            style={{ color: 'black'}}
                        >
                            submit
                        </Navbar.Text>
                    </Link>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
