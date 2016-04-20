/* jshint esversion: 6 */
/* jshint asi: true */

import React from 'react'
import ReactDOM from 'react-dom'
import update from 'react-addons-update'
import Toggle from 'react-toggle'

import 'react-toggle/style.css'

import 'whatwg-fetch';

class App extends React.Component {

    constructor(props) {
      super(props);
      this.displayName = 'App';
      this.state = { isLoading: {} };
      this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
      this.getRemoteVips();
    }

    getRemoteVips() {
      fetch('/vips')
      .then( response => response.json() )
      .then( json =>
        json.vips.forEach(vip =>
	  this.getRemoteStatus(vip)))
    }

    setIsLoading(vip, b) {
      this.setState(update(this.state, {isLoading: {$merge: {[vip]: b}}}));
      console.log("this.state.isLoading=" + JSON.stringify(this.state.isLoading));
    }

    getRemoteStatus(vip) {
      this.setIsLoading(vip, true);
      fetch('/vip_status/' + vip)
      .then( response => response.json() )
      .then( json => {
	this.setState(json);
        this.setIsLoading(vip, false)});
      // this.setState({[key]: event.target.checked})
    }

    setRemoteStatus(vip, service, enable) {
      const cmd = enable ? "enable_service" : "disable_service";
      fetch(`/${cmd}/${vip}/${service}`)
    }

    dim(n) {
      return [...new Set(Object.keys(this.state)
		.filter(s => s.includes("/"))
                .map(s => s.split("/")[n]))].sort();
    }

    handleChange(event, k0, k1) {
      this.setRemoteStatus(k0, k1, event.target.checked);
      this.getRemoteStatus(k0);
    }

    render() {
      const dim0 = this.dim(0), dim1 = this.dim(1);
      const th = ["", ...dim0].map(k0 => (<th>{k0} {this.state.isLoading[k0] ? "?" : " "}</th>));
      const rows = [];
      dim1.forEach( k1 => {
          const row = [<td>{k1}</td>]
          dim0.forEach( k0 => {
            const k = k0 + "/" + k1;
            row.push(
              <td>
                <Toggle
                  id={k}
                  checked={this.state[k]}
                  onChange={ ev => this.handleChange(ev, k0, k1) } />
              </td>
            )
          });
          rows.push(<tr>{row}</tr>)
      });

      return (
        <div className="example">

        <table border="1">
          <thead>
            <tr>{th}</tr>
          </thead>
          <tbody>
          {rows}
          </tbody>
        </table>
        </div>
      )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("application")
)
