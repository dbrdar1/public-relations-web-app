import React, { Component } from "react";
import 'antd/dist/antd.css';
import { Avatar, Form, Button, Input, Layout, Table, message, Menu } from 'antd';
import '../UnansweredQuestions.css'

const { TextArea } = Input;
const { Column } = Table;
const { Header, Content } = Layout;
const Editor = ({ onChange, onChange1, onSubmit, value, Qnumber}) => (
    <div class="editor" >
        <Avatar shape="square"size="large" style={{backgroundColor: 'rgb(1, 1, 43)'}}>Employee</Avatar> <br/><br/>
      <Form.Item>
        <TextArea rows={10} cols={100} placeholder="Answer the question!" onChange={onChange1} value={value}/>
      </Form.Item>
      <Form.Item>
        <Button id = "answer" htmlType="submit" onClick={onSubmit} type="primary">
          Add Answer 
        </Button>
        <Button id = "cancel" onClick={onChange}>
          Cancel
        </Button>
      </Form.Item>
    </div>
);

class UnansweredQuestions extends Component {
  constructor() {
    super();
    this.state = { 
      data: [],
      showMe: true,
      id: null,
      tekst: null,
      value: '',
      hover: true,
      Qnumber: 0, 
      token: null
    };
  }

  async componentDidMount() {
    const response = await fetch('https://main-server-si.herokuapp.com/api/questions');
    const json = await response.json();
    const filteredJson = json.filter(json => json.answer.text===null);
    this.setState({ 
      data:  filteredJson,
      Qnumber: json.length 
    });
  }

  prikazi(id1){
    this.setState({
      showMe: !this.state.showMe,
      id: id1.id
    }) 
  }

  cancelBtn = () => {
    this.setState({
      showMe: !this.state.showMe,
      value: ''
    })
  }

  handleSubmit = () => {
    if (!this.state.value) {
      message.warning('Input field is empty!');
      return;
    }

    this.setState({
        value: ''
    });

    let privremena = getCookie("token");

    /*fetch('https://main-server-si.herokuapp.com/api/questions/' + this.state.id +'/answer', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer '+ privremena
      }, 
      body: JSON.stringify({
        text: this.state.value
      })
    })*/

      var ajax=new XMLHttpRequest();
      ajax.onreadystatechange=()=>{
        if (ajax.readyState == 4 && ajax.status == 200){
          let aodg=ajax.responseText;
          console.log(aodg);
        }
        if (ajax.readyState == 4 && ajax.status == 404)
          console.log('greska 404');
      }
      ajax.open("POST", 'https://main-server-si.herokuapp.com/api/questions/' + this.state.id +'/answer', true);
      //ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      ajax.setRequestHeader("Content-Type", "application/json");
      ajax.setRequestHeader("Authorization", "Bearer "+privremena);
      //ajax.send("{username=public1&password=password&role=ROLE_PRW}");
      let objekat={text:this.state.value};
      //let objekat={user:'root',password:'password'};
      ajax.send(JSON.stringify(objekat));
    
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  }

  handleMouseOver = () =>{
    this.setState({
      hover: !this.state.hover
    });
  }

  render() {

    const { value, Qnumber } = this.state;
    
    return (
      
   <Layout className="layout">
    <Header>
  
      <Menu
        theme="dark"
        mode="horizontal"
        selectable="true"
        defaultSelectedKeys={['2']}
      >

        <Menu.Item className="MenuItem" key="1" ></Menu.Item>
        
      </Menu>
    </Header>

    <Content  className="table" style={{ padding: '0 50px' }} >
      
      <div className="site-layout-content">
      <Table bordered dataSource={this.state.data}>
     
       <Column title="Number" dataIndex="id" key="id" width="7%"/>
      <Column title="Question" dataIndex="text" key="text" />
      <Column title="Author's email" dataIndex="authorEmail" key="authorEmail" width="11%"/>
      <Column title="Date" dataIndex="date" key="date" width="9%"/>
      <Column title="Response" dataIndex="answer" key="answer"/>
 
      <Column
        title="Action"
        key="id"
        width="9%"
        
        render={(text, record) => (
          <span>
            <a href={"https://c2.etf.unsa.ba/"+record.id}>Reply</a>
          </span>
        )}
      />
        
      </Table>


    <Content  className="table" style={{ padding: '30 30px' }} >
      <div class="AppQ">
        <div className="site-layout-content">
          <Table bordered dataSource={this.state.data}>
            <Column title="Number" dataIndex="id" key="id" width="7%"/>
            <Column title="Question" dataIndex="text" key="text" />
            <Column title="Response" dataIndex="answer" key="answer"/>
            <Column title="Action" key="id" width="10%"
              render={(text, record) => (
                <span>
                  <Button onClick = {() => {this.prikazi(record)}}>Reply</Button>
                </span>
              )}
            />
          </Table>
          </div>

          {
            this.state.showMe?null: <Editor onChange = {this.cancelBtn} onChange1={this.handleChange} onSubmit={this.handleSubmit} value={value} Qnumber={Qnumber}></Editor>
          }
        </div>
      </Content>
    </Layout>
    );
  }
}

let getCookie=(cname)=>{
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


export default UnansweredQuestions;