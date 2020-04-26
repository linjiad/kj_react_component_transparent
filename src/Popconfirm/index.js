import React, {Component} from "react";
import "./index.less";
class Tooltip extends Component {
    // noinspection JSAnnotator
    constructor(props) {
        super(props);
    }

    state = {};

    // 鼠标点击现实提示
    showDom = (event)=> {
        // 获取鼠标的dom节点
        const content = event.target;
        // 获取提示的dim节点
        const tips = this.getParent(event.target,"my_popconfirm_main").firstChild;
        // 设置提示的dom可见
        tips.style.display = "";
        // 获取子节点的位置来设置提示的位置
        tips.style.left = `${content.getBoundingClientRect().left - 60}px`;
        tips.style.top = `${content.getBoundingClientRect().top - 75}px`;
    }
    // 隐藏提示
    hiddentDom = (event)=> {
        const tips = this.getParent(event.target,"my_popconfirm_main").firstChild;
        tips.style.display = "none";
    }
    // 循环获取dom的parent节点直到某个class
    getParent = (dom,className) => {
        while (!Object.is(dom.parentNode.className,className)) {
            dom = dom.parentNode;
        }
        return dom.parentNode;
    }
    // 点击确定按钮
    choseYes = (event) =>{
        this.hiddentDom(event);
        this.props.onConfirm();
    }
    render() {
        return (
            <div className="my_popconfirm_main" style={{width:"30px"}}>
                <div className="my_popconfirm_tips" style={{display:"none",top:"",left:""}}>
                    <div className="my_popconfirm_head">
                        <div className="my_popconfirm_title">
                            <i className="iconfont iconguanbi1" style={{fontSize:"12px",color:"#FF6600"}}></i>
                            <div style={{width:"10px"}}></div>
                            {this.props.title}
                        </div>
                        <div className="my_popconfirm_buttons">
                            <div className="my_popconfirm_yes" onClick={(e)=>{this.hiddentDom(e);}}>{this.props.cancelText}</div>
                            <div style={{width:"10px"}}></div>
                            <div className="my_popconfirm_no"  onClick={(e)=>{this.choseYes(e);}}>{this.props.okText}</div>
                        </div>
                    </div>
                </div>
                <div className="my_popconfirm_content" onClick={(e)=>{this.showDom(e);}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Tooltip;
