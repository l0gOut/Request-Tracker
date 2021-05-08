import React, { useContext, useEffect, useState } from "react";
import Context from "../Context";
import { useQuery, useMutation } from "@apollo/client";
import { GetUserQuery } from "../queries";
import { Menu, Container, Header, Form } from "semantic-ui-react";
import { ChangeUser } from "../queries";

function Cabinet() {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    phone: "",
  });

  const [selectedBlock, setSelectedBlock] = useState(1);

  const [disabledButton, setDisabledButton] = useState(true);

  const User = useContext(Context);

  const { data, loading } = useQuery(GetUserQuery, {
    variables: {
      id: parseInt(User.username.login.id),
    },
  });

  const [changeName, { loadingMutation }] = useMutation(ChangeUser, {
    onCompleted() {
      window.location.reload(false);
    },
    variables: {
      id: parseInt(User.username.login.id),
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      middleName: userInfo.middleName,
      email: userInfo.email,
      phone: userInfo.phone,
    },
  });

  useEffect(() => {
    if (!loading) {
      setUserInfo(data.getUserById);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const selectorChange = (value) => {
    setSelectedBlock(value);
  };

  const onSubmit = () => {
    setDisabledButton(true);
    changeName();
  };

  function changeUserInfo(e) {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    setDisabledButton(false);
  }

  return (
    <div className="main-content-box main-cabinet-box">
      <Menu className="selector-block">
        <Menu.Item
          active={selectedBlock === 1}
          onClick={() => selectorChange(1)}
        >
          Профиль
        </Menu.Item>
        <Menu.Item
          active={selectedBlock === 2}
          onClick={() => selectorChange(2)}
        >
          Мои Заявки
        </Menu.Item>
        <Menu.Item
          active={selectedBlock === 3}
          onClick={() => selectorChange(3)}
        >
          Выход
        </Menu.Item>
      </Menu>
      <Menu
        className={
          selectedBlock === 1 ? "info-block info-block-active" : "info-block"
        }
      >
        <Menu.Item
          className="profile"
          as={Container}
          active={selectedBlock === 1}
        >
          {loadingMutation ? <div className="loading"></div> : ""}
          {loading ? (
            <div className="loading"></div>
          ) : (
            <Form onSubmit={onSubmit}>
              <Header as="h1"></Header>
              <Form.Input
                label="Имя"
                value={userInfo.firstName}
                name="firstName"
                onChange={changeUserInfo}
                required
              />
              <Form.Input
                label="Фамилия"
                value={userInfo.lastName}
                name="lastName"
                onChange={changeUserInfo}
                required
              />
              <Form.Input
                label="Отчество"
                value={userInfo.middleName}
                name="middleName"
                onChange={changeUserInfo}
                required
              />
              <Form.Input
                label="Почта"
                type="email"
                value={userInfo.email}
                name="email"
                onChange={changeUserInfo}
                required
              />
              <Form.Input
                label="Телефон"
                type="tel"
                value={userInfo.phone}
                name="phone"
                onChange={changeUserInfo}
                required
              />
              <Form.Button type="submit" disabled={disabledButton}>
                Сохранить изменения
              </Form.Button>
            </Form>
          )}
        </Menu.Item>
        <Menu.Item
          className="request"
          as={Container}
          active={selectedBlock === 2}
        ></Menu.Item>
        <Menu.Item
          className="quit"
          as={Container}
          active={selectedBlock === 3}
        ></Menu.Item>
      </Menu>
    </div>
  );
}

export default Cabinet;
