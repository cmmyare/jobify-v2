//import React from "react";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "./StatItem";

const StatsContainer = ({ defaultStats }) => {
  const stats = [
    {
      title: "Pending jobs",
      icon: <FaSuitcaseRolling />,
      count: defaultStats?.pending || 0,
      color: "#f59e0b",
      bcg: "#fef3c7",
    },
    {
      title: "Interviewed jobs",
      icon: <FaCalendarCheck />,
      count: defaultStats?.interview || 0,
      color: "#3085d6",
      bcg: "#d3e9ff",
    },
    {
      title: "declined jobs",
      icon: <FaBug />,
      count: defaultStats?.declined || 0,
      color: "#ff5722",
      bcg: "#ffebee",
    },
  ];
  return (
    <Wrapper>
      {stats.map((item) => {
        return <StatItem {...item} key={item.title} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
