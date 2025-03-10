interface Product {
    id: number
    name: string
    image: string
    price: number
    oldPrice?: number
    hasVariants: boolean
    rating?: number
    reviews?: number
    discount?: number | null;
    isNew?: boolean
  }

  const products = [
    {
      id: 1,
      name: "Nivea Perfect & Radiant Luminous630 Anti Dark Marks Day Cream SPF50",
      image: "/nivea-oil.webp",
      price: 1299,
      originalPrice: 1499,
      rating: 4.5,
      reviews: 128,
      discount: 25,
      isNew: true,
      hasVariants: false
    },
    {
      id: 2,
      name: "CeraVe Hydrating Facial Cleanser 236ml",
      image: "/cerave-oil.webp",
      price: 2500,
      originalPrice: 2800,
      rating: 4.2,
      reviews: 324,
      discount: 10,
      isNew: false,
      hasVariants: false
    },
    {
      id: 3,
      name: "Neutrogena Hydro Boost Water Gel Moisturizer 50ml",
      image: "/Neutrogena-oil.jpg",
      price: 3200,
      originalPrice: 3500,
      rating: 4.7,
      reviews: 259,
      discount: 8,
      isNew: false,
      hasVariants: false
    },
    {
      id: 4,
      name: "Cetaphil Gentle Skin Cleanser 500ml",
      image: "/Cetaphil-oil.webp",
      price: 3700,
      originalPrice: 4000,
      rating: 4.8,
      reviews: 452,
      discount: 7,
      isNew: false,
      hasVariants: false
    },
    {
      id: 5,
      name: "The Ordinary Niacinamide 10% + Zinc 1% Serum 30ml",
      image: "/Niacinamide-oil.jpeg",
      price: 1800,
      originalPrice: 2000,
      rating: 4.6,
      reviews: 568,
      discount: 10,
      isNew: false,
      hasVariants: false
    },
    {
      id: 6,
      name: "Eucerin Advanced Repair Lotion 500ml",
      image: "/Eucerin-oil.webp",
      price: 4200,
      originalPrice: 4500,
      rating: 4.3,
      reviews: 211,
      discount: null,
      isNew: false,
      hasVariants: true
    },
    {
      id: 7,
      name: "La Roche-Posay Effaclar Duo+ Acne Treatment 40ml",
      image: "/La Roche-Posay-oil.webp",
      price: 3500,
      originalPrice: 3800,
      rating: 4.4,
      reviews: 178,
      discount: 15,
      isNew: true,
      hasVariants: false
    },
    {
      id: 8,
      name: "Garnier Even & Matte Vitamin C Booster Serum 30ml",
      image: "/Garnier Even-oil.jpg",
      price: 1500,
      originalPrice: 1700,
      rating: 4.0,
      reviews: 95,
      discount: 12,
      isNew: false,
      hasVariants: false
    },
    {
      id: 9,
      name: "Simple Kind to Skin Hydrating Light Moisturiser 125ml",
      image: "/Simple Kind to Skin Hydrating-oil.jpeg",
      price: 1200,
      originalPrice: 1400,
      rating: 4.1,
      reviews: 132,
      discount: 20,
      isNew: false,
      hasVariants: false
    },
    {
      id: 10,
      name: "Aveeno Daily Moisturizing Lotion 354ml",
      image: "/Aveeno-oil.jpg",
      price: 2800,
      originalPrice: 3100,
      rating: 4.7,
      reviews: 320,
      discount: 10,
      isNew: false,
      hasVariants: false
    },
    {
      id: 11,
      name: "Nivea Men Sensitive Skin After Shave Balm 100ml",
      image: "/nivea-oil-2.webp",
      price: 1499,
      originalPrice: 1799,
      rating: 4.3,
      reviews: 87,
      discount: 15,
      isNew: true,
      hasVariants: false
    },
    {
      id: 12,
      name: "CeraVe Moisturizing Cream 539g",
      image: "/cerave-oil.webp",
      price: 4100,
      originalPrice: 4500,
      rating: 4.9,
      reviews: 782,
      discount: 9,
      isNew: false,
      hasVariants: true
    },
    {
      id: 13,
      name: "Neutrogena Oil-Free Acne Wash 177ml",
      image: "/Neutrogena-oil.jpg",
      price: 1850,
      originalPrice: 2000,
      rating: 4.2,
      reviews: 254,
      discount: 7,
      isNew: false,
      hasVariants: false
    },
    {
      id: 14,
      name: "The Ordinary AHA 30% + BHA 2% Peeling Solution 30ml",
      image: "/Niacinamide-oil.jpeg",
      price: 1950,
      originalPrice: 2200,
      rating: 4.6,
      reviews: 614,
      discount: 12,
      isNew: true,
      hasVariants: false
    },
    {
      id: 15,
      name: "La Roche-Posay Anthelios Ultra-Light Sunscreen SPF 60 50ml",
      image: "/La Roche-Posay-oil.webp",
      price: 3950,
      originalPrice: 4200,
      rating: 4.8,
      reviews: 342,
      discount: 6,
      isNew: false,
      hasVariants: false
    },
    {
      id: 16,
      name: "Cetaphil Daily Facial Moisturizer with SPF 15 118ml",
      image: "/Cetaphil-oil.webp",
      price: 2950,
      originalPrice: 3200,
      rating: 4.4,
      reviews: 198,
      discount: 8,
      isNew: false,
      hasVariants: false
    },
    {
      id: 17,
      name: "Eucerin Original Healing Cream 454g",
      image: "/Eucerin-oil.webp",
      price: 3850,
      originalPrice: 4100,
      rating: 4.7,
      reviews: 267,
      discount: 6,
      isNew: false,
      hasVariants: true
    },
    {
      id: 18,
      name: "Garnier SkinActive Micellar Cleansing Water 400ml",
      image: "/Garnier Even-oil.jpg",
      price: 1650,
      originalPrice: 1800,
      rating: 4.5,
      reviews: 328,
      discount: 8,
      isNew: true,
      hasVariants: false
    },
    {
      id: 19,
      name: "Simple Kind to Skin Facial Wipes 25 pack",
      image: "/Simple Kind to Skin Hydrating-oil.jpeg",
      price: 950,
      originalPrice: 1100,
      rating: 4.0,
      reviews: 112,
      discount: 15,
      isNew: false,
      hasVariants: false
    },
    {
      id: 20,
      name: "Aveeno Positively Radiant Daily Moisturizer SPF 30 75ml",
      image: "/Aveeno-oil.jpg",
      price: 3150,
      originalPrice: 3400,
      rating: 4.6,
      reviews: 218,
      discount: 7,
      isNew: false,
      hasVariants: false
    }
  ];
  
export default products;
export type { Product }