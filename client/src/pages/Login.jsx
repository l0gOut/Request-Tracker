import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { LoginMutation } from "../queries";

function Login(props) {
  const [login, setLogin] = useState({
    login: "",
    password: "",
  });
  const [error, setError] = useState("");

  const [loginUser, { loading }] = useMutation(LoginMutation, {
    update(_, result) {
      props.history.push("/");
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
    setTimeout(1000);
    loginUser();
  }

  return (
    <div className="main-content-box login-content-box">
      {loading ? <div className="loading"></div> : ""}
      <Form className="group-input" onSubmit={onSubmit}>
        <h1>ВХОД</h1>
        <Form.Input
          label="Логин"
          name="login"
          type="text"
          value={login.login}
          onChange={changeLogin}
          autoComplete="username"
        />
        <Form.Input
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
