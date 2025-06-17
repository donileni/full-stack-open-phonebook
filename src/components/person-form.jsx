const PersonForm = (props) => {
    return (
      <div>
        <form data-testid="person-form" onSubmit={props.handleClick}>
          <div>
            name:{" "}
            <input
              data-testid="name-input"
              onChange={props.handleNameChange}
              value={props.newName}
            />
          </div>
          <div>
            number:{" "}
            <input
              onChange={props.handleNumberChange}
              value={props.newNumber}
              data-testid="number-input"
            ></input>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
    );
}

export default PersonForm