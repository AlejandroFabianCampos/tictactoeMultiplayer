import React from 'react'
import { Row, Col } from 'reactstrap'

export default function LobbyTable({table}) {
    return (
        <Row>
            <Row>
            {table.tableName}
            </Row>
            <Row>
                <Col>
                {table.userA}
                </Col>
                <Col>
                {/* add vs image */}
                </Col>
                <Col>
                {table.userB}
                </Col>
            </Row>
        </Row>
    )
}
