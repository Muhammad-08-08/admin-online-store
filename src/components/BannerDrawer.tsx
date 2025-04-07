import { Button, Drawer, Form, Input, message, Switch } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import useMyStore from "../store/my-store";

function BannerDrawer({
  nomi,
  editItem,
  isOpen,
  setIsOpen,
  refresh,
}: {
  nomi: string;
  editItem?: any;
  isOpen: boolean;
  setIsOpen: any;
  refresh: () => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  const [form] = Form.useForm();
  const accessToken = useMyStore((state) => state.accessToken);

  useEffect(() => {
    if (editItem) {
      form.setFieldsValue(editItem);
    } else {
      form.resetFields();
      form.setFieldsValue({ title: "", imageUrl: "", isActive: false });
    }
  }, [editItem, isOpen]);

  function handleSubmit(values: any) {
    setLoading(true);
    const userData = {
      title: values.title,
      imageUrl: values.imageUrl,
      isActive: values.isActive === true,
    };

    const url = editItem?.id
      ? `https://nt.softly.uz/api/banners/${editItem.id}`
      : `https://nt.softly.uz/api/banners`;
    const method = editItem?.id ? "PATCH" : "post";

    axios({
      url: url,
      method: method,
      data: userData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(() => {
        message.success(
          editItem?.id
            ? "Banner muvaffaqiyatli yangilandi"
            : "Banner muvaffaqiyatli qo'shildi"
        );
        form.resetFields();
        setIsOpen(false);
        refresh();
      })
      .catch(() => {
        message.error("Bannerni saqlashda xatolik");
      })
      .finally(() => {
        setLoading(false);
        form.resetFields();
      });
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-4">{nomi}</h2>
        <Button type="primary" onClick={() => setIsOpen(true)}>
          {editItem ? "Tahrirlash" : "Qo'shish"}
        </Button>
      </div>
      <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Title kiriting"
            name="title"
            rules={[{ required: true, message: "Title kiritish majburiy!" }]}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            label="isActive kiriting"
            name="isActive"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label="Image kiriting"
            name="imageUrl"
            rules={[{ required: true }]}
          >
            <Input placeholder="Image URL" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {editItem ? "Yangilash" : "Qo'shish"}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default BannerDrawer;
