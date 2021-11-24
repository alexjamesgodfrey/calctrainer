import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import Header from './Header'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

export default function Subsection() {
    const [reload, setReload] = useState(false)
    const [loading, setLoading] = useState(true)
    const [randoms, setRandoms] = useState([])
    const target = useRef(null)
    const [showTip, setShowTip] = useState(false)
    const [originals, setOriginals] = useState([])
    const [problems, setProblems] = useState([])
    const search = useLocation().search
    const section = new URLSearchParams(search).get('section');
    const subsection = new URLSearchParams(search).get('subsection');

    const getSubProblems = async () => {
        console.log('fdasf')
        await fetch(`/api/problems/${section}/${subsection}`)
            .then(response => response.json())
            .then(async data => {
                randomizeAll(data)
                await setProblems(data)
                
            })
            .then(() => setLoading(false))
    }

    const randomizeNumbers = async (problem) => {
        let tempProbs = problems
        const originalMath = tempProbs[tempProbs.indexOf(problem)].math
        let randInt = Math.floor(Math.random() * 9) + 1
        let i = originalMath.indexOf('RC')
        const newMath = originalMath.substring(0, i) + String(randInt) + originalMath.substring(i+2)
        tempProbs[tempProbs.indexOf(problem)].math = newMath
        await setProblems(tempProbs)
        setReload(true)
        tempProbs[tempProbs.indexOf(problem)].math = originalMath
        await setProblems(tempProbs)
    }

    const randomizeAll = async (probs) => {
        const hasRandom = []
        for (let i=0; i<probs.length; i++){
            if (probs[i].math.indexOf('RC') !== -1) {
                hasRandom.push(true)
            } else{
                hasRandom.push(false)
            }
            while (probs[i].math.indexOf('RC') !== -1){
                let s = probs[i].math.indexOf('RC')
                let e = probs[i].math.indexOf('`')
                let range = probs[i].math.substring(s+2, e)
                let min = parseInt(range.substring(0, range.indexOf('-')))
                let max = parseInt(range.substring(range.indexOf('-')+1))
                let randInt = Math.floor(Math.random() * (max-min)) + min
                probs[i].math = probs[i].math.substring(0, s) + String(randInt) + probs[i].math.substring(e+1)
            }
        }
        setRandoms(hasRandom)
    }

    useEffect(() => {
        getSubProblems()
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

    if (reload) {
        setReload(false)
    }

    return (
        <div>
            <Header />
            <div className="d-flex flex-column align-items-center">
                <h2 style={{ textAlign: 'center' }}>{section} -- {subsection} </h2>
                {
                    problems.map((p, i) => {
                        return (
                            <div>
                                {randoms[i] ? 
                                    <OverlayTrigger
                                        placement='right'
                                        overlay={
                                            <Tooltip>
                                                This question randomly generates constants  
                                            </Tooltip>
                                        }
                                    >
                                    <div className="d-flex align-items-center">
                                        <span onClick={() => setShowTip(!showTip)}>{i+1}. {p.question}</span>
                                        <div style={{borderRadius: '50%', backgroundColor: '#84CACC', width: '8px', height: '8px', margin: '2px 0px 0px 4px'}}></div>
                                    </div>
                                    </OverlayTrigger>
                                :
                                    <span>{i+1}. {p.question}</span>
                                }
                                
                                <div style={{ margin: '0px' }} className="d-flex justify-content-center align-items-center">
                                    <BlockMath math={p.math} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
