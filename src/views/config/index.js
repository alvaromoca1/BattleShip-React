import React, { Component } from 'react';

export default class Configure extends Component {
    constructor(props) {
      super(props);
      this.state = { nivel: localStorage.getItem("storagenivel") || 'facil',tiros: localStorage.getItem("storageTiros") ||'10000' }
  }
    change(event){
      this.setState({ nivel: event.target.value });
      if (event.target.value === 'facil') {
        this.setState({ tiros: 10000 });
        localStorage.setItem("storageTiros", 10000);
        localStorage.setItem("storagenivel","facil");
      } else if (event.target.value === 'medio') {
        this.setState({ tiros: 100 });
        localStorage.setItem("storagenivel","medio");
        localStorage.setItem("storageTiros", 100);
        
      } else if (event.target.value === 'deficil') {
        this.setState({ tiros: 50 });
        localStorage.setItem("storagenivel","dificil");
        localStorage.setItem("storageTiros", 50);
        
      }
  }
  render() {
    return (
      <div className="bg-blue-600 h-screen">
        <div className="container mx-auto flex pt-5 justify-center">
          <div className="rounded-md bg-white rounded-lg p-4 w-96">
            <div className="flex flex-col">
              <label htmlFor="config">Intentos</label>
              <input className="rounded-md p-2 bg-gray-50" id="config" type="text" placeholder="000" value={this.state.tiros } readOnly/>
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="config">Niveles</label>
              <select className="rounded-md p-2 bg-gray-50"  onChange={this.change.bind(this)} value={this.state.nivel}>
                <option value="facil">Facil</option>
                <option value="medio">Medio</option>
                <option value="deficil">Dificil</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
