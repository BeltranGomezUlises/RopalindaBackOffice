import React from 'react';
import { Form, Dropdown} from 'semantic-ui-react';
import * as utils from '../../utils.js';

export default class CmbEncargado extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      buscando: true,
      options: []
    }
  }

  componentWillMount() {
    fetch(localStorage.getItem('url') + 'employees',{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'Authorization': localStorage.getItem('tokenSesion')
      }
    }).then((res)=> res.json())
    .then((response) =>{
      utils.evalResponse(response, () => {
        let options = [];
        options.push({ key: null, text: 'Ningúno', value: null});
        response.data.forEach((c)=>{
          options.push({ key: c.id, text: c.name, value: c.id});
        })
        this.setState({options, buscando: false})
      });
    })
  }

  render(){
    return(
      <Form.Field>
        <label>Cliente:</label>
        <Dropdown
          loading={this.state.buscando}
          search selection
          required
          options={this.state.options}
          placeholder='Nombre encargado'
          onChange={(e, {value})=>{this.props.onChange(value)}}
        />
      </Form.Field>
    )
  }

}
