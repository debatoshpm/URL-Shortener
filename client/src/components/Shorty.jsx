import React, { Component } from "react";
import axios from "axios";
import "./Shorty.css";
import * as clipboard from "clipboard-polyfill/text";
var QRCode = require("qrcode.react");

class Shorty extends Component {
  state = {
    flag: 0,
    url: "",
    error: 0,
    shortUrl: "",
    cpmsg: "Copy to clipboard",
  };

  setUrl = (e) => {
    this.setState({
      url: e.target.value,
    });
  };

  shorten = () => () => {
    axios
      .post("/api/url/shorten", {
        longUrl: this.state.url,
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ flag: 1 });
        this.setState({ error: 0 });
        this.setState({ shortUrl: res.data.shortUrl });
        this.setState({ cpmsg: "Copy to clipboard" });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: 1 });
      });
  };

  copy = () => {
    clipboard.writeText(this.state.shortUrl).then(() => {
      this.setState({ cpmsg: "Copied" });
    });
  };

  render() {
    return (
      <div className="app">
        <div className="container">
          <p className="text-center name pt-5 pb-3">Shorty</p>
          <p className="text-center intro">Shorten any long url for free</p>
          <div className="input-group pt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter URL to be shortened"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={this.setUrl}
            />
            <div className="input-group-append">
              <button
                className="btn btn-warning"
                type="button"
                onClick={this.shorten(this.state.url)}
              >
                Shorten
              </button>
            </div>
          </div>
          {this.state.error ? (
            <div className="text-warning mb-3">
              Error!! URL should be like https://www.google.com
            </div>
          ) : (
            <div className="mb-3"></div>
          )}
          <div className="input-group mb-3">
            <input
              id="myInput"
              type="text"
              className="form-control"
              placeholder="Shortened URL"
              aria-label="Shortened URL"
              aria-describedby="Shortened URL"
              value={this.state.shortUrl}
              ref={(copyarea) => (this.copyArea = copyarea)}
              disabled
            />
            <div className="input-group-append">
              <button
                className="btn btn-light"
                type="button"
                onClick={this.copy}
              >
                {this.state.cpmsg}
              </button>
            </div>
          </div>
          <div className="text-center pt-3">
            {this.state.flag ? (
              <QRCode value={this.state.shortUrl} size={256} />
            ) : (
              <span></span>
            )}
          </div>

          <div className="text-center text-light">
            Created by Debatosh Pal Majumder.
          </div>
        </div>
      </div>
    );
  }
}

export default Shorty;
