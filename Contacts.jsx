import { useEffect, useState }
from "react";

import API from "../services/api";

import {
  Link,
} from "react-router-dom";

const Contacts = () => {

  const [contacts, setContacts] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [selected, setSelected] =
    useState([]);

  useEffect(() => {

    fetchContacts();

  }, [search]);

  const fetchContacts = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await API.get(
          `/contacts?search=${search}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setContacts(response.data);

    } catch (error) {

      console.log(error);

      alert("Failed to load contacts");

    }

  };

  const handleSelect = (id) => {

    if (selected.includes(id)) {

      setSelected(
        selected.filter(
          (item) => item !== id
        )
      );

    } else {

      setSelected([
        ...selected,
        id,
      ]);

    }

  };

  const handleBulkDelete =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        await API.post(
          "/contacts/bulk-delete",
          {
            ids: selected,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          "Contacts deleted"
        );

        fetchContacts();

      } catch (error) {

        console.log(error);

        alert(
          "Delete failed"
        );

      }

    };

  return (
    <div style={{ padding: "20px" }}>

      <h1>Contacts</h1>

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <button
        onClick={handleBulkDelete}
        style={{
          marginLeft: "10px",
        }}
      >
        Delete Selected
      </button>

      <br /><br />

      <table
        border="1"
        cellPadding="10"
      >

        <thead>

          <tr>

            <th>Select</th>

            <th>Email</th>

            <th>First Name</th>

            <th>Last Name</th>

          </tr>

        </thead>

        <tbody>

          {contacts.map((contact) => (

            <tr key={contact.id}>

              <td>

                <input
                  type="checkbox"
                  onChange={() =>
                    handleSelect(
                      contact.id
                    )
                  }
                />

              </td>

              <td>

                <Link
                  to={`/contacts/${contact.id}`}
                >
                  {contact.email}
                </Link>

              </td>

              <td>
                {contact.first_name}
              </td>

              <td>
                {contact.last_name}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default Contacts;