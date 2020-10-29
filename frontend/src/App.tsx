import React from "react";
import "./App.css";
import API from "./utils/API";

interface AppState {
  input: string;
  data: any;
}
type InputEvent = React.ChangeEvent<HTMLInputElement>;
type FormEvent = React.MouseEvent<HTMLFormElement>;

class App extends React.Component<{}, AppState> {
  state = {
    input: "",
    data: null,
  };
  handleChange = (event: InputEvent) => {
    this.setState({ input: event.target.value });
  };
  handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const res = await API.get(`/metainfo?url=${this.state.input}`);
    this.setState({ data: res.data });
    console.log("res ", res.data);
  };
  render() {
    return (
      <main>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <input placeholder="https://..." type="url" onChange={this.handleChange} autoFocus required />
            <button type="submit">Show preview</button>
          </form>
        </div>
        <div>
          {this.state.data && <pre>{JSON.stringify(this.state.data)}</pre>}
        </div>
      </main>
    );
  }
}
export default App;
