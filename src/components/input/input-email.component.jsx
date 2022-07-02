import { Component } from "react";

class InputEmail extends Component {
    render() {
        return (
            <input 
                value={this.props.value} 
                type='email'
                className={this.props.className}
                name={this.props.fieldName}
                onChange={this.props.onChangeHandler}
            />
        )
    }
}

export default InputEmail;