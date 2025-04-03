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

export type BuyurtmalarType = {
  items: [
    {
      id: number;
      customerId: number;
      totalPrice: number;
      status: string;
      createdAt: string;
      items: [
        {
          id: number;
          orderId: number;
          productId: number;
          quantity: number;
          price: number;
        }
      ];
    }
  ];
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
