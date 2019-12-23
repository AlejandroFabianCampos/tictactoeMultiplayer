import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import LobbyTable from './components/LobbyTable'

export default class index extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            
        }
    }


    
    render() {
        return (
            <Container>
                {
                this.props.tables.map( (table, index) => {
                    return (
                        <LobbyTable table={table} />
                    )
                }) 
                }
                <Row>
                    <Col>
                        <h3>Create table</h3>
                    </Col>
                    <Col>
                        icon
                    </Col>
                </Row>
            </Container>
        )
    }
}
