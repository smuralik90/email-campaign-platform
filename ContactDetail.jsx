import { useEffect, useState }
from "react";

import { useParams }
from "react-router-dom";

import API from "../services/api";

const ContactDetail = () => {

  const { id } = useParams();

  const [contact, setContact] =
    useState(null);

  const [events, setEvents] =
    useState([]);

  useEffect(() => {

    fetchContact();

    fetchEvents();

  }, []);

  const fetchContact = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await API.get(
          `/contacts/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setContact(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchEvents = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await API.get(
          `/contacts/${id}/events`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setEvents(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  if (!contact) {
    return <h1>Loading...</h1>;
  }

  return (
    <div style={{ padding: "20px" }}>

      <h1>Contact Detail</h1>

      <hr />

      <p>
        <b>Email:</b> {contact.email}
      </p>

      <p>
        <b>First Name:</b>
        {contact.first_name}
      </p>

      <p>
        <b>Last Name:</b>
        {contact.last_name}
      </p>

      <p>
        <b>Phone:</b> {contact.phone}
      </p>

      <p>
        <b>Status:</b> {contact.status}
      </p>

      <p>
        <b>Source:</b> {contact.source}
      </p>

      <hr />

      <h2>Event Timeline</h2>

      {events.length === 0 ? (

        <p>No events found</p>

      ) : (

        events.map((event) => (

          <div
            key={event.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >

            <p>
              <b>Event:</b>
              {event.event_type}
            </p>

            <p>
              <b>Date:</b>
              {new Date(
                event.occurred_at
              ).toLocaleString()}
            </p>

          </div>

        ))

      )}

    </div>
  );
};

export default ContactDetail;