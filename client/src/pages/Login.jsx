import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { LoginMutation } from "../Queries";
import Context from "../Context";
import Cookie from "js-cookie";

function Login() {
  const [login, setLogin] = useState({
    login: "",
    password: "",
  });
  const [redirect, setRedirect] = useState(false);

  const Auth = useContext(Context);
  const [error, setError] = useState("");

  const [loginUser, { loading }] = useMutation(LoginMutation, {
    update(_, result) {
      Cookie.set("RFGKS5", result.data, {
        expires: 30,
      });
      Auth.redirectCabinet.setAuth(true);
      setRedirect(true);
    },
    onError() {
      setError("Неправильный логин или пароль!");
    },
    variables: {
      login: login.login,
      password: login.password,
    },
  });

  function changeLogin(e) {
    setLogin({ ...login, [e.target.name]: e.target.value });
    setError("");
  }

  function onSubmit(e) {
    e.preventDefault();
    loginUser();
  }

  return (
    <div className="main-content-box login-content-box">
      {redirect ? <Redirect to="/" /> : ""}
      <Form className="group-input" onSubmit={onSubmit}>
        {loading ? <div className="loading-login"></div> : ""}
        <h1>ВХОД</h1>
        <Form.Input
          required
          label="Логин"
          name="login"
          type="text"
          value={login.login}
          onChange={changeLogin}
          autoComplete="username"
        />
        <Form.Input
          required
          label="Пароль"
          name="password"
          type="password"
          value={login.password}
          onChange={changeLogin}
          autoComplete="current-password"
        />
        {error ? <p className="error-message">{error}</p> : ""}
        <Button type="submit">Войти</Button>
      </Form>
    </div>
  );
}

export default Login;
