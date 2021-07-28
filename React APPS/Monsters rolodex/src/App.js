import React, { Component } from "react";
import { CardList } from "./Components/card-list/card-list";
import { SearchBox } from "./Components/search-box/search-box";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchFilter: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users/")
      .then((response) => response.json())
      .then((monsters) => this.setState({ monsters: monsters }));
  }

  render() {
    const filteredMonsters = this.state.monsters.filter((monster) => {
      return monster.name
        .toLowerCase()
        .includes(this.state.searchFilter.toLowerCase());
    });
    return (
      <div>
        <h1 className="heading"> Monster Rolodex</h1>
        <SearchBox
          placeholder="Search monster"
          handleChange={(e) => this.setState({ searchFilter: e.target.value })}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
