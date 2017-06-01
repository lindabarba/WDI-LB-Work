import React, {Component} from 'react';

// custom components
import SelectLanguage from './SelectLanguage';
import ReposGrid from './ReposGrid';

// API method
import API from './../api/api.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedLanguage: 'All',
      repos: null
    }
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage = (language) => {
    this.setState(() => ({
      selectedLanguage: language,
      repos: null
    }))

    API.fetchPopularRepositories(language)
      .then((data) => {
        this.setState({
          selectedLanguage: language,
          repos: data
        })
      })
  }

  render() {
    return (
      <div>
        <SelectLanguage updateLanguage={this.updateLanguage}
                        selectedLanguage={this.state.selectedLanguage} />
         {!this.state.repos ? <div>No Repos</div> :
        <ReposGrid repos={this.state.repos.items} />}
      </div>
    )
  }
}

export default App;
