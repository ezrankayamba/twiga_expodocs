import React, {Component} from 'react';
import SaleListView from "./SaleListView";

class SalesIndexPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SaleListView/>
        )
    }
}

export default SalesIndexPage;