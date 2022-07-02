import { Component } from "react";

class InputSelect extends Component {
    render() {
        return (
            <select className={this.props.className} value={this.props.value} name={this.props.fieldName} onChange={this.props.onChangeHandler} >
                {
                    this.props.options.map(
                        (opt) => {
                            return (
                                <option key={opt} value={opt}>{opt}</option>
                            )
                        }
                    )
                }
            </select>
        )
    }
}

export default InputSelect;