// eslint-disable-next-line
import React ,{ Component } from "react";
import "./index.less";

class DataPicker extends Component {
    // noinspection JSAnnotator
    constructor(props){
        super(props);
    }
    onChange = (event) =>{
        this.setState({value: event.target.value});
        this.props.onChange(event.target.value);
    }
    state = {
        value:"",
    };
    componentDidMount() {
        this.setState({value: this.props.value});
    }
    render() {
        return (
            <div style={{display:"flex"}}>
                <div style={{width:"85px",fontSize:"14px"}}>选择日期</div>
                <input type="date" className="my_date_picker" value={this.state.value}  onChange={this.onChange} />
            </div>
        );
    }
}
export default DataPicker;
