// eslint-disable-next-line
import React ,{ Component } from "react";
import "../static/icon/iconfont.css";
class Icon extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.type){
            this.setState({type:nextProps.type});
        }
        if(nextProps.size){
            this.setState({size:nextProps.size});
        }
        if(nextProps.colour){
            this.setState({colour:nextProps.colour});
        }
    }
    state = {
        type: this.props.type?this.props.type:"iconxitongmokuai",
        size:this.props.size?this.props.size:"18px",
        colour:this.props.colour?this.props.colour:"#fff",
    };
    render() {
        return (
            <i className={"iconfont " + this.state.type} style={{fontSize:this.state.size,color:this.state.colour}}></i>
        );
    }
}
export default Icon;
