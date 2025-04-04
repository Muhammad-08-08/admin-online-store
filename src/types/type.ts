export type MijozlarType = {
  createdAt: string;
  email: string;
  id: number;
  name: string;
  role: string;
  password: string;
  image: string;
}[];

export type ProductlarType = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  createdAt: string;
  imageUrl: string;
}[];

export type OrderProduct = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
};

export type BuyurtmalarItemType = {
  id: number;
  customerId: number;
  totalPrice: number;
  status: "pending" | "processing" | "delivered" | "cancelled";
  createdAt: string;
  items: OrderProduct[];
};

export type BuyurtmalarType = {
  items: BuyurtmalarItemType[];
  total: number;
  page: number;
  message: string;
};

export type CategoriesType = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}[];

export type BannerlarType = {
  id: number;
  title: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
}[];

export type DashboardType = {
  totalUsers: string;
  totalOrders: string;
  totalProducts: string;
  totalRevenue: string;
  recentOrders: {
    id: number;
    customerId: number;
    totalPrice: number;
    status: string;
    createdAt: string;
  }[];
};
