"use client";

import { useEffect, useState } from "react";

export const LocalTime = () => {
  const [timeOfDay, setTimeOfDay] = useState("today");

  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours();

      if (hour >= 5 && hour < 12) {
        setTimeOfDay("this morning");
      } else if (hour >= 12 && hour < 17) {
        setTimeOfDay("this afternoon");
      } else if (hour >= 17 && hour < 22) {
        setTimeOfDay("this evening");
      } else {
        setTimeOfDay("today");
      }
    };

    updateTimeOfDay();

    // Update time of day every minute
    const intervalId = setInterval(updateTimeOfDay, 60_000);

    return () => clearInterval(intervalId);
  }, []);

  return <span>{timeOfDay}</span>;
};
