import React, { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Container, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../../Contexts/AuthContext.js';
import GoogleButton from 'react-google-button'
import './Authentication.scss';

export default function Login() {
    const { currentUser, googleSignup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const google = async () => {
        setLoading(true);
        try {
            await googleSignup();
            navigate('/user/problems')
        } catch (error) {
            setError('failed to sign in with google. please try again.')
        }
        setLoading(false);
    }

    return (
        <div>
            {currentUser ? 
                <Navigate to="/user/problems" />
            :
                <div className="signup">
                <Container
                    className="d-flex align-items-center justify-content-center"
                    style={{ minHeight: "100vh" }}
                >
                    <div className="w-100" style={{ maxWidth: '400px'}}>
                        <Card style={{ minHeight: '300px' }}>   
                            <Card.Body>     
                                <h3 style={{textAlign: 'center'}}>welcome to calctrainer.io</h3>
                                <p className="mb-2 text-muted" style={{ textAlign: 'center' }}>sign in to continue</p>
                                {loading ?
                                    <div className="auth-spinner"><Spinner id="auth-spin" variant="warning" animation="border" /></div>
                                    :
                                    <div>
                                        {error && <Alert variant="danger">{error}</Alert>}    
                                        <div style={{ marginTop: '50px'}} className="auth-buttons">
                                            <GoogleButton onClick={google} type="light" />
                                        </div>
                                    </div>
                                    }
                            </Card.Body>
                        </Card>
                        </div>
                    </Container>
                    </div>
            }
        </div>
    )
}
