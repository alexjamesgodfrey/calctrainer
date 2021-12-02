import React, { useState, useEffect } from 'react'
import { InlineMath, BlockMath } from 'react-katex'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'
import Header from './Header'
import trash from '../trash.svg'

export default function Submit() {
    const [refresh, setRefresh] = useState(false)
    const [problems, setProblems] = useState([])
    const [math, setMath] = useState('\\text{Type something!}')
    const [answer, setAnswer] = useState('\\text{Type something!}')
    const [section, setSection] = useState('')
    const [subsection, setSubsection] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const submitQuestion = async (e) => {
        e.preventDefault()
        try {
            const newMath = math.replaceAll('\\', '\\\\')
            const newAnswer = answer.replaceAll('\\', '\\\\')
            const bod = `{
                "answer": "${newAnswer}",
                "section": "${section}",
                "subsection": "${subsection}",
                "math": "${newMath}"
            }`
            console.log(bod)
            await fetch(`/api/problems`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: bod
            })
            setMath('\\text{Type something!}')
            setAnswer('\\text{Type something!}')
            setSection('')
            setSubsection('')
            setLoading(false)
            setRefresh(!refresh)
            return setSuccess('question successfully submitted')
        } catch (err) {
            console.error(err)
            setLoading(false)
            return setError('question could not be submitted')
        }
        
    }

    const getProblems = async () => {
        await fetch('/api/problems')
            .then(response => response.json())
            .then(data => {
                setProblems(data)
                console.log(data)
            })
    }

    const deleteQuestion = async (id) => {
        setRefresh(!refresh)
        try {
            await fetch(`/api/delete/${id}`, {
                method: 'DELETE'
            })
            return setSuccess('successfully deleted question')
        } catch (error) {
            return setError('could not delete question')
        }
    }

    useEffect(() => {
        getProblems()
    }, [refresh])

    return (
        <div>
            <Header />
            {success ? <Alert style={{ margin: '50px' }} variant='success'>{success}</Alert> : <span></span>}
            {error ? <Alert style={{ margin: '50px' }} variant='danger'>{error}</Alert> : <span></span>}
            <Form autocomplete="off" style={{ maxWidth: '500px', margin: '20px auto'}} onSubmit={(e) => submitQuestion(e)}>
                <Form.Group className="mb-3">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="math"
                        className="mb-3"
                    >
                        <Form.Control onChange={(e) => {
                            setMath(e.target.value)
                            console.log(e.target.value)
                        }
                        } placeholder="\\text{Question here}" />
                    </FloatingLabel>
                    <BlockMath math={math} />
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text> */}
                </Form.Group>

                <Form.Group className="mb-3">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="answer"
                        className="mb-3"
                    >
                    <Form.Control onChange={(e) => setAnswer(e.target.value)} placeholder="\\text{Explanation here}" />
                    </FloatingLabel>
                    <BlockMath math={answer} />
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text> */}
                </Form.Group>

                <Form.Group className="mb-3">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="section"
                        className="mb-3"
                    >
                    <Form.Control onChange={(e) => setSection(e.target.value)}  placeholder="section name" />
                    </FloatingLabel>
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text> */}
                </Form.Group>

                <Form.Group className="mb-3">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="subsection"
                        className="mb-3"
                    >
                    <Form.Control onChange={(e) => setSubsection(e.target.value)} placeholder="subsection name" />
                    </FloatingLabel>
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text> */}
                </Form.Group>

                <Button disabled={loading} variant="dark" type="submit">
                    Submit
                </Button>
            </Form>

            <div>
                <div style={{ margin: '0px' }} className="d-flex justify-content-center">
                    <p style={{ margin: '0px', width: '40px', border: '1px solid black', textAlign: 'center' }}></p>
                    <p style={{ margin: '0px', width: '40px', border: '1px solid black', textAlign: 'center' }}>id</p>
                    <p style={{ margin: '0px', width: '200px', border: '1px solid black', textAlign: 'center' }}>question</p>
                    <p style={{ margin: '0px', width: '200px', border: '1px solid black', textAlign: 'center' }}>answer</p>
                    <p style={{ margin: '0px', width: '200px', border: '1px solid black', textAlign: 'center' }}>seciton</p>
                    <p style={{ margin: '0px', width: '200px', border: '1px solid black', textAlign: 'center' }}>subsection</p>
                </div>
                {problems.map((p, i) => {
                    return (
                        <div className="d-flex justify-content-center">
                            <p style={{ margin: '0px', width: '40px', border: '1px solid black', textAlign: 'center' }}><img onClick={() => deleteQuestion(p.id)} style={{ width: '20px', cursor: 'pointer' }} src={trash} alt="trash icon" /></p>
                            <p style={{ margin: '0px', width: '40px', border: '1px solid black', textAlign: 'center' }}>{p.id}</p>
                            <p style={{ margin: '0px', width: '200px', border: '1px solid black', textAlign: 'center', overflow: 'scroll'  }}><InlineMath math={p.math} /></p>
                            <p style={{ margin: '0px', width: '200px', border: '1px solid black', textAlign: 'center', overflow: 'scroll' }}><InlineMath math={p.answer} /></p>
                            <p style={{ margin: '0px', width: '200px', border: '1px solid black', textAlign: 'center' }}>{p.section}</p>
                            <p style={{ margin: '0px', width: '200px', border: '1px solid black', textAlign: 'center' }}>{p.subsection}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
