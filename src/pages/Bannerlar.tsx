import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Image, message, Switch, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../components/Api";
import BannerDrawer from "../components/BannerDrawer";
import useMyStore from "../store/my-store";
import { BannerlarType } from "../types/type";

function Bannerlar() {
  const state = useMyStore();
  const [bannerlar, setBannerlar] = useState<BannerlarType>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<Object>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const users = () => {
    setLoading(true);
    api
      .get("/api/banners?order=ASC")
      .then((response) => {
        setBannerlar(response.data.items);
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

  function onDeleted(id: number) {
    api
      .delete(`/api/banners/${id}`)
      .then(() => {
        message.success("Banner muvaffaqiyatli o'chirildi");
        setBannerlar((prev) => prev.filter((item) => item.id !== id));
      })
      .catch(() => {
        message.error("O'chirishda xatolik yuz berdi");
      });
  }

  return (
    <div className="p-6 w-full h-[640px] border-b border-b-gray-300 bg-white rounded-lg overflow-y-auto">
      <BannerDrawer
        nomi="Bannerlar"
        editItem={selectedUser}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        refresh={users}
      />
      <Table
        loading={loading}
        columns={[
          {
            title: "ID",
            dataIndex: "id",
            key: "id",
          },
          {
            title: "title",
            dataIndex: "title",
            key: "title",
          },
          {
            title: "isActive",
            dataIndex: "isActive",
            key: "isActive",
            render: (isActive, record) => {
              const handleToggle = (checked: boolean) => {
                setBannerlar((prev) =>
                  prev.map((item) =>
                    item.id === record.id
                      ? { ...item, isActive: checked }
                      : item
                  )
                );

                api
                  .patch(`/api/banners/${record.id}`, { isActive: checked })
                  .then(() => {
                    message.success(`Banner holati yangilandi`);
                  })
                  .catch(() => {
                    message.error(`Xatolik yuz berdi`);
                  });
              };
              return <Switch checked={isActive} onChange={handleToggle} />;
            },
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
            render: (image) => {
              return (
                <div>
                  <Image
                    width={70}
                    height={50}
                    src={image}
                    placeholder={
                      <Image preview={false} src={image} width={200} />
                    }
                  />
                </div>
              );
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
        dataSource={bannerlar}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        className="w-full"
      />
    </div>
  );
}

export default Bannerlar;
