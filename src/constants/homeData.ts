
  
  export const dailyDeals = [
    {
      id: 1,
      name: "Vintage Leather Watch",
      price: "$59.99",
      originalPrice: "$89.99",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
      endTime: Date.now() + 3 * 60 * 60 * 1000 + 25 * 60 * 1000 + 10 * 1000, // 3:25:10
    },
    {
      id: 2,
      name: "Handcrafted Ceramic Vase",
      price: "$24.99",
      originalPrice: "$34.99",
      image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&q=80",
      endTime: Date.now() + 8 * 60 * 60 * 1000 + 15 * 60 * 1000 + 45 * 1000, // 8:15:45
    },
    {
      id: 3,
      name: "Smart Home Hub",
      price: "$99.00",
      originalPrice: "$149.00",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80",
      endTime: Date.now() + 11 * 60 * 60 * 1000 + 59 * 60 * 1000 + 1 * 1000, // 11:59:01
    },
    {
      id: 4,
      name: "Retro Bluetooth Speaker",
      price: "$55.50",
      originalPrice: "$75.50",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80",
      endTime: Date.now() + 1 * 60 * 60 * 1000 + 40 * 60 * 1000 + 33 * 1000, // 1:40:33
    },
    {
      id: 5,
      name: "Modern Table Lamp",
      price: "$99.00",
      originalPrice: "$200.00",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80",
      endTime: Date.now() + 11 * 60 * 60 * 1000 + 59 * 60 * 1000 + 1 * 1000, // 11:59:01
    },
    {
      id: 6,
      name: "Designer Throw Pillow",
      price: "$45.00",
      originalPrice: "$89.00",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
      endTime: Date.now() + 5 * 60 * 60 * 1000 + 30 * 60 * 1000, // 5:30:00
    },
  ];
  
  export const featuredProducts = [
    {
      id: 1,
      name: "Vintage Leather Watch",
      price: "$89.99",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    },
    {
      id: 2,
      name: "Handcrafted Ceramic Vase",
      price: "$34.99",
      image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&q=80",
    },
    {
      id: 3,
      name: "Modern Table Lamp",
      price: "$149.00",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80",
    },
    {
      id: 4,
      name: "Organic Green Tea Set",
      price: "$25.00",
      image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=600&q=80",
    },
    {
      id: 5,
      name: "Minimalist Wall Clock",
      price: "$75.50",
      image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&q=80",
    },
    {
      id: 6,
      name: "Scandinavian Chair",
      price: "$189.99",
      image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=600&q=80",
    },
    {
      id: 7,
      name: "Designer Throw Pillow",
      price: "$45.00",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    },
    {
      id: 8,
      name: "Artisan Coffee Mug",
      price: "$28.50",
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80",
    },
  ];
  
  export const categories = [
    {
      id: 1,
      name: "New",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    },
    {
      id: 2,
      name: "Rugs",
      image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80",
    },
    {
      id: 3,
      name: "Furniture",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    },
    {
      id: 4,
      name: "Outdoor",
      image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
    },
    {
      id: 5,
      name: "Lighting",
      image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80",
    },
    {
      id: 6,
      name: "Couture",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    },
    {
      id: 7,
      name: "Pillows & Decor",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
    },
    {
      id: 8,
      name: "Kids & Pets",
      image: "https://images.unsplash.com/photo-1493106819501-66d381c466f1?w=800&q=80",
    },
    {
      id: 9,
      name: "Best Sellers",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    },
  ];
  
  export const  blogPosts = [
    {
      id: 1,
      title: "Top 10 Interior Design Trends for 2025",
      description: "Discover the latest trends transforming modern homes, from earthy tones to sustainable materials.",
      image: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800&q=80",
    },
    {
      id: 2,
      title: "How to Choose the Perfect Rug for Any Room",
      description: "Expert tips on selecting the right size, style, and material to elevate your space.",
      image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80",
    },
    {
      id: 3,
      title: "5 Easy Ways to Refresh Your Home Decor",
      description: "Give your living space a new look with these simple and affordable home decor tips.",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
    },
  ];
  
  export const trendingProducts = [
    { 
      id: 1, 
      name: "Velvet Armchair", 
      image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80" 
    },
    { 
      id: 2, 
      name: "Ceramic Table Lamp", 
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80" 
    },
    { 
      id: 3, 
      name: "Marble Coffee Table", 
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80" 
    },
    { 
      id: 4, 
      name: "Decorative Mirror", 
      image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80" 
    },
    { 
      id: 5, 
      name: "Textured Throw Pillow", 
      image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&q=80" 
    },
    { 
      id: 6, 
      name: "Botanical Wall Art", 
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600&q=80" 
    },
    { 
      id: 7, 
      name: "Woven Area Rug", 
      image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=600&q=80" 
    },
    { 
      id: 8, 
      name: "Crystal Chandelier", 
      image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&q=80" 
    },
  ];
  
  export const newsletterFeatures = [
    {
      id: 1,
      icon: "https://c.animaapp.com/mh20425b25ZY2I/img/overlay-shadow-1.svg",
      title: "Weekly articles",
      description: "Stay informed with our curated content on the latest trends and products.",
    },
    {
      id: 2,
      icon: "https://c.animaapp.com/mh20425b25ZY2I/img/overlay-shadow.svg",
      title: "Exclusive promotions",
      description: "Get access to subscriber-only deals and early bird offers.",
    },
  ];
  
  export const socialLinks = [
    { id: 1, icon: "https://c.animaapp.com/mh20425b25ZY2I/img/link-2.svg", alt: "Facebook" },
    { id: 2, icon: "https://c.animaapp.com/mh20425b25ZY2I/img/link.svg", alt: "Twitter" },
    { id: 3, icon: "https://c.animaapp.com/mh20425b25ZY2I/img/link-1.svg", alt: "Instagram" },
    { id: 4, icon: "https://c.animaapp.com/mh20425b25ZY2I/img/link-3.svg", alt: "LinkedIn" },
  ];
  