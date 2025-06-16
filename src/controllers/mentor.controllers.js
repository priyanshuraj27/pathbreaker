import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Sample data for now — replace this with DB calls later
const mentors = [
  {
    id: 1,
    name: "Krishnasingh Thakur",
    title: "IPMAT & CUET Expert",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=300&h=300&auto=format&fit=crop",
    categories: ["IPMAT", "CUET"],
    description: "Mr. Krishnasingh Thakur is an experienced mentor and career coach...",
    bookingLink: "https://forms.gle/your-google-form-link",
    achievements: "(Founder PathBreakers) IIIT NAGPUR\nCareer coach\nMentored 1800+ students\nBuilt 2 businesses\nGrowth and Marketing Consultant"
  },
];

// Get all mentors
export const getMentors = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, "Mentors fetched successfully", mentors));
});

// Get mentor by ID
export const getMentorById = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const mentor = mentors.find(m => m.id === id);
  if (!mentor) {
    return res.status(404).json(new ApiResponse(404, "Mentor not found", null, false));
  }
  return res.status(200).json(new ApiResponse(200, "Mentor found", mentor));
});

// Get mentors by category
export const getMentorsByCategory = asyncHandler(async (req, res) => {
  const category = req.params.category;
  const result = category === "All"
    ? mentors
    : mentors.filter(m => m.categories.includes(category));
  return res.status(200).json(new ApiResponse(200, "Mentors by category", result));
});

// Get all unique categories
export const getCategories = asyncHandler(async (req, res) => {
  const set = new Set(["All", "IPMAT", "CUET", "Career Counselling"]);
  mentors.forEach(m => m.categories.forEach(c => set.add(c)));
  return res.status(200).json(new ApiResponse(200, "Categories fetched", Array.from(set)));
});
