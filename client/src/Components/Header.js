import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'

export default function Header() {
    return (
        <div style={{ borderBottom: '2px solid black', marginBottom: '10px' }}>
            <Navbar style={{ margin: '0px 20px'}}>
                    <Navbar.Brand>
                    <Link to="/problems">
                        <div className="d-flex flex-column">
                            <strong style={{lineHeight: 1, marginTop: '3px'}}>calctrainer</strong>
                            <strong style={{fontSize: '17px', textAlign: 'right', lineHeight: 0.75}}>beta</strong>
                        </div>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Link to="/submit"><Navbar.Text style={{ color: 'black'}}>submit</Navbar.Text></Link>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
