import React from "react";

export default class Nav extends React.Component {

    constructor(props) {
        super(props);
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
    
    weekFilter() {

        this.props.filterHandler((x) => { 
                const [monday,sunday] = this.getWeek()
                const d = new Date(this.toDate(x[2]))
                return d >= monday && d >= sunday
            })
    }

    dayFilter() {
        this.props.filterHandler((x) => { 
                const a = new Date(this.toDate(x[2]))
                const b = new Date()
                b.setHours(0,0,0,0)
                return a.getTime() == b.getTime()

            })
    }

    monthFilter() {
        this.props.filterHandler((x) => { 
                const d = new Date(this.toDate(x[2])) 
                const date = new Date();
                const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                return d >= firstDay && d <= lastDay
            })
    }

    noFilter(){
        this.props.filterHandler((x) => {return true})
    }

    render() {
        return (

            <div class="dashhead m-b-md">
                <div class="dashhead-toolbar">
                    <div class="input-with-icon dashhead-toolbar-item">
                        <input type="text" value="Select start day" class="form-control" data-provide="datepicker"/>
                        <span class="icon icon-calendar"></span>
                    </div>
                    <div class="dashhead-toolbar-item">
                        <h3 style={{textAlign: "center", margin: "0px 5px"}}>
                            - 
                        </h3>
                    </div>
                    
                    <div class="input-with-icon dashhead-toolbar-item">
                        <input type="text" value="Select end day" class="form-control" data-provide="datepicker"/>
                        <span class="icon icon-calendar"></span>
                    </div>
                        <span class="dashhead-toolbar-divider hidden-xs"></span>
                    <div class="btn-group dashhead-toolbar-item btn-group-fourths">
                        <button type="button" class="custom-btn btn btn-primary-outline" onClick={() => this.dayFilter()}>Day</button>
                        <button type="button" class="custom-btn btn btn-primary-outline" onClick={() => this.weekFilter()}>Week</button>
                        <button type="button" class="custom-btn btn btn-primary-outline" onClick={() => this.monthFilter()}>Month</button>
                        <button type="button" class="custom-btn btn btn-primary-outline" onClick={() => this.noFilter()}>All the time</button>
                    </div>
                </div>
            </div>

        )
    }

}