import React, {Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

    state = {
      term: ''
    };

    onFilter = (e) => {
        const term = e.target.value;
        this.setState({term});
        this.props.onFilter(term);
    };

    render() {

        return (
            <input type="text"
                   className="form-control search-input"
                   placeholder="type to search"
                   onChange={this.onFilter}
                   value={this.state.term}
            />
        );
    };
};
