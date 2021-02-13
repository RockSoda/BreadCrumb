import '../App.css'
import { Link } from 'react-router-dom'
import { BrowserRouter as Switch, Route } from "react-router-dom"
import { useState, useEffect, } from "react"

function Nav(recieved) {
    const raw = recieved.data.data
    const children = raw.children
    let path = recieved.location.pathname
    const [addr, setAddr] = useState([])
    useEffect(() => {
        const link = path.split('/').join('%20')
        toFetch(link)
    }, [path])

    const toFetch = async (link) => {
        await fetch(`http://localhost:3001/${link}`)
            .then(res => res.json())
            .then(result => {
                setAddr(result)
            })
    }

    const handleClick = (evt, name) => {
        if (evt.type === 'click') {
            path = path + '/' + name
        }
    }

    const routing = ({ match }) => {
        return (<>
            <>
                {typeof (addr.children) == 'undefined' ? '' : (match.isExact && (addr.type == 'dir') ? (addr.children.map(item => (
                    <div>
                        <Link key={item.name} to={`${match.url}/${item.name}`} onClick={((evt) => handleClick(evt, item.name))}>{item.name}</Link>
                    </div>
                ))) : (
                        <div>
                            <span>This is {addr.name}</span>
                        </div>
                    ))}
            </>
            <Switch>
                <Route path={`${match.path}/:name`} component={routing} />
            </Switch>
        </>)
    }

    const root = ({ match }) => {
        return (<>
            {match.isExact && children.map(item => (
                <div>
                    <Link key={item.name} to={item.name} onClick={((evt) => handleClick(evt, item.name))}>{item.name}</Link>
                </div>
            ))}
        </>)
    }

    return (
        <>
            <Route exact path='/' component={root} />
            <Route path={path} component={routing} />
        </>
    )
}

export default Nav