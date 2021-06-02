import React, { Component } from 'react';

export default class History extends Component {
  render() {
    return (
        <div className="bg-blue-50 h-screen">
            <div className="container mx-auto pt-6 flex justify-center">
                <ul className="w-10/12 flex flex-col pt-5 justify-center">
                    <li className="flex items-center rounded-md bg-white rounded-lg p-2 m-2 w-3/4">
                        <span className="font-semibold text-2xl mr-3 ml-2">01</span>
                        <div>
                            <h2 className="text-base text-green-500">Ganado</h2>
                            <i className="font-thin text-xs text-gray-400">02/02/2020</i>
                        </div>
                    </li>
                    <li className="flex items-center rounded-md bg-white rounded-lg p-2 m-2 w-3/4">
                        <span className="font-semibold text-2xl mr-3 ml-2">02</span>
                        <div>
                            <h2 className="text-base text-red-500">Perdido</h2>
                            <i className="font-thin text-xs text-gray-400">02/02/2020</i>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
  }
}
