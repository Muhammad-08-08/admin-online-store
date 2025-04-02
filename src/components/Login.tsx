import { Button, Card, Form, Input, message } from "antd";
import axios from "axios";
import { default as UseMyStore } from "../store/my-store";
import api from "./Api";

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl bg-white">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <Form
          layout="vertical"
          onFinish={(values) => {
            console.log(values);
            axios
              .post("https://nt.softly.uz/api/auth/login", values)
              .then((response) => {
                message.success("Muvaffaqqiyatli");
                UseMyStore.setState({
                  user: response.data.user,
                  accessToken: response.data.accessToken,
                });
                api.defaults.headers.Authorization = `Bearer ${response.data.accessToken}`;
                localStorage.setItem(
                  "yangi_login",
                  JSON.stringify(response.data)
                );
              });
          }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email kiriting!" }]}
          >
            <Input
              placeholder="Email kiriting"
              className="p-2 rounded-md border border-gray-300"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Parol kiriting!" }]}
          >
            <Input.Password
              placeholder="Password kiriting"
              className="p-2 rounded-md border border-gray-300"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-2 rounded-md"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
