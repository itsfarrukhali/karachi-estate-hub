import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { properties, getPropertyById } from "@/data/properties";
import { PropertyDetailView } from "@/components/PropertyDetailView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return properties.map((property) => ({
    id: property.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const property = getPropertyById(id);

  if (!property) {
    return {
      title: "Property Not Found | Karachi Estate Hub",
    };
  }

  return {
    title: `${property.title} - ${property.price} | Karachi Estate`,
    description: `${property.tagline} located in ${property.location.area}, Karachi. ${property.bedrooms} Beds, ${property.bathrooms} Baths, ${property.area}.`,
    openGraph: {
      title: `${property.title} | Karachi Estate`,
      description: property.tagline,
      images: [property.coverImage],
    },
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const property = getPropertyById(id);

  if (!property) {
    notFound();
  }

  return <PropertyDetailView property={property} />;
}
