import {
    Breadcrumbs as MUIBreadcrumbs,
    Link,
    Typography
} from '@material-ui/core/'
import { withRouter } from 'react-router-dom'

const Breadcrumbs = (props) => {
    const { history, location } = props
    const { pathname } = location

    const pathnames = pathname.split('/').filter(x => x)

    return (<>
        <MUIBreadcrumbs aria-label="breadcrumb">

            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
                const isLast = (index === pathnames.length - 1)
                
                return (
                    isLast ? (<Typography key={name}> {name} </Typography>)
                        : (<Link key={name} color="inherit"
                            onClick={() => { history.push(routeTo) }}> {name} </Link>)
                )

            })}
        </MUIBreadcrumbs>
    </>)
}

export default withRouter(Breadcrumbs)
