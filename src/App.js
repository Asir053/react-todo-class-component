import React from "react";
import List from "./components/List";
import Alert from "./components/Alert";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      list: this.getLocalStorage(),
      isEditing: false,
      editID: null,
      alert: { show: false, msg: "", type: "" },
    };
    this.getLocalStorage = this.getLocalStorage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.clearList = this.clearList.bind(this);
  }

  getLocalStorage() {
    let list = localStorage.getItem("list");
    if (list) {
      return (list = JSON.parse(localStorage.getItem("list")));
    } else {
      return [];
    }
  }

  // const [name, setName] = useState("");
  // const [list, setList] = useState(getLocalStorage());
  // const [isEditing, setIsEditing] = useState(false);
  // const [editID, setEditID] = useState(null);
  // const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  // useEffect(() => {
  //   localStorage.setItem("list", JSON.stringify(list));
  // }, [list]);
  componentDidMount() {
    localStorage.setItem("list", JSON.stringify(this.state.list));
  }
  componentDidUpdate() {
    localStorage.setItem("list", JSON.stringify(this.state.list));
  }

  handleSubmit(e) {
    // e.stopPropagation();
    // e.nativeEvent.stopImmediatePropagation();
    e.preventDefault();
    if (!this.state.name) {
      this.showAlert(true, "danger", "Please Enter Value");
    } else if (this.state.name && this.state.isEditing) {
      this.setState({
        list: this.state.list.map((item) => {
          if (item.id === this.state.editID) {
            return { ...item, title: this.state.name };
          }
          return item;
        }),
      });
      // setList(
      //   this.state.list.map((item) => {
      //     if (item.id === this.state.editID) {
      //       return { ...item, title: this.state.name };
      //     }
      //     return item;
      //   })
      // );
      this.setState({ name: "" });
      //setName("");
      this.setState({ editID: null });
      //setEditID(null);
      this.setState({ isEditing: false });
      //setIsEditing(false);
      this.showAlert(true, "success", "Value changed");
    } else {
      this.showAlert(true, "success", "Item added to he list");
      const newItem = {
        id: new Date().getTime().toString(),
        title: this.state.name,
      };
      this.setState({ list: [...this.state.list, newItem] });
      //setList([...this.state.list, newItem]);
      this.setState({ name: "" });
      //setName("");
    }
  }
  showAlert(show = false, type = "", msg = "") {
    this.setState({ alert: { show, type, msg } });
    //setAlert({ show, type, msg });
  }
  removeItem(id) {
    this.showAlert(true, "danger", "Item removed");
    this.setState({ list: this.state.list.filter((item) => item.id !== id) });
    //setList(this.state.list.filter((item) => item.id !== id));
  }
  editItem(id) {
    const editItem = this.state.list.find((item) => item.id === id);
    this.setState({ isEditing: true });
    this.setState({ editID: id });
    this.setState({ name: editItem.title });
    // setIsEditing(true);
    // setEditID(id);
    // setName(editItem.title);
  }
  clearList() {
    this.showAlert(true, "danger", "Empty list");
    this.setState({ list: [] });
    //setList([]);
  }

  render() {
    return (
      <section className='section-center'>
        <form onSubmit={this.handleSubmit}>
          {this.state.alert.show && (
            <Alert
              {...this.state.alert}
              removeAlert={this.showAlert}
              list={this.state.list}
            />
          )}
          <h3 style={{ marginBottom: "1.5rem", textAlign: "center" }}>
            ToDo List
          </h3>
          <div className='mb-3 form'>
            <input
              type='text'
              className='form-control'
              placeholder='e.g. egg'
              onChange={(e) => this.setState({ name: e.target.value })}
              value={this.state.name}
            />
            <button type='submit' className='btn btn-success'>
              {this.state.isEditing ? "Edit" : "Submit"}
            </button>
          </div>
        </form>
        {this.state.list.length > 0 && (
          <div style={{ marginTop: "2rem" }}>
            <List
              items={this.state.list}
              removeItem={this.removeItem}
              editItem={this.editItem}
            ></List>
            <div className='text-center'>
              <button className='btn btn-warning' onClick={this.clearList}>
                Clear Items
              </button>
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default App;
