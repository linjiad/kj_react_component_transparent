import React, {Component} from "react";
import "./index.less";

class Tree extends Component {
    constructor(props) {
        super(props);
    }
    // state = {
    //     data:[
    //         {
    //             label:"一级1",
    //             children:[
    //                 {
    //                     label:"二级1",
    //                     children:[
    //                         {
    //                             label:"三级1",
    //                             children:[
    //                                 {
    //                                     label:"四级1",
    //                                     children:[
    //                                         {
    //                                             label:"五级1",
    //                                             children:[
    //                                                 {
    //                                                     label:"六级1",
    //                                                     children:[
    //                                                         {
    //                                                             label:"七级1",
    //                                                         }
    //                                                     ],
    //                                                 }
    //                                             ],
    //                                         }
    //                                     ],
    //                                 }
    //                             ],
    //                         }
    //                     ],
    //                 },
    //                 {
    //                     label:"二级2",
    //                     children:[
    //                         {
    //                             label:"三级2",
    //                             children:[
    //                                 {
    //                                     label:"四级2",
    //                                     children:[
    //                                         {
    //                                             label:"五级2",
    //                                             children:[
    //                                                 {
    //                                                     label:"六级2",
    //                                                     children:[
    //                                                         {
    //                                                             label:"七级2",
    //                                                         }
    //                                                     ],
    //                                                 }
    //                                             ],
    //                                         }
    //                                     ],
    //                                 }
    //                             ],
    //                         }
    //                     ],
    //                 }
    //             ],
    //         },
    //         {
    //             label:"一级2",
    //             children:[
    //                 {
    //                     label:"二级3",
    //                     children:[
    //                         {
    //                             label:"三级3",
    //                         }
    //                     ]
    //                 }
    //             ]
    //         },
    //         {
    //             label:"一级3",
    //             children:[
    //                 {
    //                     label:"二级4",
    //                     children:[
    //                         {
    //                             label:"三级4",
    //                         }
    //                     ]
    //                 }
    //             ]
    //         },
    //         {
    //             label:"一级3",
    //             children:[
    //                 {
    //                     label:"二级4",
    //                     children:[
    //                         {
    //                             label:"三级4",
    //                         }
    //                     ]
    //                 }
    //             ]
    //         },
    //         {
    //             label:"一级3",
    //             children:[
    //                 {
    //                     label:"二级4",
    //                     children:[
    //                         {
    //                             label:"三级4",
    //                         }
    //                     ]
    //                 }
    //             ]
    //         }
    //     ]
    // };
    state = {
        data:[]
    };
    componentDidMount() {
        this.setState({data:this.props.data});
    }
    // 展示菜单的方法，dataList表示数组数据，index表示第几层
    showTree=(dataList,index)=>{
        const divList = [];
        // 循环数组
        dataList.forEach((data,keyIndex)=>{
            // 如果这个单位有children则递归调用
            if(data.children){
                divList.push(
                    <div className="tree" key={keyIndex}>
                        {/*点击，修改展示状态*/}
                        <div className="tree_title" style={{paddingLeft:`${index*5}px`}}
                            onClick={(e)=>{
                                // 如果兄弟节点现在是不显示的就显示
                                if(Object.is(e.target.nextElementSibling.style.display,"none")){
                                    // 把我的+号变成-号
                                    e.target.innerHTML = e.target.innerHTML.replace("+","-");
                                    // 显示兄弟节点
                                    e.target.nextElementSibling.style.display = "";
                                }else{ // 否则就隐藏
                                    e.target.nextElementSibling.style.display = "none";
                                    // 把我的-号变成+号
                                    e.target.innerHTML = e.target.innerHTML.replace("-","+");
                                }
                            }}>
                            {/*如果有下一级显示+号*/}
                            +&nbsp;&nbsp;&nbsp;{`${data.label}`}
                        </div>
                        {/*根据show判断是否展示下一级的*/}
                        <div className="tree_children" style={{display:"none"}}>
                            {/*递归调用，index需要+1证明是下一层*/}
                            {this.showTree(data.children,index+1)}
                        </div>
                    </div>
                );
            }
            else {
                divList.push(
                    <div key={keyIndex}>
                        <div className="tree_title2" style={{paddingLeft:`${index*5}px`}}
                            onClick={(e)=>{
                                // 获取所有title2的样式的,去掉颜色
                                const divList = document.getElementsByClassName("tree_title2");
                                Array.prototype.forEach.call(divList,(item)=> {
                                    item.style.color = "";
                                });
                                e.target.style.color = "#32a7dd";
                                // 点击最底层节点时触发方法
                                this.props.onClick(data);
                            }}>
                            -&nbsp;&nbsp;&nbsp;{data.label}
                        </div>
                    </div>
                );
            }
        });
        return divList;
    }
    render() {
        return(
            <div className="treeMain">
                {this.showTree(this.state.data,1)}
            </div>
        );
    }
}
export default Tree;