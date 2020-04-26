// eslint-disable-next-line
import React ,{ Component } from "react";
import "./leftMenuItem.less";
import leftSideMenu from "../leftSideMenu/leftMenu";

class leftSideMenuItem extends Component {
    // noinspection JSAnnotator
    constructor(props){
        super(props);
    }
    state = {
    };

    componentDidMount() {}
    changethis = (event) => {
        // 如果class包含left_menu_item,来判断父节点
        let div = "";
        if(event.target.className.includes("left_menu_item")){
            div = event.target;
        }else{
            div = event.target.parentNode;
        }
        // 变色的二级菜单
        const list = document.querySelectorAll(".left_menu_item");
        list.forEach((item)=>{
            item.style.backgroundColor="transparent";
            item.style.color="#9399b1";
        });
        // 变色的一级菜单
        const list1 = document.querySelectorAll(".left_menu_sub_title");
        list1.forEach((item)=>{
            item.style.backgroundColor="transparent";
        /*item.style.color="#9399b1";*/
        });
        // 变色父节点的菜单
        div.parentNode.childNodes[0].style.backgroundColor="rgba(21,74,134,0.8)";
        div.style.color="#FFFFFF";
    }
    render() {
        return (
            <div className="left_menu_item" onClick={this.changethis}>
                {this.props.children}
            </div>
        );
    }
}
export default leftSideMenuItem;
