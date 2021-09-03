import React from 'react';
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import DataContext from "./DataContext"
import Form from "./Form"
import Twitter from "./Twitter"

class App extends React.Component {

  state = {
    data : [],
    database : null,
    chartHeight : null,
    isFetching : false,
    fetchError : null
  }

  divChart = React.createRef()

  getLocalData(key) {
    try {
      const data = localStorage.getItem(key)
      return data && JSON.parse(data)
    } catch (e) {
      console.warn("Problème d'accès au localStorage")
    }
  }

  setLocalData(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.warn("Problème d'accès au localStorage")
    }
  }

  setKeyValue = (key, value) => {
    this.setState({ [key] : value })
    this.setLocalData(key, value)
  }

  render() {
    const { database } = this.state

    return (
      <DataContext.Provider
        value={ { ...this.state, setKeyValue : this.setKeyValue } }
      >
        <Container
          fluid
          className="main-container"
        >
          <Row>
            <Col>
              <h3>
                Statistiques de l'OCDE
              </h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form/>
            </Col>
          </Row>
          <div className="chart" ref={ this.divChart }>
            <h3>Chart is coming soon { database ? `with database ${database}` : ""}</h3>
          </div>
          <div className="footer">
            <Twitter/>
            <small className="source">
              Source&nbsp;:&nbsp;
                <a href="https://data.oecd.org/api/sdmx-json-documentation/">
                https://data.oecd.org/api/sdmx-json-documentation/
                </a>              
            </small>
          </div>
        </Container>
      </DataContext.Provider>
    )
  }
}

export default App
