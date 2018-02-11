import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IcoListItems from './IcoItem';
import IcoDetailModal from './IcoDetail';

// redux binding(s)
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  mapStateToProps,
  mapDispatchToProps,
} from './redux/factory';

// help us search inside arrays
import * as _ from 'lodash';

import {
  Input,
  Form,
  Loader,
  Dimmer,
  Container,
  //Modal
} from 'semantic-ui-react';


class Directory extends Component {
  displayName = 'DirectoryComponent'

  static propTypes = {
    // sessData should be an object, and is required by this component
    sessData: PropTypes.object.isRequired
  }

  state = {
    data: null,
    filteredResults: null
  }

  componentWillMount() {
    //console.warn(`Props @${this.displayName} => `, this.props);
  }

  componentDidMount() {
    // Production data source: 'http://coinscore.co/currencies'
    //const URL = 'https://uchilaka.github.io/coinscore-react/res/sample-data.json';
    const URL = '/res/sample-data.json';
    fetch(URL, { method: 'GET', headers: {} })
      .then(response => {
        return response.json();
      })
      .then(json => {
        //console.log('Pre-formatted data -> ', json);

        // do some parsing 
        const parsedData = json.map((item, index) => {
          item.key = index + 1;
          if (item.stats) {
            // figure out trend 
            const stats = item.stats.slice(0), first = stats.shift(), last = stats.pop();
            //console.warn('Cloned stats -> ', stats);
            item.trend = first.amount > last.amount ? 'down' : (first.amount < last.amount ? 'up' : 'flat');
          } else {
            item.trend = 'flat';
          }
          return item;
        });

        console.log('This is the data!', parsedData);

        this.setState({ data: parsedData }, () => {
          // do on complete
        });

      })
      .catch(err => {
        // load the JSON instead
      });
  }

  filterList() {
    // filter the list by search parameters
    console.log('Filtering the list...');
  }

  handleSearchInput(ev) {
    const { target } = ev;
    const { data } = this.state;
    console.log('Search input -> %s', target.value);
    const results = _.filter(data, (item) => {
      const regex = new RegExp(target.value, "gi");
      return regex.test(item.name) || regex.test(item.team);
    });
    // write to state 
    this.setState({ filteredResults: results }, () => {
      // write was successful
      console.warn('Results -> ', results);
    });
  }

  render() {
    console.warn(`Props @${this.displayName} -> `, this.props);
    // extract data
    const { data, filteredResults } = this.state;
    const { sessData, dispatch } = this.props;
    let selectedIcoItem = null;

    // extract selected item if sessData exists
    if (sessData) {
      selectedIcoItem = sessData.selectedIcoItem;
    }

    // handle availability of results 
    const icoList = filteredResults ? filteredResults : data;

    // render view
    return (
      <Container text>

        <IcoDetailModal selected={selectedIcoItem} dispatch={dispatch} />

        <Form>
          {/* Loader & Dimmer */}
          {data ? null : (
            <Dimmer active page>
              <Loader size="huge">Loading awesome data...</Loader>
            </Dimmer>
          )}

          {/* Search bar */}
          <Input size="huge" fluid={true} loading={false}
            icon={{ name: 'search', circular: true, link: true }}
            placeholder="Find an ICO"
            onChange={this.handleSearchInput.bind(this)} />

          {/* ICO search results */}
          <IcoListItems list={icoList} dispatch={dispatch} />

        </Form>
      </Container>
    );
  }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Directory));
