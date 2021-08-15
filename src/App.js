import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './component/Login'
import TaskList from './component/TaskList';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskForm from './component/TaskForm';
import Jokes from './component/Jokes';
import Navbar from './component/Layout/Navbar';


function App() {

  const [logoutUser, setLogoutUser] = useState(false);

  return (
    <Router>
      <Navbar logoutUser={logoutUser} setLogoutUser={setLogoutUser} />
      <Switch>
        <Route exact path="/" render={()=><Redirect to="/login" />}/>
        <Route exact path="/login" >
          <Login logoutUser={logoutUser} setLogoutUser={setLogoutUser} />
        </Route>
        <Route exact path='/viewTasks' >
          <TaskList />
        </Route>
        <Route exact path='/editTask' >
          <TaskForm />
        </Route>
        <Route exact path='/jokes' >
          <Jokes />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
