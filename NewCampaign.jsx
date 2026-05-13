import {
    useEffect,
    useState,
  } from "react";
  
  import API from "../services/api";
  
  const NewCampaign = () => {
  
    const [templates,
      setTemplates] =
      useState([]);
  
    const [form, setForm] =
      useState({
        name: "",
        subject: "",
        preview_text: "",
        from_name: "",
        from_email: "",
        template_id: "",
      });
  
    useEffect(() => {
  
      fetchTemplates();
  
    }, []);
  
    const fetchTemplates =
      async () => {
  
        try {
  
          const token =
            localStorage.getItem("token");
  
          console.log(token);
  
          const response =
            await API.get(
              "/templates",
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
  
    const handleChange =
      (e) => {
  
        setForm({
          ...form,
          [e.target.name]:
            e.target.value,
        });
  
      };
  
    const handleSubmit =
      async (e) => {
  
        e.preventDefault();
  
        try {
  
          const token =
            localStorage.getItem("token");
  
          await API.post(
            "/campaigns",
            form,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );
  
          alert(
            "Campaign Created"
          );
  
        } catch (error) {
  
          console.log(error);
  
          alert(
            "Campaign creation failed"
          );
  
        }
  
      };
  
    return (
  
      <div style={{
        padding: "20px",
      }}>
  
        <h1>
          Create Campaign
        </h1>
  
        <form
          onSubmit={handleSubmit}
        >
  
          <input
            type="text"
            name="name"
            placeholder="Campaign Name"
            onChange={
              handleChange
            }
          />
  
          <br /><br />
  
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            onChange={
              handleChange
            }
          />
  
          <br /><br />
  
          <textarea
            name="preview_text"
            placeholder="Preview Text"
            onChange={
              handleChange
            }
          />
  
          <br /><br />
  
          <input
            type="text"
            name="from_name"
            placeholder="From Name"
            onChange={
              handleChange
            }
          />
  
          <br /><br />
  
          <input
            type="email"
            name="from_email"
            placeholder="From Email"
            onChange={
              handleChange
            }
          />
  
          <br /><br />
  
          <select
            name="template_id"
            onChange={
              handleChange
            }
          >
  
            <option value="">
              Select Template
            </option>
  
            {templates.map(
              (template) => (
  
              <option
                key={
                  template.id
                }
                value={
                  template.id
                }
              >
                {template.name}
              </option>
  
            ))}
  
          </select>
  
          <br /><br />
  
          <button
            type="submit"
          >
            Create Campaign
          </button>
  
        </form>
  
      </div>
  
    );
  
  };
  
  export default NewCampaign;