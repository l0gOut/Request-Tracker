import React, { useEffect, useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_ALL_TEMPLATES,
  CreateApplication,
  CreateApplicationStatus,
} from "../Queries";
import { Menu, Form } from "semantic-ui-react";
import Context from "../Context";

function Home() {
  const [activeItem, setActiveItem] = useState(1);

  return (
    <div className="main-content-box home-content-box">
      <Menu className="home-selector-block">
        <Menu.Item active={activeItem === 1} onClick={() => setActiveItem(1)}>
          Шаблоны создания
        </Menu.Item>
        <Menu.Item active={activeItem === 2} onClick={() => setActiveItem(2)}>
          Создать индивидуальную заявку
        </Menu.Item>
      </Menu>
      <div
        className={
          activeItem === 1
            ? "templates-problem-box template-block-active"
            : "templates-problem-box"
        }
      >
        <TemplateFormComponent />
      </div>
      <div
        className={
          activeItem === 2
            ? "templates-problem-box template-block-active"
            : "templates-problem-box"
        }
      >
        <UniqueClaimComponent />
      </div>
    </div>
  );
}

function TemplateFormComponent() {
  const [templateForm, setTemplateForm] = useState(false);
  const [applicationId, setApplicationId] = useState(0);
  const [templates, setTemplates] = useState([]);
  const [userId, setUserId] = useState(0);

  const User = useContext(Context);
  const [templateData, setTemplateData] = useState({
    name: "",
    description: "",
  });

  const { data, loading } = useQuery(GET_ALL_TEMPLATES);

  const [createApplication, { loading: loadingMutationOne }] = useMutation(
    CreateApplication,
    {
      onCompleted(data) {
        setApplicationId(parseInt(data.createApplication.id));
      },
      variables: {
        name: templateData.name,
        description: templateData.description,
        userId: userId,
      },
    }
  );

  const [createApplicationStatus, { loading: loadingMutationTwo }] =
    useMutation(CreateApplicationStatus, {
      variables: {
        date: new Date(),
        applicationId: applicationId,
      },
    });

  function templateFormCreate(value) {
    setTemplateData(value);
    setTemplateForm(true);
  }

  function onChangeTemplateData(e) {
    setTemplateData({ ...templateData, [e.target.name]: e.target.value });
  }

  async function onSubmitCreateApplication() {
    if (User.username.login) {
      await setUserId(parseInt(User.username.login.id));
      createApplication().then((yes) => {
        if (yes) {
          createApplicationStatus().then((yes2) => {
            if (yes2) {
              setTemplateForm(false);
              alert("Заявка была успешно создана!");
            }
          });
        }
      });
    } else alert("Зарегистрируйтесь!");
  }

  useEffect(() => {
    if (!loading) {
      setTemplates(data.getAllApplicationTemplates);
    }
  }, [data, loading]);

  return (
    <>
      {templateForm ? (
        loadingMutationOne || loadingMutationTwo ? (
          <div className="loading"></div>
        ) : (
          <Form className="template-form" onSubmit={onSubmitCreateApplication}>
            <Form.Button
              className="template-cross"
              onClick={() => setTemplateForm(false)}
            >
              &times;
            </Form.Button>
            <Menu.Header as="h1">Создание заявки по шаблону</Menu.Header>
            <Form.Input
              className="input-template"
              disabled
              label="Имя"
              name="name"
              value={templateData.name}
              onChange={onChangeTemplateData}
            />
            <Form.TextArea
              className="input-template"
              label="Описание проблемы"
              name="description"
              value={templateData.description}
              onChange={onChangeTemplateData}
              required
            />
            <Form.Button type="submit" className="template-submit">
              Оставить заявку
            </Form.Button>
          </Form>
        )
      ) : loading ? (
        <div className="loading"></div>
      ) : (
        templates.map((value, index) => {
          return (
            <div className="template-item" key={index}>
              <h4>{value.name}</h4>
              <div className="template-description">
                <p>{value.description}</p>
              </div>
              <div className="template-button">
                <button onClick={() => templateFormCreate(value)}>
                  Использовать
                </button>
              </div>
            </div>
          );
        })
      )}
    </>
  );
}

function UniqueClaimComponent() {
  const [userId, setUserId] = useState(0);
  const [applicationId, setApplicationId] = useState(0);
  const [uniqueClaim, setUniqueClaim] = useState({
    name: "",
    description: "",
  });

  const User = useContext(Context);

  const [addApplication, { loading: loadingMutationOne }] = useMutation(
    CreateApplication,
    {
      onCompleted(data) {
        setApplicationId(parseInt(data.createApplication.id));
      },
      variables: {
        name: uniqueClaim.name,
        description: uniqueClaim.description,
        userId: userId,
      },
    }
  );

  const [addApplicationStatus, { loading: loadingMutationTwo }] = useMutation(
    CreateApplicationStatus,
    {
      variables: {
        date: new Date(),
        applicationId: applicationId,
      },
    }
  );

  function onChangeUniqueClaim(e) {
    setUniqueClaim({ ...uniqueClaim, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    if (User.username.login) {
      await setUserId(parseInt(User.username.login.id));
      addApplication().then((yes) => {
        if (yes)
          addApplicationStatus().then((yes2) => {
            if (yes2) alert("Заявка была успешно создана!");
          });
      });
    } else alert("Зарегистрируйтесь!");
  }

  return loadingMutationOne || loadingMutationTwo ? (
    <div className="loading"></div>
  ) : (
    <Form className="unique-claim" onSubmit={onSubmit}>
      <Menu.Header as="h1">Создание уникальной заявки</Menu.Header>
      <Form.Input
        className="unique-input"
        label="Заголовок проблемы"
        name="name"
        value={uniqueClaim.name}
        onChange={onChangeUniqueClaim}
        required
      />
      <Form.TextArea
        className="text-area unique-input"
        label="Описание проблемы(опишите более подробно)"
        name="description"
        rows={3}
        value={uniqueClaim.description}
        onChange={onChangeUniqueClaim}
        required
      />
      <Form.Button type="submit">Отправить</Form.Button>
    </Form>
  );
}

export default Home;
