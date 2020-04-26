// eslint-disable-next-line
import React ,{ Component } from "react";
import "./index.less";
class UploadFile extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        if(this.props.filename){
            this.setState({upliadName:this.props.filename});
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.filename){
            this.setState({upliadName:nextProps.filename});
        }
    }
    state = {
        url:this.props.uploadUrl,
        upliadName:"请上传文件",
    };
    upload2=(event)=>{
        // 获取名称
        const name= event.target.files[0].name;
        // 获取扩展名
        const type = name.split(".").pop();
        // 如果验证通过
        if(this.props.typeList.includes(type)){
            const form = new FormData();
            form.append("file", event.target.files[0]);
            // form.append("directory", "analysis");
            // 特殊处理以后去掉
            // form.append("type", this.props.type);
            if(this.props.type && this.props.type.length >0){
                this.props.type.forEach((item)=>{
                    Object.keys(item).forEach(key => {
                        form.append(key,item[key]);
                    });
                });
            }
            this.refs.jindu.style.width = `0%`;
            this.setState({upliadName:`努力上传中`});
            this.uploadFilePost(this.state.url,form)
                .then((resultJson) => {
                    if(resultJson){
                        this.setState({upliadName:name});
                        // this.setState({upliadName:`${resultJson.data.originalName}.${resultJson.data.type}`});
                        this.props.success(resultJson);
                    }
                }).catch((errMsg) => {
                    this.setState({upliadName:`请上传文件`});
                    this.refs.jindu.style.width = `0%`;
                    this.props.error(errMsg);
                });
        }
        else {
            this.props.error(name);
            return false;
        }
    }
    upload=()=>{
        this.refs.uploadFile.click();
    }
    uploadFilePost=(url, prom)=> {
        const self = this;
        const promise = new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("post", `${url.url}`, true);
            xhr.ontimeout = () => {
                console.error("请求已超时");
                xhr.abort();
            };
            xhr.upload.onprogress = (e)=>{
                self.showjindu(e.loaded,e.total);
            };
            xhr.onreadystatechange = () => {
                const { readyState: state } = xhr;
                if (state === 2) {
                    // console.log(xhr.getAllResponseHeaders(), new Date(xhr.getResponseHeader("data")));
                    return;
                }
                if (state === 4) {
                    try {
                        if(JSON.parse(xhr.response).code === 1){
                            resolve(xhr.responseText);
                        }else if ((JSON.parse(xhr.response).code === 50002)){
                            reject(JSON.parse(xhr.response).msg);
                        }
                        else if ((JSON.parse(xhr.response).code === 200)){
                            resolve(xhr.response);
                        }
                    } catch (e) {
                        reject(e);
                    }
                }
            };
            xhr.send(prom);
        });
        return promise;
    }
    showjindu=(loaded,total)=>{
        this.refs.jindu.style.width = `${(loaded/total)*100}%`;
    }
    render() {
        return (
            <div className = "my_upload_file_main">
                <button type="button" value="上传" onClick={this.upload} className="addsbtn"
                    style={{width:"100%",cursor:"pointer",overflow:"hidden"}}>
                    {this.state.upliadName}
                    <input type="file" style={{display: "none"}} ref="uploadFile" onChange={this.upload2}/>
                </button>
                <div className="upload_file_show">
                    <div className="upload_file_jindu" ref="jindu" ></div>
                </div>
            </div>
        );
    }
}
export default UploadFile;
