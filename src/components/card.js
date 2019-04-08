import React from "react";
import Style from "../styleGlobal.css/card.css";

class Card extends React.Component {
  render() {
    return (
      <div className="card">
        <img src={this.props.image} alt="" />
        <h4 className="card-body">{this.props.character}</h4>
      </div>
    );
  }
}

export default Card;
