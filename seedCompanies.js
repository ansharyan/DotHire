import mongoose from "mongoose";
import Company from "./backend/models/company.js"; // adjust path as needed

const MONGO_URI = "mongodb+srv://ansharyan:ansharyan@cluster0.2ehz8st.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // replace with your MongoDB URI

const companies = [
  {
    name: "Google",
    website: "https://www.google.com",
    logo: "https://logo.clearbit.com/google.com",
    description: "A global technology leader in search, advertising, cloud computing, and more.",
    location: "Mountain View, CA"
  },
  {
    name: "Microsoft",
    website: "https://www.microsoft.com",
    logo: "https://logo.clearbit.com/microsoft.com",
    description: "Empowering people and businesses through innovative software and services.",
    location: "Redmond, WA"
  },
  {
    name: "Amazon",
    website: "https://www.amazon.com",
    logo: "https://logo.clearbit.com/amazon.com",
    description: "E-commerce, cloud services, and AI-driven technologies shaping the future.",
    location: "Seattle, WA"
  },
  {
    name: "Meta",
    website: "https://www.meta.com",
    logo: "https://logo.clearbit.com/meta.com",
    description: "Building the future of social connection through apps and VR technologies.",
    location: "Menlo Park, CA"
  },
  {
    name: "Apple",
    website: "https://www.apple.com",
    logo: "https://logo.clearbit.com/apple.com",
    description: "Designing powerful consumer technology and redefining the user experience.",
    location: "Cupertino, CA"
  },
  {
    name: "Netflix",
    website: "https://www.netflix.com",
    logo: "https://logo.clearbit.com/netflix.com",
    description: "World’s leading streaming entertainment service.",
    location: "Los Gatos, CA"
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB connected");

    await Company.deleteMany(); // Clear existing data (optional)
    await Company.insertMany(companies);
    console.log("Companies inserted successfully!");

    process.exit();
  } catch (err) {
    console.error("Error seeding companies:", err);
    process.exit(1);
  }
}

seed();
