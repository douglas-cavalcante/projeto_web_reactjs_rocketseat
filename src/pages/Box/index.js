import React, { Component } from 'react';
import "./styles.css";

import logo from "../../assets/logo.svg";
import { MdInsertDriveFile } from 'react-icons/md';
import api from '../../services/api';
import { distanceInWords } from "date-fns";
import pt from "date-fns/locale/pt";
import Dropzone from "react-dropzone";
import socket from "socket.io-client"
export default class Box extends Component {


  constructor(props) {
    super(props);
    this.state = {
      box: {},
    }
  }

  subscribeToNewFiles = () => {
    const box = this.props.match.params.id;
    const io = socket("https://dropbox-api-nodejs.herokuapp.com");
    io.emit("connectRoom", box);
    io.on('file', data => {
      this.setState({
        box: {
          ...this.state.box,
          files: [data, ...this.state.box.files]
        }
      })
    })
  }
  async componentDidMount() {
    this.subscribeToNewFiles();
    const box = this.props.match.params.id;
    const response = await api.get(`boxes/${box}`);
    this.setState({ box: response.data });
  }

  handleUpload = (files) => {
    files.forEach(file => {
      const data = new FormData();
      const box = this.props.match.params.id;
      console.log(box)

      data.append('file', file);
      api.post(`boxes/${box}/files`, data);
    })
  }

  render() {
    return (
      <div id="box-container">
        <header>
          <img src={logo} alt="logo - rocketseat" />
          <h1>{this.state.box.title}</h1>
        </header>

        <Dropzone onDropAccepted={this.handleUpload}>
          {({ getRootProps, getInputProps }) => (
            <div className="upload" {...getRootProps()}>
              <input {...getInputProps()} />
              arraste arquivos ou clique aqui
                </div>
          )}
        </Dropzone>

        <ul>
          {this.state.box.files && this.state.box.files.map((file, index) => (
            <li key={index}>
              <a className="fileInfo" href={file.url} target="_black">
                <MdInsertDriveFile size={24} color="#A5Cfff" />
                <strong>{file.title}</strong>
              </a>
              <span> Há{" "}
                {
                  distanceInWords(
                    file.createdAt,
                    new Date(),
                    {
                      locale: pt
                    }
                  )
                }
              </span>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
