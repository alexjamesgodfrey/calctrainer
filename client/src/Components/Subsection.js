import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../Contexts/AuthContext'
import { useLocation } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import Header from './Header'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import 'katex/dist/katex.min.css';
import Problem from './Problem'
import { BlockMath } from 'react-katex';

export default function Subsection() {
    const { currentUser } = useAuth()
    const [reload, setReload] = useState(false)
    const [loading, setLoading] = useState(true)
    const [randoms, setRandoms] = useState([])
    const [problems, setProblems] = useState([])
    const [levels, setLevels] = useState([])

    const search = useLocation().search
    const section = new URLSearchParams(search).get('section');
    const subsection = new URLSearchParams(search).get('subsection');

    const getLevels = async () => {
        await fetch(`/api/levels/${currentUser.uid}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setLevels(data)
            })
    }

    const getLevel = (pid) => {
        for (let i=0; i<levels.length; i++) {
            if (levels[i].problemid === pid){
                return parseInt(levels[i].level)
            }
        }
        return 0
    }

    const getLevelOrigin = (pid) => {
        for (let i=0; i<levels.length; i++) {
            if (levels[i].problemid === pid){
                return true
            }
        }
        return false
    }

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
        getLevels()
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
            <div style={{ overflow: 'scroll'}} className="d-flex flex-column align-items-center">
                <h2 style={{ textAlign: 'center' }}>{section} -- {subsection} </h2>
                {
                    problems.map((p, i) => {
                        return <Problem levelFromDatabase={getLevelOrigin(p.id)} level={getLevel(p.id)} showOverlay={randoms[i]} problem={p} />
                    })
                }
            </div>
        </div>
    )
}
