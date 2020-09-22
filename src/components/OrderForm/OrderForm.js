import React, { Component } from 'react';
import { postOrder } from '../../apiCalls';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }

  handleNameChange = e => {
    e.preventDefault();
    this.setState({name: e.target.value})
  }

  handleIngredientChange = (e) => {
    e.preventDefault()
    this.setState({ingredients: [...this.state.ingredients, e.target.name]})
  };


  handleSubmit = e => {
    e.preventDefault();
    const nameInput = this.state.name
    const ingredientsInput = this.state.ingredients
    let newOrder = {
      name: nameInput,
      ingredients: ingredientsInput
    }
    if (nameInput.length > 0 && ingredientsInput.length > 0) {
      this.props.addOrder(newOrder)
      postOrder(nameInput, ingredientsInput)
        .then(data => console.log(data))
        // .then(data => this.props.addOrder(data.data))
        .catch(err => console.log(err))
    } else {
      alert('please enter an input')
    }
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
