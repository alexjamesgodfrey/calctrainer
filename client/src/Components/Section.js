import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import _ from 'underscore'
import Subsection from './Subsection'

export default function Section(props) {
    const [subsections, setSubsections] = useState([])
    
    const groupSubsections = async () => {
        const tempSections = []
        const grouped = _.groupBy(props.problems, p => p.subsection)
        for (const s in grouped){
            tempSections.push(
                <Link to={`/subsection/?section=${grouped[s][0].section}&subsection=${s}`}>
                    <p style={{lineHeight: 0.8}}>{s}</p>
                </Link>
            )
        }
        setSubsections(tempSections)
    }

    useEffect(() => {
        groupSubsections()
    }, [])

    return (
        <div style={{ margin: '0px 20px'}}>
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
