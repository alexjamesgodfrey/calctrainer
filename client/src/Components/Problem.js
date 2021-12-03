import React, { useState } from 'react'
import { useAuth } from '../Contexts/AuthContext'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import Login from './Authentication/Login';

export default function Problem(props) {
    const { currentUser } = useAuth()
    const [showTip, setShowTip] = useState(false)
    const [showAnswer, setShowAnswer] = useState(false)
    const colors = ['red', 'yellow', 'green']
    const [tempOrigin, setTempOrigin] = useState(false)
    const [tempLevel, setTempLevel] = useState(-1)

    const postLevel = async (l) => {
        console.log(props.levelFromDatabase)
        if (!tempOrigin && !props.levelFromDatabase) {
            setTempOrigin(true)
            setTempLevel(l)
            const bod = `{
                "userid": "${currentUser.uid}",
                "level": ${l},
                "problemid": ${parseInt(props.problem.id)}
    
            }`
            console.log(bod)
            await fetch('/api/levels', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: bod
            })
        }
        else if (tempOrigin || props.levelFromDatabase) {
            setTempLevel(l)
            const bod = `{
                "userid": "${currentUser.uid}",
                "level": ${l},
                "problemid": ${parseInt(props.problem.id)}
    
            }`
            console.log(bod)
            await fetch('/api/levels', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: bod
            })
        }
    }
    
    console.log(tempLevel)

    return (
        <div>
            <div onClick={() => setShowAnswer(!showAnswer)} style={{ marginBottom: '20px', cursor: 'pointer', maxWidth: '800px', overflow: 'scroll' }} >
                <div className="d-flex justify-content-center align-items-center">
                    {tempLevel !== -1 ? 
                        <div onClick={() => postLevel(1)} style={{borderRadius: '50%', backgroundColor: colors[tempLevel], width: '15px', height: '15px', margin: '8px 10px 10px 4px', cursor: 'pointer'}}></div>
                    :
                        <div onClick={() => postLevel(1)} style={{borderRadius: '50%', backgroundColor: colors[props.level], width: '15px', height: '15px', margin: '8px 10px 10px 4px', cursor: 'pointer'}}></div>
                    }
                    <BlockMath math={props.problem.math} />
                    {props.showOverlay ? 
                        <OverlayTrigger
                            placement='right'
                            overlay={
                                <Tooltip>
                                    This question randomly generates constants  
                                </Tooltip>
                            }
                        >
                        <div className="d-flex align-items-center">
                            <span onClick={() => setShowTip(!showTip)}>{props.problem.question}</span>
                            <div style={{borderRadius: '50%', backgroundColor: '#84CACC', width: '8px', height: '8px', margin: '2px 0px 0px 4px'}}></div>
                        </div>
                        </OverlayTrigger>
                    :
                        <span></span>
                    }
                </div>
                <p className="mb-2 text-muted" style={{ textAlign: 'right' }}>submitted by {props.problem.submittedby}</p>
            </div>
            {showAnswer ? 
                <div style={{ borderBottom: '1px dotted lightgrey' }}>
                    <BlockMath math={props.problem.answer} />
                    <div style={{marginTop: '30px'}} className="d-flex justify-content-left">
                        <span>Question confidence: </span>
                        {tempLevel !== -1 ? 
                            <div style={{ marginLeft: '30px'}} className="d-flex justify-content-right">
                                {tempLevel === 0 ?
                                    <div style={{borderRadius: '50%', backgroundColor: 'red', width: '25px', height: '25px', margin: '2px 0px 10px 4px', border: '2px solid black', cursor: 'pointer'}}></div>
                                : 
                                    <div onClick={() => postLevel(0)} style={{borderRadius: '50%', backgroundColor: 'red', width: '25px', height: '25px', margin: '2px 0px 10px 4px', cursor: 'pointer'}}></div>
                                }
                                {tempLevel === 1 ?
                                    <div style={{borderRadius: '50%', backgroundColor: 'yellow', width: '25px', height: '25px', margin: '2px 0px 10px 4px', border: '2px solid black', cursor: 'pointer'}}></div>
                                : 
                                    <div onClick={() => postLevel(1)} style={{borderRadius: '50%', backgroundColor: 'yellow', width: '25px', height: '25px', margin: '2px 0px 10px 4px', cursor: 'pointer'}}></div>
                                }
                                {tempLevel === 2 ?
                                    <div style={{borderRadius: '50%', backgroundColor: 'green', width: '25px', height: '25px', margin: '2px 0px 10px 4px', border: '2px solid black', cursor: 'pointer'}}></div>
                                : 
                                    <div onClick={() => postLevel(2)} style={{borderRadius: '50%', backgroundColor: 'green', width: '25px', height: '25px', margin: '2px 0px 10px 4px', cursor: 'pointer'}}></div>
                                }
                            </div>
                        :
                            <div style={{ marginLeft: '30px'}} className="d-flex justify-content-right">
                                {props.level === 0 ?
                                    <div style={{borderRadius: '50%', backgroundColor: 'red', width: '25px', height: '25px', margin: '2px 0px 10px 4px', border: '2px solid black', cursor: 'pointer'}}></div>
                                : 
                                    <div onClick={() => postLevel(0)} style={{borderRadius: '50%', backgroundColor: 'red', width: '25px', height: '25px', margin: '2px 0px 10px 4px', cursor: 'pointer'}}></div>
                                }
                                {props.level === 1 ?
                                    <div style={{borderRadius: '50%', backgroundColor: 'yellow', width: '25px', height: '25px', margin: '2px 0px 10px 4px', border: '2px solid black', cursor: 'pointer'}}></div>
                                : 
                                    <div onClick={() => postLevel(1)} style={{borderRadius: '50%', backgroundColor: 'yellow', width: '25px', height: '25px', margin: '2px 0px 10px 4px', cursor: 'pointer'}}></div>
                                }
                                {props.level === 2 ?
                                    <div style={{borderRadius: '50%', backgroundColor: 'green', width: '25px', height: '25px', margin: '2px 0px 10px 4px', border: '2px solid black', cursor: 'pointer'}}></div>
                                : 
                                    <div onClick={() => postLevel(2)} style={{borderRadius: '50%', backgroundColor: 'green', width: '25px', height: '25px', margin: '2px 0px 10px 4px', cursor: 'pointer'}}></div>
                                }
                            </div>
                        }
                        
                    </div>
                </div>
            :
                <span></span>
            }
        </div>
    )
}
