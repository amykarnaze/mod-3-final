import React, { Component } from 'react';
import './App.css';
import {getOrders, postOrder} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: []
    }
  }

  componentDidMount = async () => {
    await getOrders()
      // .then(data => console.log(data))
      .then(data => this.setState({orders: data.orders}))
      .catch(err => console.error('Error fetching:', err));
  }
  // addOrder = (nameInput, ingredients) => {
  //   postOrder(nameInput, ingredients)
	//   .then(data => this.setState({ orders: [...this.state.orders, data] })
	// 	.catch(err => console.log(err))
	// }
  // }
  addOrder = (newOrder) => {
    this.setState({
      orders: [...this.state.orders, newOrder]
    });
  }

  deleteOrder = (id) => {
    const filteredOrders = this.state.orders.filter(order => order.id !== id)
    this.setState({ orders: filteredOrders})
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addOrder={this.addOrder}/>
        </header>

        <Orders orders={this.state.orders} deleteOrder={this.deleteOrder}/>
      </main>
    );
  }
}


export default App;
