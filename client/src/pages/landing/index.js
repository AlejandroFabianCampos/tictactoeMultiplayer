import React, { Fragment, useState } from 'react'
import { Container, Row, Col, Input, Button } from 'reactstrap';
import './index.scss';

// add react toast and finish coding this to check the jwt works

export default function Index({ connectNewPlayer }) {
    const [userName, setUserName] = useState('');

    return (
        <Fragment>
            <Container>
                <Row className="landing-title-box">
                    <Col>
                        <h1>Ta-Te-Ti Multijugador</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center landing-input-box px-4">
                    <Col md={6}>
                        <Row>
                            <Col>
                                <Input type="text" name="username" value={userName} onChange={ (e) => setUserName(e.target.value) }/>
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col>
                                <Button color="success" onClick={ () => connectNewPlayer(userName) }>Play</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}
