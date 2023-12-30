/*IMPORTANT: 
Design your schema based on how data is used, 
not based on how it's stored.
*/


const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`


# compute total = sum of all SubOrders.total
type Order {
  id: ID
  date: String
  total: Float
  customer: CustomerDetails
  suborders: [SubOrder]
  shipment: ShippingDetails
  paymentType: String
}

type ShippingDetails {
  provider: String
  status: String
  cost: Float
}

input in__ShippingDetails {
  provider: String
  status: String
  cost: Float
}


type CustomerDetails {
  contact: String
  firstname: String
  lastname: String
  postcode: Int
  street: String
  streetNumber: Int
  city: String
}

input in__CustomerDetails {
  contact: String
  firstname: String
  lastname: String
  postcode: Int
  street: String
  streetNumber: Int
  city: String
}


# compute total= ConfigProduct.price.value * amount


type SubOrder {
  product: ConfigProduct
  amount: Int
  total: Float
}

input in__SubOrder {
  product: in__ConfigProduct
  amount: Int
  total: Float
}


"Represents a fully configurated Product that can be added to users ShoppingCart"
type ConfigProduct {
  title: String
  price: Float
  variant: String
  color: String
  size: String
  image: String
}

input in__ConfigProduct {
  title: String
  price: Float
  variant: String
  color: String
  size: String
  image: String
}


"Object Properties represent all possible configurations for one product"
type AbsProduct {
  id: ID
  title: String
  description: String
  categories: [String]
  prices: [Float] 
  variants: [String]
  colors: [String]
  sizes: [String]
  image: String
  rating: Int
}

type Query {
    products: [AbsProduct]
    orders: [Order]
}

type Mutation {
   sendOrder(
    id: ID,
    date: String,
    total: Float,
    customer: in__CustomerDetails,
    suborders: [in__SubOrder],
    shipment: in__ShippingDetails,
    paymentType: String
  ): Order
}

`;

//Resolvers Object 
//Resolvers define the technique for fetching the types defined in the schema
//This resolver retrieves books from the books array.
const resolvers = {
  Query: {
    products: () => products,
    orders: () => orders
  },
};


//Hard coded Example Data that will be resolved 
const products = [
  {
    id: 3,
    categories: ["piercings"],
    title: "Super Indian Sparkle Flower",
    description: "",
    image: "/images/products/sparkle-flower.webp",
    prices: [29.90],
    rating: 0,
    materials: {
      base: "Titan ASTM F-136",
      coating: "24K Gold PVD"
    },
    variants: ["single", "pair"],
    colors: ["gold", "silver"],
    sizes: ["4mm", "6mm", "8mm", "10mm"]
  },
  {
    id: 4,
    categories: ["piercings"],
    title: "Super Big Moon",
    description: "Ok, we admit it: our Piercing Super Big Moon is our favorite!",
    image: "/images/products/big-moon.webp",
    prices: [17.90],
    rating: 0,
    materials: {
      base: "Titan ASTM F-136",
      coating: "24K Gold PVD"
    },
    variants: ["single", "pair"],
    colors: ["gold", "silver"],
    sizes: ["4mm", "6mm", "8mm", "10mm"]
  }
];


const orders = [

  {
    id: 344,
    date: "2023-12-30",
    total: 44.90,
    customer: {
      contact: "hello@kitty.me",
      firstname: "Marie",
      lastname: "Blocking",
      postcode: 59049,
      street: "Hauptstraße",
      streetNumber: 4,
      city: "Berlin"
    },
    suborders: [{
      product: {
        title: "Sunflower Sparkle",
        price: 14.90,
        variant: "Single",
        color: "Silber",
        size: "4mm",
        image: "/images/products/sparkle-flower.webp",
      },
      amount: 2,
      total: 29.80,
    }],
    shipment: {
      provider: "DPD",
      status: "zugestellt",
      cost: 3.99
    },
    payment_type: "Papypal"
  },

  {
    id: 344834,
    date: "2023-12-10",
    total: 22.90,
    customer: {
      contact: "timt@stimmt.me",
      firstname: "Heinrich",
      lastname: "Heine",
      postcode: 59049,
      street: "Hauptstraße",
      streetNumber: 12,
      city: "Hamburg"
    },
    suborders: [{
      product: {
        title: "Big Moon",
        price: 17.90,
        variant: "Single",
        color: "Silber",
        size: "6mm",
        image: "/images/products/big-moon.webp",
      },
      amount: 2,
      total: 29.80,
    }],
    shipment: {
      provider: "DPD",
      status: "zugestellt",
      cost: 3.99
    },
    payment_type: "Papypal"
  }
];

//The ApolloServer requires two params:
//your schema definition and your set of resolvers
const server = new ApolloServer({ typeDefs, resolvers });

//The 'listen' method launches a web server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
