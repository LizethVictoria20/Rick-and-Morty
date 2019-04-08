import React from "react";
import Card from "./card";
import Style from "../styleGlobal.css/home.css";
import Logo from "../image/logo.png";

class Home extends React.Component {
  state = {
    nextPage: 1,
    loading: true,
    error: null,
    data: {
      results: []
    }
  };
  componentDidMount() {
    this.fetchCharacter();
  }
  error() {
    return `Ha habido un error en el llamado a la api ${this.state.error}`;
  }

  fetchCharacter = async () => {
    this.setState({ loading: true, error: null });

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${this.state.nextPage}`
      );
      const data = await response.json();

      this.setState({
        loading: false,
        data: {
          info: data.info,
          results: [].concat(this.state.data.results, data.results)
        },
        nextPage: this.state.nextPage + 1
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }
  };
  render() {
    if (this.state.error) {
      return this.error();
    }
    return (
      <div className="container">
        <img
          className="logo"
          src="https://www.logolynx.com/images/logolynx/1b/1b195a66f61b7036991d19b9a2bb4e7c.jpeg"
          alt=""
        />
        <div className="row">
          {this.state.data.results.map(character => (
            <div className="col-6 col-md-3" key={character.id}>
              <Card character={character.name} image={character.image} />
            </div>
          ))}
          {this.state.loading && <div>Loading...</div>}
          {!this.state.loading && (
            <button className=" btn btn-info" onClick={this.fetchCharacter}>
              Load More
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
