//importation
import React from 'react';
import {Modal,ControlLabel,Button,FormGroup,FormControl} from 'react-bootstrap';

//creer une classe pour modifier
export class ModifierRecette extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: "", ingredients: ""};
    this.changerNom = this.changerNom.bind(this);
    this.changerIngredients = this.changerIngredients.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    const prevName = state.prevName;
    const prevIngredients = state.prevIngredients;
    const name = prevName !== props.recette.name ? props.recette.name : state.name;
    const ingredients = prevIngredients !== props.recette.ingredients.join(",") ? props.recette.ingredients.join(",") : state.ingredients;
    return {
      prevName: props.recette.name, name,
      prevIngredients: props.recette.ingredients.join(","), ingredients,
    }
  }
  changerNom(e) {//changer le nom selon input
    this.setState({name: e.target.value});
  }
  changerIngredients(e) {//changer les ingredients selon input
    this.setState({ingredients: e.target.value});
  }
  handleEdit(e) {//manipuler les donnees tapées pour modifier la recette
    e.preventDefault();
    const onEdit = this.props.onEdit;
    const currentlyEditing = this.props.currentlyEditing;
    const regExp = /\s*,\s*/;
    var name = this.state.name;
    var ingredients = this.state.ingredients.split(regExp);
    onEdit(name, ingredients, currentlyEditing);
  }
  handleCancel() {
    const onEditModal = this.props.onEditModal;
    this.setState({name: this.props.recette.name, ingredients: this.props.recette.ingredients.join(",")});
    onEditModal();
  }
  render() {
    const onShow = this.props.onShow;
    var regex1 = /^\S/;
    var regex2 = /^[^,\s]/;
    var regex3 = /[^,\s]$/;
    const validRecette = regex1.test(this.state.name) && regex2.test(this.state.ingredients) && regex3.test(this.state.ingredients);
    return(
      <Modal modalClassName="modal-dialog" show={onShow} onHide={this.handleCancel}>
        <div className="recette">
        <Modal.Header closeButton>
          <Modal.Title>Modifier la Recette</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup formClassName="test" controlId="formControlsName">
            <ControlLabel>Nom de la Recette</ControlLabel>
            <FormControl type="text" required onChange={this.changerNom} value={this.state.name} placeholder="Entrer le Nom" />
          </FormGroup>
          <FormGroup controlId="formControlsIngredients">
            <ControlLabel>Ingredients de la Recette</ControlLabel>
            <FormControl componentClass="textarea" type="text" required onChange={this.changerIngredients} value={this.state.ingredients} placeholder="Entrer les Ingrédients(separés par virgules)" />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button className="save" disabled={!validRecette} onClick={this.handleEdit}>Sauvegarder la Recette</Button>
        </Modal.Footer>
        </div>
      </Modal>
    );
  }
};