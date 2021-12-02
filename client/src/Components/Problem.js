import React, { useState } from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

export default function Problem(props) {
    const [showTip, setShowTip] = useState(false)
    const [showAnswer, setShowAnswer] = useState(false)

    return (
        <div>
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
            
            <div onClick={() => setShowAnswer(!showAnswer)} style={{ margin: '0px', cursor: 'pointer' }} className="d-flex justify-content-center align-items-center">
                <BlockMath math={props.problem.math} />
            </div>
            {showAnswer ? 
                <div onClick={() => setShowAnswer(!showAnswer)} style={{ cursor: 'pointer', borderBottom: '1px dotted lightgrey' }}>
                    <BlockMath math={props.problem.answer} />
                </div>
            :
                <span></span>
            }
        </div>
    )
}
