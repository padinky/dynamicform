import { Component } from "react";
import InputText from "./components/input/input-text.component";
import InputSelect from "./components/input/input-select.component";
import InputEmail from "./components/input/input-email.component";
import InputMultiline from "./components/input/input-multiline.component";
import InputNumber from "./components/input/input-number.component";
// import _ from "lodash"

class App extends Component{
  constructor() {
    super();

    this.state = {
      datas: []
    };
  }

  componentDidMount() {
    fetch('https://ulventech-react-exam.netlify.app/api/form')
    .then((resp) => resp.json())
    .then((d) => this.setState(
      () => {
        return { datas:d.data };
      },
      () => {
        console.log(this.state);
      }
    ))
  }

  saveData =  () => {
    const payload = {}
    this.state.datas.map((d)=>{
      return payload[d.fieldName] = d.value
    })
    console.log("payload=== ",payload)

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(payload)
    };
    console.log(requestOptions);
    fetch('https://ulventech-react-exam.netlify.app/api/form', requestOptions)
        .then(response => response.json())
        // .then((r));

  }

  onInputChange = (event) => {
    const fieldName = event.target.name;
    const newValue = event.target.value;

    const newDatas = [];
    this.state.datas.map((d) => {
      if (d.fieldName === fieldName)  {
        d.value = newValue;
      }
      return newDatas.push(d);
    })

    this.setState(() => {
      return { datas: newDatas }
    },
    () => {
      // console.log(this.state.datas)
    }
    )
  }

  renderInput(data) {
    switch(data.type) {
      case 'text' :
        return <InputText value={data.value} fieldName={data.fieldName} onChangeHandler={this.onInputChange} />
      case 'select' :
          return <InputSelect value={data.value} options={data.options} fieldName={data.fieldName} onChangeHandler={this.onInputChange} />
      case 'email' :
          return <InputEmail value={data.value} fieldName={data.fieldName} onChangeHandler={this.onInputChange} />
      case 'number' :
        return <InputNumber value={data.value} fieldName={data.fieldName} onChangeHandler={this.onInputChange} />
      case 'multiline' :
        return <InputMultiline value={data.value} fieldName={data.fieldName} onChangeHandler={this.onInputChange} />
      default :
        return <InputText value={data.value} fieldName={data.fieldName} onChangeHandler={this.onInputChange} />
    }
  }

  render() {
    const {datas} = this.state
    return (
      <div>
        <form onSubmit={() => {}}>
        {datas.map((d) => {
          return (
            <div key={d.fieldName} >
              <div>{d.fieldName}</div>
              <div>{this.renderInput(d)}</div>
              <hr />
            </div>
          )
        })}
        <button type="button" onClick={this.saveData}>Save! </button>
        </form>
      </div>
    )
  }
}

export default App;