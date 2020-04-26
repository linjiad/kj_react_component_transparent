// eslint-disable-next-line
import React ,{ Component } from "react";
import "./index.less";
class TabsPane extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
    }
    state = {};

    render() {
        return (
            <div id={this.props.tab} className="my_tab_pane_main">
                {this.props.children}
            </div>
        );
    }
}
export default TabsPane;
