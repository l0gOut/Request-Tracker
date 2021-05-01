import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_TEMPLATES } from "../Queries";

function Home() {
  const { data, loading } = useQuery(GET_ALL_TEMPLATES);
  const [templates, setTemplates] = useState([]);

  console.log(data);

  useEffect(() => {
    if (!loading) {
      setTemplates(data.getAllApplicationTemplates);
    }
  }, [data, loading]);

  return (
    <div className="main-content-box">
      <h1>Главная</h1>
      {templates.map((value) => {
        return (
          <div>
            <h4>{value.name}</h4>
            <p>{value.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
