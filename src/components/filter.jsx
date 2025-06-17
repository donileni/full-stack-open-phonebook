const Filter = (props) => (
  <div>
    filter shown with
    <input
      onChange={props.handleFilterChange}
      value={props.filter}
      data-testid="filter-input"
    ></input>
  </div>
);

export default Filter;
