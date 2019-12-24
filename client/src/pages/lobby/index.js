import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import LobbyTable from './components/LobbyTable'
import './index.css'

export default class index extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            
        }
    }


    
    render() {
        return (
            <Container className="lobby-outer-container">
                <div className="lobby-container">
                {
                this.props.tables.map( (table, index) => {
                    return (
                        <Row>
                            <LobbyTable table={table} />
                        </Row>
                        
                    )
                }) 
                }
                    <Row className="create-table">
                        <Col>
                            <h3>Create table</h3>
                        </Col>
                        
                        <Col>
                            icon
                        </Col>
                    </Row>
                </div>
            </Container>
        )
    }
}
