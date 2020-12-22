import React from "react";

class Tabs extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: 0
    };
  }

  setTab(index) {
    this.setState({
      selected: index,
    });
  }

  _renderContent() {
    return (
      <div className="tab_content">
        {this.props.children[this.state.selected]}
      </div>
    );
  }

  _renderLabels() {
    return this.props.children.map((child, index) => (
      <div className={"tab_button tab_button" + index} key={child.props.label} onClick={() => { this.setTab(index) }}>
        {child.props.label}
      </div>
    ));
  }

  render() {
    return (
      <div className="tabs">
        {this._renderContent()}
        <div className="tab_buttons">
       	  {this._renderLabels()}
        </div>
      </div>
    );
  }
}

export default Tabs;
