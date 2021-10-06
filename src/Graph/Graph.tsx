import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { ExerciseData } from '../Exercises/Exercise'


function Graph(props: {data: Array<ExerciseData>}) {
    return (
        <div>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={props.data}>
                    <XAxis dataKey="time" tickFormatter={tick => (isNaN(tick) ? tick : tick.toFixed(2))} />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line dataKey="target" />
                    <Line dataKey="current" />
                    <Legend />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Graph;