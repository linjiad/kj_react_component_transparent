import Message from "./Message/message";
import LeftMenu from "./NewLeftMenu";
import LeftMenuItem from "./NewLeftMenuItem";
import LeftMenuSub from "./NewLeftMenuSub";
import LeftSideMenu from "./leftSideMenu/leftMenu";
import LeftSideMenuItem from "./leftSideMenuItem/leftMenuItem";
import LeftSideMenuSub from "./leftSideSubMenu/leftSubMenu";
import Icon from "./icon";
import Input from "./input";
import Select from "./select";
import Option from "./option";
import Table from "./Table";
import Paging from "./paging";
import Modal from "./Modal";
import Tabs from "./tabs";
import TabsPane from "./tabsPane";
import TextArea from "./textArea";
import Form from "./form";
import DataPicker from "./datePicker_back/index";
import DataPicker1 from "./DatePicker/index";
import UploadFile from "./uploadFile/index";
import DownExcleCSV from "./downExcle/csv/index";
import DownExcleXLS from "./downExcle/xls/index";
import TableCanvas from "./canvas/tableCanvas";
import MyTransfer from "./MyTransfer";
import Transfer from "./Transfer";
import Loading from "./Loading";
import Tooltip from "./Tooltip";
import Popconfirm from "./Popconfirm";
import Tree from "./Tree";
const message = new Message();
const downExcleCSV = new DownExcleCSV();
const downExcleXLS = new DownExcleXLS();
export default {
    LeftSideMenu,
    LeftSideMenuItem,
    LeftSideMenuSub,
    message,
    LeftMenu,
    LeftMenuItem,
    LeftMenuSub,
    Icon,
    Input,
    Select,
    Option,
    Table,
    Paging,
    Modal,
    TabsPane,
    Tabs,
    TextArea,
    Form,
    DataPicker,
    DataPicker1,
    UploadFile,
    downExcleCSV,
    TableCanvas,
    Loading,
    downExcleXLS,
    MyTransfer,
    Transfer,
    Tooltip,
    Popconfirm,
    Tree
};

