import React, {useState, useEffect } from 'react'
import { useAuth } from '../Contexts/AuthContext'
import { Link } from 'react-router-dom'
import _ from 'underscore'
import arrowRight from '../images/arrowright.svg'

export default function Section(props) {
    const { currentUser } = useAuth() 
    const [subsections, setSubsections] = useState([])
    const colors = ['red', 'yellow', 'green']

    const subsectAverage = (sect, subsect, levels) => {
        const subsectProblems = props.problems.filter(p => {
            if (p.section === sect && p.subsection === subsect) {
                return p
            }
        })
        console.log(subsectProblems)
        let subsectAverageNumber = 0
        console.log(props.problems)
        console.log(levels)
        for (let i=0; i<subsectProblems.length; i++) {
            for (let j=0; j<levels.length; j++) {
                if (subsectProblems[i].id === levels[j].problemid) {
                    subsectAverageNumber += parseInt(levels[j].level)
                }
            }
        }
        subsectAverageNumber /= subsectProblems.length
        return subsectAverageNumber
    }
    
    const groupSubsections = async () => {
        const subsects = props.problems.map(p => p.subsection)
        console.log(subsects)
        const subsectLevelsTemp = {}
        for (let i=0; i<subsects.length; i++) {
            subsectLevelsTemp[subsects[i]] = Math.round(subsectAverage(props.problems[0].section, subsects[i], props.levels))
        } 
        console.log(subsectLevelsTemp)
        const tempSections = []
        const grouped = _.groupBy(props.problems, p => p.subsection)
        for (const s in grouped){
            tempSections.push(
                <Link to={`/user/subsection/?section=${grouped[s][0].section}&subsection=${s}`}>
                    <div style={{ cursor: 'pointer'}} className="d-flex align-items-center">
                        <div style={{borderRadius: '50%', backgroundColor: colors[subsectLevelsTemp[s]], width: '10px', height: '10px', margin: '4px 3px 0px 0px', cursor: 'pointer'}}></div>
                        <span style={{ marginTop: '2px' }}>{s}</span>
                        <img style={{ height: '20px', width: '20px', margin: '4px 0px 0px 10px' }} src={arrowRight} alt="arrow right" />
                    </div>
                </Link>
            )
        }
        setSubsections(tempSections)
    }

    useEffect(() => {
        groupSubsections()
    }, [])

    return (
        <div style={{ margin: '20px'}}>
            <h3>{props.problems[0].section}</h3>
            <div style={{ margin: '0px 20px'}}>
                {
                    subsections.map((p, i) => {
                        return p
                    })
                }
            </div>
        </div>
    )
}
