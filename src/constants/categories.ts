export interface Category {
    id: string;
    slug: string;
    name: string;
    description: string;
    image: string;
  }
  
  export const categories: Category[] = [
    {
      id: "1",
      slug: "apparel",
      name: "Apparel",
      description: "Fashion for every season",
      image: "https://picsum.photos/600/400?random=1",
    },
    {
      id: "2",
      slug: "accessories",
      name: "Accessories",
      description: "Complete your look",
      image: "https://picsum.photos/600/400?random=2",
    },
    {
      id: "3",
      slug: "home",
      name: "Home & Living",
      description: "Design your perfect space",
      image: "https://picsum.photos/600/400?random=3",
    },
  ];
  