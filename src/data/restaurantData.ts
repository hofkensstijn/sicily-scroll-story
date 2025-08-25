export interface Restaurant {
  id: number;
  name: string;
  location: string;
  coordinates: [number, number]; // [longitude, latitude]
  cuisine: string;
  priceRange: string;
  rating: number;
  description: string;
  specialties: string[];
  address: string;
  phone?: string;
  website?: string;
  openingHours?: string;
  recommendedDishes: string[];
}

export const restaurantData: Restaurant[] = [
  {
    id: 1,
    name: "Antica Dolceria Bonajuto",
    location: "Modica",
    coordinates: [0, 0],
    cuisine: "Chocolate Shop, Confectionery",
    priceRange: "€€",
    rating: 4.8,
    description: "Historic confectionery in Modica, renowned for its traditional chocolate and sweets, especially the Modica chocolate.",
    specialties: ["Modica Chocolate", "Traditional Sicilian sweets", "Cannoli", "Nougat"],
    address: "Corso Umberto I, 159 - 97015 Modica (RG), Italy",
    phone: "+39 0932 941225",
    website: "https://www.bonajuto.it/en/",
    openingHours: "",
    recommendedDishes: ["Chocolate bars (various flavors)", "Traditional biscuits", "Artisanal nougats"]
  },
  {
    id: 2,
    name: "Nunziatina",
    location: "Taormina",
    coordinates: [0, 0], // Placeholder
    cuisine: "Sicilian, Local Ingredients",
    priceRange: "€€€", // Assuming fine dining based on description
    rating: 4.7, // Placeholder rating
    description: "A restaurant in the heart of Taormina, inspired by the warmth and fun-filled clamour of the typical Sicilian home, sincere, welcoming and generous. A dining proposal that is based on the utmost attention to raw materials; a cuisine that focuses on local ingredients, refined and enhanced to satisfy every palate, rich in flavours and aromas, evocative and ancestral, perpetually sincere with respect to an idea of cuisine that is both basic and baroque at the same time.",
    specialties: ["Seasonal local dishes", "Fresh seafood", "Baroque-inspired cuisine"],
    address: "Via Roma 12, Taormina (ME), Italy",
    phone: "+39 0942 573 105",
    website: "https://www.nunziatinataormina.it/en/",
    openingHours: "Dinner: Wed-Sun 7:30 PM - 11:00 PM; Lunch: Sun 12:30 PM - 3:00 PM",
    recommendedDishes: ["Menu based on seasonal availability", "Local seafood specialties", "Reimagined classic Sicilian dishes"]
  }
];
