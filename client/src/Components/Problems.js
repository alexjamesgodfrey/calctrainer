import React, { useState, useEffect } from 'react'
import _, { last } from 'underscore'
import Spinner from 'react-bootstrap/Spinner'
import Toast from 'react-bootstrap/Toast'
import Header from './Header.js'
import Section from './Section.js'

export default function Problems() {
    const [loading, setLoading] = useState(true)
    const [showToast, setShowToast] = useState(true)
    const [sections, setSections] = useState([])


    const getProblems = async () => {
        console.log('test')
        await fetch('/api/problems')
            .then(response => response.json())
            .then(data => {
                const tempSections = []
                const grouped = _.groupBy(data, p => p.section)
                for (const s in grouped){
                    tempSections.push(<Section problems={grouped[s]} />)
                }
                setSections(tempSections)
            })
            .then(() => setLoading(false))
    }

    useEffect(() => {
        getProblems()
    }, [])

    if (loading) {
        return (
            <div>
                <Header />
                <div className="d-flex justify-content-center">
                    <Spinner style={{ marginTop: '100px' }} animation="border" />
                </div>
            </div>
        )
    }

    return (
        <div onClick={() => getProblems()}>
            <Header />
            <h2 style={{textAlign: 'center'}}>Problems</h2>
            <div className="d-flex flex-wrap">
                {
                    sections.map((s, i) => {
                        return s
                    })
                }
            </div>
            <Toast show={showToast} onClose={() => setShowToast(false)} style={{position: 'absolute', bottom: '20px', right: '20px'}}>
            <Toast.Header>
                <strong className="me-auto">calctrainer.io</strong>
                <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>welcome to calctrainer.io! we hope you will enjoy our synthesis of calculus practice problems</Toast.Body>
            </Toast>
        </div>
    )
}
