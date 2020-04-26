import React ,{ Component } from "react";
import "./index.less";

class Option extends Component {
    // noinspection JSAnnotator
    constructor(props){
        super(props);
    }
    state = {
        value: this.props.value,
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.value){
            this.setState({value:nextProps.value});
        }
    }
    componentDidMount() {}
    render() {
        return (
            <option value ={this.state.value} style={{color:"#999"}}>
                {this.props.children}
            </option>
        );
    }
}
export default Option;
