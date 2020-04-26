import React ,{ Component } from "react";
import "./index.less";

class Table extends Component {
    // noinspection JSAnnotator
    constructor(props){
        super(props);
    }
    state = {
        columns:this.props.columns,
        data:this.props.data,
        tableName:this.props.tableName,
        pageNum:0,
        pageSize:0
    };
    componentDidMount() {
        if(this.props.pageNum){
            this.setState({pageNum:this.props.pageNum});
        }
        if(this.props.pageSize){
            this.setState({pageSize:this.props.pageSize});
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.data){
            this.setState({data:nextProps.data});
        }
        if(nextProps.columns){
            this.setState({columns:nextProps.columns});
        }
        if(nextProps.pageNum){
            this.setState({pageNum:nextProps.pageNum});
        }
        if(nextProps.pageSize){
            this.setState({pageSize:nextProps.pageSize});
        }
    }
    render() {
        if(this.state.data.length > 0){
            return (
                <div className="my_table_main">
                    <div className="my_table_top">
                        <div className="my_table_top_title"> {this.state.tableName}</div>
                    </div>
                    <div className="my_table_box">
                        <table className="my_altrows_table">
                            <tbody>
                                <tr>
                                    {
                                        (this.state.pageNum)?<th style={{width:"8%"}} >序号</th>:null
                                    }
                                    {
                                        this.state.columns.map((item,index)=> {
                                            return (
                                                <th style={{width:item.width}}  key={index}>{item.title}</th>
                                            );
                                        })
                                    }
                                </tr>
                                {
                                    this.state.data.map((item,index)=> {
                                        return (
                                            <tr key={index}>
                                                {
                                                    (this.state.pageNum)?<td title={(this.state.pageSize)*(this.state.pageNum - 1)+index+1}>{(this.state.pageSize)*(this.state.pageNum -1 )+index+1}</td>:null
                                                }
                                                {
                                                    this.state.columns.map((item2,index2)=> {
                                                        if(Object.is(item2.dataIndex,"action")){
                                                            class Operation extends Component {
                                                                constructor(props){
                                                                    super(props);
                                                                }
                                                            state = {
                                                                data:item2,
                                                            };
                                                            render() {
                                                                return item2.render(item,index);
                                                            }
                                                            }
                                                            return <td key={index2}><Operation/></td>;
                                                        }else {
                                                            return (
                                                                <td key={index2} title={item[item2.dataIndex]}>{item[item2.dataIndex]}</td>
                                                            );
                                                        }
                                                    })
                                                }
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
        else {
            return(
                <div className="my_table_main">
                    <div className="my_table_top">
                        <div className="my_table_top_title"> {this.state.tableName}</div>
                    </div>
                    <div className="my_table_nodata">
                        <i className={"iconfont iconwushuju"} style={{fontSize:"40px"}}></i>
                        <br/>
                    暂无数据
                    </div>
                </div>
            );
        }
    }
}
export default Table;
