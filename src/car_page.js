import React from 'react';
import ReactDOM from 'react-dom';
import './css/car_page.css';
import vehicles from './vehicleCardList';
import reportWebVitals from './reportWebVitals';

import Carousel from 'react-elastic-carousel';

class SearchForm extends React.Component {

  constructor(props) {
    const searchParam = new URLSearchParams(window.location.search);

    super(props);
    this.state = {
      carID: searchParam.getAll('id')[0],
      breakpoints: [
        {width: 1, itemsToShow: 1.5, itemsToScroll: 1},
        {width: 300, itemsToShow: 2, itemsToScroll: 1},
        {width: 350, itemsToShow: 3, itemsToScroll: 2},
        {width: 500, itemsToShow: 4, itemsToScroll: 2},
        {width: 600, itemsToShow: 5, itemsToScroll: 3},
        {width: 700, itemsToShow: 6, itemsToScroll: 3},
        {width: 800, itemsToShow: 7, itemsToScroll: 4},
        {width: 900, itemsToShow: 8, itemsToScroll: 4},
        {width: 1000, itemsToShow: 9, itemsToScroll: 4}
      ]
    };

    this.vehiclePage = this.vehiclePage.bind(this);
  }

  vehiclePage(vehicle) {
    var pics = [];

    for (var i = 0; i < vehicle.picsNum; i++) {
      pics.push(
        <img
          key={i}
          src={'./images/vehicles/cards/' + vehicle.idNum + '/' + (i + 1).toString().padStart(3, '0') + '.jpg'} />
      );
    }

    const onNextStart = (currentItem, nextItem) => {
      if (currentItem.index === nextItem.index) {
        // we hit the last item, go to first item
        this.carousel.goTo(0);
      }
    };
    const onPrevStart = (currentItem, nextItem) => {
      if (currentItem.index === nextItem.index) {
        // we hit the first item, go to last item
        this.carousel.goTo(pics.length);
      }
    };

    return <div className='main-page'>
      <Carousel
        ref={ref => (this.carousel = ref)}
        className='img-carousel'
        itemsToShow={1}
        itemsToScroll={1}
        renderPagination={({pages, activePage, onClick}) => {
          return (
            <div className='img-list'>
              {pages.map((page, i) => {
                const isActivePage = activePage === page;
                return (
                  <img
                    key={page}
                    onClick={() => onClick(page)}
                    active={isActivePage}
                    src={
                      './images/vehicles/cards/' + vehicle.idNum + '/' + (i + 1).toString().padStart(3, '0') + '.jpg'
                    }
                  />
                );
              })}
            </div>
          );
        }}
        onPrevStart={onPrevStart}
        onNextStart={onNextStart}
        disableArrowsOnEnd={false}>
        {pics}
      </Carousel>
      <div className='vehicle-info'>
        {vehicle.model}
      </div>
    </div>;
  }

  render() {
    return (
      <div>
        {vehicles.map((vehicle) => {
          if (vehicle.idNum === this.state.carID) {
            return this.vehiclePage(vehicle);
          }
        })}
      </div>
    );
  }
}

ReactDOM.render(<SearchForm />, document.getElementById('vehicle_display'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
