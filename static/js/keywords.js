// Reference
// https://goshakkk.name/array-form-inputs/

// TODO: Add this to CSS
// .keyword {
//     display: flex;
//     direction: row;
//     align-items: center;
//   }
  
//   .keyword button {
//     margin: 0;
//     margin-left: 10px;
//   }

import React from "react";
import ReactDOM from "react-dom";

import "./style.css";

class KeywordForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      keywords: [{ name: "" }]
    };
  }

  handleNameChange = evt => {
    this.setState({ name: evt.target.value });
  };

  handleKeywordChange = idx => evt => {
    const newKeywords = this.state.keywords.map((keyword, sidx) => {
      if (idx !== sidx) return keyword;
      return { ...keyword, name: evt.target.value };
    });

    this.setState({ keywords: newKeywords });
  };

  handleSubmit = evt => {
  };

  handleAddKeyword = () => {
    this.setState({
      keywords: this.state.keywords.concat([{ name: "" }])
    });
  };

  handleRemoveShareholder = idx => () => {
    this.setState({
      keywords: this.state.keywords.filter((s, sidx) => idx !== sidx)
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Presentation Name"
          value={this.state.name}
          onChange={this.handleNameChange}
        />

        <h4>Keywords</h4>

        {this.state.keywords.map((keyword, idx) => (
          <div className="keyword">
            <input
              type="text"
              placeholder={`Keyword #${idx + 1}`}
              value={keyword.name}
              onChange={this.handleKeywordChange(idx)}
            />
            <button
              type="button"
              onClick={this.handleRemoveShareholder(idx)}
              className="small"
            >
              -
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={this.handleAddKeyword}
          className="small"
        >
          Add Keyword
        </button>
        <button>Submit</button>
      </form>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<KeywordForm />, rootElement);
