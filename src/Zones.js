import React from "react"
import Form from "react-bootstrap/Form"
import { withDataContext } from "./DataContext"
import Select from "react-select"

export default withDataContext(class Zones extends React.Component {

    handleChange = zones => this.props.setKeyValue("zones", zones)

    getOptions() {
        const { data } = this.props
        const sep = " - "
        const arrayUnique = data
            .filter((entry, i, arr) => arr.findIndex(el => el.nom === entry.nom) === i)
            .map(entry => entry.nom + sep + entry.code)
        
        return arrayUnique.sort().map(zone => {
            const [label, value] = zone.split(sep)
            return { label, value }
        })
    }

    render() {

        return (
            <Form.Group controlId="zone">
                <Form.Label>Zones</Form.Label>
                <Select
                    options={ this.getOptions() }
                    value={ this.props.zones }
                    onChange={ this.handleChange }
                    isMulti
                    isClearable={ false }
                />
            </Form.Group>
        )
    }
})