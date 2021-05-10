import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_TEMPLATES } from "../queries";
import { Menu, Form } from "semantic-ui-react";

function Home() {
  const [templates, setTemplates] = useState([]);
  const [activeItem, setActiveItem] = useState(1);
  const [uniqueClaim, setUniqueClaim] = useState({
    name: "",
    description: "",
  });

  const { data, loading } = useQuery(GET_ALL_TEMPLATES);

  useEffect(() => {
    if (!loading) {
      setTemplates(data.getAllApplicationTemplates);
    }
  }, [data, loading]);

  function onChangeUniqueClaim(e) {
    setUniqueClaim({ ...uniqueClaim, [e.target.name]: e.target.value });
  }

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
        {templates.map((value, index) => {
          return (
            <div className="template-item" key={index}>
              <h4>{value.name}</h4>
              <div className="template-description">
                <p>{value.description}</p>
              </div>
              <div className="template-button">
                <button value={value} onClick={() => console.log(value)}>
                  Использовать
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className={
          activeItem === 2
            ? "templates-problem-box template-block-active"
            : "templates-problem-box"
        }
      >
        <Form className="unique-claim">
          <Menu.Header as="h1">Создание уникальной заявки</Menu.Header>
          <Form.Input
            label="Заголовок проблемы"
            name="name"
            value={uniqueClaim.name}
            onChange={onChangeUniqueClaim}
          />
          <Form.TextArea
            className="text-area"
            label="Описание проблемы(опишите более подробно)"
            name="description"
            rows={3}
            value={uniqueClaim.description}
            onChange={onChangeUniqueClaim}
          />
          <Form.Button type="submit">Отправить</Form.Button>
        </Form>
      </div>
    </div>
  );
}

export default Home;
