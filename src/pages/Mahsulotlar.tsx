import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductDrawer from "../components/ProductDrawer";
import Loader from "../components/loader";
import useMyStore from "../store/my-store";
import { ProductlarType } from "../types/type";

function Productlar() {
  const accessToken = useMyStore((state) => state.accessToken);
  const [Productlar, setProductlar] = useState<ProductlarType>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<Object>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const users = () => {
    setLoading(true);
    axios
      .get("https://nt.softly.uz/api/products?order=ASC", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setProductlar(response.data.items);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    users();
  }, []);

  if (loading) {
    return (
      <div className="fixed w-[100vw] h-[100vh] bg-white flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  function onDeleted(id: number) {
    axios
      .delete(`https://nt.softly.uz/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        message.success("Mahsulot muvaffaqiyatli o'chirildi");
        setProductlar((prev) => prev.filter((item) => item.id !== id));
      })
      .catch(() => {
        message.error("O'chirishda xatolik yuz berdi");
      });
  }

  return (
    <div className="p-6 w-full h-[640px] border-b border-b-gray-300 bg-white rounded-lg overflow-y-auto">
      <ProductDrawer
        nomi="Productlar"
        editItem={selectedUser}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        refresh={users}
      />
      <Table
        columns={[
          {
            title: "ID",
            dataIndex: "id",
            key: "id",
          },
          {
            title: "Ism",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Price",
            dataIndex: "price",
            key: "price",
          },
          {
            title: "Yaratilgan sana",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (item: string) => {
              const date = new Date(item);
              const day = String(date.getDate()).padStart(2, "0");
              const month = String(date.getMonth() + 1).padStart(2, "0");
              const year = date.getFullYear();
              return `${day}.${month}.${year}`;
            },
          },
          {
            title: "image",
            dataIndex: "imageUrl",
            key: "imageUrl",
            render: (imageUrl) => {
              return <img className="w-20 h-12" src={imageUrl} alt="img" />;
            },
          },
          {
            title: "Boshqalar",
            dataIndex: "id",
            key: "id",
            render: (id: number, rent) => {
              return (
                <div className="flex gap-2 items-center">
                  <Button
                    onClick={() => {
                      setSelectedUser(rent);
                      setIsOpen(true);
                    }}
                  >
                    <EditOutlined />
                  </Button>
                  <Button onClick={() => onDeleted(id)} danger>
                    <DeleteOutlined />
                  </Button>
                </div>
              );
            },
          },
        ]}
        dataSource={Productlar}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        className="w-full"
      />
    </div>
  );
}

export default Productlar;
