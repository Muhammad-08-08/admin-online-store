import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../components/Api";
import CategoriesDrawer from "../components/CategoriesDrawer";
import Loader from "../components/loader";
import useMyStore from "../store/my-store";
import { CategoriesType } from "../types/type";

function Kategoriyalar() {
  const state = useMyStore();
  const [Kategoriyalar, setKategoriyalar] = useState<CategoriesType>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<Object>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const users = () => {
    setLoading(true);
    api
      .get("/api/categories?order=ASC")
      .then((response) => {
        setKategoriyalar(response.data.items);
      })
      .catch((error) => {
        if (error.status === 401) {
          state.logout();
        }
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
    api
      .delete(`/api/categories/${id}`)
      .then(() => {
        message.success("Kategoriya muvaffaqiyatli o'chirildi");
        setKategoriyalar((prev) => prev.filter((item) => item.id !== id));
      })
      .catch(() => {
        message.error("O'chirishda xatolik yuz berdi");
      });
  }

  return (
    <div className="p-6 w-full h-[640px] border-b border-b-gray-300 bg-white rounded-lg overflow-y-auto">
      <CategoriesDrawer
        nomi="Kategoriyalar"
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
            title: "description",
            dataIndex: "description",
            key: "description",
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
        dataSource={Kategoriyalar}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        className="w-full"
      />
    </div>
  );
}

export default Kategoriyalar;
