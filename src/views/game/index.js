import React, { Component } from 'react';

export default class Game extends Component {
  constructor(props) {
    super(props);
    let boardShip = this.bosard();
    console.log(boardShip);
    this.state = {estado:'',tiros:localStorage.getItem("storageTiros") ||'10000', boardUser: boardShip.boardArrayResponse ,ships: boardShip.shipsReponse,countSpaceShip:20};
  }
  bosard() {
    const ships = [{ size: 4, count: 1 }, { size: 3, count: 2 },{ size: 2, count: 3 },{ size: 1, count: 4 }];
    let shipsReponse = [];
    let boardArray = [];
    let boardArrayResponse = ['', '', '', '', '', '', '', '', '', '',
                      '', '', '', '', '', '', '', '', '', '',
                      '', '', '', '', '', '', '', '', '', '',
                      '', '', '', '', '', '', '', '', '', '',
                      '', '', '', '', '', '', '', '', '', '',
                      '', '', '', '', '', '', '', '', '', '',
                      '', '', '', '', '', '', '', '', '', '',
                      '', '', '', '', '', '', '', '', '', '',
                      '', '', '', '', '', '', '', '', '', '',
                      '', '', '', '', '', '', '', '', '', '',]
    for (let i = 0; i < ships.length; i++) {
      let countAux = 1;
      do {
        const barco = this.createShip(ships[i].size);
        if (this.noShipCollision(boardArray, barco.cordenadas)) {
          shipsReponse.push({
            cordenada: barco.cordenadas,
            size:barco.cordenadas.length
          });
          for (let i = 0; i < barco.cordenadas.length; i++){
            boardArray.push(barco.cordenadas[i]);
            boardArrayResponse[barco.cordenadas[i]] = {
              partShip: true,
              select: false,
              ship:(shipsReponse.length)-1
            }
          }
          countAux++;
        }
      } while (ships[i].count>=countAux);
    }
    //console.log(boardArrayResponse);
    //console.log(shipsReponse);
    return ({
      boardArrayResponse,
      shipsReponse
    });

  }
  noShipCollision(boarArray, shipArray) {
    for (let i = 0; i < shipArray.length; i++){
      if (boarArray.filter(board => board === shipArray[i]).length > 0) {
        return false;
      }
    }
    return true;
  }
  createShip(size) {
    const directionArray = ['horizontal', 'vertical'];
    const direccion = directionArray[Math.floor(Math.random() * 2)];
    
    const posicion = Math.floor(Math.random() * 100);
    const cordenadasArray = [];
    for (let i = 0; i < size;i++){
      if (direccion === 'vertical' && (posicion + (size *10)) <= 99) {
        cordenadasArray.push(size + (i*10));
      } else if (direccion === 'vertical' && (posicion + (size *10)) >= 99) {
        const newPosicion = posicion - 40;
        cordenadasArray.push(newPosicion + (i * 10));
      } else if (direccion === 'horizontal' && posicion % 10 <= size ) {
        cordenadasArray.push(posicion + i);
      } else if (direccion === 'horizontal' && posicion % 10 >= size ) {
        const newPosicion = posicion - (size - 1);
        cordenadasArray.push(newPosicion+i)
      }
    }
    const responseShip = {
      cordenadas: cordenadasArray,
      size: size,
      status:true
    }
    return responseShip;
  }
  veryf=(cordinate)=> {
    if (this.state.tiros != 0 && this.state.countSpaceShip != 0) {
      if (this.state.boardUser[cordinate] === '') {
        document.getElementById(cordinate).classList.add("noship");
      } else {
        this.state.boardUser[cordinate].select = true;
        this.setState({ countSpaceShip: this.state.countSpaceShip - 1 });
        this.state.ships[this.state.boardUser[cordinate].ship].size = this.state.ships[this.state.boardUser[cordinate].ship].size - 1;
        if (this.state.ships[this.state.boardUser[cordinate].ship].size === 0) {
          console.log("barco undido primor");
          for (let i = 0; i < this.state.ships[this.state.boardUser[cordinate].ship].cordenada.length; i++){
            document.getElementById(this.state.ships[this.state.boardUser[cordinate].ship].cordenada[i]).classList.add("bom");
          }
        }
        document.getElementById(cordinate).classList.add("ship");
      }
      this.setState({tiros: this.state.tiros - 1 });
    }
    else {
      const today = new Date();
      if (this.state.countSpaceShip === 0) {
        this.setState({ estado: 'Acabas de Ganar' });
        const stateGame = {
          state: 'perdiste',
          date:today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        }
        localStorage.setItem("usuarioGame", [JSON.stringify(stateGame)]);
      }
      else {
        const stateGame = {
          state: 'perdiste',
          date:today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        }
        this.setState({ estado: 'Acabas de perder' });
        localStorage.setItem("usuarioGame", [JSON.stringify(stateGame)]);
        
      }
    }
  }
  render() {
    let board = this.state.boardUser;
    let tiros = this.state.tiros;
    return (
      <>
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-medium"> Hora de Jugar</h2>
          <div>
            <span>Tiros : </span>
            <span className="font-bold text-blue-700">{tiros}</span>
          </div>
          <h5 className="text-2xl font-medium">{ this.state.estado}</h5>
          <div className="board">
            <div className="grid grid-cols-10" >
              {board.map((row, i) => (
                    <div className="board_cube water" key={i} id={`${i}`} onClick={() => this.veryf(i)}>
                    </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}
