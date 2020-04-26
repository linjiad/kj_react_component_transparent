// eslint-disable-next-line
import React ,{ Component } from "react";
import "./leftSubMenu.less";
import leftSideMenu from "../leftSideMenu/leftMenu";

class leftSideSubMenu extends Component {
    // noinspection JSAnnotator
    constructor(props){
        super(props);
    }
    state = {
    };

    componentDidMount() {}
    showItem = (event) => {
        const div = event.target.parentNode;
        // 变色的一级菜单
        const list1 = document.querySelectorAll(".left_menu_sub_title");
        list1.forEach((item)=>{
            item.style.backgroundColor="transparent";
        });
        // 把其他变色的变回来
        // 变色的二级菜单
        const list = document.querySelectorAll(".left_menu_item");
        list.forEach((item)=>{
            item.style.backgroundColor="transparent";
            item.style.color="#9399b1";
        });
        // 变色
        event.target.style.backgroundColor="rgba(21,74,134,0.8)";
        // 如果有下一级
        if(div.childNodes.length>1){
            if(div.childNodes[1].style.height && !Object.is(div.childNodes[1].style.height,"0px")){
                div.childNodes.forEach((item)=>{
                    if(item.className.includes("left_menu_item")){
                        item.classList.remove("showmenu1");
                        item.classList.add("hiddenmenu1");
                        item.style.height="0px";
                    }
                });
            }
            else{
                div.childNodes.forEach((item)=>{
                    if(item.className.includes("left_menu_item")){
                        item.classList.remove("hiddenmenu1");
                        item.classList.add("showmenu1");
                        item.style.height="37px";
                    }
                });
            }
            // 选中第一项变色
            div.childNodes[1].style.color="#FFFFFF";
        }
        // 如果没有下一级,直接变色
        if(this.props.onClick){
            this.props.onClick(event);
        }
    }
    render() {
        return (
            <div className="left_menu_sub">
                <div className="left_menu_sub_title" onClick={this.showItem}>{this.props.title}</div>
                {this.props.children}
            </div>
        );
    }
}
export default leftSideSubMenu;
