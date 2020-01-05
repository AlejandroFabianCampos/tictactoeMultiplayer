import React, { Fragment } from 'react'
import { Row, Col, Container } from 'reactstrap'

export default function LobbyTable({table}) {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <h6>{table.tableName}</h6>
                </Col>
            </Row>
            <Row className="inner-card">
                <div className="card-sides">
                {table.userA}
                </div>
                <div className="center-image">
                    <img src="/img/versus.png"/>
                </div>
                <div className="card-sides">
                {table.userB === undefined ? '+' : table.userB}
                </div>
            </Row>
        </Container>
    )
}
