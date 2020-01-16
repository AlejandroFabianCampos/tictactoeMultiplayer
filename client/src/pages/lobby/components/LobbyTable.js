import React, { Fragment } from 'react'
import { Row, Col, Container } from 'reactstrap'

export default function LobbyTable({table}) {
    return (
        <Container fluid>
            <Row className="lobby-card-header">
                <Col>
                    <h6 className="table-name">{table.tableName}</h6>
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
                    {!table.userB? '+' : table.userB}
                </div>
            </Row>
        </Container>
    )
}
