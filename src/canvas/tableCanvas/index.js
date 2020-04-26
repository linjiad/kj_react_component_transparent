class TableCanvas {
    constructor(ctx, leftWidth, topHeight) {
        this.ctx = ctx;
        // 画布宽度
        this.width = this.ctx.canvas.width;
        // 画布高度
        this.height = this.ctx.canvas.height;
        // 画布距左边距
        this.canvasLeftWidth = leftWidth;
        //画布距上边距
        this.canvasTopHeight = topHeight;
        // 区分拖拽和点击的参数
        this.timeOutEvent = 0;
        // 图形list
        this.tatleList = [];
        // 关系list
        this.relationshipList = [];
        // 控制频率
        this.runTime = 50;
        this.run = false;
        this.runFun = "";
        // 记录连线的点
        this.linePort = {
            start:{
                x:"",
                y:""
            },
            end:{
                x:"",
                y:""
            }
        };
        this.init();
    }
    // 初始化画布方法
    init() {
        // 监听鼠标点击
        this.mouseDown();
        this.getCanvasByData();
        // 监听删除方法
        this.delete();
    }
    // 初始化线方法
    getlineList(lineList){
        this.relationshipList = lineList;
        this.getCanvasByData();
    }
    // 创建表并且添加一些属性
    getTable(data,index){
        // 有表头需要多添加一列
        const column = data.list.length + 2;
        const row = (data.info.length === 0)?2:data.info.length;
        // 默认开始未被选中(如果是已经选择过的就保持)
        data.chose = data.chose?data.chose:false;
        // 有表头需要多添加一列
        data.height = column * data.every.height;
        // 整个表格的宽度
        data.width =  row * data.every.width;
        // 表的四个始点
        data.part = {
            // 起始点x坐标
            sx:data.center.x - (data.width / 2),
            // 终点x坐标
            ex:data.center.x + (data.width / 2),
            // 起点y坐标
            sy:data.center.y - (data.every.height / 2),
            // 终点y坐标
            ey:data.center.y + (data.every.height/ 2 + (column-1)*data.every.height),
        };
        // 可拖拽范围
        data.tuozhuai = {
            // 可拖拽起始点x坐标
            sx:data.center.x - (data.width / 2),
            // 可拖拽终点x坐标
            ex:data.center.x + (data.width / 2),
            // 可拖拽起点y坐标
            sy:data.center.y - (data.every.height / 2),
            // 可拖拽终点y坐标
            ey:data.center.y + (data.every.height / 2),
        };
        // 可连线
        data.lianxian = {
            // 可拖拽起始点x坐标
            sx:data.center.x - (data.width / 2),
            // 可拖拽终点x坐标
            ex:data.center.x + (data.width / 2),
            // 可拖拽起点y坐标
            sy:data.center.y + (data.every.height / 2),
            // 可拖拽终点y坐标
            ey:data.center.y + (data.height - data.every.height / 2),
        };
        // 把随机id添加进去(如果有就用之前的)
        data.canvasid = data.canvasid||this.getUuid();
        // 绘制图形
        this.ctx.beginPath();
        this.ctx.moveTo(data.part.sx,data.part.sy);
        this.ctx.lineTo(data.part.ex,data.part.sy);
        this.ctx.lineTo(data.part.ex,data.part.ey);
        this.ctx.lineTo(data.part.sx,data.part.ey);
        // 是否被选中决定背景色
        this.ctx.fillStyle = data.chose?data.choseBackColor:data.backColor;
        this.ctx.lineCap ="round";
        this.ctx.strokeStyle=data.lineColor;
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
        // 绘制图形内部竖线
        for(let i = 1;i < row ; i++){
            this.ctx.beginPath();
            const startx = data.part.sx + (data.every.width * i);
            const starty = data.part.sy + data.every.height;
            this.ctx.moveTo(startx,starty);
            const endx = data.part.sx + (data.every.width * i);
            const endy = data.part.sy + data.height;
            this.ctx.lineTo(endx,endy);
            this.ctx.strokeStyle = data.lineColor;
            this.ctx.stroke();
        }
        // 绘制图形内部横线
        for(let i = 1;i < column ; i++){
            this.ctx.beginPath();
            const startx = data.part.sx;
            const starty = data.part.sy + (data.every.height * i);
            this.ctx.moveTo(startx,starty);
            const endx = data.part.sx + data.width;
            const endy = data.part.sy + (data.every.height * i);
            this.ctx.lineTo(endx,endy);
            this.ctx.strokeStyle=data.lineColor;
            this.ctx.stroke();
        }
        // 绘制表头文字
        this.ctx.beginPath();
        this.ctx.strokeStyle=data.color;
        this.ctx.font = `${data.fontSize}px serif`;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.strokeText(data.tableName,data.part.sx + data.every.width,data.part.sy+data.every.height/2);
        this.ctx.stroke();
        // 绘制内容文字
        // 循环列文字
        data.list.forEach((item,index)=>{
            // 设置这一行的y（需要加上第一层表头）
            const thisy = data.part.sy + (index + 1)  * data.every.height + data.every.height + data.every.height/2;
            const thisx = data.part.sx + index * data.every.width + data.every.width/2;
            // 设置x
            item.forEach((item2,index)=>{
                const thisx = data.part.sx + index * data.every.width + data.every.width/2;
                this.ctx.beginPath();
                this.ctx.strokeStyle=data.color;
                this.ctx.font = `${data.fontSize}px serif`;
                this.ctx.textAlign = "center";
                this.ctx.textBaseline = "middle";
                this.ctx.strokeText(item2,thisx,thisy);
                this.ctx.stroke();
            });
        });
        data.info.forEach((item,index)=>{
            // 设置这一行的y（需要加上第一层表头）
            const thisy = data.part.sy + data.every.height + data.every.height/2;
            const thisx = data.part.sx + index * data.every.width + data.every.width/2;
            this.ctx.beginPath();
            this.ctx.strokeStyle=data.color;
            this.ctx.font = `${data.fontSize}px serif`;
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.strokeText(item,thisx,thisy);
            this.ctx.stroke();
        });
        // 如果是第一次把表放入到list中
        if(index>=0){ // 如果index有值，证明是初始化
            // 替换这个数组中的这个元素
            this.tatleList.splice(index,1,data);
        }else{
            // 给数组添加进这个图形
            this.tatleList.push(data);
        }
        //this.tatleList.push(data);
    }
    // 根据关系画线
    getLine(item,index){
        this.ctx.beginPath();
        let ex = item.end.id.part.ex;
        const ey = item.end.id.part.sy + item.end.id.every.height * (item.end.index-0.5);
        this.ctx.lineWidth = 1;
        this.ctx.setLineDash([]);
        // this.ctx.strokeStyle = "#fff";
        this.ctx.strokeStyle = item.chose?item.choseColour:item.colour;
        // 根据两个点的位置连线
        // 如果1在2的右面(1-自己的半径>2+自己的半径)
        let object = {};
        // 起始点在1的左侧，结束点在1的右侧
        const value = item.deviation;
        if(item.start.id.part.sx > item.end.id.part.ex){
            this.ctx.moveTo(item.start.id.part.sx,item.start.id.part.sy+item.start.id.every.height * (item.start.index-0.5));
            this.ctx.lineTo((item.start.id.part.sx + item.end.id.part.ex)/2+value,item.start.id.part.sy+item.start.id.every.height * (item.start.index-0.5));
            this.ctx.lineTo((item.start.id.part.sx + item.end.id.part.ex)/2+value,item.end.id.part.sy + item.end.id.every.height * (item.end.index-0.5));
            this.ctx.lineTo(item.end.id.part.ex,item.end.id.part.sy + item.end.id.every.height * (item.end.index-0.5));
            this.ctx.stroke();
            object = [
                {
                    y:item.start.id.part.sy+item.start.id.every.height * (item.start.index-0.5),
                    xStart:item.start.id.part.sx,
                    xEnd:(item.start.id.part.sx + item.end.id.part.ex)/2+value
                },
                {
                    x :(item.start.id.part.sx + item.end.id.part.ex)/2+value,
                    yStart:item.start.id.part.sy+item.start.id.every.height * (item.start.index-0.5),
                    yEnd:item.end.id.part.sy + item.end.id.every.height * (item.end.index-0.5),
                },
                {
                    y :item.end.id.part.sy + item.end.id.every.height * (item.end.index-0.5),
                    xStart:(item.start.id.part.sx + item.end.id.part.ex)/2+value,
                    xEnd:item.end.id.part.ex
                }
            ];
            // 画箭头
            this.ctx.beginPath();
            this.ctx.moveTo(ex,ey);
            this.ctx.lineTo(ex+5,ey-10);
            this.ctx.lineTo(ex+5,ey+10);
            this.ctx.fillStyle = "#000";
            this.ctx.fill();
            this.ctx.closePath();
        }// 如果1在2的左面(1+自己半径<2-自己半径)
        else if(item.start.id.part.sx < item.end.id.part.ex){
            ex = item.end.id.part.sx;
            this.ctx.moveTo(item.start.id.part.ex,item.start.id.part.sy+item.start.id.every.height * (item.start.index-0.5));
            this.ctx.lineTo((item.start.id.part.ex + item.end.id.part.sx)/2+value,item.start.id.part.sy+item.start.id.every.height * (item.start.index-0.5));
            this.ctx.lineTo((item.start.id.part.ex + item.end.id.part.sx)/2+value,item.end.id.part.sy + item.end.id.every.height * (item.end.index-0.5));
            this.ctx.lineTo(item.end.id.part.sx,item.end.id.part.sy + item.end.id.every.height * (item.end.index-0.5));
            this.ctx.stroke();
            object = [
                {
                    y:item.start.id.part.sy + item.start.id.every.height * (item.start.index-0.5),
                    xStart:item.start.id.part.ex,
                    xEnd:(item.start.id.part.ex + item.end.id.part.sx)/2+value
                },
                {
                    x :(item.start.id.part.ex + item.end.id.part.sx)/2+value,
                    yStart:item.start.id.part.sy+item.start.id.every.height * (item.start.index-0.5),
                    yEnd:item.end.id.part.sy + item.end.id.every.height * (item.end.index-0.5),
                },
                {
                    y :item.end.id.part.sy + item.end.id.every.height * (item.end.index-0.5),
                    xStart:(item.start.id.part.ex + item.end.id.part.sx)/2+value,
                    xEnd:item.end.id.part.ex
                }
            ];
            // 画箭头
            this.ctx.beginPath();
            this.ctx.moveTo(ex,ey);
            this.ctx.lineTo(ex-5,ey-10);
            this.ctx.lineTo(ex-5,ey+10);
            this.ctx.fillStyle = "#000";
            this.ctx.fill();
            this.ctx.closePath();
        }
        // 如果2在1的上面(1-自己半径>2+自己半径)
        // if(item.start.y - item.start.size > item.end.y + item.end.size){ }
        this.ctx.stroke();
        let data = this.relationshipList[index];
        data.choseRange = object;
        // 修改线被点击的值
        this.relationshipList.splice(index,1,data);
    }
    // 监听鼠标按下方法
    mouseDown(){
        const self = this;
        const c = this.ctx.canvas;
        c.onmousedown = (ev)=>{
            let e = ev||event;
            const scrollTop =  document.getElementById("mainRight").scrollTop;
            const x = e.pageX-this.canvasLeftWidth;
            const y = e.pageY+scrollTop-this.canvasTopHeight;
            // 如果是鼠标左键执行拖拽和单击
            if(e.button === 0){
                // 确定拖拽点击的图形
                this.tatleList.forEach((item,index)=>{
                    // 如果在这个范围内进行拖拽
                    if(item.tuozhuai.sx <= x && x <= item.tuozhuai.ex && item.tuozhuai.sy <= y && y <= item.tuozhuai.ey){
                        // 用来判断是单击还是拖拽
                        this.timeOutEvent = setTimeout(this.longPress(),500);
                        // 开启执行的定时器
                        self.runFun = window.setInterval(()=>{
                            self.run = true;
                        },self.runtime);
                        this.mouseMove(item,index);
                        // 监听鼠标抬起
                        this.mouseUp(item,index);
                    }
                    // 连线
                    else if(item.lianxian.sx <= x && x <= item.lianxian.ex && item.lianxian.sy <= y && y <= item.lianxian.ey){
                        // 用来判断是单击还是拖拽
                        this.timeOutEvent = setTimeout(this.longPress(),500);
                        // 开启执行的定时器
                        self.runFun = window.setInterval(()=>{
                            self.run = true;
                        },self.runtime);
                        // 记录线的起始点
                        this.linePort.start.x = x;
                        this.linePort.start.y = y;
                        this.mouseMove2(item,index);
                        // 监听鼠标抬起
                        this.mouseUp2(item,index);
                    }
                });
                // 确定点击的线
                this.relationshipList.forEach((item,index)=>{
                    // 用来判断是单击还是拖拽
                    this.timeOutEvent = setTimeout(this.longPress(),500);
                    // 判断是否有被点击的部分
                    let thisNum = 0;
                    item.choseRange.forEach((item2,index2)=>{
                        if(item2.y){
                            if(y < item2.y + 5 && item2.y - 5 < y && ((x < item2.xStart && x > item2.xEnd) || (x > item2.xStart && x < item2.xEnd))){
                                // 如果被点击计数+1
                                thisNum = thisNum + 1;
                            }
                        }else if (item2.x){
                            if(x < item2.x + 5 && item2.x - 5 < x && ((y < item2.yStart && y > item2.yEnd) || (y > item2.yStart && y < item2.yEnd))){
                                // 如果被点击计数+1
                                thisNum = thisNum + 1;
                            }
                        }
                        // else if(item2.x){
                        // }
                    });
                    // 如果计数大于0，证明这条线被点击了取反
                    if(thisNum > 0){
                        // 监听鼠标抬起
                        this.mouseUpLine(item,index);
                    }
                });
            }
        };
    }
    mouseUpLine(item,index){
        // 如果是点击
        if(this.timeOutEvent!==0){
            // 改变其他图形都变成
            this.relationshipList.forEach((item2,index2)=>{
                if(index2 !== index){
                    this.relationshipList[index2].chose = false;
                }
                else{
                    // 给数组的这个位置的值得选择取反
                    this.relationshipList[index].chose = !item.chose;
                }
            });
            this.getCanvasByData();
        }
    }
    // 拖拽鼠标移动方法
    mouseMove(item,index){
        const c = this.ctx.canvas;
        const scrollTop =  document.getElementById("mainRight").scrollTop;
        c.onmousemove = (ev)=>{
            // 如果时间到了可以执行，执行一次
            if(this.run){
                // 控制下次不可以执行
                this.run = false;
                let e = ev||event;
                const x = e.pageX-this.canvasLeftWidth;
                const y = e.pageY + scrollTop-this.canvasTopHeight;
                // 每次拖拽都改变设置为0
                clearTimeout(this.timeOutEvent);
                this.timeOutEvent = 0;
                // 修改数组中
                this.dropShape(item,index,x,y);
            }
        };
    }
    // 线鼠标移动方法
    mouseMove2(item,index){
        const c = this.ctx.canvas;
        const scrollTop =  document.getElementById("mainRight").scrollTop;
        c.onmousemove = (ev)=>{
            // 如果时间到了可以执行，执行一次
            if(this.run){
                // 控制下次不可以执行
                this.run = false;
                let e = ev||event;
                const x = e.pageX-this.canvasLeftWidth;
                const y = e.pageY + scrollTop-this.canvasTopHeight;
                // 每次拖拽都改变设置为0
                clearTimeout(this.timeOutEvent);
                this.timeOutEvent = 0;
                // 进行连线操作
                this.drowLine(item,index,x,y);
            }
        };
    }
    //拖拽鼠标移开事件
    mouseUp(item,index){
        const c = this.ctx.canvas;
        const self = this;
        c.onmouseup = (ev)=>{
            let e = ev||event;
            // 关闭鼠标移动事件
            c.onmousemove = null;
            // 关闭鼠标点击事件
            c.onmouseup = null;
            // 关闭定时
            window.clearInterval(self.runFun);
            // 如果是点击
            if(this.timeOutEvent!==0){
                // 改变其他图形都变成
                this.tatleList.forEach((item,index2)=>{
                    if(index2 !== index){
                        this.tatleList[index2].chose = false;
                    }
                    else{
                        // 给数组的这个位置的值得选择取反
                        this.tatleList[index].chose = !item.chose;
                    }
                });
            }
            // 鼠标离开时候都重新画
            this.getCanvasByData();
        };
    }
    //线鼠标移开事件
    mouseUp2(item,index){
        const c = this.ctx.canvas;
        const scrollTop =  document.getElementById("mainRight").scrollTop;
        const self = this;
        c.onmouseup = (ev)=>{
            let e = ev||event;
            // 关闭鼠标移动事件
            c.onmousemove = null;
            // 关闭鼠标点击事件
            c.onmouseup = null;
            // 关闭定时
            window.clearInterval(self.runFun);
            if(this.timeOutEvent!==0){
                // console.log("你这是点击，不是拖拽");
            }
            // 添加线的另外两个点
            const x = e.pageX-this.canvasLeftWidth;
            const y = e.pageY + scrollTop-this.canvasTopHeight;
            // 记录线的结束点
            this.linePort.end.x = x;
            this.linePort.end.y = y;
            // 根据线添加关联管理
            this.makeRelationship();
            // 鼠标离开时候都重新画
            this.getCanvasByData();
        };
    }
    // 画图
    dropShape(data,index,x,y) {
        data.center.x = x;
        data.center.y = y;
        // 替换这个数组中的这个元素
        this.tatleList.splice(index,1,data);
        this.getCanvasByData();
    }
    // 连线操作
    drowLine(item,index,x,y){
        // 重新加载画布
        this.getCanvasByData();
        // 开始连接这次的线
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.setLineDash([]);
        this.ctx.moveTo(this.linePort.start.x,this.linePort.start.y);
        this.ctx.lineTo((x + this.linePort.start.x)/2,this.linePort.start.y);
        this.ctx.lineTo((x + this.linePort.start.x)/2,y);
        this.ctx.lineTo(x,y);
        this.ctx.strokeStyle = "#fff";
        this.ctx.stroke();
        // 画箭头
        this.ctx.beginPath();
        this.ctx.moveTo(x,y);
        // 如果向右
        if(x>=this.linePort.start.x){
            this.ctx.lineTo(x-5,y-10);
            this.ctx.lineTo(x-5,y+10);
        }else { // 如果向左
            this.ctx.lineTo(x+5,y-10);
            this.ctx.lineTo(x+5,y+10);
        }
        this.ctx.fillStyle = "#000";
        this.ctx.fill();
        this.ctx.closePath();
    }
    // 通过数据初始化图
    getCanvasByData(){
        // 清除画布
        this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
        // 初始化表
        this.tatleList.forEach((item,index)=>{
            this.getTable(item,index);
        });
        // 初始化线
        this.relationshipList.forEach((item,index)=>{
            const data = {
                start:{
                    id:{},
                    index:0
                },
                end:{
                    id:{},
                    index:0
                },
                deviation:item.deviation,
                colour:item.colour,
                chose:item.chose,
                choseColour:item.choseColour,
            };
            // 根据canvasid找到点
            this.tatleList.forEach((item2,index2)=>{
                if(Object.is(item2.canvasid,item.start.id)){
                    data.start.id = item2;
                    data.start.index = item.start.index;
                }
                else if (Object.is(item2.canvasid,item.end.id)){
                    data.end.id = item2;
                    data.end.index = item.end.index;
                }
            });
            this.getLine(data,index);
        });
    }
    // 添加线的关联关系方法
    makeRelationship(){
        const start = this.linePort.start;
        const end = this.linePort.end;
        const relationship = {
            start:{
                id:"",
                index:0,
            },
            end:{
                id:"",
                index:0,
            },
            deviation:([true, false][Math.floor(Math.random()*[true, false].length)])?(0 - Math.floor(Math.random()*30)):Math.floor(Math.random()*30),// 线段偏移量
            // colour:this.color16(),
            colour: "#fff",
            chose:false,
            choseColour:"#ff2c44",
        };
        this.tatleList.forEach((item)=>{
            // 如果在这个范围内
            if(item.lianxian.sx <= start.x && start.x <= item.lianxian.ex && item.lianxian.sy <= start.y && start.y <= item.lianxian.ey){
                relationship.start.id = item.canvasid;
                // 计算是第几行
                relationship.start.index = Math.ceil((start.y - item.part.sy) /  item.every.height);
            }
            if(item.lianxian.sx <= end.x && end.x <= item.lianxian.ex && item.lianxian.sy <= end.y && end.y <= item.lianxian.ey){
                relationship.end.id = item.canvasid;
                // 计算是第几行
                relationship.end.index = Math.ceil((end.y - item.part.sy) /  item.every.height);
            }
        });
        // 如果结束点和起始点不是同一个，则加入到关系队列中
        if((!Object.is(relationship.start.id,relationship.end.id))&&(relationship.start.id)&&(relationship.end.id)){
            this.relationshipList.push(relationship);
        }
    }
    // 生成uuid
    getUuid (){
        const mydate = new Date();
        const uuid = "cms"+mydate.getDay()+ mydate.getHours()+ mydate.getMinutes()+mydate.getSeconds()+mydate.getMilliseconds();
        return uuid;
    }
    longPress(){
        this.timeOutEvent = 0;
    }
    // 获取值
    getData(){
        return {
            tableList:this.tatleList,
            lineList:this.relationshipList
        };
    }
    // 随机生成颜色
    color16() {//十六进制颜色随机
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        let color = "#" + r.toString(16) + g.toString(16) + b.toString(16);
        return color;
    }
    // 监听键盘方法
    delete(){
        const c = this.ctx.canvas;
        window.addEventListener("keydown", (event)=>{
            if(event.keyCode === 8){
                this.doDelete();
            }
        }, true);
    }
    // 执行删除方法
    doDelete(){
        const tatleList = [];
        let relationshipList = [];
        let havaChage = false;// 记录删除是否改变了什么
        // 删除被选中的点
        this.tatleList.forEach((item,index)=>{
            if(!item.chose){
                tatleList.push(item);
            }else{ // 删除关系中含有这个的关系
                // 生了改变
                havaChage = true;
                this.relationshipList.forEach((item2,index2)=>{
                    if(!(Object.is(item.canvasid,item2.end.id))&&!(Object.is(item.canvasid,item2.start.id)) ){
                        relationshipList.push(item2);
                    }
                });
            }
        });
        // 如果线发生了改变才会变
        if(havaChage){
            this.relationshipList = relationshipList;
            // 获取新的点
            this.tatleList = tatleList;
        }
        // 删除被选中的线
        relationshipList = this.relationshipList.filter((item2)=>{
            return !item2.chose;
        });
        this.relationshipList = relationshipList;
        // 重新加载图
        this.getCanvasByData();
    }
    // 外部调用的监听方法
    // watchEnter(fun){
    //     window.addEventListener("keydown", (event)=>{
    //         if(event.keyCode === 13){
    //         }
    //     }, true);
    // }
}

export default  TableCanvas;