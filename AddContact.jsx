import { useState } from "react";

import API from "../services/api";

const AddContact = () => {

  const [form, setForm] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const token =
      localStorage.getItem("token");

    await API.post(
      "/contacts",
      form,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    alert("Contact Added");

  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>Add Contact</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Add Contact
        </button>

      </form>

    </div>
  );
};

export default AddContact;