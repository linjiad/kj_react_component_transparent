import React ,{ Component } from "react";
import "./index.less";

class NewLeftMenuSub extends Component {
    // noinspection JSAnnotator
    constructor(props){
        super(props);
    }
    componentDidMount() {
        // 如果菜单关闭的话
        if(!JSON.parse(document.getElementsByClassName("new_left_menu")[0].getAttribute("data-open"))){
            // 收起所有菜单
            const divs = document.querySelectorAll(".new_left_menu_sub");
            divs.forEach((div)=>{
                div.childNodes.forEach((item,index) => {
                    if (item.className.includes("new_left_menu_item")) {
                        item.style.height = "0px";
                    }
                    if (item.className.includes("new_left_menu_sub") && index !== 0) {
                        item.style.height = "0px";
                    }
                });
            });
        }
    }
    change = (event) => {
        let div = event.target.parentNode.parentNode;
        if(event.target.parentNode.className.includes("new_left_menu_sub")){
            div = event.target.parentNode;
        }else if(event.target.parentNode.parentNode.className.includes("new_left_menu_sub")){
            div = event.target.parentNode.parentNode;
        }else if(event.target.parentNode.parentNode.parentNode.className.includes("new_left_menu_sub")){
            div = event.target.parentNode.parentNode.parentNode;
        }else if(event.target.parentNode.parentNode.parentNode.parentNode.className.includes("new_left_menu_sub")){
            div = event.target.parentNode.parentNode.parentNode.parentNode;
        }
        if (div.childNodes.length > 1) {
            // if (div.childNodes[1].style.height && !Object.is(div.childNodes[1].style.height, "0px"))
            if (!Object.is(div.childNodes[1].style.height, "0px")) {
                div.childNodes.forEach((item,index) => {
                    if (item.className.includes("new_left_menu_item")) {
                        item.classList.remove("showmenu1");
                        item.classList.add("hiddenmenu1");
                        item.style.height = "0px";
                    }
                    if (item.className.includes("new_left_menu_sub") && index !== 0) {
                        item.classList.remove("showmenu1");
                        item.classList.add("hiddenmenu1");
                        item.style.height = "0px";
                    }
                });
            }
            else {
                div.childNodes.forEach((item,index) => {
                    if (item.className.includes("new_left_menu_item")) {
                        item.classList.remove("hiddenmenu1");
                        item.classList.add("showmenu1");
                        item.style.height = "40px";
                        // setTimeout(()=>{this.nextChild(item);},400);
                    }
                    if (item.className.includes("new_left_menu_sub") && index !== 0) {
                        item.classList.remove("hiddenmenu1");
                        item.classList.add("showmenu1");
                        item.style.height = "";
                        // setTimeout(()=>{this.nextChild(item);},400);
                    }
                });
            }
        }
        event.stopPropagation();
    }
    nextChild=(div)=>{
        if (div.childNodes.length > 1) {
            if (div.childNodes[1].style.height && !Object.is(div.childNodes[1].style.height, "0px")) {
                div.childNodes.forEach((item,index) => {
                    if (item.className.includes("new_left_menu_item")) {
                        item.classList.remove("showmenu1");
                        item.classList.add("hiddenmenu1");
                        item.style.height = "0px";
                    }
                    if (item.className.includes("new_left_menu_sub") && index !== 0) {
                        item.classList.remove("showmenu1");
                        item.classList.add("hiddenmenu1");
                        item.style.height = "0px";
                    }
                });
            }
            else {
                div.childNodes.forEach((item,index) => {
                    if (item.className.includes("new_left_menu_item")) {
                        item.classList.remove("hiddenmenu1");
                        item.classList.add("showmenu1");
                        item.style.height = "40px";
                    }
                    if (item.className.includes("new_left_menu_sub") && index !== 0) {
                        item.classList.remove("hiddenmenu1");
                        item.classList.add("showmenu1");
                        item.style.height = "";
                    }
                });
            }
        }
    }
    render() {
        return (
            <div className="new_left_menu_sub" >
                <div className="new_left_menu_title_sub" onClick={this.change} style={{paddingLeft:`${this.props.lv*5}%`}}>
                    <i className={`iconfont menu_iconfont ${this.props.icon}`} ></i>
                    <span  style={{marginLeft:"10px"}}>{this.props.title}</span>
                </div>
                {this.props.children}
            </div>
        );
    }
}
export default NewLeftMenuSub;
