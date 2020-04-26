import React, {Component} from "react";
import "./index.less";
import sd from "silly-datetime";
class DataPicker extends Component {
    // noinspection JSAnnotator
    constructor(props) {
        super(props);
    }

    state = {
        value: this.props.value?this.props.value:sd.format(new Date(), "YYYY-MM-DD"),
        year:sd.format(this.props.value, "YYYY")?sd.format(this.props.value, "YYYY"):1990,
        month:sd.format(this.props.value, "MM")?sd.format(this.props.value, "MM"):1,
        day:sd.format(this.props.value, "DD")?sd.format(this.props.value, "DD"):1,
        choseDate:this.props.value?this.props.value:sd.format(new Date(), "YYYY-MM-DD"),// 当前选中的时间
        yearStart:1990,
        yearEnd:2100,
        monthList:[1,2,3,4,5,6,7,8,9,10,11,12],
        dayMaxList:[31,28,31,30,31,30,31,31,30,31,30,31],
        dayMaxList2:[31,29,31,30,31,30,31,31,30,31,30,31],
        dayList:[],
        hour:sd.format(this.props.value, "HH")?sd.format(this.props.value, "HH"):1,
        minite:sd.format(this.props.value, "mm")?sd.format(this.props.value, "mm"):1,
        actualDate:"",// 实际的时间
        showDate:false,// 是否展示
        showTime:this.props.showTime?this.props.showTime:false,// 是否展示时间
    };
    // 根据父组件的值初始化
    init = (data) => {
        this.setState({
            // value: data?data:sd.format(new Date(), "YYYY-MM-DD"),
            value: data,
            year:sd.format(data, "YYYY")?parseInt(sd.format(data, "YYYY"),10):1990,
            month:sd.format(data, "MM")?parseInt(sd.format(data, "MM"),10):1,
            day:sd.format(data, "DD")?parseInt(sd.format(data, "DD"),10):1,
            choseDate:data?data:sd.format(new Date(), "YYYY-MM-DD"),// 当前选中的时间
            hour:sd.format(data, "HH")?parseInt(sd.format(data, "HH"),10):1,
            minite:sd.format(data, "mm")?parseInt(sd.format(data, "mm"),10):1,
        },()=>{
            // 展示日期
            this.getDateList(data);
        });
    };
    componentDidMount() {
        this.init(this.props.value);
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.value){
            // 如果值改变了
            if(!Object.is(nextProps.value,this.state.value)){
                this.init(nextProps.value);
            }
        }
    }
    // 跳转至今天
    getNow = () =>{
        this.setState({
            choseDate:sd.format(new Date(), "YYYY-MM-DD"),
            year:parseInt(sd.format(new Date(), "YYYY"),10),
            month:parseInt(sd.format(new Date(), "MM"),10),
            day:parseInt(sd.format(new Date(), "DD"),10),
        },()=>this.getShowDate());
    }
    // 获取当前展示的月份时间(每次改变月份和年份都调用此方法)
    getShowDate = () =>{
        const showDate = `${this.state.year}-${this.state.month}-01`;
        this.getDateList(showDate);
    }
    // 获取年份集合
    getYearList = ()=>{
        const optins = [];
        for(let i=this.state.yearStart;i<=this.state.yearEnd;i++){
            optins.push(<option key={i} value={i}>{i}</option>);
        }
        return optins;
    }
    // 获取时集合
    getHourList = ()=>{
        const optins = [];
        for(let i=0;i<=23;i++){
            optins.push(<option key={i} value={i}>{i}</option>);
        }
        return optins;
    }
    // 获取分集合
    getMiniteList = ()=>{
        const optins = [];
        for(let i=0;i<=59;i++){
            optins.push(<option key={i} value={i}>{i}</option>);
        }
        return optins;
    }
    // 根据年和月份获取date列表分布
    getDateList = (date)=>{
        // 获取年是否闰年
        const year = parseInt(sd.format(date, "YYYY"),10);
        // 获取月份最大天数列表(能被4整除且不能被100整除的为闰年)
        const dayMaxList = (year % 4 === 0 && year % 100 !== 0)?this.state.dayMaxList2:this.state.dayMaxList;
        // 获取月份
        const month = parseInt(sd.format(date, "MM"),10);
        // 获取日
        const day = parseInt(sd.format(date, "DD"),10);
        // 获取这个月有多少天
        const dayMax = dayMaxList[month - 1];
        // 获取上个月有多少天(如果是1月上个月就是12月)
        let dayMaxLast = dayMaxList[(month === 1)?11:month - 2];
        // 获取上个月是哪年月（如果这个月是1月就证明是去年的12月）
        const yearAndMonthLast = (month === 1)?`${year-1}-12`:`${year}-${month-1}`;
        // 获取下个月是哪年月（如果这个月是12月就证明是明年的1月）
        const yearAndMonthNext = (month === 12)?`${year+1}-1`:`${year}-${month+1}`;
        // 获取这个月1号从星期几开始的(0是周日)
        // 星期几开始前面就有几天
        const num = new Date(`${year}-${month}-01`).getDay(new Date(`${year}-${month}-01`));
        // 定义
        const dayList = [];
        // 循环这个星期几之前的
        for(let i = num;i>0;i--){
            dayList[i-1] = {
                type:"last", // 上个月的标记字段
                date:`${yearAndMonthLast}-${dayMaxLast}`,// 值
                value:dayMaxLast// 日期
            };
            // 相应的最大天数也需要-1
            dayMaxLast = dayMaxLast - 1;
        }
        // 循环这个月的
        for(let i = 0;i <= dayMax;i++){
            dayList[i+num] = {
                type:(Object.is(sd.format(`${year}-${month}-${i + 1}`, "YYYY-MM-DD"),sd.format(this.state.choseDate, "YYYY-MM-DD")))?"thisDay":"this", // 这个月的标记字段
                value:i+1,// 值
                date:`${year}-${month}-${i + 1}`,// 值
            };
        }
        // 循环获取下个月的
        // 目前的位置
        const length = dayList.length - 1;
        // 循环到41
        for(let i = length;i <= 41;i++){
            dayList[i] = {
                type:"next", // 上个月的标记字段
                value:i + 1 - length,// 值
                date:`${yearAndMonthNext}-${i + 1 - length}`,// 值
            };
        }
        this.setState({dayList});
    }
    // 选择日期
    chose = (date)=>{
        this.setState({
            choseDate:date,
            year:parseInt(sd.format(date, "YYYY"),10),
            month:parseInt(sd.format(date, "MM"),10),
            day:parseInt(sd.format(date, "DD"),10),
        },()=>this.getShowDate());
    }
    // 显示隐藏
    showOrHide = ()=>{
        if(this.state.showDate){
            return(
                <div className="show_date">
                    <div className="show_date_title">
                        {/*展示日期*/}
                        <div className="show_date_title_world">
                            <div onClick={()=>this.setState({year:(this.state.yearStart !== this.state.year)?(this.state.year - 1):this.state.year},()=>{this.getShowDate();})}>
                                <i className="iconfont iconjiantouarrow3" style={{fontSize:"14px",color:"#fff"}}></i></div>
                            <div onClick={()=>this.setState({month:(1 !== this.state.month)?(this.state.month - 1):this.state.month},()=>{this.getShowDate();})}>
                                <i className="iconfont iconjiantouarrow2" style={{fontSize:"14px",color:"#fff"}}></i></div>
                            <select value={this.state.year}
                                className="my_select"
                                onBlur={(event)=>this.setState({year:parseInt(event.target.value,10)},()=>{this.getShowDate();})}
                                onChange={(event)=>this.setState({year:parseInt(event.target.value,10)},()=>{this.getShowDate();})}>
                                {this.getYearList()}
                            </select>
                            年
                            <select value={this.state.month}
                                className="my_select"
                                onBlur={(event)=>this.setState({month:parseInt(event.target.value,10)},()=>{this.getShowDate();})}
                                onChange={(event)=>this.setState({month:parseInt(event.target.value,10)},()=>{this.getShowDate();})}>
                                {
                                    this.state.monthList.map((item,index)=>{
                                        return(
                                            <option value={item} key={index}>{item}</option>
                                        );
                                    })
                                }
                            </select>
                            月
                            <div onClick={()=>this.setState({month:(12 !== this.state.month)?(this.state.month + 1):this.state.month},()=>{this.getShowDate();})}>
                                <i className="iconfont iconjiantouarrow1" style={{fontSize:"14px",color:"#fff"}}></i>
                            </div>
                            <div onClick={()=>this.setState({year:(this.state.yearEnd !== this.state.year)?(this.state.year + 1):this.state.year},()=>{this.getShowDate();})}>
                                <i className="iconfont iconjiantouarrow4" style={{fontSize:"14px",color:"#fff"}}></i>
                            </div>
                        </div>
                        {/*按钮*/}
                        <div className="show_date_title_button">
                            <div onClick={()=>this.getNow()} className="myBtn-small">今天</div>
                        </div>
                    </div>
                    <div className="show_date_title2">
                        <div>日</div>
                        <div>一</div>
                        <div>二</div>
                        <div>三</div>
                        <div>四</div>
                        <div>五</div>
                        <div>六</div>
                    </div>
                    <div className="show_date_main">
                        {
                            this.state.dayList.map((item,index)=>{
                                return(
                                    <div key={index} className={`${(Object.is(item.type,"this"))?"thisMouth":""} ${(Object.is(item.type,"thisDay"))?"thisDay":""}`}
                                        onClick={this.chose.bind(this,item.date)}>{item.value}</div>
                                );
                            })
                        }
                    </div>
                    {
                        this.state.showTime?(
                            <div className="show_date_time">
                                <div className="show_date_time_word">时间:</div>
                                <div className="show_date_chose_time">
                                    <select value={this.state.hour} defaultValue={this.state.hour}
                                        className="my_select"
                                        onBlur={(event)=>this.setState({hour:parseInt(event.target.value,10)})}
                                        onChange={(event)=>this.setState({hour:parseInt(event.target.value,10)})}>
                                        {this.getHourList()}
                                    </select>
                                    <span style={{marginLeft:"10px",marginRight:"10px"}}>:</span>
                                    <select value={this.state.minite} defaultValue={this.state.minite}
                                        className="my_select"
                                        onBlur={(event)=>this.setState({minite:parseInt(event.target.value,10)})}
                                        onChange={(event)=>this.setState({minite:parseInt(event.target.value,10)})}>
                                        {this.getMiniteList()}
                                    </select>
                                </div>
                                <div className="show_date_time_word2"><span onClick={()=>this.choseActualDate()}>确定</span></div>
                                <div className="show_date_time_word2"><span onClick={()=>this.setState({showDate:false,choseDate:sd.format(this.state.value, "YYYY-MM-DD")},()=>this.init(this.state.value))}>取消</span></div>
                            </div>
                        ):(
                            <div className="show_date_time">
                                <div className="show_date_time_word2"><span onClick={()=>this.choseActualDate()}>确定</span></div>
                                <div className="show_date_time_word2"><span onClick={()=>this.setState({showDate:false,choseDate:sd.format(this.state.value, "YYYY-MM-DD")},()=>this.init(this.state.value))}>取消</span></div>
                            </div>
                        )
                    }
                </div>
            );
        }
    }
    // 点击确定选择时间
    choseActualDate = ()=>{
        const date = this.state.showTime?`${sd.format(this.state.choseDate, "YYYY-MM-DD")} ${this.state.hour}:${this.state.minite}:00`:sd.format(`${this.state.choseDate}`, "YYYY-MM-DD");
        this.setState({showDate:false,value:date});
        // 调用给父组件方法
        this.props.onChange(this.state.showTime?`${sd.format(date, "YYYY-MM-DD HH:mm:ss")}`:`${sd.format(date, "YYYY-MM-DD")}`);

    }
    render() {
        return (
            <div style={{display:"flex"}} className="my_date_picker_new">
                <div style={{width:"85px",fontSize:"14px"}}>{this.props.title}</div>
                <div className="my_date_picker_main">
                    {/*输入框*/}
                    <input placeholder="请输入日期时间" type="value" value={this.state.value} readOnly="readonly" onChange={this.onChange}
                        onClick={()=>(this.state.showDate)?(this.setState({showDate:false,choseDate:sd.format(this.state.value, "YYYY-MM-DD")},()=>this.init(this.state.value))):(this.setState({showDate:true}))}
                        className="my_date_picker_input"/>
                    <i className="iconfont iconguanbi1" style={{fontSize:"14px",lineHeight:"30px", cursor:"pointer",marginLeft:"-35px"}}
                        onClick={()=>this.setState({value:""},()=>this.props.onChange(""))}></i>
                    {this.showOrHide()}
                </div>
            </div>
        );
    }
}

export default DataPicker;
