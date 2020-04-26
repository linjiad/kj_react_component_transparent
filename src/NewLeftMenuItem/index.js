import React ,{ Component } from "react";
import "./index.less";

class NewLeftMenuItem extends Component {
    // noinspection JSAnnotator
    constructor(props){
        super(props);
    }
    componentDidMount() {
    }
    change = (event) => {
        const list = document.querySelectorAll(".new_left_menu_item");
        list.forEach((item)=>{
            item.style.backgroundColor="transparent";
            item.style.color="#9399b1";
        });
        // 变色
        let div = "";
        if(event.target.parentNode.className.includes("new_left_menu_item")){
            div = event.target.parentNode;
        }else if(event.target.parentNode.parentNode.className.includes("new_left_menu_item")){
            div = event.target.parentNode.parentNode;
        }else if(event.target.parentNode.parentNode.parentNode.className.includes("new_left_menu_item")){
            div = event.target.parentNode.parentNode.parentNode;
        }
        this.props.change(div);
        div.style.backgroundColor=" rgba(21,74,134,0.8)";
        div.style.color=" #ffffff";
        event.stopPropagation();
    }
    render() {
        if(this.props.checked){
            {/*<div className="new_left_menu_item" onClick={this.change} style={{height:"40px",backgroundColor:"rgba(21,74,134,0.8)",color:"#fff" }}>*/}
            return (
                <div className="new_left_menu_item" onClick={this.change} style={{height:"40px",backgroundColor:"rgba(21,74,134,0.8)",color:"#fff" }}>
                    <div style={{paddingLeft:`${this.props.lv*5}%`}}>
                        {this.props.children}
                    </div>
                </div>
            );
        }else {
            {/*<div className="new_left_menu_item" onClick={this.change} style={{height:"40px"}}>*/}
            return (
                <div className="new_left_menu_item" onClick={this.change} style={{height:"40px"}}>
                    <div style={{paddingLeft:`${this.props.lv*5}%`}}>
                        {this.props.children}
                    </div>
                </div>
            );
        }

    }
}
export default NewLeftMenuItem;
