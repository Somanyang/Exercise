import React ,{Component}from "react";
import ReactDOM from "react-dom";
import { BrowserRouter ,Link,Route} from "react-router-dom";
import TransitionGroup from "react-transition-group/TransitionGroup"
import "./index.css";
ReactDOM.render(
 <BrowserRouter>
   <App />
 </BrowserRouter>,
 document.getElementById("root")
);



class Home extends Component {
 render() {
  return (
   <div className="page">
    <h1>Home</h1>
    <p>Hello from the home page!</p>
   </div>
  )
 }
}

class Subpage extends Component {
 render() {
  return (
   <div className="page">
    <h1>Subpage</h1>
    <p>Hello from a sub page!</p>
   </div>
  )
 }
}



export default class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="TopBar">
          <Link to="/">Home</Link>
          <Link to="/subpage">Subpage</Link>
        </div>
          <Route
					  exact
					  path="/"
					  children={({ match, ...rest }) => (
					    <TransitionGroup component={firstChild}>
					      {match && <Home {...rest} />}
					    </TransitionGroup>
					)}/>
					<Route
					   path="/subpage"
					   children={({ match, ...rest }) => (
					     <TransitionGroup component={firstChild}>
					       {match && <Subpage {...rest} />}
					     </TransitionGroup>
					)}/>
      </div>
    );
  }
}
const firstChild = props => {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
};