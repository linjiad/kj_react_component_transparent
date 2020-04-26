import React, {Component} from "react";
import validate from "../form/rule";
import "./index.less";
const validateRules = new validate.ValidateRules();
class Index extends Component {
    // noinspection JSAnnotator
    constructor(props) {
        super(props);
    }

    state = {
        placeholder: this.props.placeholder,
        value: this.props.value?this.props.value:"",
        title: this.props.title,
        txtErr:this.props.message,
        prop: this.props.prop, // 验证规则名称
        maxlength: false, // 最大字数限制输入
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
        if(this.props.prop){
            for (const rule of this.props.prop) {
                if (rule.max) {
                    this.setState({maxlength:parseInt(rule.max,10)+1});
                }
            }
        }
    }

    componentDidMount() {
    }

    render() {
        let {txtErr}=this.state;
        return (
            <div className="my_input_main">
                <div className="Form_input_title">
                    <span style={{display:(this.props.prop)?"":"none",color:"red"}}>*</span>
                    {this.state.title}
                </div>
                <input type="text" disabled={this.props.disabled} placeholder={this.state.placeholder}
                    value={this.state.value}
                    onChange={this.onChange}
                    onBlur={this.onChange}
                    maxLength={(this.state.maxlength)?this.state.maxlength:""}
                    className={txtErr?"my_select_txtErr my_input":"my_input"}
                />
                <p className="my_input_tips">{txtErr}</p>
            </div>
        );
    }
}

export default Index;
