import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

const Notification = () => {
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:3000/api/live-notification"
    );

    eventSource.onmessage = (event) => {
      setNotification(JSON.parse(event.data));
    };
    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };
    return () => {
      eventSource.close();
    };
  });

  return (
    <>
      <Navbar />
      {notification.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </>
  );
};

export default Notification;
