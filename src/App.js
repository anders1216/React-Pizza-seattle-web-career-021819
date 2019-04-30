import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

const URL = 'http://localhost:3000/pizzas'

class App extends Component {
  constructor(){
    super()
    this.state = {
      pizzas: [],
      currentPizza: {}
    }
    this.handleSizeChange = this.handleSizeChange.bind(this)
    this.handleToppingChange = this.handleToppingChange.bind(this)
    this.updateState = this.updateState.bind(this)
  }

componentDidMount(){
  fetch(URL).then(res => res.json()).then(data => this.setState({pizzas: data}))
}

editPizzas = (pizza) => {
  this.setState({currentPizza: pizza})
}

// handleSubmit = (event) =>{
//   // this.updateState(pizza)
// }

handleSizeChange = (ev) => {
  let currentPizza = {...this.state.currentPizza}
  currentPizza.size = ev.target.value
  this.setState({currentPizza: currentPizza})
}

handleToppingChange = (ev) => {
  let currentPizza = {...this.state.currentPizza}
  currentPizza.topping = ev.target.value
  this.setState({currentPizza: currentPizza})
}


updateState = () => {
  const replacementPizza = this.state.currentPizza
  const oldPizzas = this.state.pizzas
  const newPizzas = oldPizzas.map(pizza => {
    if(pizza.id === replacementPizza.id)
    {return replacementPizza}
    else {return pizza }
  })
  this.setState({pizzas: newPizzas})
}
  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm pizza={this.state.currentPizza} updateState={this.updateState} handleToppingChange={this.handleToppingChange} handleSizeChange={this.handleSizeChange} />
        <PizzaList pizzas={this.state.pizzas} editPizzas={this.editPizzas} />
      </Fragment>
    );
  }
}

export default App;
