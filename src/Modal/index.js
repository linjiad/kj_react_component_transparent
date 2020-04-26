// eslint-disable-next-line
import React ,{ Component } from "react";
import "./index.less";

class Modal extends Component {
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
        console.log(this.state.disaplay);
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.disaplay){
            this.openModel();
        }else if(!nextProps.disaplay){
            this.closeModel();
        }
    }
    // 打开弹出页面方法=blur("10px")
    openModel = ()=>{
        this.setState({disaplay:true});
        // document.getElementById("root").style.WebkitFilter = "blur(10px)";
    }
    // 关闭弹出页面方法
    closeModel = ()=>{
        this.setState({disaplay:false});
    }
  // 关闭弹出页面方法
  closeByMe = ()=>{
      this.props.closeModel(false);
  }
  render() {
      if(this.state.disaplay){
          return (
              <div className="my_modal_main">
                  <div className="modal_back" ref="inputRef"
                      style={{height:window.screen.height + window.screenTop }}
                  ></div>
                  <div className="moadl_main" style={{width:this.state.width,
                      height:this.state.height, top:this.state.top, left:this.state.left,
                      bottom:this.state.bottom,}}>
                      <div className="moadl_title">
                          <div className="moadl_title_name">
                              {this.state.title}
                          </div>
                          <div className="moadl_title_close" onClick={this.closeByMe}>
                              <i className={`iconfont iconguanbi1`} ></i>
                          </div>
                      </div>
                      <div className="moadl_content">
                          {this.props.children}
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
export default Modal;
