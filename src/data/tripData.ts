export interface TripDay {
  id: number;
  date: string;
  location: string;
  coordinates: [number, number]; // [longitude, latitude]
  zoomLevel: number;
  accommodation: {
    name: string;
    address?: string;
    checkIn?: string;
    checkOut?: string;
    url?: string;
    parking?: string;
    contact?: string;
    bookedBy?: string;
    bookingNumber?: string;
  };
  activities: string[];
  extra?: string[];
  travelDistance?: string; // Distance from previous location
  travelFrom?: string; // Where the travel starts from
}

export const tripData: TripDay[] = [
  {
    id: 1,
    date: "August 30, 2025",
    location: "Palermo",
    coordinates: [13.3614, 38.1157],
    zoomLevel: 12,
    accommodation: {
      name: "Via gallo Nicolo’2",
      address: "Via gallo Nicolo’2 Palermo, PA 90139",
      checkIn: "2.00 pm - 00.00 pm",
      checkOut: "12.00 pm",
      parking: "Aanwezig (nog niet zeker of het mee in de prijs zit)",
      contact: "+39 913819026",
    },
    activities: [],
    extra: ["Geen Zwembad"],
  },
  {
    id: 2,
    date: "August 31, 2025",
    location: "Palermo",
    coordinates: [13.3614, 38.1157],
    zoomLevel: 12,
    accommodation: {
      name: "Via gallo Nicolo’2",
      address: "Via gallo Nicolo’2 Palermo, PA 90139",
    },
    activities: [],
  },
  {
    id: 3,
    date: "September 1, 2025",
    location: "Trapani",
    coordinates: [12.5144, 38.0173],
    zoomLevel: 13,
    accommodation: {
      name: "Hotel San Michele",
      address: "Viale Regina Margherita, 31  Trapani 91100",
      checkIn: "2.00 pm - 00.00 pm",
      checkOut: "11:00 am",
      parking: "Parking available in Piazza Vittorio Emanuele (next to hotel) for €0.20/hour in winter and €0.50/hour in summer. Use coins in ticket machines or the Easypark/Droptickets apps. Display ticket on dashboard. Reception can assist with information, bookings, tours, and airport transfers.",
      contact: "+39 0923 365728",
      bookedBy: "Stijn",
    },
    activities: [],
    extra: ["Rooftop zwembad"],
    travelFrom: "Palermo",
  },
  {
    id: 4,
    date: "September 2, 2025",
    location: "Trapani",
    coordinates: [12.5144, 38.0173],
    zoomLevel: 13,
    accommodation: {
      name: "Hotel San Michele",
      address: "Viale Regina Margherita, 31  Trapani 91100",
    },
    activities: [],
  },
  {
    id: 5,
    date: "September 3, 2025",
    location: "Agrigento",
    coordinates: [13.5819, 37.3089],
    zoomLevel: 13,
    accommodation: {
      name: "Salita Francesco Sala 2",
      address: "Salita Francesco Sala 2, Agrigento, 92100, IT",
      checkIn: "2.00 pm - 08.00 pm",
      checkOut: "11:00 am",
      parking: "mail gestuurd",
      contact: "+393921038256",
      bookedBy: "Ine",
    },
    activities: [],
    extra: ["Geen zwembad"],
    travelFrom: "Trapani",
  },
  {
    id: 6,
    date: "September 4, 2025",
    location: "Noto",
    coordinates: [15.0698, 36.8924],
    zoomLevel: 13,
    accommodation: {
      name: "Casale Modica",
      address: "Loc. Casale Modica Sp.26 snc",
      checkIn: "/",
      checkOut: "/",
      parking: "Parking aanwezig",
      contact: "+393938336595",
      bookedBy: "Ine",
    },
    activities: [],
    extra: ["Wel een zwembad niet te veel doen hier is chill", "Hier ontbijt eens nemen", "Fietsen gebruiken/huren kan ook"],
    travelFrom: "Agrigento",
  },
  {
    id: 7,
    date: "September 5, 2025",
    location: "Noto",
    coordinates: [15.0698, 36.8924],
    zoomLevel: 13,
    accommodation: {
      name: "Casale Modica",
      address: "Loc. Casale Modica Sp.26 snc",
    },
    activities: ["Restaurant geboekt (Manna Noto)"],
  },
  {
    id: 8,
    date: "September 6, 2025",
    location: "Regalbuto",
    coordinates: [14.6383, 37.6513],
    zoomLevel: 13,
    accommodation: {
      name: "Rocca dei Saraceni",
      address: "Contrada Sotto Rocca - 94017 Regalbuto (Enna)",
      checkIn: "16:00 - 21:00",
      checkOut: "before 11:00",
      parking: "Parking aanwezig",
      contact: "+39093571978",
      bookedBy: "Ine",
      url: "https://www.caractere.be/nl/hotel/rocca-dei-saraceni",
    },
    activities: [],
    extra: ["Restaurant aanwezig", "Ook een zwembad"],
    travelFrom: "Noto",
  },
  {
    id: 9,
    date: "September 7, 2025",
    location: "Regalbuto",
    coordinates: [14.6383, 37.6513],
    zoomLevel: 13,
    accommodation: {
      name: "Rocca dei Saraceni",
      address: "Contrada Sotto Rocca - 94017 Regalbuto (Enna)",
    },
    activities: [],
  },
  {
    id: 10,
    date: "September 8, 2025",
    location: "Nicolosi",
    coordinates: [15.0233, 37.6113],
    zoomLevel: 14,
    accommodation: {
      name: "Criu Boutique Hotel",
      address: "Viale della Regione, n° 12 Nicolosi",
      checkIn: "mail gestuurd",
      checkOut: "",
      parking: "Parking aanwezig",
      contact: "0039 3277575338",
      bookedBy: "Ine",
      url: "https://www.criuboutiquehotel.it/index_en.php",
    },
    activities: ["Vragen voor kook cursus"],
    extra: ["Geen zwembad", "Restaurant aanwezig", "Breakfast Included"],
    travelFrom: "Regalbuto",
  },
  {
    id: 11,
    date: "September 9, 2025",
    location: "Maina",
    coordinates: [14.786311, 38.120270],
    zoomLevel: 13,
    accommodation: {
      name: "Maina Country Resort",
      address: "C/DA MAINA 259 NASO, ME 98074",
      checkIn: "",
      checkOut: "",
      parking: "Parking daar aanwezig",
      contact: "+39 348 300 2704",
      bookedBy: "Stijn",
      url: "https://mainacountryresort.it/",
    },
    activities: [],
    travelFrom: "Nicolosi",
  },
  {
    id: 12,
    date: "September 10, 2025",
    location: "Maina",
    coordinates: [14.786311, 38.120270],
    zoomLevel: 13,
    accommodation: {
      name: "Maina Country Resort",
      address: "C/DA MAINA 259 NASO, ME 98074",
    },
    activities: [],
  },
  {
    id: 13,
    date: "September 11, 2025",
    location: "Cefalù",
    coordinates: [14.0223, 38.0410],
    zoomLevel: 13,
    accommodation: {
      name: "Elecla Cefalù",
      address: "24 Via Costa, Cefalù, 90015, Italië",
      checkIn: "15:00",
      checkOut: "voor 10:00",
      parking: "Er is geen parkeergelegenheid. (Lungomare street parking for free)",
      contact: "+393761602060",
      bookedBy: "Booking Stijn",
      bookingNumber: "4855782440",
      url: "https://www.booking.com/hotel/it/elecla-cefalu.nl.html",
    },
    activities: [],
    extra: ["geen zwembad"],
    travelFrom: "Maina",
  },
  {
    id: 14,
    date: "September 12, 2025",
    location: "Cefalù",
    coordinates: [14.0223, 38.0410],
    zoomLevel: 13,
    accommodation: {
      name: "Elecla Cefalù",
      address: "24 Via Costa, Cefalù, 90015, Italië",
    },
    activities: [],
  },
  {
    id: 15,
    date: "September 13, 2025",
    location: "Palermo",
    coordinates: [13.3614, 38.1157],
    zoomLevel: 12,
    accommodation: {
      name: "Addimura Rooms",
      address: "VIA MAQUEDA 331, 90133 Palermo, Italië",
      checkIn: "13:30 - 23:30",
      checkOut: "(08:00 - 11:00)",
      contact: "+393762630001",
      bookedBy: "Booking Stijn",
      url: "https://www.booking.com/hotel/it/addimura-rooms.nl.html",
    },
    activities: ["Cooking Workshop at Susafa"],
    travelFrom: "Cefalù",
  },
  {
    id: 16,
    date: "September 14, 2025",
    location: "Palermo",
    coordinates: [13.3614, 38.1157],
    zoomLevel: 12,
    accommodation: {
      name: "Addimura Rooms",
      address: "VIA MAQUEDA 331, 90133 Palermo, Italië",
    },
    activities: ["Flight back home"],
  },
];