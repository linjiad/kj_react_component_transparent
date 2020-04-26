// eslint-disable-next-line
import React ,{ Component } from "react";
import "./leftMenu.less";

class leftSideMenu extends Component {
    // noinspection JSAnnotator
    constructor(props){
        super(props);
    }
    state = {
    };

    componentDidMount() {}
    change = (event) => {
    }
    render() {
        return (
            <div className="left_menu" onClick={this.change}>
                {this.props.children}
            </div>
        );
    }
}
export default leftSideMenu;
