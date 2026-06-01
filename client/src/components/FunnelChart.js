import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

//chart data like labels and datasets
const FunnelChart = () => {
  const data = {
    labels: ['Landing Page', 'Sign Up', 'Profile Setup', 'First Action', 'Return Visit'],
    datasets: [
      {
        label: 'Users',
        data: [3241, 847, 523, 382, 243, 183], //number of users who reached each stage
        backgroundColor: '#8884d8', //bar color
        borderRadius: 10,
      }
    ]
  }
  //chart display options
  const options = {
    responsive: true, //chart resized based on screen size
    plugins: {
      legend: { position: 'top' }, 
      title: { display: true, text: 'Funnel Analytics' } //chart title
    }
  }
  //chart rendering the bar chart with the data and options above
  return <Bar data={data} options={options} />
}

export default FunnelChart





