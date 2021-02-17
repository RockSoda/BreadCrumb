import '../App.css'
import { Link } from 'react-router-dom'
import { BrowserRouter as Switch, Route } from "react-router-dom"
import { useState, useEffect } from "react"

function Nav(recieved) {
    const path = recieved.location.pathname
    const [addr, setAddr] = useState([])
    const [flag, setFlag] = useState(true)

    useEffect(() => {
        disableBreadCrumb()
        setFlag(false)
        const link = path.split('/').join('%20')
        toFetch(link)
    }, [path])

    useEffect(() => {
        if(typeof(addr.message) == 'undefined'){
            enableBreadCrumb()
            setFlag(true)
        }
    }, [addr])

    const enableBreadCrumb = () => {
        const breadcrumbs = document.querySelectorAll('ol')[0].childNodes
        breadcrumbs.forEach((element, i) => {
            if(i%2 == 0){
                element.style.pointerEvents = 'auto'
            }
        })
    }

    const disableBreadCrumb = () => {
        const breadcrumbs = document.querySelectorAll('ol')[0].childNodes
        breadcrumbs.forEach((element, i) => {
            if(i%2 == 0){
                element.style.pointerEvents = 'none'
            }
        })
    }

    const toFetch = async (link) => {
        await fetch(`http://localhost:3001/${link}`)
            .then(res => res.json())
            .then(result => {
                setAddr(result)
            })
    }

    const handleClick = (evt) => {
        if (evt.type === 'click') {
            disableBreadCrumb()
            setFlag(false)
        }
    }

    const routing = ({ match }) => {
        return (<>
            <>
                {typeof (addr.children) == 'undefined' ? '' : (match.isExact && (addr.type == 'dir') ? (addr.children.map(item => (
                    <div>
                        <Link key={item.name} to={(flag) ? (`${match.url}/${item.name}`) : `${match.url}`} onClick={((evt) => handleClick(evt))}>{item.name}</Link>
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

    return (
        <>
            <Route path={path} component={routing} />
        </>
    )
}

export default Nav