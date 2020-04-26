class DownExcleCSV {
    constructor() {
    }
    downCsv(data){
        const jsonData = data.data;
        //要导出的json数据
        // let jsonData = [
        //     {
        //         name:"路人甲",
        //         phone:"123456789",
        //         email:"000@123456.com"
        //     },
        //     {
        //         name:"炮灰乙",
        //         phone:"123456789",
        //         email:"000@123456.com"
        //     },
        //     {
        //         name:"土匪丙",
        //         phone:"123456789",
        //         email:"000@123456.com"
        //     },
        //     {
        //         name:"流氓丁",
        //         phone:"123456789",
        //         email:"000@123456.com"
        //     },
        // ];
        //列标题，逗号隔开，每一个逗号就是隔开一个单元格
        // let str = `姓名,电话,邮箱\n`;
        let str = `${data.title}\n`;
        //增加\t为了不让表格显示科学计数法或者其他格式
        for(let i = 0 ; i < jsonData.length ; i++ ){
            for(let item in jsonData[i]){
                str+=`${jsonData[i][item] + "\t"},`;
            }
            str+="\n";
        }
        //encodeURIComponent解决中文乱码
        let uri = "data:text/csv;charset=utf-8,\ufeff" + encodeURIComponent(str);
        //通过创建a标签实现
        let link = document.createElement("a");
        link.href = uri;
        //对下载的文件命名
        // link.download = "json数据表.csv";
        link.download = `${data.name}.csv`;
        document.body.appendChild(link);
        link.click();
    }
}
export default  DownExcleCSV;