// eslint-disable-next-line
import React ,{ Component } from "react";
import "./index.less";

class MyTransfer extends Component {
    // noinspection JSAnnotator
    constructor(props){
        super(props);
    }
    state = {
        leftSeach:"",
        rightSeach:"",
        leftList: [],
        rightList: [],
    };

    componentDidMount() {
        this.setState({leftList:this.props.leftList,rightList:this.props.rightList});
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.leftList){
            this.setState({leftList:nextProps.leftList});
        }
        if(nextProps.rightList){
            this.setState({rightList:nextProps.rightList});
        }
    }
    add = () => {
        // 获取所有左侧的input
        const list = document.getElementsByName("left");
        // 定义一个左侧菜单
        const leftList = this.state.leftList;
        // 定义一个右侧菜单
        const rightList = this.state.rightList;
        list.forEach((item,index)=>{
            // 如果选中的话就把这个加到右侧
            if(item.checked){
                // 循环左侧菜单的值
                leftList.forEach((item2,index2)=>{
                    // 如果id相同则在左侧删除右侧添加
                    if(Object.is(item.id,item2.id)){
                        // 左侧删除
                        leftList.splice(index2,1);
                        // 右侧添加
                        rightList.push(item2);
                    }
                });
                // 把选择框变成未选择
                item.checked = false;
            }
        });
        this.props.onChange({leftList, rightList});
    }
    reduce = ()=>{
        // 获取所有左侧的input
        const list = document.getElementsByName("right");
        // 定义一个左侧菜单
        const leftList = this.state.leftList;
        // 定义一个右侧菜单
        const rightList = this.state.rightList;
        list.forEach((item,index)=>{
            // 如果选中的话就把这个加到左侧
            if(item.checked){
                // 循环右侧菜单的值
                rightList.forEach((item2,index2)=>{
                    // 如果id相同则在右侧删除左侧添加
                    if(Object.is(item.id,item2.id)){
                        // 右侧删除
                        rightList.splice(index2,1);
                        // 左侧添加
                        leftList.push(item2);
                    }
                });
                // 把选择框变成未选择
                item.checked = false;
            }
        });
        this.props.onChange({leftList, rightList});
    }
    leftChange = (event) => {
        this.setState({leftSeach:event.target.value});
    }
    rightChange = (event) => {
        this.setState({rightSeach:event.target.value});
    }
    render() {
        return (
            <div className="my_transfer_main">
                <div className="my_transfer_left">
                    <div className="my_transfer_left_title" >
                        <input type="search" className="my_transfer_search" placeholder="请输入关键字" onChange={this.leftChange} value={this.state.leftSeach}/>
                    </div>
                    <div className="my_transfer_left_main">
                        <ul>
                            {
                                this.state.leftList.map((item,index)=>{
                                    // 如果包含搜索的关键字才显示
                                    if(item.name.indexOf(this.state.leftSeach) !== -1){
                                        return (
                                            <li key={index}>
                                                <input className="my_transfer_checkbox" type="checkbox" title={item.name} required name="left" id={item.id}/>
                                                <div className="my_transfer_left_name" >{item.name}</div>
                                            </li>
                                        );
                                    }

                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className="my_transfer_mid">
                    <div>
                        <div onClick={this.add.bind(this)}>
                            ＞ 添加 ＞
                        </div>
                        <div onClick={this.reduce.bind(this)}>
                            ＜ 减少 ＜
                        </div>
                    </div>
                </div>
                <div className="my_transfer_right">
                    <div className="my_transfer_right_title">
                        <input type="search" className="my_transfer_search" placeholder="请输入关键字" onChange={this.rightChange} value={this.state.rightSeach}/>
                    </div>
                    <div className="my_transfer_right_main">
                        <ul>
                            {
                                this.state.rightList.map((item,index)=>{
                                    // 如果包含搜索的关键字才显示
                                    if(item.name.indexOf(this.state.rightSeach) !== -1){
                                        return (
                                            <li key={index}>
                                                <input className="my_transfer_checkbox" type="checkbox" title={item.name} required name="right" id={item.id}/>
                                                <div className="my_transfer_right_name" >{item.name}</div>
                                            </li>
                                        );
                                    }

                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
export default MyTransfer;
