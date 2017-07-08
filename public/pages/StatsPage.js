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
import DateHandler from '../reactComponents/DateHandler.js'

export default class StatsPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            filter: (x) => { return true }
        }
    }

    getCount(data) {

        let headers = data.slice(0, 1)
        const result = data
            .slice(1).filter(this.state.filter)

        headers = headers[0]
            ? headers[0]
            : []

        return [headers, result]
    }

    mapReduce(data) {

        let headers = data.slice(0, 1)[0]
        headers = headers
            ? headers.slice(0, 2)
            : []

        const [keys,
            values] = data
            .slice(1)
            .filter(this.state.filter)
            .reduce((last, now) => {
                var index = last[0].indexOf(now[0])

                if (index == -1) {
                    last[0].push(now[0])
                    last[1].push(now[1])
                } else {
                    last[1][index] += now[1]
                }

                return last

            }, [
                [], []
            ])

        return [
            headers, keys.map((x, i) => [x, values[i]])
        ]
    }

    formatDataToJSON(headers, data) {

        let result = []

        data.map((x) => {
            let tmp = {}
            x.map((e, i) => {
                tmp[headers[i]] = e
            })
            result.push(tmp)
        })

        return result.sort((a, b) => b["Number of hours dedicated"] - a["Number of hours dedicated"])
    }

    setFilter(filter) {
        this.setState({filter})
    }

    render() {

        return (
            <div>
                <div class="m-b-md">

                    <DateHandler filterHandler={(filter) => this.setFilter(filter)}/>

                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart
                            data={this.formatDataToJSON(...this.mapReduce(this.props.data))}
                            margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}>
                            <XAxis
                                dataKey="Dedication Item"
                                tick={{
                                stroke: "lightgrey"
                            }}/>
                            <YAxis
                                tick={{
                                stroke: "lightgrey"
                            }}/>
                            <Bar dataKey="Number of hours dedicated" fill="#1bc98e"/>
                            <Legend verticalAlign="top" align="right" iconType="circle" height={36}/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div class="hr-divider m-t m-b">
                    <h3 class="hr-divider-content hr-divider-heading">DEDICATIONS</h3>
                </div>

                <div>
                    <Table data={this.props.data} getCount={(data) => this.getCount(data)}/>
                </div>
            </div>
        );
    }
}
