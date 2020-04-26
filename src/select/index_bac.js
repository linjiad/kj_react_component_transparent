import React, {Component} from "react";
import validate from "../form/rule";
const validateRules = new validate.ValidateRules();
import "./index.less";

class Select extends Component {
    // noinspection JSAnnotator
    constructor(props) {
        super(props);
    }

    state = {
        title: this.props.title,
        value: this.props.value ? this.props.value : "",
        txtErr: this.props.message,
    };

    componentDidMount() {
    }

    onChange = (event) => {
        if(this.props.prop){
            // 调用验证方法
            const message = validateRules.validate(this.props.prop, event.target.value);
            // 把获得的消息写到translate中
            this.setState({txtErr:message});
        }
        this.props.onChange(event.target.value);
    };

    componentWillReceiveProps(nextProps) {
        this.setState({value: nextProps.value});
        if (nextProps.errMessage) {
            this.setState({txtErr: nextProps.errMessage});
        }
    }

    render() {
        let {txtErr} = this.state;
        return (
            <div className="my_select_main">
                <div className="my_select_title">
                    <span style={{display:(this.props.prop)?"":"none",color:"red"}}>*</span>
                    {this.state.title}
                </div>
                <select onChange={this.onChange}
                    value={this.state.value}
                    onBlur={this.onChange}
                    className={txtErr ? "my_select my_select_txtErr" : "my_select"}>
                    {/*value = {this.state.value}*/}
                    <option value="" style={{color: "#999"}} disabled={true}>请选择</option>
                    {this.props.children}
                </select>
                <p className="my_select_tips">{txtErr}</p>
            </div>
        );
    }
}

export default Select;
