import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import _ from 'underscore'
import arrowRight from '../images/arrowright.svg'

export default function Section(props) {
    const [subsections, setSubsections] = useState([])
    
    const groupSubsections = async () => {
        const tempSections = []
        const grouped = _.groupBy(props.problems, p => p.subsection)
        for (const s in grouped){
            tempSections.push(
                <Link to={`/subsection/?section=${grouped[s][0].section}&subsection=${s}`}>
                    <div style={{ cursor: 'pointer'}} className="d-flex align-items-center">
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
