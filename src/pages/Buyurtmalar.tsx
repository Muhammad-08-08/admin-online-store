import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductDrawer from "../components/ProductDrawer";
import Loader from "../components/loader";
import useMyStore from "../store/my-store";
import { BuyurtmalarType } from "../types/type";

function Buyurtmalar() {
  const accessToken = useMyStore((state) => state.accessToken);
  const [Buyurtmalar, setBuyurtmalar] = useState<BuyurtmalarType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<Object>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const users = () => {
    setLoading(true);
    axios
      .get("https://nt.softly.uz/api/orders?limit=10&page=1&order=ASC", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setBuyurtmalar(response.data);
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
        message.success("Mahsulot muvaffaqiyatli o‘chirildi");

        setBuyurtmalar((prev: any) => {
          if (!prev) return prev;
          return {
            ...prev,
            items: prev.items.filter((item: any) => item.id !== id),
          };
        });
      })
      .catch(() => {
        message.error("O‘chirishda xatolik yuz berdi");
      });
  }

  console.log("jhbhjh", Buyurtmalar);

  return (
    <div className="p-6 w-full h-[640px] border-b border-b-gray-300 bg-white rounded-lg overflow-y-auto">
      <ProductDrawer
        nomi="Buyurtmalar"
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
            title: "customerId",
            dataIndex: "customerId",
            key: "customerId",
          },
          {
            title: "totalPrice",
            dataIndex: "totalPrice",
            key: "totalPrice",
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
            title: "status",
            dataIndex: "status",
            key: "status",
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
        dataSource={Buyurtmalar?.items || []}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        className="w-full"
      />
    </div>
  );
}

export default Buyurtmalar;
