const salesStatistics = [
  {
    date: "2024-02-01",
    revenue: 2500,
    unitsSold: 100,
    ordersCompleted: 20,
    ordersUncompleted: 5,
    ordersPending: 3,
    productsSold: [
      {
        productId: "1",
        productName: "Chair",
        quantitySold: 10,
        revenue: 459.9
      },
      {
        productId: "2",
        productName: "Luxury Velvet Pillow",
        quantitySold: 20,
        revenue: 599.8
      },
    ]
  },
  {
    date: "2024-02-02",
    revenue: 2800,
    unitsSold: 110,
    ordersCompleted: 22,
    ordersUncompleted: 3,
    ordersPending: 4,
    productsSold: [
      {
        productId: "1",
        productName: "Chair",
        quantitySold: 12,
        revenue: 551.88
      },
      {
        productId: "3",
        productName: "Decorative Wall Mirror",
        quantitySold: 8,
        revenue: 600
      },
    ]
  },
  {
    date: "2024-02-14",
    revenue: 3000,
    unitsSold: 115,
    ordersCompleted: 24,
    ordersUncompleted: 4,
    ordersPending: 3,
    productsSold: [
      {
        productId: "30",
        productName: "Bathroom Space Saver",
        quantitySold: 5,
        revenue: 250
      },
      {
        productId: "1",
        productName: "Chair",
        quantitySold: 5,
        revenue: 229.95
      },
    ]
  },
  {
    date: "2024-02-15",
    revenue: 3300,
    unitsSold: 120,
    ordersCompleted: 25,
    ordersUncompleted: 3,
    ordersPending: 2,
    productsSold: [
      {
        productId: "2",
        productName: "Luxury Velvet Pillow",
        quantitySold: 8,
        revenue: 479.84
      },
      {
        productId: "3",
        productName: "Decorative Wall Mirror",
        quantitySold: 10,
        revenue: 600
      },
    ]
  },
  {
    date: "2024-02-23",
    revenue: 3200,
    unitsSold: 120,
    ordersCompleted: 25,
    ordersUncompleted: 4,
    ordersPending: 2,
    productsSold: [
      {
        productId: "4",
        productName: "Abstract Canvas Art",
        quantitySold: 5,
        revenue: 450
      },
      {
        productId: "5",
        productName: "Ceramic Vase Set",
        quantitySold: 10,
        revenue: 600
      },
    ]
  },
  {
    date: "2024-03-01",
    revenue: 2700,
    unitsSold: 105,
    ordersCompleted: 21,
    ordersUncompleted: 6,
    ordersPending: 2,
    productsSold: [
      {
        productId: "6",
        productName: "Modern stand",
        quantitySold: 8,
        revenue: 962.4
      },
      {
        productId: "7",
        productName: "Queen Size Bed Frame",
        quantitySold: 13,
        revenue: 1300
      },
    ]
  },
  {
    date: "2024-03-05",
    revenue: 3000,
    unitsSold: 115,
    ordersCompleted: 23,
    ordersUncompleted: 5,
    ordersPending: 3,
    productsSold: [
      {
        productId: "8",
        productName: "Memory Foam Mattress",
        quantitySold: 5,
        revenue: 2000
      },
      {
        productId: "9",
        productName: "Wardrobe Closet",
        quantitySold: 10,
        revenue: 1000
      },
    ]
  },
  {
    date: "2024-03-06",
    revenue: 3500,
    unitsSold: 130,
    ordersCompleted: 26,
    ordersUncompleted: 3,
    ordersPending: 1,
    productsSold: [
      {
        productId: "10",
        productName: "Bedside Table Lamp",
        quantitySold: 8,
        revenue: 287.92
      },
      {
        productId: "11",
        productName: "Kitchen Island Cart",
        quantitySold: 12,
        revenue: 2212.8
      },
    ]
  },
  {
    date: "2024-03-07",
    revenue: 3200,
    unitsSold: 125,
    ordersCompleted: 24,
    ordersUncompleted: 5,
    ordersPending: 3,
    productsSold: [
      {
        productId: "12",
        productName: "12-Piece Cookware Set",
        quantitySold: 7,
        revenue: 559.93
      },
      {
        productId: "13",
        productName: "Stainless Steel Knife Set",
        quantitySold: 10,
        revenue: 700
      },
    ]
  },
  {
    date: "2024-03-08",
    revenue: 2900,
    unitsSold: 110,
    ordersCompleted: 22,
    ordersUncompleted: 6,
    ordersPending: 2,
    productsSold: [
      {
        productId: "14",
        productName: "Ceramic Dinnerware Set",
        quantitySold: 6,
        revenue: 900
      },
      {
        productId: "15",
        productName: "Electric Espresso Machine",
        quantitySold: 12,
        revenue: 2000
      },
    ]
  },
  {
    date: "2024-03-09",
    revenue: 2700,
    unitsSold: 100,
    ordersCompleted: 20,
    ordersUncompleted: 7,
    ordersPending: 3,
    productsSold: [
      {
        productId: "16",
        productName: "Multipurpose Shelving Unit",
        quantitySold: 4,
        revenue: 320
      },
      {
        productId: "17",
        productName: "UnderBed Storage Box",
        quantitySold: 10,
        revenue: 250
      },
    ]
  },
  {
    date: "2024-03-10",
    revenue: 3100,
    unitsSold: 115,
    ordersCompleted: 23,
    ordersUncompleted: 4,
    ordersPending: 3,
    productsSold: [
      {
        productId: "18",
        productName: "Wall Mounted Coat Rack",
        quantitySold: 7,
        revenue: 245
      },
      {
        productId: "19",
        productName: "Fabric Drawer Organizers",
        quantitySold: 8,
        revenue: 127.92
      },
    ]
  },
  {
    date: "2024-03-11",
    revenue: 3300,
    unitsSold: 120,
    ordersCompleted: 24,
    ordersUncompleted: 3,
    ordersPending: 3,
    productsSold: [
      {
        productId: "20",
        productName: "Kitchen Pantry Cabinet",
        quantitySold: 5,
        revenue: 1100
      },
      {
        productId: "21",
        productName: "Convertible Crib and Changer",
        quantitySold: 10,
        revenue: 2200
      },
    ]
  },
  {
    date: "2024-03-12",
    revenue: 3000,
    unitsSold: 115,
    ordersCompleted: 23,
    ordersUncompleted: 5,
    ordersPending: 3,
    productsSold: [
      {
        productId: "22",
        productName: "Kids Activity Table",
        quantitySold: 8,
        revenue: 480
      },
      {
        productId: "23",
        productName: "Tidy Sleep Muslin Cloud Nest",
        quantitySold: 7,
        revenue: 315
      },
    ]
  },
  {
    date: "2024-03-13",
    revenue: 3500,
    unitsSold: 130,
    ordersCompleted: 26,
    ordersUncompleted: 3,
    ordersPending: 1,
    productsSold: [
      {
        productId: "24",
        productName: "Children's Bookshelf",
        quantitySold: 9,
        revenue: 315
      },
      {
        productId: "25",
        productName: "Table Talk High Chair",
        quantitySold: 12,
        revenue: 3000
      },
    ]
  },
  {
    date: "2024-03-14",
    revenue: 3200,
    unitsSold: 125,
    ordersCompleted: 24,
    ordersUncompleted: 5,
    ordersPending: 3,
    productsSold: [
      {
        productId: "26",
        productName: "Desk Organizer Set",
        quantitySold: 7,
        revenue: 210
      },
      {
        productId: "27",
        productName: "Closet Organization System",
        quantitySold: 10,
        revenue: 1500
      },
    ]
  },
  {
    date: "2024-03-15",
    revenue: 2900,
    unitsSold: 110,
    ordersCompleted: 22,
    ordersUncompleted: 6,
    ordersPending: 2,
    productsSold: [
      {
        productId: "28",
        productName: "Jewelry Storage Mirror",
        quantitySold: 6,
        revenue: 720
      },
      {
        productId: "29",
        productName: "Garage Storage Rack",
        quantitySold: 8,
        revenue: 1600
      },
    ]
  },
  {
    date: "2024-03-16",
    revenue: 2700,
    unitsSold: 100,
    ordersCompleted: 20,
    ordersUncompleted: 7,
    ordersPending: 3,
    productsSold: [
      {
        productId: "30",
        productName: "Bathroom Space Saver",
        quantitySold: 5,
        revenue: 250
      },
      {
        productId: "1",
        productName: "Chair",
        quantitySold: 5,
        revenue: 229.95
      },
    ]
  },
  {
    date: "2024-03-17",
    revenue: 3100,
    unitsSold: 115,
    ordersCompleted: 23,
    ordersUncompleted: 4,
    ordersPending: 3,
    productsSold: [
      {
        productId: "2",
        productName: "Luxury Velvet Pillow",
        quantitySold: 8,
        revenue: 479.84
      },
      {
        productId: "3",
        productName: "Decorative Wall Mirror",
        quantitySold: 10,
        revenue: 600
      },
    ]
  },
  {
    date: "2024-03-18",
    revenue: 3300,
    unitsSold: 120,
    ordersCompleted: 24,
    ordersUncompleted: 3,
    ordersPending: 3,
    productsSold: [
      {
        productId: "4",
        productName: "Abstract Canvas Art",
        quantitySold: 5,
        revenue: 450
      },
      {
        productId: "5",
        productName: "Ceramic Vase Set",
        quantitySold: 10,
        revenue: 600
      },
    ]
  },
  // Add more data for additional dates...
  {
    date: "2024-03-19",
    revenue: 3200,
    unitsSold: 125,
    ordersCompleted: 24,
    ordersUncompleted: 5,
    ordersPending: 3,
    productsSold: [
      {
        productId: "6",
        productName: "Modern stand",
        quantitySold: 8,
        revenue: 962.4
      },
      {
        productId: "7",
        productName: "Queen Size Bed Frame",
        quantitySold: 13,
        revenue: 1300
      },
    ]
  },
  {
    date: "2024-03-20",
    revenue: 2900,
    unitsSold: 110,
    ordersCompleted: 22,
    ordersUncompleted: 6,
    ordersPending: 2,
    productsSold: [
      {
        productId: "8",
        productName: "Memory Foam Mattress",
        quantitySold: 5,
        revenue: 2000
      },
      {
        productId: "9",
        productName: "Wardrobe Closet",
        quantitySold: 10,
        revenue: 1000
      },
    ]
  },
  {
    date: "2024-03-21",
    revenue: 3500,
    unitsSold: 130,
    ordersCompleted: 26,
    ordersUncompleted: 3,
    ordersPending: 1,
    productsSold: [
      {
        productId: "10",
        productName: "Bedside Table Lamp",
        quantitySold: 8,
        revenue: 287.92
      },
      {
        productId: "11",
        productName: "Kitchen Island Cart",
        quantitySold: 12,
        revenue: 2212.8
      },
    ]
  },
  {
    date: "2024-03-22",
    revenue: 2800,
    unitsSold: 115,
    ordersCompleted: 23,
    ordersUncompleted: 5,
    ordersPending: 2,
    productsSold: [
      {
        productId: "12",
        productName: "12-Piece Cookware Set",
        quantitySold: 5,
        revenue: 499.95
      },
      {
        productId: "13",
        productName: "Stainless Steel Knife Set",
        quantitySold: 10,
        revenue: 700
      },
    ]
  },
  {
    date: "2024-03-23",
    revenue: 3300,
    unitsSold: 120,
    ordersCompleted: 24,
    ordersUncompleted: 4,
    ordersPending: 2,
    productsSold: [
      {
        productId: "14",
        productName: "Ceramic Dinnerware Set",
        quantitySold: 5,
        revenue: 750
      },
      {
        productId: "15",
        productName: "Electric Espresso Machine",
        quantitySold: 10,
        revenue: 1650
      },
    ]
  },
  {
    date: "2024-03-24",
    revenue: 3000,
    unitsSold: 110,
    ordersCompleted: 22,
    ordersUncompleted: 6,
    ordersPending: 2,
    productsSold: [
      {
        productId: "16",
        productName: "Multipurpose Shelving Unit",
        quantitySold: 5,
        revenue: 400
      },
      {
        productId: "17",
        productName: "UnderBed Storage Box",
        quantitySold: 10,
        revenue: 250
      },
    ]
  },
  {
    date: "2024-04-01",
    revenue: 3400,
    unitsSold: 125,
    ordersCompleted: 25,
    ordersUncompleted: 3,
    ordersPending: 2,
    productsSold: [
      {
        productId: "18",
        productName: "Wall Mounted Coat Rack",
        quantitySold: 8,
        revenue: 280
      },
      {
        productId: "19",
        productName: "Fabric Drawer Organizers",
        quantitySold: 7,
        revenue: 111.93
      },
    ]
  },
  {
    date: "2024-04-02",
    revenue: 3200,
    unitsSold: 120,
    ordersCompleted: 24,
    ordersUncompleted: 4,
    ordersPending: 2,
    productsSold: [
      {
        productId: "20",
        productName: "Kitchen Pantry Cabinet",
        quantitySold: 5,
        revenue: 1100
      },
      {
        productId: "21",
        productName: "Convertible Crib and Changer",
        quantitySold: 10,
        revenue: 1200
      },
    ]
  },
  {
    date: "2024-04-03",
    revenue: 3300,
    unitsSold: 125,
    ordersCompleted: 25,
    ordersUncompleted: 3,
    ordersPending: 2,
    productsSold: [
      {
        productId: "22",
        productName: "Kids Activity Table",
        quantitySold: 8,
        revenue: 480
      },
      {
        productId: "23",
        productName: "Tidy Sleep Muslin Cloud Nest",
        quantitySold: 7,
        revenue: 315
      },
    ]
  },
  {
    date: "2024-04-04",
    revenue: 3500,
    unitsSold: 130,
    ordersCompleted: 26,
    ordersUncompleted: 3,
    ordersPending: 1,
    productsSold: [
      {
        productId: "24",
        productName: "Children's Bookshelf",
        quantitySold: 9,
        revenue: 315
      },
      {
        productId: "25",
        productName: "Table Talk High Chair",
        quantitySold: 12,
        revenue: 3000
      },
    ]
  },
  {
    date: "2024-04-05",
    revenue: 3200,
    unitsSold: 125,
    ordersCompleted: 24,
    ordersUncompleted: 5,
    ordersPending: 3,
    productsSold: [
      {
        productId: "26",
        productName: "Desk Organizer Set",
        quantitySold: 7,
        revenue: 210
      },
      {
        productId: "27",
        productName: "Closet Organization System",
        quantitySold: 10,
        revenue: 1500
      },
    ]
  },
  {
    date: "2024-04-06",
    revenue: 3100,
    unitsSold: 120,
    ordersCompleted: 25,
    ordersUncompleted: 3,
    ordersPending: 2,
    productsSold: [
      {
        productId: "28",
        productName: "Jewelry Storage Mirror",
        quantitySold: 6,
        revenue: 720
      },
      {
        productId: "29",
        productName: "Garage Storage Rack",
        quantitySold: 8,
        revenue: 1600
      },
    ]
  },
  ];

export default salesStatistics;
