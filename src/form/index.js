import React, {useReducer,createContext,useState} from "react";
import validate from "./rule";
const validateRules = new validate.ValidateRules();

export const FormContext = createContext({});

const reducer= (state,action)=>{
    switch(action.type){
    case "UPDATE_FORM":
        return action.formMessage;
    default:
        return state;
    }
};

const Form = props=>{
    // const [formMessage,changeFormMessage]=useState({});
    const [formMessage,changeFormMessage]=useReducer(reducer,{});
    // 为了触发改变formMessage
    const [ruleList,changeRuleList]=useState(props.rules);
    // 校验方法
    const checkForm = () =>{
        let errorCount = 0;
        // 获取有此属性需要校验的dom节点
        const domList = document.querySelectorAll('[data-type="checkForm"]');
        // 循环dom节点
        Array.prototype.forEach.call(domList,item => {
            // 调用验证方法
            const message = validateRules.validate(ruleList[item.getAttribute("data-check")], item.value);
            // 改变form中message的这个值
            formMessage[item.getAttribute("data-check")] = message;
            // 如果有错误则错误计数++
            if(message){
                errorCount ++;
            }
            // 需要深度复制
            changeFormMessage({type:"UPDATE_FORM",formMessage:{...formMessage}});
        });
        // 返回错误计数
        return errorCount;
    };
    // console.log(props);
    props.onRef(checkForm);
    return (
        <FormContext.Provider value={{formMessage,changeFormMessage,ruleList}}>
            {props.children}
        </FormContext.Provider>
    );
};

export default Form;
