import {
    useEffect,
    useState,
  } from "react";
  
  import API from "../services/api";
  
  import {
    Link,
  } from "react-router-dom";
  
  const Templates = () => {
  
    const [templates, setTemplates] =
      useState([]);
  
    const [search, setSearch] =
      useState("");
  
    const [category, setCategory] =
      useState("");
  
    useEffect(() => {
  
      fetchTemplates();
  
    }, [search, category]);
  
    const fetchTemplates =
      async () => {
  
        try {
  
          const token =
            localStorage.getItem(
              "token"
            );
  
          const response =
            await API.get(
              `/templates?search=${search}&category=${category}`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );
  
          setTemplates(
            response.data
          );
  
        } catch (error) {
  
          console.log(error);
  
        }
  
      };
  
    return (
  
      <div style={{ padding: "20px" }}>
  
        <h1>Template Library</h1>
  
        <Link to="/templates/new">
          Create Template
        </Link>
  
        <br /><br />
  
        <input
          type="text"
          placeholder="Search templates"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
  
        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          style={{
            marginLeft: "10px",
          }}
        >
  
          <option value="">
            All Categories
          </option>
  
          <option value="Newsletter">
            Newsletter
          </option>
  
          <option value="Marketing">
            Marketing
          </option>
  
          <option value="Welcome">
            Welcome
          </option>
  
        </select>
  
        <br /><br />
  
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(3,1fr)",
            gap: "20px",
          }}
        >
  
          {templates.map((template) => (
  
            <div
              key={template.id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "10px",
              }}
            >
  
              <h3>
                {template.name}
              </h3>
  
              <p>
                {template.category}
              </p>
  
              <Link
                to={`/templates/${template.id}`}
              >
                Open
              </Link>
  
              <br /><br />
  
              <button
                onClick={async () => {
  
                  try {
  
                    const token =
                      localStorage.getItem(
                        "token"
                      );
  
                    await API.post(
                      `/templates/${template.id}/duplicate`,
                      {},
                      {
                        headers: {
                          Authorization:
                            `Bearer ${token}`,
                        },
                      }
                    );
  
                    alert(
                      "Template duplicated"
                    );
  
                    fetchTemplates();
  
                  } catch (error) {
  
                    console.log(error);
  
                    alert(
                      "Duplicate failed"
                    );
  
                  }
  
                }}
              >
  
                Duplicate
  
              </button>
  
            </div>
  
          ))}
  
        </div>
  
      </div>
  
    );
  
  };
  
  export default Templates;