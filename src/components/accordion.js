import React from 'react';

class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.changeVisible = this.changeVisible.bind(this);
  }

  changeVisible() {
    if (this.state.open === false) {
      this.setState({
        open: true
      });
    } else {
      this.setState({
        open: false
      });
    }
  }

  render() {
    return (
      <div
        className={
          (this.state.open === true ? ('accordion accordion-open ' + this.props.className) :
            ('accordion ' + this.props.className))}>
        <button onClick={this.changeVisible}>
          {this.props.btnText}
          {(this.state.open === true ? <i className='fas fa-caret-up'></i> : <i className='fas fa-caret-down'></i>)}
        </button>
        {(this.state.open === true ? (<div className='accordion-content'>
          {this.props.children}
        </div>) : (''))}
      </div>
    );
  }
}

export default Accordion;
