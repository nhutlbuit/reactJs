import React, { Component, lazy, Suspense } from 'react';
import 'bulma/css/bulma.css';
import './styles.scss';
import { Redirect, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { HeaderBar, NavBar, NotFound } from './components';
import About from './About';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Heroes = withRouter(
  lazy(() => import(/* webpackChunkName: "heroes" */ './heroes/Heroes'))
);


const Villains = withRouter(
  lazy(() => import(/* webpackChunkName: "villains" */ './villains/Villains'))
);

const Examples = withRouter(
  lazy(() => import('./examples/Example'))
);

const Hook = withRouter(lazy(() => import('./examples/Hook')));
const TodoList = withRouter(lazy(() => import('./components/todo/TodoList')));
const Redux = withRouter(lazy(() => import('./examples/Redux')));
const Student = withRouter(lazy(() => import('./components/student/Student')));
const StudentNew = withRouter(lazy(() => import('./components/studentNew/StudentDashBoardNew')));


class App extends Component {
  render() {
    return (
      <div>
        <HeaderBar />
        <div className="section columns">
          <NavBar />
          <main className="column">
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Redirect from="/" exact to="/heroes" />
                <Route path="/heroes" component={Heroes} />
                <Route path="/villains" component={Villains} />
                <Route path="/about" component={About} />
                <Route path="/example" component={Examples} />
                <Route path="/hook" component={Hook} />
                <Route path="/todolist" component={TodoList} />
                <Route path="/redux" component={Redux} />  
                <Route path="/student" component={Student} />  
                <Route path="/student-new" component={StudentNew} />  
                <Route exact path="**" component={NotFound} />
              </Switch>
            </Suspense>
          </main>
          <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover/>
        </div>
       
      </div>
    );
  }
}

export default App;
