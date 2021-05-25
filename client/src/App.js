import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import ModalWindowAudio from "./components/ModalWindowAudio";
import NavigationBar from "./components/NavigationBar";
import Cabinet from "./pages/Cabinet";
import Login from "./pages/Login";
import Context from "./Context";
import Home from "./pages/Home";
import Cookie from "js-cookie";
import "./App.css";
import ReactNotification from "react-notifications-component";
import Mousetrap from "mousetrap";
import "react-notifications-component/dist/theme.css";

function App() {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const [audioActive, setAudioActive] = useState(false);

  Mousetrap.bind("M U S I C", () => setAudioActive(!audioActive));

  useEffect(() => {
    const cookieAuth = Cookie.get("user");
    if (cookieAuth) {
      setAuth(true);
      setUser(JSON.parse(cookieAuth));
    }
  }, [auth]);

  return (
    <Context.Provider
      value={{
        redirectCabinet: { auth, setAuth },
        username: user,
        setUser: setUser,
      }}
    >
      <BrowserRouter>
        <ReactNotification />
        <NavigationBar />
        <RouterPages />
        {audioActive ? <ModalWindowAudio /> : ""}
      </BrowserRouter>
    </Context.Provider>
  );
}

function RouterPages() {
  const Auth = useContext(Context);
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <CabinetAuth
        exact
        path="/cabinet"
        component={Cabinet}
        auth={Auth.redirectCabinet.auth}
      />
      <LoginAuth
        exact
        path="/login"
        component={Login}
        auth={Auth.redirectCabinet.auth}
      />
      <Route
        component={() => (
          <div
            className="main-content-box"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1 style={{ fontSize: 120, textAlign: "center" }}>
              HTTP Not Found!
            </h1>
          </div>
        )}
      />
    </Switch>
  );
}

function LoginAuth({ auth, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => (!auth ? <Component /> : <Redirect to="/" />)}
    />
  );
}

function CabinetAuth({ auth, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => (auth ? <Component /> : <Redirect to="/login" />)}
    />
  );
}

export default App;
