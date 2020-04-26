// eslint-disable-next-line
import React ,{ Component } from "react";
import "./index.less";

class Loading extends Component {
    constructor(props){
        super(props);
    }
    state = {
        disaplay : this.props.disaplay,
        width: `${this.props.width}vw`,
        height:`${(this.props.height)*1.2}vh`,
        top:`${(100-this.props.height)/4}vh`,
        left:`${(100-this.props.width)/2}vw`,
        bottom:`${(100-this.props.width)/2}vh`,
        title:this.props.title,
        // type:0,// 弹出层状态（0，表示初始状态外部可以打开）
    };

    componentDidMount() {
        this.setState({disaplay:this.props.disaplay});
    }
    componentWillReceiveProps(nextProps) {
        this.setState({disaplay:nextProps.disaplay});
    }
    render() {
        if(this.state.disaplay){
            return (
                <div className="my_loading_main">
                    <div className="modal_loading_back" ref="inputRef"
                        style={{height:window.screen.height + window.screenTop }}>
                        <div className= "loadingBox ">
                            <div className="sk-double-bounce">
                                <div className="sk-child sk-double-bounce-1"></div>
                                <div className="sk-child sk-double-bounce-2"></div>
                            </div>
                            LOADING.....
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return null;
        }

    }
}
export default Loading;
