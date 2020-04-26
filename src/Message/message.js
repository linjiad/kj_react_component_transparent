import "./message.less";
class Message {
    constructor() {
        this.time = 2;
    }
    success(message, time = this.time) {
        const div = document.createElement("div");
        div.style.cssText = `
        position: absolute;
        color: #ffffff
        z-index:999;
        display: flex;
        top: 3vh;
        left: 40%;
        -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(78,90,127,0.6);
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(78,90,127,0.6);
        border-radius: 3px;
        background-color:rgba(255,255,255,1);
        font-size: 14px;`;
        div.style.zIndex="999";
        const html = `<i class='iconfont iconzhengque' style="color: #52c418;font-size:32px;
                    padding: 3px 10px 0 30px;"></i>
                <p style="color:#9c9c9c; padding: 15px 50px 0 5px;">${message}</p>`;
        div.innerHTML = html;
        document.getElementsByTagName("body")[0].appendChild(div);
        div.className = "message_move_top";
        setTimeout(() => {
            document.getElementsByTagName("body")[0].removeChild(div);
        }, (time * 1000));
    }

    erro(message, time = this.time) {
        const div = document.createElement("div");
        div.style.cssText = `
        position: absolute;
        color: #ffffff
        z-index:4;
        display: flex;
        top: 3vh;
        left: 40%;
        -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(78,90,127,0.6);
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(78,90,127,0.6);
        border-radius: 3px;
        background-color:rgba(255,255,255,1);
        font-size: 14px;`;
        /*div.style.left=e.clientX+"px";
            div.style.top=e.clientY+"px";*/
        div.style.zIndex="999";
        const html = `<i class='iconfont iconcuowu' style="color: #f5252e;font-size:30px;
                    padding: 2px 10px 0 30px;"></i>
                <p style="color:#9c9c9c; padding: 14px 50px 0 5px;">${message}</p>`;
        div.innerHTML = html;
        document.getElementsByTagName("body")[0].appendChild(div);
        div.className = "message_move_top";
        setTimeout(() => {
            document.getElementsByTagName("body")[0].removeChild(div);
        }, (time * 1000));
    }

    warning(message, time = this.time) {
        const div = document.createElement("div");
        div.style.cssText = `
        position: absolute;
        color: #ffffff
        z-index:999;
        display: flex;
        top: 3vh;
        left: 40%;
        -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(78,90,127,0.6);
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(78,90,127,0.6);
        border-radius: 3px;
        background-color:rgba(255,255,255,1);
        font-size: 14px;`;
        div.style.zIndex="999";
        const html = `<i class='iconfont iconzhanghuyichang' style="color: #f9ad14;font-size:30px;
                    padding: 2px 10px 0 30px;"></i>
                <p style="color:#9c9c9c; padding: 14px 50px 0 5px;">${message}</p>`;
        div.innerHTML = html;
        document.getElementsByTagName("body")[0].appendChild(div);
        div.className = "message_move_top";
        setTimeout(() => {
            document.getElementsByTagName("body")[0].removeChild(div);
        }, (time * 1000));
    }

    openMessage(message, time = this.time) {
        const div = document.createElement("div");
        div.style.cssText = `
        position: absolute;
        color: #ffffff
        z-index:999;
        display: flex;
        -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(78,90,127,0.6);
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(78,90,127,0.6);
        border-radius: 3px;
        background-color:rgba(255,255,255,1);
        font-size: 14px;
        height:100px;
        top: 3vh;
        right: 2%;`;
        div.style.zIndex="999";
        const html = `<p style="color:#9c9c9c; padding: 40px 30px 0 60px;">${message}</p>
        <i class='iconfont iconguanbi1' style="color: #32a7dd;font-size:20px;
                    padding: 2px 10px 0 30px;"></i> `;
        div.innerHTML = html;
        div.className = "message_move_right";
        document.getElementsByTagName("body")[0].appendChild(div);
        div.getElementsByTagName("i")[0].onclick = () => {
            document.getElementsByTagName("body")[0].removeChild(div);
        };
        /*setTimeout(()=>{
                    document.getElementsByTagName("body")[0].removeChild(div);
                  },(time*1000));*/
    }
}

export default Message;