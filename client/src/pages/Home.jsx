import React, { useEffect, useState, useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_TEMPLATES } from "../Queries";
import { Menu, Form } from "semantic-ui-react";
import Context from "../Context";
import { store } from "react-notifications-component";
import useCreateApplication from "../hooks/useCreateApplication";

function Home() {
  const [activeItem, setActiveItem] = useState(1);

  return (
    <div className="main-content-box home-content-box">
      <Menu className="home-selector-block">
        <Menu.Item active={activeItem === 1} onClick={() => setActiveItem(1)}>
          Шаблоны создания
        </Menu.Item>
        <Menu.Item active={activeItem === 2} onClick={() => setActiveItem(2)}>
          Создать уникальную заявку
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
  const [mutationLoading, setMutationLoading] = useState(false);
  const [mutationReady, setMutationReady] = useState(false);
  const [templateForm, setTemplateForm] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [userId, setUserId] = useState(0);
  const [templateData, setTemplateData] = useState({
    name: "",
    description: "",
  });

  useCreateApplication(
    templateData,
    userId,
    setMutationLoading,
    mutationReady,
    setMutationReady
  );

  const User = useContext(Context);

  const { data, loading } = useQuery(GET_ALL_TEMPLATES);

  function templateFormCreate(value) {
    setTemplateData(value);
    setTemplateForm(true);
  }

  function onChangeTemplateData(e) {
    setTemplateData({ ...templateData, [e.target.name]: e.target.value });
  }

  async function onSubmit() {
    if (User.username.login) {
      await setUserId(parseInt(User.username.login.userId));
      setMutationReady(true);
    } else {
      store.addNotification({
        message: "Сначало авторизуйтесь!",
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

  useEffect(() => {
    if (!loading) {
      setTemplates(data.getAllApplicationTemplates);
    }
  }, [data, loading]);

  return templateForm ? (
    mutationLoading ? (
      <div className="loading"></div>
    ) : (
      <Form className="template-form" onSubmit={onSubmit}>
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
  );
}

function UniqueClaimComponent() {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(0);
  const [mutationReady, setMutationReady] = useState(false);
  const [uniqueClaim, setUniqueClaim] = useState({
    name: "",
    description: "",
  });
  useCreateApplication(
    uniqueClaim,
    userId,
    setLoading,
    mutationReady,
    setMutationReady
  );

  const User = useContext(Context);

  function onChangeUniqueClaim(e) {
    setUniqueClaim({ ...uniqueClaim, [e.target.name]: e.target.value });
  }

  function onSubmit() {
    if (User.username.login) {
      setUserId(parseInt(User.username.login.userId));
      setMutationReady(true);
    } else {
      store.addNotification({
        message: "Сначало авторизуйтесь!",
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

  return loading ? (
    <div className="loading"></div>
  ) : (
    <Form className="unique-claim" onSubmit={onSubmit}>
      <Menu.Header as="h1">Создание уникальной заявки</Menu.Header>
      <Form.Input
        className="unique-input"
        label="Заголовок проблемы"
        name="name"
        maxLength="25"
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
