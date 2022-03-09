import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Navigation from './components/navigation'
import PageRenderer from './page-renderer'
import PageRendererWithId from './page-renderer-with-id';
import Dashboard from './pages/dashboard';
import ReactGA from 'react-ga';
// ReactGA.initialize('G-NPTP41JQB3',{
//   debug: true,
//   titleCase: false,
//   gaOptions: {
//     userId: localStorage.getItem('userId')
//   }
// });
// ReactGA.initialize('G-NPTP41JQB3', { debug: true, gaOptions: {
//   userId: localStorage.getItem('userId')
// } });
// ReactGA.pageview(window.location.pathname + window.location.search);

function App() {
  const user = {
    firstName: 'Miguel',
    lastName: 'Coder',
  }
  return (
    <Router>
      <div className="App">
        <Navigation user={user} />
        <Switch>
          {/* <Route path="/dashboard" component={Dashboard}></Route> */}
          <Route path="/:page/:id" component={PageRendererWithId}></Route>
          <Route path="/:page" component={PageRenderer}></Route>
          <Route path="/" render={() => <Redirect to="/home"></Redirect>}></Route>

          <Route component={() => 404}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
