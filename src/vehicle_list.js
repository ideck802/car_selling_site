import React from 'react';
import ReactDOM from 'react-dom';
import images from './images';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <ul>
    <li><a href='#'><img src={images.suv} alt='suv'/>SUVs</a></li>
    <li><a href='#'><img src={images.pickup} alt='pickup truck'/>Pickup Trucks</a></li>
    <li><a href='#'><img src={images.sedan} alt='sedan'/>Sedans</a></li>
    <li><a href='#'><img src={images.crossover} alt='crossover'/>Crossovers</a></li>
    <li><a href='#'><img src={images.coupe} alt='coupe'/>Coupes</a></li>
    <li><a href='#'><img src={images.convertible} alt='convertible'/>Convertibles</a></li>
    <li><a href='#'><img src={images.sports} alt='sports car'/>Sports Cars</a></li>
    <li><a href='#'><img src={images.van} alt='van'/>Vans</a></li>
    <li><a href='#'><img src={images.wagon} alt='wagon'/>Wagons</a></li>
  </ul>
  , document.getElementById('vehicle_list'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
