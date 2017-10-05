import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import * as selectorsAction from '../actions/selectorsAction'


class SortSelector extends Component {

 componentDidMount(){ this.props.setSortCategory('most recent') }

  handleClick = (event) => {
    this.props.setSortCategory(event.target.value)
  }

  render() {
    const sortCategories = ['most recent', 'top score']
    const { sortCategory } = this.props.sortCategory

    return (
      <div>
        <div className='add-radio' >
          {sortCategories.map((cat) =>
            <label key={cat}>
            <input type="radio"
              name='category'
              value={cat}
              onClick={this.handleClick} />
              <span
                className={ sortCategory === cat
                  ? 'add-radio-checked'
                  : '' }>
                {cat}
              </span>
            </label>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ sortCategory }) => {
  return { sortCategory }
}

export default connect(
  mapStateToProps,
  selectorsAction
)(SortSelector)
