interface Brand {
  id: number
  name: string
  logo: string
  description: string
  productCount: number
  featuredProducts: number[] // References to product IDs
  categories: string[]
  established?: string
  origin?: string
}

interface Product {
  id: number
  name: string
  brand: string
  price: number
  oldPrice?: number
  description: string
  images: { id: number; url: string }[]
  stock: number
  hasVariants: boolean
  rating?: number
  reviews?: Review[]
  discount?: number | null
  isNew?: boolean
  info: ProductInfo
}

interface ProductInfo {
  details: string
  ingredients: string
  howToUse: string
  specifications?: { [key: string]: string }
}

interface Review {
  id: number
  user: string
  rating: number
  comment: string
  date: string
}

interface CartItem {
  id: number
  productId: number
  name: string
  price: number
  oldPrice?: number
  image: string
  quantity: number
  stock: number
  deliveryDate: string
}

interface WishlistItem {
  id: number
  productId: number
  name: string
  price: number
  oldPrice?: number
  image: string
  inStock: boolean
  rating: number
  reviewCount: number
}

const brands: Brand[] = [
  {
    id: 1,
    name: "Nice & Lovely",
    logo: "/nice-and-lovely.png",
    description: "Quality skincare products for everyday use",
    productCount: 22,
    featuredProducts: [3, 16],
    categories: ["Skincare", "Body Care", "Baby Care"],
    established: "1995",
    origin: "Kenya"
  },
  {
    id: 2,
    name: "Nivea",
    logo: "/nivea.png",
    description: "Trusted skincare since 1911",
    productCount: 45,
    featuredProducts: [1, 11],
    categories: ["Skincare", "Body Care", "Sun Protection"],
    established: "1911",
    origin: "Germany"
  },
  {
    id: 3,
    name: "Garnier",
    logo: "/garnier.jpg",
    description: "Natural beauty products powered by science",
    productCount: 38,
    featuredProducts: [8, 18],
    categories: ["Haircare", "Skincare", "Cleansers"],
    established: "1904",
    origin: "France"
  },
  {
    id: 4,
    name: "L'Oreal",
    logo: "/loreal.webp",
    description: "Because you're worth it",
    productCount: 52,
    featuredProducts: [7, 14],
    categories: ["Haircare", "Skincare", "Makeup"],
    established: "1909",
    origin: "France"
  },
  {
    id: 5,
    name: "Maybelline",
    logo: "/maybelline-new-york.webp",
    description: "Maybe she's born with it",
    productCount: 34,
    featuredProducts: [5, 15],
    categories: ["Makeup", "Cosmetics", "Eye Care"],
    established: "1915",
    origin: "United States"
  },
  {
    id: 6,
    name: "MAC",
    logo: "/MAC_Cosmetics.png",
    description: "Professional quality makeup for all",
    productCount: 28,
    featuredProducts: [9, 19],
    categories: ["Makeup", "Cosmetics", "Professional"],
    established: "1984",
    origin: "Canada"
  },
  {
    id: 7,
    name: "Neutrogena",
    logo: "/neutrogena.png",
    description: "Dermatologist recommended skincare",
    productCount: 40,
    featuredProducts: [3, 13],
    categories: ["Skincare", "Cleansers", "Acne Care"],
    established: "1930",
    origin: "United States"
  },
  {
    id: 8,
    name: "Dove",
    logo: "/Dove.png",
    description: "Real beauty for real people",
    productCount: 25,
    featuredProducts: [6, 17],
    categories: ["Body Care", "Haircare", "Deodorants"],
    established: "1957",
    origin: "United Kingdom"
  },
  {
    id: 9,
    name: "CeraVe",
    logo: "/cerave.png",
    description: "Developed with dermatologists",
    productCount: 30,
    featuredProducts: [2, 12],
    categories: ["Skincare", "Cleansers", "Moisturizers"],
    established: "2005",
    origin: "United States"
  },
  {
    id: 10,
    name: "The Ordinary",
    logo: "/the-ordinary.png",
    description: "Clinical formulations with integrity",
    productCount: 32,
    featuredProducts: [5, 14],
    categories: ["Skincare", "Serums", "Treatments"],
    established: "2013",
    origin: "Canada"
  }
]

const products: Product[] = [
  {
    id: 1,
    name: "Nivea Perfect & Radiant Luminous630 Anti Dark Marks Day Cream SPF50",
    brand: "Nivea",
    price: 1299,
    oldPrice: 1499,
    description: "This innovative day cream with SPF50 helps reduce the appearance of dark marks and prevents new ones from forming. Enriched with Luminous630®, it provides advanced protection against UV damage.",
    images: [
      { id: 1, url: "/products/nivea/nivea-luminous-1.webp" },
      { id: 2, url: "/products/nivea/nivea-luminous-2.webp" },
      { id: 3, url: "/products/nivea/nivea-luminous-3.webp" }
    ],
    stock: 10,
    hasVariants: false,
    rating: 4.5,
    discount: 13,
    isNew: true,
    info: {
      details: `• Innovative formula with Luminous630®
        • SPF50 protection against UV damage
        • Helps reduce dark marks
        • Prevents new dark marks from forming
        • Suitable for all skin types
        • Dermatologically tested`,
      ingredients: "Aqua, Homosalate, Alcohol Denat., Butyl Methoxydibenzoylmethane, Ethylhexyl Salicylate, Octocrylene...",
      howToUse: "Apply evenly to face and neck every morning after cleansing. Gently massage in circular motions until absorbed. Use before sun exposure.",
      specifications: {
        "Size": "50ml",
        "Skin Type": "All Skin Types",
        "SPF": "50",
        "Package Type": "Jar"
      }
    },
    reviews: [
      {
        id: 1,
        user: "Sarah K.",
        rating: 5,
        comment: "Amazing product! Saw results within weeks of use.",
        date: "2024-03-01"
      },
      {
        id: 2,
        user: "John M.",
        rating: 4,
        comment: "Good texture, absorbs quickly. Pleasant scent.",
        date: "2024-02-28"
      }
    ]
  },
  {
    id: 2,
    name: "CeraVe Hydrating Facial Cleanser 236ml",
    brand: "CeraVe",
    price: 2500,
    oldPrice: 2800,
    description: "A gentle, non-foaming cleanser that hydrates while it cleanses. Formulated with essential ceramides and hyaluronic acid to help restore the skin's natural barrier and retain moisture.",
    images: [
      { id: 1, url: "/products/cerave/cerave-cleanser-1.webp" },
      { id: 2, url: "/products/cerave/cerave-cleanser-2.webp" },
      { id: 3, url: "/products/cerave/cerave-cleanser-3.webp" }
    ],
    stock: 15,
    hasVariants: false,
    rating: 4.2,
    discount: 10,
    isNew: false,
    info: {
      details: `• Developed with dermatologists
        • Fragrance-free and non-comedogenic
        • Contains 3 essential ceramides
        • With hyaluronic acid for hydration
        • Suitable for normal to dry skin
        • Gentle, non-irritating formula`,
      ingredients: "Aqua, Glycerin, Cetearyl Alcohol, Phenoxyethanol, Stearyl Alcohol, Cetyl Alcohol, Peg-40 Stearate, Behentrimonium Methosulfate...",
      howToUse: "Apply to damp skin and massage gently. Rinse thoroughly with warm water. Use morning and evening.",
      specifications: {
        "Size": "236ml",
        "Skin Type": "Normal to Dry",
        "Formulation": "Cream Cleanser",
        "Package Type": "Pump Bottle"
      }
    },
    reviews: [
      {
        id: 1,
        user: "Amy L.",
        rating: 5,
        comment: "Perfect for my sensitive skin. No irritation at all!",
        date: "2024-02-15"
      },
      {
        id: 2,
        user: "David P.",
        rating: 4,
        comment: "Very gentle and effective. Doesn't strip my skin.",
        date: "2024-02-10"
      }
    ]
  },
  {
    id: 3,
    name: "Neutrogena Hydro Boost Water Gel Moisturizer 50ml",
    brand: "Neutrogena",
    price: 3200,
    oldPrice: 3500,
    description: "A lightweight, water-based gel moisturizer that instantly quenches dry skin and keeps it looking smooth, supple, and hydrated all day. Formulated with hyaluronic acid, a hydrator found naturally in the skin.",
    images: [
      { id: 1, url: "/products/neutrogena/neutrogena-hydro-1.jpg" },
      { id: 2, url: "/products/neutrogena/neutrogena-hydro-2.jpg" },
      { id: 3, url: "/products/neutrogena/neutrogena-hydro-3.jpg" }
    ],
    stock: 8,
    hasVariants: false,
    rating: 4.7,
    discount: 8,
    isNew: false,
    info: {
      details: `• Oil-free formula
        • Contains hyaluronic acid
        • Dermatologist recommended
        • Absorbs quickly
        • Non-comedogenic
        • Suitable for sensitive skin`,
      ingredients: "Water, Dimethicone, Glycerin, Dimethicone/Vinyl Dimethicone Crosspolymer, Sodium Hyaluronate, Phenoxyethanol...",
      howToUse: "Apply twice daily to face and neck after cleansing. Can be used under makeup as a primer.",
      specifications: {
        "Size": "50ml",
        "Skin Type": "All Skin Types",
        "Formulation": "Water Gel",
        "Package Type": "Jar"
      }
    },
    reviews: [
      {
        id: 1,
        user: "Rebecca T.",
        rating: 5,
        comment: "My holy grail moisturizer! Perfect for summer.",
        date: "2024-01-20"
      },
      {
        id: 2,
        user: "Michael S.",
        rating: 4,
        comment: "Lightweight and refreshing. Great for oily skin.",
        date: "2024-01-15"
      }
    ]
  },
  {
    id: 4,
    name: "Cetaphil Gentle Skin Cleanser 500ml",
    brand: "Cetaphil",
    price: 3700,
    oldPrice: 4000,
    description: "A mild, soap-free cleanser that gently cleanses without stripping the skin of its natural protective oils or emollients. Ideal for sensitive skin and suitable for use on face, hands, and body.",
    images: [
      { id: 1, url: "/products/cetaphil/cetaphil-cleanser-1.webp" },
      { id: 2, url: "/products/cetaphil/cetaphil-cleanser-2.webp" },
      { id: 3, url: "/products/cetaphil/cetaphil-cleanser-3.webp" }
    ],
    stock: 12,
    hasVariants: false,
    rating: 4.8,
    discount: 7,
    isNew: false,
    info: {
      details: `• Soap-free and fragrance-free
        • Hypoallergenic
        • Non-comedogenic
        • pH balanced
        • Clinically proven gentle
        • Suitable for all skin types`,
      ingredients: "Water, Cetyl Alcohol, Propylene Glycol, Sodium Lauryl Sulfate, Stearyl Alcohol, Methylparaben, Propylparaben, Butylparaben...",
      howToUse: "Apply to damp skin and massage gently. Rinse or wipe off with a soft cloth. Use morning and evening.",
      specifications: {
        "Size": "500ml",
        "Skin Type": "All Skin Types, Sensitive",
        "Formulation": "Lotion Cleanser",
        "Package Type": "Pump Bottle"
      }
    },
    reviews: [
      {
        id: 1,
        user: "Emily W.",
        rating: 5,
        comment: "Used this for years. Never irritates my sensitive skin.",
        date: "2024-02-05"
      },
      {
        id: 2,
        user: "Brian L.",
        rating: 5,
        comment: "My dermatologist recommended this and it's perfect.",
        date: "2024-01-25"
      }
    ]
  },
  {
    id: 5,
    name: "The Ordinary Niacinamide 10% + Zinc 1% Serum 30ml",
    brand: "The Ordinary",
    price: 1800,
    oldPrice: 2000,
    description: "A high-strength vitamin and mineral blemish formula that helps reduce the appearance of blemishes and congestion while balancing visible sebum activity.",
    images: [
      { id: 1, url: "/products/the-ordinary/niacinamide-1.jpg" },
      { id: 2, url: "/products/the-ordinary/niacinamide-2.jpg" },
      { id: 3, url: "/products/the-ordinary/niacinamide-3.jpg" }
    ],
    stock: 20,
    hasVariants: false,
    rating: 4.6,
    discount: 10,
    isNew: false,
    info: {
      details: `• Contains 10% Niacinamide and 1% Zinc
        • Reduces blemishes and congestion
        • Balances sebum activity
        • Suitable for all skin types
        • Vegan and cruelty-free`,
      ingredients: "Aqua, Niacinamide, Pentylene Glycol, Zinc PCA, Dimethyl Isosorbide, Tamarindus Indica Seed Gum...",
      howToUse: "Apply a few drops to the face in the morning and evening after cleansing. Avoid the eye area.",
      specifications: {
        "Size": "30ml",
        "Skin Type": "All Skin Types",
        "Formulation": "Serum",
        "Package Type": "Dropper Bottle"
      }
    },
    reviews: [
      {
        id: 1,
        user: "Laura B.",
        rating: 5,
        comment: "This serum cleared my skin in just 2 weeks!",
        date: "2024-03-10"
      },
      {
        id: 2,
        user: "Chris T.",
        rating: 4,
        comment: "Great for oily skin. Helps control shine.",
        date: "2024-03-05"
      }
    ]
  },
  {
    id: 6,
    name: "Eucerin Advanced Repair Lotion 500ml",
    brand: "Eucerin",
    price: 4200,
    oldPrice: 4500,
    description: "A fast-absorbing, fragrance-free lotion that provides 48-hour hydration and helps repair very dry skin. Enriched with ceramides and natural moisturizing factors.",
    images: [
      { id: 1, url: "/products/eucerin/advanced-repair-1.webp" },
      { id: 2, url: "/products/eucerin/advanced-repair-2.webp" },
      { id: 3, url: "/products/eucerin/advanced-repair-3.webp" }
    ],
    stock: 18,
    hasVariants: true,
    rating: 4.3,
    discount: null,
    isNew: false,
    info: {
      details: `• Provides 48-hour hydration
        • Repairs very dry skin
        • Enriched with ceramides
        • Fragrance-free and non-greasy
        • Suitable for sensitive skin`,
      ingredients: "Aqua, Urea, Glycerin, Caprylic/Capric Triglyceride, Butyrospermum Parkii Butter, Glyceryl Glucoside...",
      howToUse: "Apply generously to the body as needed. Massage gently until absorbed.",
      specifications: {
        "Size": "500ml",
        "Skin Type": "Dry, Sensitive",
        "Formulation": "Lotion",
        "Package Type": "Pump Bottle"
      }
    },
    reviews: [
      {
        id: 1,
        user: "Sophia R.",
        rating: 4,
        comment: "Works well for my dry skin, especially in winter.",
        date: "2024-02-20"
      },
      {
        id: 2,
        user: "Daniel H.",
        rating: 5,
        comment: "No more itchy skin! Highly recommend.",
        date: "2024-02-15"
      }
    ]
  },
  {
    id: 21,
    name: "Paula's Choice 2% BHA Liquid Exfoliant 118ml",
    brand: "Paula's Choice",
    price: 2800,
    oldPrice: 3200,
    description: "A cult-favorite exfoliant with 2% salicylic acid (BHA) to unclog pores, smooth wrinkles, and brighten skin tone. Suitable for all skin types, including sensitive skin.",
    images: [
      { id: 1, url: "/products/paulas-choice/bha-exfoliant-1.webp" },
      { id: 2, url: "/products/paulas-choice/bha-exfoliant-2.webp" },
      { id: 3, url: "/products/paulas-choice/bha-exfoliant-3.webp" }
    ],
    stock: 14,
    hasVariants: false,
    rating: 4.9,
    discount: 12,
    isNew: true,
    info: {
      details: `• 2% Salicylic Acid (BHA)
        • Unclogs pores and reduces blackheads
        • Smooths fine lines and wrinkles
        • Improves skin texture and tone
        • Fragrance-free and non-abrasive`,
      ingredients: "Water, Methylpropanediol, Salicylic Acid, Camellia Oleifera Leaf Extract, Sodium Hydroxide...",
      howToUse: "Apply a small amount to a cotton pad and sweep over the face, avoiding the eye area. Use once or twice daily.",
      specifications: {
        "Size": "118ml",
        "Skin Type": "All Skin Types",
        "Formulation": "Liquid Exfoliant",
        "Package Type": "Bottle"
      }
    },
    reviews: [
      {
        id: 1,
        user: "Jessica L.",
        rating: 5,
        comment: "This is a game-changer! My skin has never been clearer.",
        date: "2024-03-12"
      },
      {
        id: 2,
        user: "Mark R.",
        rating: 4,
        comment: "Great for acne-prone skin. Takes time to show results but worth it.",
        date: "2024-03-10"
      }
    ]
  },
  {
    id: 22,
    name: "Kiehl's Ultra Facial Cream 125ml",
    brand: "Kiehl's",
    price: 4500,
    oldPrice: 5000,
    description: "A 24-hour daily moisturizer that provides long-lasting hydration and leaves the skin feeling soft and smooth. Formulated with squalane and glacial glycoprotein.",
    images: [
      { id: 1, url: "/products/kiehls/ultra-facial-1.jpg" },
      { id: 2, url: "/products/kiehls/ultra-facial-2.jpg" },
      { id: 3, url: "/products/kiehls/ultra-facial-3.jpg" }
    ],
    stock: 10,
    hasVariants: false,
    rating: 4.7,
    discount: 10,
    isNew: false,
    info: {
      details: `• Provides 24-hour hydration
        • Lightweight and non-greasy
        • Suitable for all skin types
        • Enriched with squalane and glacial glycoprotein
        • Dermatologist-tested`,
      ingredients: "Water, Squalane, Glycerin, Glacial Glycoprotein, Stearyl Alcohol, Glyceryl Stearate...",
      howToUse: "Apply to the face and neck as needed, morning and evening.",
      specifications: {
        "Size": "125ml",
        "Skin Type": "All Skin Types",
        "Formulation": "Cream",
        "Package Type": "Jar"
      }
    },
    reviews: [
      {
        id: 1,
        user: "Anna P.",
        rating: 5,
        comment: "My skin feels so hydrated and soft. Perfect for winter!",
        date: "2024-02-25"
      },
      {
        id: 2,
        user: "Tom S.",
        rating: 4,
        comment: "A bit pricey but works really well.",
        date: "2024-02-20"
      }
    ]
  },
  {
    id: 23,
    name: "Drunk Elephant Protini Polypeptide Cream 50ml",
    brand: "Drunk Elephant",
    price: 6200,
    oldPrice: 6800,
    description: "A protein-rich moisturizer that improves skin texture, tone, and firmness. Packed with signal peptides, growth factors, and amino acids.",
    images: [
      { id: 1, url: "/products/drunk-elephant/protini-1.webp" },
      { id: 2, url: "/products/drunk-elephant/protini-2.webp" },
      { id: 3, url: "/products/drunk-elephant/protini-3.webp" }
    ],
    stock: 8,
    hasVariants: false,
    rating: 4.8,
    discount: 9,
    isNew: true,
    info: {
      details: `• Improves skin texture and firmness
        • Contains signal peptides and growth factors
        • Lightweight and fast-absorbing
        • Suitable for all skin types
        • Free from essential oils and silicones`,
      ingredients: "Water, Dicaprylyl Carbonate, Glycerin, Cetearyl Alcohol, Stearic Acid, Palmitic Acid...",
      howToUse: "Apply to the face and neck morning and evening. Can be layered with other products.",
      specifications: {
        "Size": "50ml",
        "Skin Type": "All Skin Types",
        "Formulation": "Cream",
        "Package Type": "Jar"
      }
    },
    reviews: [
      {
        id: 1,
        user: "Emily T.",
        rating: 5,
        comment: "My skin feels so plump and hydrated. Worth every penny!",
        date: "2024-03-05"
      },
      {
        id: 2,
        user: "Chris M.",
        rating: 4,
        comment: "Great for anti-aging. A bit expensive but effective.",
        date: "2024-03-01"
      }
    ]
  },
  {
    id: 24,
    name: "First Aid Beauty Ultra Repair Cream 170g",
    brand: "First Aid Beauty",
    price: 3400,
    oldPrice: 3800,
    description: "An intense hydration cream that relieves dry, distressed skin. Formulated with colloidal oatmeal, shea butter, and ceramides.",
    images: [
      { id: 1, url: "/products/first-aid-beauty/repair-cream-1.webp" },
      { id: 2, url: "/products/first-aid-beauty/repair-cream-2.webp" },
      { id: 3, url: "/products/first-aid-beauty/repair-cream-3.webp" }
    ],
    stock: 12,
    hasVariants: false,
    rating: 4.6,
    discount: 11,
    isNew: false,
    info: {
      details: `• Provides instant relief for dry skin
        • Contains colloidal oatmeal and shea butter
        • Rich in ceramides to restore the skin barrier
        • Fragrance-free and suitable for sensitive skin
        • Non-greasy formula`,
      ingredients: "Water, Stearic Acid, Glycerin, C12-15 Alkyl Benzoate, Caprylic/Capric Triglyceride, Glyceryl Stearate...",
      howToUse: "Apply to the face and body as needed. Can be used daily.",
      specifications: {
        "Size": "170g",
        "Skin Type": "Dry, Sensitive",
        "Formulation": "Cream",
        "Package Type": "Tub"
      }
    },
    reviews: [
      {
        id: 1,
        user: "Rachel S.",
        rating: 5,
        comment: "This cream saved my skin during winter. Highly recommend!",
        date: "2024-02-18"
      },
      {
        id: 2,
        user: "Mike D.",
        rating: 4,
        comment: "Great for eczema-prone skin. Absorbs quickly.",
        date: "2024-02-15"
      }
    ]
  },
  {
    id: 25,
    name: "Glow Recipe Watermelon Glow Sleeping Mask 80ml",
    brand: "Glow Recipe",
    price: 3900,
    oldPrice: 4200,
    description: "A hydrating overnight mask that exfoliates, soothes, and brightens the skin. Infused with watermelon extract, AHAs, and hyaluronic acid.",
    images: [
      { id: 1, url: "/products/glow-recipe/watermelon-mask-1.webp" },
      { id: 2, url: "/products/glow-recipe/watermelon-mask-2.webp" },
      { id: 3, url: "/products/glow-recipe/watermelon-mask-3.webp" }
    ],
    stock: 6,
    hasVariants: false,
    rating: 4.5,
    discount: 7,
    isNew: true,
    info: {
      details: `• Hydrates and exfoliates overnight
        • Contains watermelon extract and AHAs
        • Brightens and soothes the skin
        • Suitable for all skin types
        • Vegan and cruelty-free`,
      ingredients: "Water, Glycerin, Propanediol, Watermelon Fruit Extract, Glycolic Acid, Lactic Acid...",
      howToUse: "Apply a thin layer to clean skin before bed. Rinse off in the morning.",
      specifications: {
        "Size": "80ml",
        "Skin Type": "All Skin Types",
        "Formulation": "Sleeping Mask",
        "Package Type": "Jar"
      }
    },
    reviews: [
      {
        id: 1,
        user: "Sophie L.",
        rating: 5,
        comment: "My skin feels so soft and glowing in the morning!",
        date: "2024-03-08"
      },
      {
        id: 2,
        user: "Alex R.",
        rating: 4,
        comment: "Smells amazing and works well. A bit sticky though.",
        date: "2024-03-05"
      }
    ]
  },
  {
    id: 26,
    name: "Nice & Lovely Glycerin & Honey Body Lotion 400ml",
    brand: "Nice & Lovely",
    price: 350,
    oldPrice: 400,
    description: "A nourishing body lotion enriched with glycerin and honey to deeply moisturize and soften skin. Perfect for daily use.",
    images: [
      { id: 1, url: "/products/nice-lovely/glycerin-honey-1.webp" },
      { id: 2, url: "/products/nice-lovely/glycerin-honey-2.webp" },
      { id: 3, url: "/products/nice-lovely/glycerin-honey-3.webp" }
    ],
    stock: 45,
    hasVariants: false,
    rating: 4.3,
    discount: 12,
    isNew: false,
    info: {
      details: `• Enriched with glycerin and honey
        • 24-hour moisture
        • Non-greasy formula
        • Fast absorbing
        • Suitable for all skin types
        • Made in Kenya`,
      ingredients: "Aqua, Glycerin, Honey Extract, Cetearyl Alcohol, Dimethicone, Parfum...",
      howToUse: "Apply liberally all over body after bathing or as needed. Best used on damp skin.",
      specifications: {
        "Size": "400ml",
        "Skin Type": "All Skin Types",
        "Formulation": "Lotion",
        "Package Type": "Bottle"
      }
    },
    reviews: [
      {
        id: 1,
        user: "Jane M.",
        rating: 5,
        comment: "Affordable and works great! My go-to body lotion.",
        date: "2024-03-15"
      },
      {
        id: 2,
        user: "Peter K.",
        rating: 4,
        comment: "Good value for money. Nice scent.",
        date: "2024-03-10"
      }
    ]
  },
  {
    id: 27,
    name: "Garnier Micellar Cleansing Water 400ml",
    brand: "Garnier",
    price: 1200,
    oldPrice: 1400,
    description: "An all-in-one cleanser and makeup remover that gently removes makeup, cleanses and soothes skin. Suitable for all skin types, including sensitive.",
    images: [
      { id: 1, url: "/products/garnier/micellar-water-1.webp" },
      { id: 2, url: "/products/garnier/micellar-water-2.webp" },
      { id: 3, url: "/products/garnier/micellar-water-3.webp" }
    ],
    stock: 25,
    hasVariants: false,
    rating: 4.7,
    discount: 14,
    isNew: true,
    info: {
      details: `• No rinse formula
        • Removes makeup and cleanses
        • Suitable for face, eyes and lips
        • Fragrance-free
        • No harsh rubbing
        • Dermatologically tested`,
      ingredients: "Aqua, Hexylene Glycol, Glycerin, Disodium Cocoamphodiacetate, Disodium EDTA...",
      howToUse: "Apply with cotton pad. Gently wipe face, eyes and lips. No need to rinse.",
      specifications: {
        "Size": "400ml",
        "Skin Type": "All Skin Types",
        "Formulation": "Micellar Water",
        "Package Type": "Bottle"
      }
    },
    reviews: [
      {
        id: 1,
        user: "Mary W.",
        rating: 5,
        comment: "Best makeup remover I've ever used!",
        date: "2024-03-14"
      },
      {
        id: 2,
        user: "Susan K.",
        rating: 4,
        comment: "Gentle and effective. Great for sensitive skin.",
        date: "2024-03-08"
      }
    ]
  },
  {
    id: 28,
    name: "L'Oreal Paris Revitalift Laser X3 Day Cream 50ml",
    brand: "L'Oreal",
    price: 2800,
    oldPrice: 3200,
    description: "An anti-aging day cream that helps reduce wrinkles, re-firm and re-plump skin. Contains Pro-Xylane and Hyaluronic Acid.",
    images: [
      { id: 1, url: "/products/loreal/revitalift-laser-1.webp" },
      { id: 2, url: "/products/loreal/revitalift-laser-2.webp" },
      { id: 3, url: "/products/loreal/revitalift-laser-3.webp" }
    ],
    stock: 15,
    hasVariants: false,
    rating: 4.6,
    discount: 12,
    isNew: false,
    info: {
      details: `• Anti-aging formula
        • Contains Pro-Xylane
        • With Hyaluronic Acid
        • Reduces wrinkles
        • Re-firms skin
        • SPF 20 protection`,
      ingredients: "Aqua, Glycerin, Dimethicone, Pro-Xylane, Hydroxypropyl Tetrahydropyrantriol...",
      howToUse: "Apply every morning to cleansed face and neck. Avoid eye area.",
      specifications: {
        "Size": "50ml",
        "Skin Type": "All Skin Types",
        "Formulation": "Cream",
        "Package Type": "Jar"
      }
    },
    reviews: [
      {
        id: 1,
        user: "Helen R.",
        rating: 5,
        comment: "Noticed improvement in fine lines within weeks!",
        date: "2024-03-12"
      },
      {
        id: 2,
        user: "Linda M.",
        rating: 4,
        comment: "Good anti-aging cream. Absorbs quickly.",
        date: "2024-03-05"
      }
    ]
  }
]

const initialCartItems: CartItem[] = [
  {
    id: 1,
    productId: 1,
    name: "Nivea Perfect & Radiant Luminous630",
    price: 1299,
    oldPrice: 1499,
    image: "/products/nivea/nivea-luminous-1.webp",
    quantity: 1,
    stock: 10,
    deliveryDate: "Wed, Mar 12"
  }
]

const initialWishlistItems: WishlistItem[] = [
  {
    id: 1,
    productId: 1,
    name: "Nivea Perfect & Radiant Luminous630",
    price: 1299,
    oldPrice: 1499,
    image: "/products/nivea/nivea-luminous-1.webp",
    inStock: true,
    rating: 4.5,
    reviewCount: 128
  },
  {
    id: 2,
    productId: 2,
    name: "CeraVe Hydrating Facial Cleanser",
    price: 2500,
    oldPrice: 2800,
    image: "/products/cerave/cerave-cleanser-1.webp",
    inStock: false,
    rating: 4.2,
    reviewCount: 324
  }
]

export {
  brands,
  products,
  initialCartItems,
  initialWishlistItems
}

export type {
  Product,
  Brand,
  CartItem,
  WishlistItem,
  Review,
  ProductInfo
}