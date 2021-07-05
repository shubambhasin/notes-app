//flag for localStorage
var flagShouldUpdate = true;

var Note = React.createClass({
  render: function () {
    var style = { backgroundColor: this.props.color };
    return (
      <div className="note" style={style}>
        <span className="delete-note" onClick={this.props.onDelete}>
          {" "}
          x{" "}
        </span>
        {this.props.children}
      </div>
    );
  },
});

var NoteSearch = React.createClass({
  handleSeach: function (event) {
    var searchQuery = event.target.value.toLowerCase();
    this.props.onSearch(searchQuery);
  },

  render: function () {
    return (
      <div className="search">
        <label>
          <input type="text" id="searchField" onChange={this.handleSeach} />
          <i className="fa fa-search fa-lg" aria-hidden="true"></i>
        </label>
      </div>
    );
  },
});

var NoteEditor = React.createClass({
  getInitialState: function () {
    return {
      text: "",
      color: "#8edb85",
    };
  },

  handleTextChange: function (event) {
    if (!flagShouldUpdate) {
      this.props.onSearchClearField();
    }
    this.setState({ text: event.target.value });
  },

  handleColorChange: function (event) {
    this.setState({ color: event.target.value });
  },

  handleNoteAdd: function () {
    var newNote = {
      text: this.state.text,
      color: this.state.color,
      id: Date.now(),
    };
    this.props.onNoteAdd(newNote);
    this.setState({ text: "" });
  },

  render: function () {
    return (
      <div className="note-editor">
        <textarea
          className="textarea"
          placeholder="Enter your note here..."
          rows={5}
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <div className="color-label">
          <label>
            {" "}
            Choose a color:
            <input
              className="color-type"
              type="color"
              defaultValue="#8edb85"
              onChange={this.handleColorChange}
            />
          </label>
        </div>
        <button className="add-button" onClick={this.handleNoteAdd}>
          Add
        </button>
      </div>
    );
  },
});

var NotesGrid = React.createClass({
  componentDidMount: function () {
    var grid = this.refs.grid;
    this.msnry = new Masonry(grid, {
      itemSelector: ".note",
      columnWidth: 200,
      gutter: 10,
    });
  },

  componentDidUpdate: function (prevProps) {
    if (this.props.notes.length !== prevProps.notes.length) {
      this.msnry.reloadItems();
      this.msnry.layout();
    }
  },

  render: function () {
    var noteDelete = this.props.onNoteDelete;
    return (
      <div className="notes-grid" ref="grid">
        {this.props.notes.map(function (note) {
          return (
            <Note
              key={note.id}
              color={note.color}
              onDelete={noteDelete.bind(null, note)}
            >
              {note.text}
            </Note>
          );
        })}
      </div>
    );
  },
});

var NotesApp = React.createClass({
  getInitialState: function () {
    return {
      notes: [
        {
          id: 0,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel magna commodo, fringilla enim in, sagittis velit. Donec ornare, odio aliquet posuere egestas, ante dui cursus ex, eu mattis dui orci id turpis. Fusce ultrices hendrerit sapien, in dignissim magna viverra a. Phasellus pulvinar iaculis sagittis. Nunc tempus diam id ipsum vestibulum sollicitudin ut sit amet ex. Pellentesque diam nisl, faucibus non orci at, blandit laoreet leo.",
          color: "#a6e5e7",
        },
        {
          id: 1,
          text: "Cras ipsum erat, auctor id laoreet vel, semper vitae metus. Cras massa odio, commodo malesuada mauris quis, aliquet ullamcorper ipsum. Vivamus molestie porttitor lacus, tristique rhoncus magna bibendum at. Vestibulum mattis mi facilisis, ultrices libero id, euismod odio. Mauris elit mauris, semper vel purus eu, feugiat malesuada libero. Mauris sodales condimentum ligula, a scelerisque ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          color: "#b9f09f",
        },
        {
          id: 2,
          text: "Aenean malesuada sagittis eros commodo porttitor. Morbi mi mi, gravida eget dolor at, congue finibus nibh. Morbi vitae libero posuere, lacinia felis ut, dapibus diam. Duis elementum quis purus at convallis. Etiam ut ligula turpis. Suspendisse in elit elementum, rutrum leo et, semper felis. Sed ornare quis arcu ac congue. Integer erat lorem, vestibulum a ipsum ac, finibus malesuada turpis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
          color: "#ee9ef0",
        },
        {
          id: 3,
          text: "Vivamus ornare, arcu sed fermentum dapibus, leo lectus molestie est, ac facilisis odio libero a turpis. Quisque metus est, sollicitudin at orci at, rhoncus lobortis magna. Quisque cursus iaculis auctor. Proin lacinia tortor eu neque porttitor, a dapibus justo consequat.",
          color: "#f0d49e",
        },
        {
          id: 4,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          color: "#a6e5e7",
        },
        {
          id: 5,
          text: "Cras ipsum erat, auctor id laoreet vel, semper vitae metus. Vivamus molestie porttitor lacus, tristique rhoncus magna bibendum at. Vestibulum mattis mi facilisis, ultrices libero id, euismod odio. Mauris elit mauris, semper vel purus eu, feugiat malesuada libero. Mauris sodales condimentum ligula, a scelerisque ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          color: "#82eec1",
        },
        {
          id: 6,
          text: "Aenean malesuada sagittis eros commodo porttitor. Morbi mi mi, gravida eget dolor at, congue finibus nibh. Morbi vitae libero posuere, lacinia felis ut, dapibus diam. Duis elementum quis purus at convallis. Etiam ut ligula turpis. Suspendisse in elit elementum, rutrum leo et, semper felis. Sed ornare quis arcu ac congue. Integer erat lorem, vestibulum a ipsum ac, finibus malesuada turpis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
          color: "#c6df74",
        },
        {
          id: 7,
          text: "Vivamus ornare, arcu sed fermentum dapibus, leo lectus molestie est, ac facilisis odio libero a turpis. Quisque metus est, sollicitudin at orci at, rhoncus lobortis magna. Quisque cursus iaculis auctor. Proin lacinia tortor eu neque porttitor, a dapibus justo consequat.",
          color: "rgba(#64c1b3, 0.66)",
        },
      ],
    };
  },

  handleNoteAdd: function (newNote) {
    var newNotes = this.state.notes.slice();
    newNotes.unshift(newNote);
    if (!flagShouldUpdate) {
      this.handleClearSearchField();
    }
    flagShouldUpdate = true;
    this.setState({ notes: newNotes });
  },

  handleNoteDelete: function (note) {
    var noteId = note.id;
    var newNotes = this.state.notes.filter(function (note) {
      return note.id !== noteId;
    });
    flagShouldUpdate = true;
    this.setState({ notes: newNotes });
  },

  handleSearch: function (searchQuery) {
    var displayedNotes = JSON.parse(localStorage.getItem("notes")).filter(
      function (el) {
        var searchValue = el.text.toLowerCase();
        return searchValue.indexOf(searchQuery) !== -1;
      }
    );
    flagShouldUpdate = false;
    this.setState({ notes: displayedNotes }, this.render);
  },

  handleClearSearchField: function () {
    var searchField = document.getElementById("searchField");
    searchField.value = "";
    this.handleSearch("");
  },

  componentDidMount: function () {
    var localNotes = JSON.parse(localStorage.getItem("notes"));
    if (localNotes) {
      this.setState({ notes: localNotes });
    }
    console.log(document.getElementById("searchField"));
  },

  componentDidUpdate: function () {
    if (flagShouldUpdate) {
      this._updateLocalStorage();
    }
  },

  render: function () {
    return (
      <div className="notes-app">
        <div className="app-header"> Notes App </div>
        <NoteEditor
          onNoteAdd={this.handleNoteAdd}
          onSearchClearField={this.handleClearSearchField}
        />
        <NoteSearch onSearch={this.handleSearch} />
        <NotesGrid
          notes={this.state.notes}
          onNoteDelete={this.handleNoteDelete}
        />
      </div>
    );
  },

  _updateLocalStorage: function () {
    var notes = JSON.stringify(this.state.notes);
    localStorage.setItem("notes", notes);
  },
});

ReactDOM.render(<NotesApp />, document.getElementById("mount-point"));
