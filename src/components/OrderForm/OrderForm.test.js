import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import OrderForm from './OrderForm';
jest.mock('../../apiCalls.js')
import { postOrder, getOrders } from '../../apiCalls';

describe('Search Component', () => {
  it('should render a name input, ingredient buttons and a submit button', () => {

    const addOrder = jest.fn();
    const orders = [
      {
        id: 1,
        name: "Pat",
        ingredients: ["beans", "lettuce", "carnitas", "queso fresco", "jalapeno"]
      }, 
      {
        id: 2,
        name: "Sam",
        ingredients: ["steak", "pico de gallo", "lettuce", "carnitas", "queso fresco", "jalapeno"]
      }
    ]

    render(<OrderForm addOrder={addOrder} />);
      const nameInput= screen.getByPlaceholderText("name", {exact: false})
      const submitButton = screen.getByRole("button", {name: "Submit Order"})
      const beanIngredient = screen.getByText("beans")
      const cilantroIngredient = screen.getByText("cilantro")
      
      expect(beanIngredient).toBeInTheDocument()
      expect(cilantroIngredient).toBeInTheDocument()
      expect(nameInput).toBeInTheDocument()
      expect(submitButton).toBeInTheDocument()
   })

   it('should test the name input is clear upon submit', () => {
    const addOrder = jest.fn();
    render(<OrderForm addOrder={addOrder} />);
      const nameInput= screen.getByPlaceholderText("name", {exact: false})
      const submitButton = screen.getByRole("button", {name: "Submit Order"})
      const beanIngredient = screen.getByText("beans")
      const cilantroIngredient = screen.getByText("cilantro")

      expect(beanIngredient).toBeInTheDocument()
      expect(cilantroIngredient).toBeInTheDocument()
      expect(nameInput).toBeInTheDocument()
      expect(submitButton).toBeInTheDocument()

      fireEvent.change(nameInput, {target: {name: 'name', value: 'whateves'}})
      expect(nameInput.value).toEqual('whateves')
      fireEvent.click(submitButton)
      expect(nameInput.value).toHaveLength(0)
   })

   it('should post a new order', async () => {
    getOrders.mockResolvedValue({ 
      orders: [
          {
            id: 1,
            name: "Pat",
            ingredients: ["beans", "lettuce", "cilantro"]
          },
          {
            id: 2,
            name: "Sam",
            ingredients: ["steak", "pico de gallo", "lettuce"]
          }
        ]
      })
    const addOrder = jest.fn();
    render(<OrderForm addOrder={addOrder} />);
    
      const nameInput= screen.getByPlaceholderText("name", {exact: false})
      const submitButton = screen.getByRole("button", {name: "Submit Order"})
      const beanIngredient = screen.getByText("beans")
      const lettuceIngredient = screen.getByRole("button", {name: "lettuce", exact: false})
      const cilantroIngredient = screen.getByRole("button", {name: "cilantro", exact: false})
      const  sofritas = screen.getByRole("button", {name: "sofritas", exact: false})
      const quesoFresco = screen.getByRole("button", {name: "queso fresco", exact: false})

      expect(beanIngredient).toBeInTheDocument()
      expect(lettuceIngredient).toBeInTheDocument()
      expect(cilantroIngredient).toBeInTheDocument()
      expect(nameInput).toBeInTheDocument()
      expect(submitButton).toBeInTheDocument()

    postOrder.mockResolvedValue({
      orders: {
        id: 3,
        name: "Alex",
        ingredients: ["sofritas", "queso fresco"]
      }
    })

    fireEvent.click(sofritas)
    fireEvent.click(quesoFresco)
    fireEvent.change(nameInput, {target: {name: 'name', value: 'Alex'}})
    expect(nameInput.value).toEqual('Alex')

    fireEvent.click(submitButton)

    // expect(addIdea).thoHaveBeenCalledWith('name: 'Alex')
    // expect(nameOrder).toBeInTheDocument()
    expect(sofritas).toBeInTheDocument()
    expect(quesoFresco).toBeInTheDocument()

    //query list element? 
    // name on card by test or heading w name or order
    // list elements element// something about card 
    
  })

})

