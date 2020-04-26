import React, {Component} from "react";
import validate from "../form/rule";
import "./index.less";
const validateRules = new validate.ValidateRules();
class TextArea extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        placeholder: this.props.placeholder,
        value: this.props.value ? this.props.value : "",
        title: this.props.title,
        txtErr:this.props.message,
        prop: this.props.prop, // 验证规则名称
    };
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

    componentDidMount() {
    }

    render() {
        let {txtErr} = this.state;
        return (
            <div className="my_textareaBox">
                <div className="my_textarea_title">
                    <span style={{display:(this.props.prop)?"":"none",color:"red"}}>*</span>
                    {this.state.title}
                </div>
                <textarea rows={6}
                    placeholder={this.state.placeholder}
                    value={this.state.value}
                    onChange={this.onChange}
                    onBlur={this.onChange}
                    className={txtErr ? "my_textarea my_textarea_txtErr" : "my_textarea"}
                />
                <p className="my_textarea_tips">{txtErr}</p>
            </div>
        );
    }
}

export default TextArea;
