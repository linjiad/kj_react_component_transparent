// eslint-disable-next-line
import React ,{ Component } from "react";
import "./index.less";

class NewLeftMenu extends Component {
    // noinspection JSAnnotator
    constructor(props){
        super(props);
    // this.props.children.forEach((item,index)=>{
    //   console.dir(item.props.children);
    //   if((item.props.children.length>0)){
    //     item.props.children.forEach((item2,index2)=>{
    //       console.dir(item2.props.children);
    //       if((item2.props.children.length>0)){
    //         item2.props.children.forEach((item3,index3)=>{
    //           console.dir(item3.props.children);
    //         });
    //       }
    //     });
    //   }
    // });
    // this.props.children["lv"]=1;
    }
    componentDidMount() {}
    change = (event) => {
    }
    render() {
        return (
            <div className="new_left_menu" data-open={this.props.OPEN}>
                {this.props.children}
            </div>
        );
    }
}
export default NewLeftMenu;
