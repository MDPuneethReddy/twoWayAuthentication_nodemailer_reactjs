import { navigate, RouteComponentProps } from "@reach/router"
import React from "react"
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from "axios";

interface Iprops extends RouteComponentProps{

}
export const Login=(props:Iprops)=>{
    const onFinish = (values: any) => {
      console.log(values)
        axios.post("http://localhost:3333/api/loginUser",
          values
        ).then(response=>{
          console.log(response)
          message.success("Login Successful");
          navigate("/Application")
        }).catch(error=>{
          message.error("Entered email or password is not correct");
          message.error("First time click on register now");
        })
      };
      
    
    return(
        <div style={{textAlign: "center"}}>
        <h1 >Login Page</h1>
        <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item name={['user', 'email']}rules={[{ type: 'email' }]}>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="./Registration">register now!</a>
      </Form.Item>
    </Form>
    </div>
    )
}