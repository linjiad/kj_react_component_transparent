// eslint-disable-next-line
import React ,{ Component } from "react";
import "./index.less";
class Paging extends Component {
    constructor(props){
        super(props);
    }
    state = {
        total:this.props.total,
        pageNum:this.props.pageNum,
        pageSize:this.props.pageSize,
        res : [],
    };
    componentWillReceiveProps(nextProps) {
        // if(nextProps.pageNum){
        //     this.getData();
        // }
        this.setState({pageNum:nextProps.pageNum,pageSize:nextProps.pageSize,total:nextProps.total},()=>{
            this.getData();
        });
    }
    getData = () => {
        const countNum = Math.ceil(this.props.total/this.props.pageSize);
        this.state.res = [];
        let left = true;
        let right = true;
        for(let i = 1;i<=countNum; ++i ) {
            if( ((this.state.pageNum - 3) < i) && (i <  (this.state.pageNum + 3))){
                if( i === this.state.pageNum){
                    this.state.res.push(<li key={i}><a className="active">{i}</a></li>);
                }else {
                    this.state.res.push(<li key={i}><a>{i}</a></li>);
                }
            }else if(i === 1){
                this.state.res.push(<li key={i}><a>1</a></li>);
            }else if(  i === countNum){
                this.state.res.push(<li key={i}><a>{countNum}</a></li>);
            }else if( i <  this.state.pageNum - 3 ){
                if(left){
                    left = false;
                    this.state.res.push( <li key={i}><i>...</i></li>);
                }
            }else if( i >  this.state.pageNum + 3 ){
                if(right){
                    right = false;
                    this.state.res.push( <li key={i}><i>...</i></li>);
                }
            }
        }
        this.forceUpdate();
    }
    turnPage = (event) => {
        const countNum = Math.ceil(this.props.total/this.props.pageSize);
        if(Object.is(event.target.className,"leftborder")){
            if(this.state.pageNum > 1){
                const num = --this.state.pageNum;
                this.state.pageNum = num;
            }
        }else if (Object.is(event.target.className,"rightborder")){
            if(this.state.pageNum < countNum){
                const num = ++this.state.pageNum;
                this.state.pageNum = num;
            }
        }else if (event.target.innerText.includes("...")){
            return false;
        }
        else {
            this.state.pageNum = parseInt(event.target.innerText);
        }
        this.getData();
        const data = {
            pageNum : this.state.pageNum,
            pageSize:this.props.pageSize,
        };
        this.props.onChange(data);
        // this.props.onChange(this.state.pageNum);
    }
    componentDidMount() {
        this.getData();
    }
    onChange1 = (event) =>{
        if(0<event.target.value && event.target.value<(this.state.total/this.state.pageSize+1)){
            this.setState({pageNum:parseInt(event.target.value,10)},()=>{
                const data = {
                    pageNum : parseInt(this.state.pageNum,10),
                    pageSize: parseInt(this.state.pageSize,10),
                };
                this.props.onChange(data);
            });
        }
    }
    onChange2 = (event) =>{
        console.log(event.target.value);
        // 重新分页需要跳转至第一页
        if(0<event.target.value && event.target.value<=this.state.total && event.target.value!==this.state.pageSize) {
            this.setState({pageSize:parseInt(event.target.value,10)},()=>{
                const data = {
                    pageNum: 1,
                    pageSize: parseInt(this.state.pageSize,10),
                };
                this.props.onChange(data);
            });
        }
    }
    render() {
        if(this.state.total !==0){
            return (
                <div className="my_pagingBox">
                    <div className="my_pagingTotal" style={{marginLeft: "20px"}}>跳转:
                        <input  type="number" className="paging_my_input"
                            value={this.state.pageNum} onBlur={this.onChange1} onChange={this.onChange1}
                        />页</div>
                    <ul className="pagination" onClick={this.turnPage}>
                        <li><a className="leftborder">«</a></li>
                        { this.state.res }
                        <li><a className="rightborder">»</a></li>
                    </ul>
                    <div className="my_pagingTotal">每页:
                        <input  type="number" className="paging_my_input"
                            value={this.state.pageSize} onBlur={this.onChange2} onChange={this.onChange2}
                        />条</div>
                    <div className="my_pagingTotal">
                        总条数:{this.state.total}</div>
                </div>
            );
        }else{
            return null;
        }
    }
}
export default Paging;
