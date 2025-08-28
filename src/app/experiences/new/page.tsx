"use client";

import { ExperienceForm } from "@/components/ExperienceForm";
import { useRouter } from "next/navigation";

export default function NewExperiencePage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      // For now, just log the data and redirect
      console.log("Experience data:", data);
      
      // TODO: Implement API call to save experience
      // await ExperiencesAPI.create(data);
      
      // Redirect to experiences list
      router.push("/experiences");
    } catch (error) {
      console.error("Error creating experience:", error);
      alert("Failed to create experience. Please try again.");
    }
  };

  const handleCancel = () => {
    router.push("/experiences");
  };

  return (
    <ExperienceForm
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isLoading={false}
    />
  );
}

