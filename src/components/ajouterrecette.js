//importation
import React from 'react';
import {Modal,ControlLabel,FormGroup,FormControl,Button} from 'react-bootstrap';

//creer une classe pour ajouter une recette
export class AjouterRecette extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: "", ingredients: ""};
    this.changerNom = this.changerNom.bind(this);
    this.changerIngredients = this.changerIngredients.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  changerNom(e) {//changer le nom
    this.setState({name: e.target.value});
  }
  changerIngredients(e) {//changer les ingredients
    this.setState({ingredients: e.target.value});
  }
  handleSubmit(e) {//manipuler les donnees tapées pour creer une nouvelle recette
    e.preventDefault();
    const onAdd = this.props.onAdd;
    const regExp = /\s*,\s*/;
    var newName = this.state.name;
    var newIngredients = this.state.ingredients.split(regExp);
    var newRecette = {name: newName, ingredients: newIngredients};
    onAdd(newRecette);
    this.setState({name: "", ingredients: ""});
  }
  handleCancel() {
    const onAddModal = this.props.onAddModal;
    this.setState({name: "", ingredients: ""});
    onAddModal();
  }
  render() {
    const onShow = this.props.onShow;
    var regex1 = /^\S/;
    var regex2 = /^[^,\s]/;
   var regex3 = /[^,\s]$/;
    const validRecette = regex1.test(this.state.name) && regex2.test(this.state.ingredients) && regex3.test(this.state.ingredients);
    return(
      
      <Modal  className="recette" show={onShow} onHide={this.handleCancel}>
        <div className="recette"><Modal.Header closeButton>
          <Modal.Title>Nouvelle Recette</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId="formControlsName">
            <ControlLabel>Nom de la Recette
            </ControlLabel>
            <FormControl type="text" required onChange={this.changerNom} value={this.state.name} placeholder="Entrer le Nom" />
          </FormGroup>
          <FormGroup controlId="formControlsIngredients">
            <ControlLabel>Ingredients de la Recette</ControlLabel>
            <FormControl componentClass="textarea" type="text" required onChange={this.changerIngredients} value={this.state.ingredients} placeholder="Entrer les Ingrédients(separés par virgules)" />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={!validRecette} className="save" onClick={this.handleSubmit}>Sauvegarder Recette</Button>
        </Modal.Footer>
        </div>
      </Modal>
      
    );
  }
};