import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./index.scss";

// Register components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// eslint-disable-next-line react/prop-types
const PieChart = ({ adminCount, userCount, staffCount, censorCount, sellerCount, title }) => {
  let data;

  if (title == "Total Account") {
    data = {
      labels: ["Admin", "User", "Staff", "Censor", "Seller"],
      datasets: [
        {
          label: "Number",
          data: [adminCount, userCount, staffCount, censorCount, sellerCount],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
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
