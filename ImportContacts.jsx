import { useState } from "react";
import axios from "axios";

const ImportContacts = () => {

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {

    try {

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("file", file);

      const response = await axios({
        method: "post",
        url: "http://127.0.0.1:5000/api/contacts/import",
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResult(response.data);

    } catch (error) {

      console.log(error);

      alert("Import Failed");

    }
  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>Import Contacts CSV</h1>

      <input
        type="file"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <br /><br />

      <button onClick={handleUpload}>
        Upload CSV
      </button>

      {result && (

        <div>

          <h2>Import Result</h2>

          <p>Total: {result.total}</p>

          <p>Added: {result.added}</p>

          <p>Skipped: {result.skipped}</p>

        </div>

      )}

    </div>

  );
};

export default ImportContacts;