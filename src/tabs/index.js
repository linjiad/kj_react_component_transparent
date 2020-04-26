// eslint-disable-next-line
import React ,{ Component } from "react";
import "./index.less";
class Tabs extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        const list = [];
        this.props.children.forEach((item)=>{
            list.push(
                {
                    "title":item.props.tab,
                    "name":item.props.name,
                    "key": item.key
                }
            );
        });
        this.setState({titleList:list});
        this.refs.tabs.childNodes.forEach((item,index)=>{
            if(index !== 0 && index !== 1){
                item.style.display = "none";
            }
        });
        if(this.refs.tabs.childNodes[0].childNodes.length>0){
            this.refs.tabs.childNodes[0].childNodes[0].style.cssText = "border-bottom: #32a7dd 3px solid;";
        }
    }
    componentDidUpdate(nextProps) {
        if (nextProps) {
            if(this.refs.tabs.childNodes[0].childNodes.length>0){
                this.refs.tabs.childNodes[0].childNodes[0].style.cssText = "border-bottom: #32a7dd 3px solid;";
            }
        }
    }
    state = {
        titleList : [],
    };
    change = (key,title,name)=>{
        this.refs.tabs.childNodes.forEach((item,index)=>{
            if(index !== 0){
                item.style.display = "none";
            }else {
                item.childNodes.forEach((item2,index2)=>{
                    if(Object.is(item2.innerHTML,name)){
                        item2.style.cssText = "border-bottom: #32a7dd 3px solid;";
                    }else {
                        item2.style.borderBottom = "";
                    }
                });
            }
            if(Object.is(item.id,title)){
                item.style.display = "";
            }
        });
        this.props.onChange(title,name);
    }
    render() {
        return (
            <div ref="tabs" className="my_tabs_main">
                <div className="tabs_title_list">
                    {this.state.titleList.map((item)=>{
                        return (
                            <div className="tabs_title" onClick={this.change.bind(this,item.key,item.title,item.name)} key={item.key}>{item.name}</div>
                        );
                    })}
                </div>
                {this.props.children}
            </div>
        );
    }
}
export default Tabs;
