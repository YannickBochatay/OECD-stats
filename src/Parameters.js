import React from "react"
import Form from "react-bootstrap/Form"
import { withDataContext } from "./DataContext"
import Select from "react-select"

const options = [{
    label : "Cas confirmés",
    value : "casConfirmes"
}, {
    label : "Hospitalisations",
    value : "hospitalises"
}, {
    label : "Admissions en réanimation",
    value : "reanimation"
}, {
    label : "Décès à hôpital",
    value : "deces"
}]

const frOptions = [{
    label : "Décès en EHPAD",
    value : "decesEhpad"
}, {
    label : "Décès hôpital + EHPAD",
    value : "decesCumul"
}]

export default withDataContext(class Parameter extends React.Component {

    handleChange = parameters => this.props.setKeyValue("parameters", parameters)

    render() {
        const { zones, parameters } = this.props

        return (
            <Form.Group controlId="parameter">
                <Form.Label>Paramètre</Form.Label>
                <Select
                    value={ parameters }
                    options={ zones?.find(({ value }) => value === "FRA") && zones.length === 1 ? options.concat(frOptions) : options }
                    onChange={ this.handleChange }
                    isMulti
                />
            </Form.Group>
        )
    }
})