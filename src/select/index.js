import React, {useContext,useState,useEffect} from "react";
import validate from "../form/rule";
import "./index.less";
import {FormContext} from "../form/index";
const validateRules = new validate.ValidateRules();
const Select = props =>{
    const { changeFormMessage,ruleList,formMessage} = useContext(FormContext);
    const [value,changeValue]=useState("");
    // 首先设定必填为false
    let must = false;
    // 如果需要校验的话，有可能设置must为true
    if(props.errName){
        for (const rule of ruleList[props.errName]) {
            // 判断规则是否为必填
            if (rule.must) {
                // 如果有must是必填字段，则设为必填字段
                must = true;
            }
        }
    }
    // 修改值
    const change = (event) =>{
        if(props.errName){
            // 调用验证方法
            const message = validateRules.validate(ruleList[props.errName], event.target.value);
            // 改变form中message的这个值
            formMessage[props.errName] = message;
            // 把获得的消息写到form中
            // changeFormMessage(formMessage);
            changeFormMessage({type:"UPDATE_FORM",formMessage});
        }
        changeValue(event.target.value);
        props.onChange(event.target.value);
    };
    return (
        <div className="my_select_main">
            <div className="my_select_title">
                <span style={{display:(must)?"":"none",color:"red"}}>*</span>
                {props.title}
            </div>
            <select
                data-check={props.errName} data-type={(props.errName)?"checkForm":""}
                onChange={change}
                value={value}
                onBlur={change}
                className="my_select">
                {/*value = {this.state.value}*/}
                <option value="" style={{color: "#999"}} disabled={true}>请选择</option>
                {props.children}
            </select>
            <p className="my_select_tips">{formMessage[props.errName]}</p>
        </div>
    );
};

export default Select;