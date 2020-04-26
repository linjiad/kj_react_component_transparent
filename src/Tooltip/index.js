import React, {Component} from "react";
import "./index.less";
class Tooltip extends Component {
    // noinspection JSAnnotator
    constructor(props) {
        super(props);
    }

    state = {};

    // 鼠标进入现实提示
    showDom = (event)=> {
        // 获取鼠标的dom节点
        const content = event.target;
        // 获取提示的dim节点
        const tips = this.getParent(event.target,"my_tooltip_main").firstChild;
        // 设置提示的dom可见
        tips.style.display = "";
        // 获取子节点的位置来设置提示的位置
        tips.style.left = `${content.getBoundingClientRect().left - 15}px`;
        tips.style.top = `${content.getBoundingClientRect().top - 35}px`;
    }
    // 隐藏提示
    hiddentDom = (event)=> {
        const tips = this.getParent(event.target,"my_tooltip_main").firstChild;
        tips.style.display = "none";
    }
    // 循环获取dom的parent节点直到某个class
    getParent = (dom,className) => {
        while (!Object.is(dom.parentNode.className,className)) {
            dom = dom.parentNode;
        }
        return dom.parentNode;
    }
    render() {
        return (
            <div className="my_tooltip_main" style={{width:"30px"}}>
                <div className="my_tooltip_tips" style={{display:"none",top:"",left:""}}>
                    <div className="my_tooltip_title">
                        {this.props.title}
                    </div>
                    <div className="my_tooltip_icon" style={{marginLeft:"20px"}}>
                    </div>
                </div>
                <div className="my_tooltip_content" onMouseOver={(e)=>{this.showDom(e);}}
                    onMouseLeave={(e)=>{this.hiddentDom(e);}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Tooltip;
