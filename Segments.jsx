import { useState }
from "react";

import API from "../services/api";

const Segments = () => {

  const [name, setName] =
    useState("");

  const [rules, setRules] =
    useState("");

  const handleCreate =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        await API.post(
          "/contacts/segments",
          {
            name,
            rules: {
              condition: rules,
            },
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          "Segment created"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Segment creation failed"
        );

      }

    };

  return (
    <div style={{ padding: "20px" }}>

      <h1>
        Segments Builder
      </h1>

      <input
        type="text"
        placeholder="Segment Name"
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <br /><br />

      <input
        type="text"
        placeholder="Rules"
        onChange={(e) =>
          setRules(e.target.value)
        }
      />

      <br /><br />

      <button onClick={handleCreate}>
        Create Segment
      </button>

    </div>
  );
};

export default Segments;