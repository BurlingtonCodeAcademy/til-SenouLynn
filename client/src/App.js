import "./App.css";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Home from "./components/Home";
import Post from "./components/Post";
import Posts from "./components/Posts";
import Nav from "./components/Nav";
import SearchRes from "./components/SearchRes";

function App() {
  return (
    <div id="home-page">
      <div className="center-box">
        <div id="page-content">
          <BrowserRouter>
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/facts" component={Posts} />
              <Route path="/facts/:id" component={Post} />
              <Route path="/searchReturn" component={SearchRes} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
