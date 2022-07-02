import { Component } from "react";

class InputNumber extends Component {
    render() {
        return (
            <input 
                value={this.props.value} 
                type='number'
                className={this.props.className}
                name={this.props.fieldName}
                onChange={this.props.onChangeHandler}
            />
        )
    }
}

export default InputNumber;