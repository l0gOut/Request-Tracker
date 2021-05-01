import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";

function Login() {
  const [login, setLogin] = useState({
    login: "",
    password: "",
  });

  function changeLogin(e) {
    setLogin({ ...login, [e.target.name]: e.target.value });
  }

  return (
    <div className="main-content-box login-content-box">
      <Form className="group-input" onSubmit={() => console.log(login)}>
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
        <Button type="submit">Войти</Button>
      </Form>
    </div>
  );
}

export default Login;
