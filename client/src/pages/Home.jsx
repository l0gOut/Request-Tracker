import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_TEMPLATES } from "../queries";

function Home() {
  const { data, loading } = useQuery(GET_ALL_TEMPLATES);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    if (!loading) {
      setTemplates(data.getAllApplicationTemplates);
    }
  }, [data, loading]);

  return (
    <div className="main-content-box">
      {/* <h1>Главная</h1> */}
      <div className="templates-problem-box">
        {templates.map((value, index) => {
          return (
            <div className="template-item" key={index}>
              <h4>{value.name}</h4>
              <p>{value.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
