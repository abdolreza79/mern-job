// import {
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
// } from 'recharts'

// const AreaChartComponent = ({ data }) => {
//   return (
//     <ResponsiveContainer width='100%' height={300}>
//       <AreaChart data={data} margin={{ top: 50 }}>
//         <CartesianGrid strokeDasharray='3 3' />
//         <XAxis dataKey='date' />
//         <YAxis allowDecimals={false} />
//         <Tooltip />
//         <Area type='monotone' dataKey='count' stroke='#2cb1bc' fill='#bef8fd' />
//       </AreaChart>
//     </ResponsiveContainer>
//   )
// }

// export default AreaChartComponent
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

const AreaChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='3 3 ' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar type='monotone' dataKey='count' fill='#8884d8' />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default AreaChartComponent
