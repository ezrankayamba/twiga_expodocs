import React, {Component} from 'react';
import {connect} from "react-redux";
import BasicCrudView from "../../utils/crud/BasicCrudView";
import Numbers from "../../../_helpers/Numbers";
import {DateTime} from "../../../_helpers/DateTime";
import {deleteSale, deleteSelectedSales, fetchSales, importSales} from "../../../_services/SalesService";
import SalesImportForm from "./SalesImportForm";
import {IconFileUpload} from "../../utils/Incons";


@connect((state) => {
    return {
        user: state.auth.user
    }
})
class SaleListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sales: [],
            isLoading: false,
            fileUpload: false,
            detail: false,
            selected: null,
            showModal: true,
            pages: 1,
            pageNo: 1
        }
        this.onRowClick = this.onRowClick.bind(this)
        this.refresh = this.refresh.bind(this)
        this.onPageChange = this.onPageChange.bind(this)
    }

    onPageChange(pageNo) {
        this.setState({pageNo})
        this.refresh(pageNo)
    }

    onRowClick(e, row) {
        this.setState({
            selected: {
                ...row
            }, detail: true
        })
    }

    detailComplete(data) {
        this.setState({detail: false})
    }

    componentDidMount() {
        this.refresh()
    }

    fileUploadComplete(data) {
        console.log(data)
        this.setState({fileUpload: false})
        if (data) {
            this.setState({isLoading: true})
            importSales(this.props.user.token, data, (res) => {
                console.log(res)
                this.refresh()
            })
        }
    }

    refresh(page = 1) {
        this.setState({isLoading: true}, () => {
            fetchSales(this.props.user.token, page, (res) => {
                if (res) {
                    this.setState({
                        sales: res.data.map(item => {
                            return {
                                ...item,
                                quantity: Numbers.fmt(item.quantity),
                                value: Numbers.fmt(item.value),
                                trans_date: DateTime.fmt(item.trans_date, "DD/MM/YYYY"),
                                created_at: DateTime.fmt(item.created_at, "DD/MM/YYYY")
                            }
                        }),
                        isLoading: false,
                        pages: parseInt(res.pages)
                    })
                }
            })
        })
    }

    doDelete(params) {
        deleteSale(this.props.user.token, params.id, (res) => {
            params.cb()
            this.refresh()
        })
    }

    doDeleteSelected(params) {
        deleteSelectedSales(this.props.user.token, params.ids, (res) => {
            params.cb(res)
            this.refresh()
        })
    }

    render() {
        let data = {
            records: this.state.sales,
            headers: [
                {field: 'id', title: 'ID'},
                {field: 'trans_date', title: 'Trans Date'},
                {field: 'cust_name', title: 'Cust Name'},
                {field: 'delivery_note', title: 'Delivery Note'},
                {field: 'veh_no', title: 'Veh No.'},
                {field: 'tax_invoice', title: 'Tax Invoice'},
                {field: 'sales_order', title: 'Sales Order'},
                {field: 'prod_name', title: 'Product Name'},
                {field: 'quantity', title: 'Quantity'},
                {field: 'value', title: 'Total Value ($)'},
                {field: 'destination', title: 'Destination'},
                {field: 'created_at', title: 'Created'},
            ],
            title: 'List of batches'
        }
        const {isLoading, selectedBatch, pages, count, pageNo} = this.state
        let actions = [
            {
                tooltip: 'Refresh',
                isFreeAction: true,
                onClick: (evt, data) => {
                    this.refresh()
                }
            }
        ]
        const pagination = {pages, pageNo, onPageChange: this.onPageChange}
        return (
            <div className="row">
                <div className="col">
                    <div className="row pt-2 pb-2 d-flex">
                        <div className="col-md">
                            <h5>List of sales</h5>
                        </div>
                        <div className="col-md">
                            <div className="btn-group float-md-right">
                                <button className="btn btn-primary btn-sm"
                                        onClick={() => this.setState({fileUpload: true})}><IconFileUpload/> Import Sales
                                </button>
                            </div>
                        </div>
                    </div>
                    <BasicCrudView data={data} pagination={pagination} onDeleteAll={this.doDeleteSelected}
                                   isLoading={isLoading}
                                   actions={actions} onRowClick={this.onRowClick}/>
                    {this.state.fileUpload &&
                    <SalesImportForm open={this.state.fileUpload} complete={this.fileUploadComplete.bind(this)}/>}
                </div>
            </div>
        )
    }
}

export default SaleListView;
