//importation
import React from 'react';
import ReactDOM from 'react-dom';
import {PanelGroup,Panel,Button,ButtonToolbar,ListGroup,ListGroupItem} from 'react-bootstrap';
import './css/index.css';
import {AjouterRecette} from './components/ajouterrecette';
import {ModifierRecette} from './components/modifierrecette';

class Recette extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recettes: [],
      showAdd: false,
      showEdit: false,
      currentlyEditing: 0
    };
    this.showAddModal = this.showAddModal.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
    this.ajouterRecette = this.ajouterRecette.bind(this);
    this.modifierRecette = this.modifierRecette.bind(this);
    this.suprimerRecette = this.suprimerRecette.bind(this);
  }
  componentDidMount() {//charger le local storage
    var recettes = (typeof localStorage["recettes"] !== "undefined") ? JSON.parse(localStorage.getItem("recettes")) : [
      {name: "Crêpes", ingredients: ["250g de Farine", "4 Oeufs", "1/2 litre de lait", "Pincée de Sel", "2 c à s de Sucre","50g de Beurre fondu"]},
     
    ];
    this.setState({recettes: recettes});
  }
  showAddModal() {//montrer ajouter
    this.setState({showAdd: !this.state.showAdd});
  }
  showEditModal(index) {//montrer modifier
    this.setState({currentlyEditing: index, showEdit: !this.state.showEdit});
  }
  ajouterRecette(recette) {//creer une nouvelle recette
    let recettes = this.state.recettes;
    recettes.push(recette);
    localStorage.setItem('recettes', JSON.stringify(recettes));
    this.setState({recettes: recettes});
    this.showAddModal();
  }
  modifierRecette(newName, newIngredients, currentlyEditing) {//modifier une recette
    let recettes = this.state.recettes;
    recettes[currentlyEditing] = {name: newName, ingredients: newIngredients};
    localStorage.setItem('recettes', JSON.stringify(recettes));
    this.setState({recettes: recettes});
    this.showEditModal(currentlyEditing);
  }
  suprimerRecette(index) {//suprimer une recette
    let recettes = this.state.recettes.slice();
    recettes.splice(index, 1);
    localStorage.setItem('recettes', JSON.stringify(recettes));
    this.setState({recettes: recettes, currentlyEditing: 0});
  }
  render() {
    const recettes = this.state.recettes;
    var currentlyEditing = this.state.currentlyEditing;
    return(
      <div className="recette">
        <h1>Boite à Recettes</h1>
        <PanelGroup accordion  id="recettes">
          {recettes.map((recette, index) => (
            <Panel className="recette" eventKey={index} key={index}>
              <Panel.Heading>
                <Panel.Title className="title" toggle>{recette.name}</Panel.Title>
              </Panel.Heading>
              <Panel.Body  collapsible>
                <ListGroup>
                  {recette.ingredients.map((ingredient, index) => (
                    <ListGroupItem className="ingr" key={index}>{ingredient}</ListGroupItem>
                  ))}
                </ListGroup>
                <ButtonToolbar>
                  <Button  className="mod" onClick={() => {this.showEditModal(index)}}>Modifier</Button>
                  <Button className="sup" onClick={() => {this.suprimerRecette(index)}}>Suprimer</Button>
                </ButtonToolbar>
              </Panel.Body>
              <ModifierRecette onShow={this.state.showEdit} onEdit={this.modifierRecette} onEditModal={() => {this.showEditModal(currentlyEditing)}} currentlyEditing={currentlyEditing} recette={recettes[currentlyEditing]} />
            </Panel>
          ))}
        </PanelGroup>
        <Button className="save" onClick={this.showAddModal}>Ajouter une Recette</Button>
        <AjouterRecette onShow={this.state.showAdd} onAdd={this.ajouterRecette} onAddModal={this.showAddModal} />
      </div>
    );
  }
};

ReactDOM.render(<Recette />, document.getElementById('app'));