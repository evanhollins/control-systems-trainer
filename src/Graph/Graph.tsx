import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Label } from 'recharts';
import { ExerciseData, GraphConfig } from '../Exercises/Exercise'

const colors = [
    "#f95d6a",
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#ff7c43",
    "#ffa600"
]

function Graph(props: {data: Array<ExerciseData>, config: GraphConfig}) {
    return (
        <div>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={props.data} margin={{top: 15, right: 15, left: 30, bottom: 30}}>
                    <XAxis 
                        dataKey="time" 
                        tickFormatter={props.config.tickFormater} 
                    >
                        {props.config.xLabel ? 
                            <Label position="insideBottomLeft" offset={-10}>{props.config.xLabel}</Label>
                            :
                            ""
                        }
                    </XAxis>
                    <YAxis>
                        {props.config.yLabel ? 
                            <Label position="left" angle={-90}>{props.config.yLabel}</Label>
                            :
                            ""
                        }
                    </YAxis>
                    <CartesianGrid strokeDasharray="3 3" />
                    {
                        props.config.graphKeys ?
                        props.config.graphKeys.map(((dataKey, i) => 
                            <Line dataKey={dataKey} stroke={colors[i]} dot={false}/>
                        ))
                        : <div/>
                    }
                    <Legend/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Graph;