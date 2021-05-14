import React, { useContext, useState, useEffect } from "react";
import Context from "../Context";
import { useMutation } from "@apollo/client";
import { GetUserQuery, ChangeUser, GetAllApplications } from "../Queries";
import { Menu, Container, Header, Form } from "semantic-ui-react";
import lodash from "lodash";
import Cookie from "js-cookie";

function Cabinet() {
  const User = useContext(Context);

  const [selectedBlock, setSelectedBlock] = useState(1);

  const selectorChange = (value) => {
    setSelectedBlock(value);
  };

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
          <MyProfile User={User} />
        </Menu.Item>
        <Menu.Item
          className="request"
          as={Container}
          active={selectedBlock === 2}
        >
          <MyApplications />
        </Menu.Item>
        <Menu.Item className="quit" as={Container} active={selectedBlock === 3}>
          <Form.Button
            onClick={() => {
              Cookie.remove("user");
              User.redirectCabinet.setAuth(false);
              User.setUser({});
            }}
          >
            Выйти
          </Form.Button>
        </Menu.Item>
      </Menu>
    </div>
  );
}

function MyProfile() {
  const [userInfoCheck, setUserInfoCheck] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    phone: "",
    gender: {
      genderName: "",
    },
    department: {
      name: "",
      number: "",
    },
  });

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    phone: "",
    gender: {
      genderName: "",
    },
    department: {
      name: "",
      number: "",
    },
  });

  const User = useContext(Context);

  const [userQuery, { loading }] = useMutation(GetUserQuery, {
    onCompleted(data) {
      setUserInfo(data.getUserById);
      setUserInfoCheck(data.getUserById);
    },
    variables: {
      id: parseInt(User.username.login.id),
    },
  });

  const [changeName, { loading: loadingMutation }] = useMutation(ChangeUser, {
    onCompleted() {
      setUserInfoCheck(userInfo);
      alert("Данные были изменены успешно!");
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

  const onSubmit = () => {
    changeName();
  };

  function changeUserInfo(e) {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    userQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loadingMutation || loading ? (
    <div className="loading"></div>
  ) : (
    <Form onSubmit={onSubmit}>
      <Header as="h1">Изменение Данных</Header>
      <Header as="h4">{userInfo.gender.genderName}</Header>
      <Header as="h4">{userInfo.department.name}</Header>
      <p>{userInfo.department.number}</p>
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
      <Form.Button
        type="submit"
        disabled={lodash.isEqual(userInfo, userInfoCheck)}
      >
        {lodash.isEqual(userInfo, userInfoCheck)
          ? "Внесите изменения!"
          : "Сохранить изменения"}
      </Form.Button>
    </Form>
  );
}

function MyApplications() {
  const User = useContext(Context);
  const [applications, setApplications] = useState([]);

  const [queryAllApplications, { loading }] = useMutation(GetAllApplications, {
    onCompleted(data) {
      setApplications(data.getAllApplications);
    },
    variables: {
      id: parseInt(User.username.login.id),
    },
  });

  useEffect(() => {
    queryAllApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <div className="loading"></div>
  ) : (
    applications.map((value) => {
      return (
        <div key={value.id} className="application-item">
          <h2>{value.application.name}</h2>
          <div>
            <p>{value.application.description}</p>
          </div>
          <h6
            className={
              value.status.status === "Не рассмотрена"
                ? "application-red"
                : value.status.status === "Выполняется..."
                ? "application-yellow"
                : "application-green"
            }
          >
            {value.status.status}
          </h6>
        </div>
      );
    })
  );
}

export default Cabinet;
