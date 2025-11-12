import { RawPropertyListing, Property } from "@/types/property";
import { formatPrice } from "./formatPrice";
import landForSaleData from "@/data/landforsale.json";
import houseForSaleData from "@/data/houseforsale.json";
import houseForRentData from "@/data/houseforrent.json";

function parseProperty(
  raw: RawPropertyListing,
  category: "house" | "land",
  listingType: "sale" | "rent"
): Property {
  const images = raw["Property Image"]
    ? raw["Property Image"].split(",").map((url) => url.trim())
    : [];

  const price = parseInt(raw["Price (KSh)"].replace(/,/g, "")) || 0;

  return {
    id: `${category}-${listingType}-${raw["Property URL"].split("-").pop()}`,
    title: raw["Property Title"],
    price,
    priceFormatted: formatPrice(price),
    location: raw.Location,
    images,
    propertyUrl: raw["Property URL"],
    agentName: raw["Agent Name"] || "Private Seller",
    category,
    listingType,
    bedrooms: raw["Number of Bedrooms"]
      ? parseInt(raw["Number of Bedrooms"])
      : undefined,
    bathrooms: raw["Number of Bathrooms"]
      ? parseInt(raw["Number of Bathrooms"])
      : undefined,
    landSize: raw["Land Size"],
  };
}

export function getAllProperties(): Property[] {
  const landForSale = (landForSaleData as RawPropertyListing[]).map((item) =>
    parseProperty(item, "land", "sale")
  );

  const houseForSale = (houseForSaleData as RawPropertyListing[]).map((item) =>
    parseProperty(item, "house", "sale")
  );

  const houseForRent = (houseForRentData as RawPropertyListing[]).map((item) =>
    parseProperty(item, "house", "rent")
  );

  return [...landForSale, ...houseForSale, ...houseForRent];
}
