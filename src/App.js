import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Navigation from './components/navigation'
import PageRenderer from './page-renderer'

function App() {
  const user = {
    firstName : 'Miguel',
    lastName : 'Coder',
  }
  return (
    <Router>
    <div className="App">
      <Navigation user = {user}/>
        <Switch>
          <Route path="/:page" component={PageRenderer}></Route>
          <Route path="/" render={() => <Redirect to="/home"></Redirect>}></Route>
          <Route component={() => 404}></Route>
        </Switch>
    </div>
    </Router>
  );
}

export default App;
