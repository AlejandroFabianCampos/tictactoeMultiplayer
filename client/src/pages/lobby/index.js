import React, { Component } from 'react'
import { Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import LobbyTable from './components/LobbyTable'
import './index.scss'

export default class index extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            createTableModal: false,
            createTableName: ''
        }
    }


    
    render() {
        const { createTableModal, createTableName } = this.state;
        const { createTable } = this.props;

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
                    <Row className="create-table" onClick={ () => this.setState({createTableModal: true}) }>
                        <div className="card-sides">
                            <b>+</b>
                        </div>
                        <div className="splitter-parent">
                            <div className="splitter">&nbsp;</div>
                        </div>
                        <div className="card-sides">
                            <h3>Crear mesa</h3>
                        </div>
                    </Row>
                </div>
                <Modal isOpen={createTableModal} toggle={ () => this.setState({createTableModal: !createTableModal}) } centered="sm">
                    <ModalHeader toggle={() => this.setState({createTableModal: !createTableModal}) }> Crear mesa </ModalHeader>
                    <ModalBody> 
                        <InputGroup>
                            <Input placeholder="Nombre de la mesa" value={createTableName} onChange={ (e) => this.setState({ createTableName: e.target.value })}/>
                            <InputGroupAddon addonType="append"><Button color="success" onClick={ () => createTable(createTableName) }>Crear</Button></InputGroupAddon>
                        </InputGroup>
                    </ModalBody>
                </Modal>
            </Container>
        )
    }
}
