import logo from './logo.svg';
import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';

const usuario = [
  { idUsuario: 1, Nombre: "cesar", Identificacion: "17777777", telefono: "0983057566", email: "fabi-1530@hotmail.com" }
];
class App extends React.Component {
  state = {
    usuario,
    form: {
      idUsuario: '',
      Nombre: '',
      Identificacion: '',
      telefono: '',
      email: ''
    },
    modalInsertar: false,
    modalEditar: false,
    modalEliminar: false,

  };

   handleChange =e=> {
    this.setState({
      form: {
        ...this.state.form,
         [e.target.name]: e.target.value,
      }
    });
  }
  mostrarModalInsertar = () => {
    this.setState({ modalInsertar: true });
  }
  ocultarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  }

  mostrarModalEditar = (registro) => {
    this.setState({ modalEditar: true, form:registro });
  }
  ocultarModalEditar = () => {
    this.setState({ modalEditar: false });
  }

  mostrarModalEliminar = () => {
    this.setState({ modalEliminar: true });
  }
  ocultarModalEliminar = () => {
    this.setState({ modalEliminar: false });
  }

  insertar=()=>{
    var valorNuevo={ ...this.state.form};
    valorNuevo.idUsuario=this.state.usuario.length+1;
    var lista=this.state.usuario;
    lista.push(valorNuevo);
    this.setState({usuario: lista, modalInsertar:false});
  }
  editar=(dato)=>{
    var cont=0;
    var lista=this.state.usuario;
    lista.map((registro)=>{
      if(dato.idUsuario==registro.idUsuario){
      lista[cont].Nombre=dato.Nombre;
      lista[cont].Identificacion=dato.Identificacion;
      lista[cont].telefono=dato.telefono;
      lista[cont].email=dato.email;
    }
    cont++;
    })
    this.setState({usuario:lista, modalEditar:false})
  }

  eliminar=(dato)=>{
    var op= window.confirm("Eliminar Usuario"+dato.idUsuario);
    if(op){
      var cont=0;
      var lista= this.state.usuario;
      lista.map((registro)=>{
        if(registro.idUsuario==dato.idUsuario){
          lista.splice(cont,1);
      }
      cont++;
    });
    this.setState({usuario: lista})
  }
}

  render() {
    return (
      <><Container>
        <br />
        <Button color="success" onClick={this.mostrarModalInsertar}>
          Agregar usuario
        </Button>
        <br />
        <br />

        <Table>
          <thead>
            <tr>
              <th>id </th>
              <th>Nombre </th>
              <th>Identificacion  </th>
              <th>telefono </th>
              <th>email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.usuario.map((elemnto) => (
              <tr>
                <td>{elemnto.idUsuario}</td>
                <td>{elemnto.Nombre}</td>
                <td>{elemnto.Identificacion}</td>
                <td>{elemnto.telefono}</td>
                <td>{elemnto.email}</td>
                <td>
                  <button class="btn btn-primary" onClick={()=>this.mostrarModalEditar(elemnto)}>editar</button>
                </td>

                <td>
                  <button class="btn btn-danger" onClick={()=>this.eliminar(elemnto)}>eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>

        </Table>
      </Container>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Insertar registro</h3>
            </div>
          </ModalHeader>

          <ModalBody>

            <FormGroup>
              <label>Id</label>
              <input className="form-control" readOnly type="text" value={this.state.usuario.length + 1} />
            </FormGroup>

            <FormGroup>
              <label>Nombre</label>
              <input className="form-control" name="Nombre" type="text" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Identificacion</label>
              <input className="form-control" name="Identificacion" type="text" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>telefono</label>
              <input className="form-control" name="telefono" type="text" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>email</label>
              <input className="form-control" name="email" type="text" onChange={this.handleChange} />
            </FormGroup>

          </ModalBody>

          <ModalFooter>
            <Button color="prymary" onClick={()=>this.insertar()}>
              Insertar 
            </Button>
            <Button color="danger" onClick={ this.ocultarModalInsertar}>
              cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
            <div>
              <h3>Editar registro</h3>
            </div>
          </ModalHeader>

          <ModalBody>

            <FormGroup>
              <label>Id</label>
              <input className="form-control" readOnly type="text" value={this.state.form.idUsuario} />
            </FormGroup>

            <FormGroup>
              <label>Nombre</label>
              <input className="form-control" name="Nombre" type="text" onChange={this.handleChange} value={this.state.form.Nombre}/>
            </FormGroup>

            <FormGroup>
              <label>Identificacion</label>
              <input className="form-control" name="Identificacion" type="text" onChange={this.handleChange} value={this.state.form.Identificacion}/>
            </FormGroup>

            <FormGroup>
              <label>telefono</label>
              <input className="form-control" name="telelfono" type="text" onChange={this.handleChange} value={this.state.form.telefono}/>
            </FormGroup>

            <FormGroup>
              <label>email</label>
              <input className="form-control" name="email" type="text" onChange={this.handleChange} value={this.state.form.email}/>
            </FormGroup>

          </ModalBody>

          <ModalFooter>
            <Button color="prymary" onClick={()=>this.editar(this.state.form)}>
              Editar
            </Button>
            <Button color="danger" onClick={()=>this.ocultarModalEditar()}>
              cancelar
            </Button>
          </ModalFooter>
        </Modal>
        
      </>

    );
  }

}


export default App;
