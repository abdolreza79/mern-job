import {
  LineChart,
  BarChart,
  PieChart,
  Line,
  Bar,
  Pie,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const BarChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <LineChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='3 3 ' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Line
          type='monotone'
          dataKey='count'
          stroke='#8884d8'
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default BarChartComponent
