import React, { createContext, useContext, useState, useEffect } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    const eventSource = new EventSource(
      `http://localhost:3000/api/live-notification?token=${token}`
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      const { title, message, createdAt, isRead, _id } = data;

      setNotifications((prev) => [
        ...prev,
        { id: _id, title, message: JSON.parse(message), createdAt, isRead },
      ]);
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  return useContext(NotificationContext);
};
