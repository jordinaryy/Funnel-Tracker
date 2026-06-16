import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

//chart data like labels and datasets
const FunnelChart = ({ funnelData }) => {

  const labels = funnelData.map(item => item.stage)
  const counts = funnelData.map(item => parseInt(item.count))
  const data = {
    labels: labels.length > 0 ? labels : ['No data yet'],
    datasets: [
      {
        label: 'Users',
        data: counts.length > 0 ? counts : [0], //number of users who reached each stage
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





