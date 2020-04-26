import React, {Component,useReducer,createContext} from "react";
import validate from "./rule";
const validateRules = new validate.ValidateRules();

export const FormContext = createContext({});

class Form extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        errors: this.props.errors || {},
    };

    check(callback) {
        const { children } = this.props;
        let errorCount = 0;
        const messageList = [];
        const list = (children.props.children.length)?children.props.children:[children.props.children];
        list.forEach((item,index)=>{
            // 当是react组件时进行校验
            if(Object.prototype.toString.call(item.props.children.props)==="[object Object]"){
                if(item.props.children.props.prop){
                    const message = validateRules.validate(item.props.children.props.prop, item.props.children.props.value);
                    if(message){
                        errorCount ++;
                    }
                    messageList.push(
                        {
                            name:item.props.children.props.errName,
                            message:message
                        }
                    );
                }
            }
        });
        const messagedata={
            errorCount,
            messageList
        };
        callback(messagedata);
    }

    componentDidMount() {
    }

    render() {
        const {classes} = this.props;
        return (
            <form
                {...this.props}
                onSubmit={e => {
                    e.preventDefault();
                }}
                className={classes}
            />
        );
    }
}

export default Form;
