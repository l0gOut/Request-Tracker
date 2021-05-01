import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Cabinet from "./pages/Cabinet";
import Login from "./pages/Login";
import Home from "./pages/Home";
import React from "react";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/cabinet" component={Cabinet} />
        <Route exact path="/login" component={Login} />
        <Route
          component={() => (
            <div className="main-content-box">
              <h1 style={{ fontSize: 120, textAlign: "center" }}>
                HTTP Not Found!
              </h1>
            </div>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
