import React from 'react';

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.startTab
    };

    this.setTab = this.setTab.bind(this);
  }

  changeTabStuff(index) {
    this.setTab(index);
    this.props.changeTabValue(index);
  }

  setTab(index) {
    this.setState({
      selected: index,
    });
  }

  _renderContent() {
    return (
      <div className={'tab-content tab' + this.state.selected + '-selected'}>
        {this.props.children[this.state.selected]}
      </div>
    );
  }

  _renderLabels() {
    return this.props.children.map((child, index) => (
      <div
          className={'tab-button tab-button' + index + (index === this.state.selected ? (' active') : (''))}
          key={child.props.label}
          onClick={() => { this.changeTabStuff(index); }}>
        {child.props.label}
      </div>
    ));
  }

  render() {
    return (
      <div className='tabs'>
        <div className='tab-buttons'>
          {this._renderLabels()}
        </div>
        {this._renderContent()}
      </div>
    );
  }
}

export default Tabs;
