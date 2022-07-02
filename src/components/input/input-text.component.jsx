import { Component } from "react";

class InputText extends Component {
    render() {
        return (
            <input 
                value={this.props.value} 
                type='text'
                className={this.props.className}
                name={this.props.fieldName}
                onChange={this.props.onChangeHandler}
            />
        )
    }
}

export default InputText;