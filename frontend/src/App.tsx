import React from "react";
import "./App.css";
import API from "./utils/API";

interface AppState {
  input: string;
}
type InputEvent = React.ChangeEvent<HTMLInputElement>;
type FormEvent = React.MouseEvent<HTMLFormElement>;
class App extends React.Component<{}, AppState> {
  state = {
    input: ""
  };
  handleChange = (event: InputEvent) => {
    this.setState({ input: event.target.value });
  };
  handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const res = await API.post("/metainfo", { url: this.state.input });
    console.log("res ", res.data);
  };
  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <input type="url" onChange={this.handleChange} autoFocus required />
          <button type="submit">Show preview</button>
        </form>
      </div>
    );
  }
}
export default App;
