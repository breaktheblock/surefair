import React, { Component } from 'react';
import './App.css';
import {Navbar} from 'react-bootstrap';
import Navigation from './Components/Navigation'
import tableHtml from './Components/Navigation'
//import Web3 from 'web3'
import _ from 'lodash'
//import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

var BrowserRouter = require('react-router-dom').BrowserRouter
var Route = require('react-router-dom').Route
var Link = require('react-router-dom').Link
var Web3 = require('web3');

var selectRowProp= {
  mode: "checkbox",
  clickToSelect: true
}

const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/jD3JIY48Jf0zUvTqJVMF"));

class App extends Component {

  constructor(props) {
    super(props);
       this.state = {
        synABIState: '', oracleABIState: '',
      syndicateAddress: '0x45790ce1c3dec66a1041bb892ddbcb5aa14ef0ba',
      oracleAddress: '0xa7f5500bfe728770dc9a779fe13f516701db4278'}


    this.getSelectedRowKeys = this.getSelectedRowKeys.bind(this)

  }


  componentWillMount() {
    console.log('componentWillMount');

    let syndicateABI =    [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"isContract","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalDividendPoints","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"updateAccount","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"unclaimedDividends","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getOracles","outputs":[{"name":"","type":"address[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_client","type":"address"},{"name":"_contractId","type":"uint64"}],"name":"clientClaim","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"disburse","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getStats","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"oracleAddress","type":"address"}],"name":"addOracle","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_oracle","type":"address"},{"name":"_oracleQuoteId","type":"uint64"}],"name":"insureClient","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"","type":"uint256"},{"indexed":false,"name":"","type":"uint256"},{"indexed":false,"name":"","type":"uint256"},{"indexed":false,"name":"","type":"uint256"}],"name":"DebugB","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"","type":"uint256"}],"name":"Debug","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]

    this.setState({synABIState: syndicateABI})
  //  let w = new Web3(new Web3.providers.HttpProvider("http://178.62.81.42:8545"))
 //  let w = new Web3(new Web3.providers.HttpProvider("http://104.236.58.158:8545"))

  //  this.setClient = this.setClient.bind(this);

    let syndicateContract = web3.eth.contract(syndicateABI).at(this.state.syndicateAddress)
this.setState({syndicateContract: syndicateContract})

let oracleABI=[{"constant":false,"inputs":[{"name":"_macbookYear","type":"uint256"},{"name":"_serial_number","type":"bytes32"},{"name":"_ipfsHash","type":"bytes32"}],"name":"createQuote","outputs":[{"name":"","type":"uint64"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_client","type":"address"},{"name":"_quoteId","type":"uint64"}],"name":"getQuote","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_quoteId","type":"uint64"}],"name":"verifyClaim","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"inputs":[{"name":"creator","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"","type":"bytes32"}],"name":"Debug1","type":"event"}]

this.setState({oracleABIState: oracleABI})

let oracleContract = web3.eth.contract(oracleABI).at(this.state.oracleAddress)
this.setState({oracleContract: oracleContract})

  //web3.eth.defaultAccount = web3.eth.coinbase;


  }


  getSelectedRowKeys() {
    var c= this.refs.table.state.selectedRowKeys;
    this.setState({buyingproducts: c});
    console.log(this.refs.table.state.selectedRowKeys);
    //render() { return <Link to={'/about'} />; }
  }



  render() {
var fullOracleAddress=[];
      var oAddress = this.state.syndicateContract.getOracles();
      for (var i = 0; i < oAddress.length; i++) {
   var anOracleAddress = oAddress[i]
      fullOracleAddress.push({ 'oracleAddress': anOracleAddress });
    }

      return (
        <div>
        <BrowserRouter>
    <div>
            <Route path="/table" render={ () => (
              <div  >
                <Navigation/>
                <div>
                  <tableHtml getSelectedRowKeys={this.getSelectedRowKeys}/>
                </div>
              </div>
            )} />
            <Route  path="/about" render={ () => (
              <div  >
                <Navigation/>
                <div>
                  <h1>About Us</h1>


                </div>
              </div>
            )} />
  </div>
        </BrowserRouter>
  </div>
      );
    }
}

export default App;
