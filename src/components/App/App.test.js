import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import App from './App';
jest.mock('../../apiCalls.js')
import { getOrders, postOrder } from '../../apiCalls';


describe('App', () => {

it("should render page", async () => {
  getOrders.mockResolvedValue(
    { 
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
    }
    )

  render(<App />)

  const name = await waitFor(() => screen.getByText("Pat"))
  const lettuce = await waitFor(() => screen.findByText("lettuce", {exact: false})
	const { findByRole } = render(<App />)
	const orderName = await findByRole('heading', { name: /Pat/i })
  const orderName2 = await findByRole('heading', { name: /Sam/i })
  expect(name).toBeInTheDocument()
	expect(orderName).toBeInTheDocument()
	expect(orderName2).toBeInTheDocument()
	})


  it('should fire when delete is clicked', () => {

  })
})
  // expect(screen.getByText("Delete")).toBeInTheDocument();
