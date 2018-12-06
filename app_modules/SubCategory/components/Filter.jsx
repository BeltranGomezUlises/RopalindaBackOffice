import React from 'react';
import {
    Segment, Form, Divider,
    Button, Icon, Modal, Header
} from 'semantic-ui-react';

import * as utils from '../../../utils.js';
import EntityForm from './Form.jsx';
import CmbCategory from '../../CmbCatalog/CmbCategory.jsx';

export default class Filter extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            filter: {
                name: '',
                categoryId: null
            },
            filtering: false,
            openModal: false
        };
        this.filter = this.filter.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ openModal: true })
    }

    closeModal() {
        this.setState({ openModal: false })
    }

    filter() {
        this.setState({ filtering: true });
        let { filter } = this.state;
        let route = "subcategories?select=id,icon,active=true,category.name";
        if (filter.name !== '') {
            route += ",name%'" + filter.name + "'";
        } else {
            route += ",name";
        }
        if (filter.categoryId != null) {
            route += ",category.id=" + filter.categoryId;
        }
        fetch(localStorage.getItem('url') + route, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': localStorage.getItem('tokenSesion')
            }
        }).then((res) => res.json())
            .then((r) => {
                this.setState({ filtering: false });
                utils.evalResponse(r, () => {
                    this.props.updateCollection(r.data);
                })
            });
    }

    render() {
        return (
            <Segment style={{ 'padding': '10px' }}>
                <Divider horizontal>Filtros de Búsqueda</Divider>
                <Form onSubmit={this.filter}>
                    <Form.Group>
                        <Form.Field>
                            <label>Nombre de subcategoria:</label>
                            <input type='text'
                                value={this.state.filter.name}
                                onChange={(evt) => {
                                    let { filter } = this.state;
                                    filter.name = evt.target.value;
                                    this.setState({ filter });
                                }}
                            />
                        </Form.Field>
                        <CmbCategory onChange={(value) => {
                            let { filter } = this.state;
                            filter.categoryId = value;
                            this.setState({ filter });
                        }} />
                    </Form.Group>
                    <Button primary animated
                        loading={this.state.filtering}
                        type={this.state.filtering ? 'button' : 'submit'}>
                        <Button.Content hidden>Buscar</Button.Content>
                        <Button.Content visible>
                            <Icon name='filter' />
                        </Button.Content>
                    </Button>
                    <Button color='green' animated type='button' onClick={this.openModal}>
                        <Button.Content hidden>Nuevo</Button.Content>
                        <Button.Content visible>
                            <Icon name='plus' />
                        </Button.Content>
                    </Button>
                </Form>
                <Modal
                    onClose={this.closeModal}
                    onOpen={this.openModal}
                    open={this.state.openModal}>
                    <Header content='Agregar categoría' textAlign='center' />
                    <Modal.Content>
                        <EntityForm filter={this.filter} closeModal={this.closeModal} />
                    </Modal.Content>
                </Modal>
            </Segment>
        );
    }

}