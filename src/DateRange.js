import React from "react"
import Form from "react-bootstrap/Form"
import { withDataContext } from "./DataContext"
import { DateRangePicker } from "react-dates"
import moment from "moment"

export default withDataContext(class DateRange extends React.Component {

    state = { focusedInput : null }

    handleChange = dateRange => this.props.setKeyValue("dateRange", dateRange)

    handleFocus = focusedInput => this.setState({ focusedInput })

    getMaxRange() {

        const { data } = this.props

        const dates = new Set(data
            .map(entry => Number(new Date(entry.date)))
            .filter(date => !isNaN(date))
        )
        
        return {
            minDate : moment(dates.size ? Math.min(...dates) : null).startOf("day"),
            maxDate : moment(dates.size ? Math.max(...dates) : null).endOf("day")
        }
    }

    render() {

        const { dateRange } = this.props
        const maxRange = this.getMaxRange()

        return (
            <Form.Group controlId="dateRange">
                <Form.Label>Période</Form.Label>
                <br/>
                <DateRangePicker
                    startDate={ dateRange.startDate }
                    startDateId="start_date"
                    endDate={ dateRange.endDate }
                    endDateId="end_date"
                    onDatesChange={ this.handleChange }
                    focusedInput={ this.state.focusedInput }
                    onFocusChange={ this.handleFocus }
                    isOutsideRange={ date => date < maxRange.minDate || date > maxRange.maxDate }
                    { ...maxRange }
                />
            </Form.Group>
        )
    }
})