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

    constructor(props) {
        super(props)

        this.state = {
            filter: (x) => { 
                const [monday,sunday] = this.getWeek()
                const d = new Date(this.toDate(x[2]))
                return d >= monday && d >= sunday
            }
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

    getWeek(d) {
        d = new Date();
        d.setHours(0,0,0,0)
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
        return [new Date(d.setDate(diff)), new Date(d.setDate(diff + 6))]
    }

    toDate(dateStr) {
        const [day, month, year] = dateStr.split("/")
        return new Date(year, month - 1, day)
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

        ipc.send('receive-items', keys)
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

    render() {

        return (
            <div>
                <div class="m-t-md m-b-md">
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
