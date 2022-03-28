import styledComponents from "styled-components";

export function Friviaform({
    onSubmitFrivia,
    disabled,
    submitFrivia,
    error,
    defaultValue,
  }) {
    function handleSubmit(event) {
      event.preventDefault();
      onSubmitJoke(event.target.elements.frivia.value, event.target);
    }
  
    return (
      <Form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="frivia"><div>Friva:</div></label>
          <input
            type="text"
            required
            id="frivia"
            name="frivia"
            defaultValue={defaultValue}
          />
          {error ? (
            <p>
              <strong>Error:</strong> {error}
            </p>
          ) : null}
        </div>
        <input type="submit" value={submitFrivia} disabled={disabled} />
      </Form>
    );
  }
  
  const Form = styledComponents.form`
  display: grid;
  gap: 1rem;
  > div {
    display: grid;
  }
  label {
    font-size: small;
    font-weight: 300;
  }
  input[type="text"] {
    appearance: none;
    padding: 0.5rem;
    border: 1px solid rgb(190 190 190);
    border-radius: 3px;
  }
  input[type="submit"] {
    margin-top: auto;
  }
`;