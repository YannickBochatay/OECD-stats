import React from "react"
import BsForm from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import DatabaseSelector from "./DatabaseSelector"
import Dimensions from "./Dimensions"

export default class Form extends React.Component {

    render() {

        return (
            <BsForm>
                <Row>
                    <Col md={ 12 }><DatabaseSelector/></Col>
                </Row>
                <Row>
                    <Col md={ 12 }><Dimensions/></Col>
                </Row>
            </BsForm>
        )
    }
}