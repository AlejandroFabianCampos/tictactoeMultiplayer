import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'

export default class index extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            tables: []
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.setState({ tables: nextProps.tables})
    }

    
    render() {
        return (
            <div>
                {
                this.state.tables.map( (table, index) => {

                    return (
                        <div>
                            {table.tableName}
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
                        </div>
                    )
                }) 
                }
                <div>
                    <Row>
                        <Col>
                            <h3>Create table</h3>
                        </Col>
                        <Col>
                            icon
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
