import React from "react"
import BsForm from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import DatabaseSelector from "./DatabaseSelector"

export default class Form extends React.Component {

    render() {

        return (
            <BsForm>
                <Row>
                    <Col md={ 12 }><DatabaseSelector/></Col>
                </Row>
            </BsForm>
        )
    }
}