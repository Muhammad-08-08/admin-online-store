import { Button, Drawer, Form, Input, InputNumber, message } from "antd";
import axios from "axios";
import useMyStore from "../store/my-store";
import { useEffect, useState } from "react";

function ProductDrawer({
  editItem,
  setIsOpen,
  isOpen,
  nomi,
  refresh,
}: {
  editItem?: any;
  setIsOpen: any;
  refresh: any;
  isOpen: boolean;
  nomi: string;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  const [form] = Form.useForm();
  const accessToken = useMyStore((state) => state.accessToken);

  useEffect(() => {
    if (editItem) {
      form.setFieldsValue(editItem);
    } else {
      form.resetFields();
    }
  }, [editItem, isOpen]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const url = editItem?.id
      ? `https://nt.softly.uz/api/products/${editItem.id}`
      : `https://nt.softly.uz/api/products`;
    const method = editItem?.id ? "PATCH" : "POST";

    const productData = {
      name: values.name,
      description: values.description || "",
      price: Number(values.price),
      stock: Number(values.stock),
      categoryId: Number(values.categoryId),
      imageUrl: values.imageUrl || "",
    };

    console.log("📤 Jo'natilayotgan ma'lumot:", productData);

    try {
      const response = await axios({
        method,
        url,
        data: productData,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      console.log("✅ Serverdan kelgan javob:", response.data);

      message.success(
        editItem?.id
          ? "Mahsulot muvaffaqiyatli yangilandi"
          : "Mahsulot muvaffaqiyatli qo'shildi"
      );
      refresh?.();
      setIsOpen(false);
      form.resetFields();
    } catch (error: any) {
      console.error("❌ Xatolik:", error.response?.data || error.message);
      message.error(
        error.response?.data?.message ||
          "Xatolik yuz berdi, qayta urinib ko‘ring!"
      );
    } finally {
      setLoading(false);
    }
  };

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
            label="Nomi"
            name="name"
            rules={[{ required: true, message: "Nomini kiriting" }]}
          >
            <Input placeholder="Product nomini kiriting" />
          </Form.Item>
          <Form.Item
            label="Narx"
            name="price"
            rules={[
              {
                required: true,
                message: "Narxini kiriting",
              },
            ]}
          >
            <InputNumber placeholder="narxini kiriting" />
          </Form.Item>
          <Form.Item label="description" name="description">
            <Input placeholder="Tarif bering" />
          </Form.Item>
          <Form.Item label="Aksiya" name="stock" rules={[{ required: true }]}>
            <InputNumber placeholder="Aksiya" />
          </Form.Item>
          <Form.Item
            label="categoryId"
            name="categoryId"
            rules={[{ required: true, message: "categoryId kiriting" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item label="Image" name="imageUrl">
            <Input placeholder="image joylang" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {editItem ? "Tahrirlash" : "Qo'shish"}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default ProductDrawer;
