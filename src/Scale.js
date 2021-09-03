import React from "react"
import Form from "react-bootstrap/Form"
import { withDataContext } from "./DataContext"
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup"
import ToggleButton  from "react-bootstrap/ToggleButton"

export default withDataContext(class Scale extends React.Component {

    handleChange = scale => this.props.setKeyValue("scale", scale)

    render() {
        return (
            <Form.Group controlId="scale">
                <Form.Label>Échelle</Form.Label>
                <br/>
                <ToggleButtonGroup
                    type="radio"
                    name="scale"
                    value={ this.props.scale}
                    onChange={ this.handleChange }
                >
                    <ToggleButton variant="light" value="linear">linéaire</ToggleButton>
                    <ToggleButton variant="light" value="logarithmic">logarithmique</ToggleButton>
                </ToggleButtonGroup>
            </Form.Group>
        )
    }
})