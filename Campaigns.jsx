import {
    useEffect,
    useState,
  } from "react";
  
  import API from "../services/api";
  
  const Campaigns = () => {
  
    const [campaigns,
      setCampaigns] =
      useState([]);
  
    useEffect(() => {
  
      fetchCampaigns();
  
    }, []);
  
    const fetchCampaigns =
      async () => {
  
        try {
  
          const response =
            await API.get(
              "/campaigns"
            );
  
          setCampaigns(
            response.data
          );
  
        } catch (error) {
  
          console.log(error);
  
        }
  
      };
  
    const sendCampaign =
      async (id) => {
  
        try {
  
          await API.post(
            `/campaigns/${id}/send`
          );
  
          alert(
            "Campaign Sent"
          );
  
          fetchCampaigns();
  
        } catch (error) {
  
          console.log(error);
  
          alert(
            "Send failed"
          );
  
        }
  
      };
  
    return (
  
      <div style={{
        padding: "20px",
      }}>
  
        <h1>
          Campaigns
        </h1>
  
        <table
          border="1"
          cellPadding="10"
        >
  
          <thead>
  
            <tr>
  
              <th>
                Name
              </th>
  
              <th>
                Subject
              </th>
  
              <th>
                Status
              </th>
  
              <th>
                Action
              </th>
  
            </tr>
  
          </thead>
  
          <tbody>
  
            {campaigns.map(
              (campaign) => (
  
              <tr
                key={campaign.id}
              >
  
                <td>
                  {campaign.name}
                </td>
  
                <td>
                  {campaign.subject}
                </td>
  
                <td>
                  {campaign.status}
                </td>
  
                <td>
  
                  <button
                    onClick={() =>
                      sendCampaign(
                        campaign.id
                      )
                    }
                  >
                    Send
                  </button>
  
                </td>
  
              </tr>
  
            ))}
  
          </tbody>
  
        </table>
  
      </div>
  
    );
  
  };
  
  export default Campaigns;