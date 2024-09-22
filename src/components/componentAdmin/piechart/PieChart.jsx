import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./index.scss";

// Register components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// eslint-disable-next-line react/prop-types
const PieChart = ({ adminCount, userCount, staffCount, title }) => {
  let data;

  if (title == "Total Account") {
    data = {
      labels: ["Admin", "User", "Staff"],
      datasets: [
        {
          label: "Number",
          data: [adminCount, userCount, staffCount],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    };
  }

  return (
    <div className="PieChart">
      <div className="PieChart__design">
        <h1>{title}</h1>
        <Pie className="pie" data={data} />
      </div>
    </div>
  );
};

export default PieChart;
