import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "Recharts";

import Table from '../reactComponents/Table.js'

export default class StatsPage extends React.Component {

    getJsDateFromExcel(excelDate) {
        return new Date((excelDate - (25567 + 1)) * 86400 * 1000);
    }

    getCount(data) {

        let headers = data.slice(0, 1)
        const result = data
            .slice(1)
            .slice(-10);

        headers = headers[0]
            ? headers[0]
            : []

        result.map((x) => {
            x[2] = this
                .getJsDateFromExcel(x[2])
                .toLocaleDateString()
            x[3] = this
                .getJsDateFromExcel(x[3])
                .toLocaleDateString()
        })

        return [headers, result]
    }

    render() {

        const data = [
            {
                name: 'Page A',
                uv: 4000,
                pv: 2400,
                amt: 2400
            }, {
                name: 'Page B',
                uv: 3000,
                pv: 1398,
                amt: 2210
            }, {
                name: 'Page C',
                uv: 2000,
                pv: 9800,
                amt: 2290
            }, {
                name: 'Page D',
                uv: 2780,
                pv: 3908,
                amt: 2000
            }, {
                name: 'Page E',
                uv: 1890,
                pv: 4800,
                amt: 2181
            }, {
                name: 'Page F',
                uv: 2390,
                pv: 3800,
                amt: 2500
            }, {
                name: 'Page G',
                uv: 3490,
                pv: 4300,
                amt: 2100
            }
        ];

        return (
            <div>
                <div class="m-t-md m-b-md">
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart
                            data={data}
                            margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}>
                            <XAxis dataKey="name" tick={{stroke: "lightgrey"}}/>
                            <YAxis tick={{stroke: "lightgrey"}}/>
                            <Bar dataKey="uv" fill="#1bc98e"/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div class="hr-divider m-t m-b">
                    <h3 class="hr-divider-content hr-divider-heading">LAST DEDICATIONS</h3>
                </div>

                <div>
                    <Table data={this.props.data} getCount={(data) => this.getCount(data)}/>
                </div>
            </div>
        );
    }
}
