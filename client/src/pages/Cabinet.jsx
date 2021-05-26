import React, { useContext, useState, useEffect } from "react";
import Context from "../Context";
import { useQuery, useMutation } from "@apollo/client";
import {
  GetUserQuery,
  ChangeUser,
  GetAllApplications,
  DeleteApplication,
  GetAllRole,
  GetAllGender,
  GetAllDepartment,
  CreateUser,
  CreateLogin,
  GetAllLoginList,
  GetAllApplicationsAdmin,
  GetAllStatus,
  ChangeStatus,
} from "../Queries";
import { Menu, Container, Header, Form, Button } from "semantic-ui-react";
import lodash from "lodash";
import { store } from "react-notifications-component";
import Cookie from "js-cookie";
import Select from "react-select";

function Cabinet() {
  const User = useContext(Context);

  const [selectedBlock, setSelectedBlock] = useState(1);
  const [role, setRole] = useState("");

  const [userQuery] = useMutation(GetUserQuery, {
    onCompleted(data) {
      setRole(data.getUserById.role.roleName);
    },
    variables: {
      id: parseInt(User.username.login.userId),
    },
  });

  const selectorChange = (value) => {
    setSelectedBlock(value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => userQuery(), []);

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
        {role === "Администратор" ? (
          <>
            <Menu.Item
              active={selectedBlock === 3}
              onClick={() => selectorChange(3)}
            >
              Создать Пользователя
            </Menu.Item>
            <Menu.Item
              active={selectedBlock === 4}
              onClick={() => selectorChange(4)}
            >
              Просмотр Всех Заявок
            </Menu.Item>
          </>
        ) : (
          ""
        )}

        <Menu.Item
          active={selectedBlock === 5}
          onClick={() => selectorChange(5)}
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
          <MyApplications number={selectedBlock} />
        </Menu.Item>
        {role === "Администратор" ? (
          <>
            <Menu.Item
              className="create-user"
              as={Container}
              active={selectedBlock === 3}
            >
              <CreateUserForm />
            </Menu.Item>
            <Menu.Item
              className="all-applications"
              as={Container}
              active={selectedBlock === 4}
            >
              <AllApplications number={selectedBlock} />
            </Menu.Item>
          </>
        ) : (
          ""
        )}
        <Menu.Item className="quit" as={Container} active={selectedBlock === 5}>
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
  const User = useContext(Context);

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

  // const { data: dataGender, loading: loadingGender } = useQuery(GetAllGender);

  // const { data: dataDepartment } = useQuery(GetAllDepartment, {
  //   onCompleted() {
  //     // console.log(dataDepartment.getAllDepartment);
  //   },
  // });

  const [userQuery, { loading }] = useMutation(GetUserQuery, {
    onCompleted(data) {
      setUserInfo(data.getUserById);
      setUserInfoCheck(data.getUserById);
    },
    variables: {
      id: parseInt(User.username.login.userId),
    },
  });

  const [changeName, { loading: loadingMutation }] = useMutation(ChangeUser, {
    onCompleted() {
      setUserInfoCheck(userInfo);
      store.addNotification({
        message: "Данные были изменены!",
        type: "success",
        insert: "top",
        container: "top-right",
        dismiss: {
          duration: 5000,
          onScreen: true,
          showIcon: true,
          click: true,
        },
      });
    },
    variables: {
      id: parseInt(User.username.login.userId),
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
    // || loadingGender
    <div className="loading"></div>
  ) : (
    <Form onSubmit={onSubmit}>
      <Header as="h1">Изменение Данных</Header>
      <Header as="h4">Пол: {userInfo.gender.genderName}</Header>
      <Header as="h4">Имя кабинета: {userInfo.department.name}</Header>
      <p>Номер кабинета: {userInfo.department.number}</p>
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

function MyApplications({ number }) {
  const User = useContext(Context);

  const [applications, setApplications] = useState([]);
  const [applicationId, setApplicationId] = useState(0);

  const [queryAllApplications, { loading }] = useMutation(GetAllApplications, {
    onCompleted(data) {
      setApplications(data.getAllApplications);
    },
    variables: {
      id: parseInt(User.username.login.userId),
    },
  });

  const [deleteApplication, { loading: loadingMutation }] = useMutation(
    DeleteApplication,
    {
      onCompleted() {
        store.addNotification({
          message: "Заявка была удалена!",
          type: "success",
          insert: "top",
          container: "top-right",
          dismiss: {
            duration: 5000,
            onScreen: true,
            showIcon: true,
            click: true,
          },
        });
        queryAllApplications();
      },
      variables: {
        id: applicationId,
      },
    }
  );

  async function onDeleteApplication(value) {
    await setApplicationId(value);
    deleteApplication();
  }

  useEffect(() => {
    if (number === 2) {
      queryAllApplications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number]);

  return loading || loadingMutation ? (
    <div className="loading"></div>
  ) : applications.length === 0 ? (
    <h1 className="null-applications">Вы не оставляли заявок!</h1>
  ) : (
    applications.map((value) => {
      return (
        <div key={value.id} className="application-item">
          <div className="header-application">
            <h2>{value.application.name}</h2>
            <button
              title="Удалить заявку"
              onClick={() => onDeleteApplication(value.application.id)}
            >
              &times;
            </button>
          </div>
          <div className="application-item-description">
            <p>{value.application.description}</p>
          </div>
          <div className="date-status">
            <p>{value.date.toString().substring(0, 10)}</p>
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
        </div>
      );
    })
  );
}

function CreateUserForm() {
  const [roles] = useState([]);
  const [genders] = useState([]);
  const [loginList, setLoginList] = useState([]);
  const [departments] = useState([]);
  const [loginId, setLoginId] = useState(0);
  const [user, setUser] = useState({
    login: "",
    password: "",
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    phone: "",
    role: {
      id: 0,
    },
    gender: {
      id: 0,
    },
    department: {
      id: 0,
    },
  });

  useQuery(GetAllRole, {
    onCompleted(data) {
      data.getAllRole.map((value) =>
        roles.push({
          value: value,
          label: `Роль: ${value.roleName}`,
        })
      );
    },
  });

  useQuery(GetAllGender, {
    onCompleted(data) {
      data.getAllGender.map((value) =>
        genders.push({
          value: value,
          label: `Пол: ${value.genderName}`,
        })
      );
    },
  });

  useQuery(GetAllDepartment, {
    onCompleted(data) {
      data.getAllDepartment.map((value) =>
        departments.push({
          value: value,
          label: `${value.number} кабинет: ${value.name}`,
        })
      );
    },
  });

  const [readLoginList] = useMutation(GetAllLoginList, {
    onCompleted(data) {
      data.getAllLogin.map((value) => loginList.push(value.login));
    },
  });

  const [createUserMutation, { loading: loadingMutationOne }] = useMutation(
    CreateUser,
    {
      onCompleted(data) {
        setLoginId(data.createUser.id);
        createLoginMutation();
      },
      variables: {
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        email: user.email,
        phone: user.phone,
        role: user.role.id,
        gender: user.gender.id,
        department: user.department.id,
      },
    }
  );

  const [createLoginMutation, { loading: loadingMutationTwo }] = useMutation(
    CreateLogin,
    {
      onCompleted() {
        setLoginList([]);
        store.addNotification({
          message: `${user.firstName} ${user.middleName} был добавлен!`,
          type: "success",
          insert: "top",
          container: "top-right",
          dismiss: {
            duration: 5000,
            onScreen: true,
            showIcon: true,
            click: true,
          },
        });
        readLoginList();
      },
      variables: {
        login: user.login,
        password: user.password,
        user: loginId,
      },
    }
  );

  function onChangeInput(value) {
    setUser({ ...user, [value.target.name]: value.target.value });
  }

  function onChangeSelect(value, name) {
    setUser({ ...user, [name.name]: value.value });
  }

  function createUser() {
    if (user.role.id && user.gender.id && user.department.id) {
      if (!loginList.includes(user.login)) {
        createUserMutation();
      } else {
        store.addNotification({
          message: "Логин уже существует!",
          type: "danger",
          insert: "top",
          container: "top-right",
          dismiss: {
            duration: 5000,
            onScreen: true,
            showIcon: true,
            click: true,
          },
        });
      }
    } else {
      store.addNotification({
        message: "Заполните все поля!",
        type: "danger",
        insert: "top",
        container: "top-right",
        dismiss: {
          duration: 5000,
          onScreen: true,
          showIcon: true,
          click: true,
        },
      });
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => readLoginList(), []);

  return loadingMutationOne || loadingMutationTwo ? (
    <div className="loading"></div>
  ) : (
    <Form className="admin-chose" onSubmit={() => createUser()}>
      <Form.Input
        required
        label="Логин"
        name="login"
        value={user.login}
        onChange={onChangeInput}
      ></Form.Input>
      <Form.Input
        required
        label="Пароль"
        type="password"
        name="password"
        value={user.password}
        onChange={onChangeInput}
      ></Form.Input>
      <Form.Input
        required
        label="Имя"
        name="firstName"
        value={user.firstName}
        onChange={onChangeInput}
      ></Form.Input>
      <Form.Input
        required
        label="Фамилия"
        name="lastName"
        value={user.lastName}
        onChange={onChangeInput}
      ></Form.Input>
      <Form.Input
        required
        label="Отчество"
        name="middleName"
        value={user.middleName}
        onChange={onChangeInput}
      ></Form.Input>
      <Form.Input
        required
        label="Почта"
        type="email"
        name="email"
        value={user.email}
        onChange={onChangeInput}
      ></Form.Input>
      <Form.Input
        required
        label="Номер Телефона"
        type="tel"
        name="phone"
        value={user.phone}
        onChange={onChangeInput}
      ></Form.Input>
      <Select
        name="role"
        className="select"
        placeholder="Права доступа"
        options={roles}
        isSearchable={true}
        onChange={(value, name) => onChangeSelect(value, name)}
      />
      <Select
        name="gender"
        className="select"
        placeholder="Пол"
        options={genders}
        isSearchable={true}
        onChange={(value, name) => onChangeSelect(value, name)}
      />
      <Select
        name="department"
        className="select"
        placeholder="Кабинет"
        options={departments}
        isSearchable={true}
        onChange={(value, name) => onChangeSelect(value, name)}
      />
      <Form.Button type="submit">Создать пользователя</Form.Button>
    </Form>
  );
}

function AllApplications({ number }) {
  const [application, setApplication] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [applicationId, setApplicationId] = useState(0);
  const [applicationInfo, setApplicationInfo] = useState({ 0: { id: 1 } });

  const [allApplication, { loading: loadOne }] = useMutation(
    GetAllApplicationsAdmin,
    {
      onCompleted(data) {
        setApplication(data.getAllApplicationsAdmin);
      },
    }
  );

  const [allStatus, { loading: loadTwo }] = useMutation(GetAllStatus, {
    onCompleted(data) {
      data.getAllStatus.map((value) =>
        statusList.push({
          value: value,
          label: `Статус: ${value.status}`,
        })
      );
    },
  });

  const [deleteApplication, { loading: loadingMutation }] = useMutation(
    DeleteApplication,
    {
      onCompleted() {
        store.addNotification({
          message: "Заявка была удалена!",
          type: "success",
          insert: "top",
          container: "top-right",
          dismiss: {
            duration: 5000,
            onScreen: true,
            showIcon: true,
            click: true,
          },
        });
        allApplication();
      },
      variables: {
        id: applicationId,
      },
    }
  );

  const [changeStatus, { loading: loadingChangeStatus }] = useMutation(
    ChangeStatus,
    {
      onCompleted() {
        store.addNotification({
          message: "Статус заявки был изменен!",
          type: "success",
          insert: "top",
          container: "top-right",
          dismiss: {
            duration: 5000,
            onScreen: true,
            showIcon: true,
            click: true,
          },
        });
        setApplicationId(0);
        setApplicationInfo({ 0: { id: 1 } });
        allApplication();
      },
      variables: {
        id: applicationId,
        statusId: applicationInfo[applicationId].id,
      },
    }
  );

  async function onDeleteApplication(value) {
    await setApplicationId(value);
    deleteApplication();
  }

  async function changeApplicationStatus(value, name) {
    if (applicationInfo[value]) {
      if (applicationInfo[value].status === name.name) {
        store.addNotification({
          message: "Вы выбрали тот же статус! Пожалуйста выберите новый!",
          type: "danger",
          insert: "top",
          container: "top-right",
          dismiss: {
            duration: 5000,
            onScreen: true,
            showIcon: true,
            click: true,
          },
        });
      } else {
        await setApplicationId(value);
        changeStatus();
      }
    } else {
      store.addNotification({
        message: "Выберите новое значение для статуса!",
        type: "danger",
        insert: "top",
        container: "top-right",
        dismiss: {
          duration: 5000,
          onScreen: true,
          showIcon: true,
          click: true,
        },
      });
    }
  }

  function onSelected(value, name) {
    setApplicationInfo({
      ...applicationInfo,
      [name.name]: value.value,
    });
    console.log(applicationInfo);
  }

  useEffect(() => {
    if (number === 4) {
      allApplication();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number]);

  useEffect(() => {
    setStatusList([]);
    allStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loadTwo || loadOne || loadingMutation || loadingChangeStatus ? (
        <div className="loading"></div>
      ) : application.length >= 1 ? (
        application.map((value) => {
          return (
            <div
              key={value.id}
              className={
                value.status.status === "Не рассмотрена"
                  ? "application-item red"
                  : value.status.status === "Выполняется..."
                  ? "application-item orange"
                  : "application-item green"
              }
            >
              <div className="header-application">
                <h2>{value.application.name}</h2>
                <button
                  title="Удалить заявку"
                  onClick={() => onDeleteApplication(value.application.id)}
                >
                  &times;
                </button>
              </div>
              <div className="application-item-description">
                <p>{value.application.description}</p>
              </div>
              <div className="date-status">
                <p>
                  {value.application.user.department.number} кабинет "
                  {value.application.user.department.name}"
                </p>
                <p>{value.date.toString().substring(0, 10)}</p>
                <p>Нынешний статус: {value.status.status}</p>
              </div>
              <div className="select-option">
                <Select
                  className="select"
                  name={value.id}
                  options={statusList}
                  onChange={(value, name) => onSelected(value, name)}
                />
                <Button
                  name={value.status.status}
                  onClick={(_, name) => changeApplicationStatus(value.id, name)}
                >
                  Изменить
                </Button>
              </div>
            </div>
          );
        })
      ) : (
        <h1>Нет заявок в базе данных!</h1>
      )}
    </>
  );
}

export default Cabinet;
