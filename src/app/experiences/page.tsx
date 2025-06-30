"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/common/AuthProvider";
import axios from "axios";
import { toast } from "sonner";
import { ExperienceCard } from "@/components/ExperienceCard";
export default function ExperiencePage() {
  interface Tag {
    id: number;
    title: string;
    type: Object;
  }

  interface Experience {
    id: number;
    author: Object;
    tags: Tag[];
    cover_image: string;
    title: string;
    role: string;
    short_description: string;
    content: string;
    published_date: string;
    experience_date: string;
    visibility: boolean;
    verified: boolean;
    stipend: number;
    job_type: string;
    company: number;
  }

  const router = useRouter();
  const { isAuthenticated, user, loading, tokens } = useAuth();
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Number[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== "student")) {
      router.push("/401");
    }
  }, [isAuthenticated, user, loading, router]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const token = tokens?.access || localStorage.getItem("accessToken");
        const response = await axios.get(`http://localhost:8000/api/tag`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data);

        if (response.status === 200) {
          setTags(response.data);
        } else {
          toast.error("Error fetching tags");
        }
      } catch (err) {
        console.log(err);
        toast.error("Internal Server Error");
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    const fetchExperience = async () => {
      const token = tokens?.access || localStorage.getItem("accessToken");
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/experience`,
          {
            tags_id: selectedTags,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);

        if (response.status == 200) {
          setExperience(response.data);
        } else toast.error("Error fetching experiences");
      } catch (err) {
        console.log((err as Error).message);
        toast.error("Internal Server Error");
      }
    };

    fetchExperience();
  }, [selectedTags]);

  if (loading || !isAuthenticated || user?.role !== "student") {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 bg-white shadow-md p-6 space-y-6 border-r border-gray-200">
        <div>
          <h2 className="text-xl font-semibold mb-2">Search</h2>
          <input
            type="text"
            placeholder="Search roles"
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded-md"
              >
                {tag.title}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Experience</h1>
        <div className="grid grid-cols-3 gap-3">
          {experience.map((exp) => (
            <ExperienceCard
              key={exp.id}
              title={exp.title}
              role={exp.role}
              short_description={exp.short_description}
              company={exp.company}
              experience_date={exp.experience_date}
              job_type={exp.job_type}
              author={exp.author}
              published_date={exp.published_date}
              stipend={exp.stipend}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
