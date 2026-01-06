export interface Product {
    id: string;
    name: string;
    category: string;
    price: string;
    numericPrice: number;
    filters: string[];
    image: string;
  }
  
  export const allProducts: Product[] = [
    {
      id: "p1",
      name: "Classic Cotton T-shirt",
      category: "apparel",
      price: "$25.00",
      numericPrice: 25,
      filters: ["cotton", "men"],
      image: "https://picsum.photos/600/600?random=10",
    },
    {
      id: "p2",
      name: "Linen Summer Dress",
      category: "apparel",
      price: "$48.00",
      numericPrice: 48,
      filters: ["linen", "women"],
      image: "https://picsum.photos/600/600?random=11",
    },
    {
      id: "p3",
      name: "Leather Wallet",
      category: "accessories",
      price: "$39.00",
      numericPrice: 39,
      filters: ["leather", "unisex"],
      image: "https://picsum.photos/600/600?random=12",
    },
    {
      id: "p4",
      name: "Ceramic Vase",
      category: "home",
      price: "$29.00",
      numericPrice: 29,
      filters: ["ceramic", "decor"],
      image: "https://picsum.photos/600/600?random=13",
    },
  ];
  