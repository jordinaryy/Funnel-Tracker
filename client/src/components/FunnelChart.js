import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const FunnelChart = () => {
  const data = {
    labels: ['Landing Page', 'Sign Up', 'Email Verified', 'Profile Setup', 'First Action', 'Return Visit'],
    datasets: [
      {
        label: 'Users',
        data: [3241, 847, 523, 382, 243, 183],
        backgroundColor: '#8884d8',
        borderRadius: 10,
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Funnel Analytics' }
    }
  }

  return <Bar data={data} options={options} />
}

export default FunnelChart





