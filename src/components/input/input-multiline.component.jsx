import { Component } from "react";

class InputMultiline extends Component {
    render() {
        return (
            <textarea
                className={this.props.className} name={this.props.fieldName}
                onChange={this.props.onChangeHandler}
                value={this.props.value}
            ></textarea>
        )
    }
}

export default InputMultiline;