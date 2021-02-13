import './App.css'
import { BrowserRouter as Router, Switch } from "react-router-dom"
import Nav from './components/Nav'
import Breadcrumbs from './components/Breadcrumbs'
import { Component } from "react"
import ReactDOM from 'react-dom';

class App extends Component {
  _isMounted = false

  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: this.props.name,
        type: this.props.type,
        children: [
          {
            name: this.props.children_name,
            type: this.props.children_datatype
          }
        ]
      }
    };
  }
  componentDidMount() {
    this._isMounted = true
    let currentLink = window.location.pathname.split('/').filter(x => x)
    if (currentLink[0] !== 'root') window.location.assign('http://localhost:3000/root')

    fetch('http://localhost:3001/root')
      .then(res => res.json())
      .then(result => {
        if (this._isMounted) {
          this.setState({ data: result })
        }
      })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <>
        <Router>
          <Breadcrumbs />
          <Switch>
            <Nav data={this.state} />
          </Switch>
        </Router>
      </>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

export default App;
