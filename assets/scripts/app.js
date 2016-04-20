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
      this.state = { isLoading: {}, status: {} };
      this.handleChange = this.handleChange.bind(this);
    }

    updateState(loading, status) {
      var newState = update(this.state, {isLoading: {$merge: loading}});
      newState = update(newState, {status: {$merge: status}});
      this.setState(newState);
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

    getRemoteStatus(vip) {
      this.updateState({[vip]: true}, {});
      fetch('/vip_status/' + vip)
      .then( response => response.json() )
      .then( status => this.updateState({[vip]: false}, status) );
    }

    setRemoteStatus(vip, service, enable) {
      const cmd = enable ? "enable_service" : "disable_service";
      fetch(`/${cmd}/${vip}/${service}`)
      .then( response => this.getRemoteStatus(vip) );
    }

    dim(n) {
      return [...new Set(Object.keys(this.state.status)
                .map(s => s.split("/")[n]))].sort();
    }

    handleChange(event, k0, k1) {
      this.setRemoteStatus(k0, k1, event.target.checked);
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
                  checked={this.state.status[k]}
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
