import '../App.css'
import { Link } from 'react-router-dom'
import { BrowserRouter as Switch, Route } from "react-router-dom"
import { useState, useEffect, } from "react"

function Nav(recieved){
    const data = recieved.data.data
    const path = recieved.location.pathname
    const [addr, setAddr] = useState([])
    useEffect(() => {
        const list = path.split('/')
        if(list[list.length-1] !== ''){
            toFetch(list[list.length-1])
        }
    }, [path])

    const toFetch = async (name) => {
        await fetch(`http://localhost:3001/${name}`)
        .then(res => res.json())
        .then(result => {
            setAddr(result)
        })
    }

    const handleClick = (evt, name) => {
        if(evt.type === 'click'){
            toFetch(name)
        }
    }

    const routing = ({match}) => {
        return(<>
            <>
            {match.isExact && addr.map(item => (item.type == 'dir') ? (
                <div>
                    <Link key = {item.name} to = {`${match.url}/${item.name}`} onClick={((evt) => handleClick(evt, item.name))}>{item.name}</Link>
                </div>
            ) : (
                <div>
                    <span>This is {item.name}</span>
                </div>
            ))}
            </>
            <Switch>
                <Route path = {`${match.path}/:name`} component={routing}/>
            </Switch>
        </>)
    }

    const root = ({match}) => {
        return(<>
            {match.isExact && data.map(item => (
                <div>
                    <Link key = {item.name} to = {item.name} onClick={((evt) => handleClick(evt, item.name))}>{item.name}</Link>
                </div>
            ))}
        </>)
    }

    return(
        <>
            <Route exact path = '/' component = {root} />
            <Route path = {path} component = {routing} />
        </>
    )
}

export default Nav