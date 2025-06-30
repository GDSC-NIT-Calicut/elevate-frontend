"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/components/common/AuthProvider";
import { AuthContextType } from "@/components/common/AuthProvider";

const ExperienceForm = () => {
  type day = string | number;
  type month = string | number;

  const formatPublishDate = (): string => {
    const today = new Date();
    let day: day = today.getDate();
    let month: month = today.getMonth();
    const year = today.getFullYear();
    day = day < 10 ? "0" + day : day;
    const actualMonth = 1  + month
    month = actualMonth < 10 ? "0" + actualMonth : actualMonth;
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate)
    return formattedDate;
  };
  const [form, setForm] = useState({
    studentAuthor: "SREEHARI SANJEEV",
    company: "1",
    title: "",
    role: "",
    salary: "",
    shortDescription: "",
    content: "",
    publishedDate: formatPublishDate(),
    experienceDate: "",
    tags: [] as string[],
    tagInput: "",
    isPublic: true,
    type: "internship",
    coverImage: null as File | null,
  });

  const router = useRouter();
  const { user, tokens, loading, isAuthenticated }: AuthContextType = useAuth();
  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated || user?.role !== 'student') router.replace("/401");
      if (user?.name) {
        setForm((prev) => ({ ...prev, studentAuthor: user.name! }));  // setting the gmail name to author
      }
    }
  }, [user, isAuthenticated, loading]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: e.target.checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setForm({ ...form, coverImage: e.target.files[0] });
    }
  };

  const handleTagAdd = () => {
    if (form.tagInput.trim()) {
      setForm((prev) => ({
        ...prev,
        tags: [...prev.tags, prev.tagInput.trim()],
        tagInput: "",
      }));
    }
  };

  const handleTagRemove = (index: number) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);

    const accessToken = localStorage.getItem("accessToken") || tokens?.access;
    const formData = new FormData();

    formData.append("author", form.studentAuthor);
    formData.append("company", form.company);
    formData.append("title", form.title);
    formData.append("role", form.role);
    formData.append("stipend", form.salary);
    formData.append("short_description", form.shortDescription);
    formData.append("content", form.content);
    formData.append("published_date", form.publishedDate);
    formData.append("experience_date", form.experienceDate);
    formData.append("visibility", String(form.isPublic));
    formData.append("job_type", form.type);
    if (form.coverImage) {
      formData.append("cover_image", form.coverImage);
    }
    try {
      const response = await axios.post(
        `${process.env.DJANGO_BACKEND_URL}/api/experience/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status == 200 || response.status == 201) {
        toast.success("Successfully submitted experience");
        router.push("/experiences");
      } else if (response.status == 401 || response.status == 403) {
        toast.error("Unauthorized, please login again!");
        router.replace("/login");
      } else toast.error("Please fill all the details");
    } catch (err) {
      console.log((err as Error).message);
      toast.error("Internal server error");
    }
  };

  if(loading) return <div>Loading...</div>
  else return <div className="min-h-screen flex justify-center items-start bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow space-y-6"
      >
        <h1 className="text-2xl font-bold text-gray-800">Submit Experience</h1>
        {form.coverImage ? (
          <img
            src={
              form.coverImage ? URL.createObjectURL(form.coverImage) : undefined
            }
            className="h-24 w-24"
          ></img>
        ) : null}

        <div>
          <label className="block text-sm font-medium mb-1">Cover Image</label>
          <input
            type="file"
            className="border-2 rounded-lg p-2 outline-none ring-0 hover:ring-2 hover: ring-violet-400"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Company/Organisation
          </label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 text-sm outline-blue-400"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 text-sm outline-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <input
              type="text"
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 text-sm outline-blue-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Salary/Stipend (in Rs.)
          </label>
          <input
            type="number"
            name="salary"
            value={form.salary}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 text-sm outline-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Short Description
          </label>
          <textarea
            name="shortDescription"
            value={form.shortDescription}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded px-4 py-2 text-sm resize-none outline-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={6}
            className="w-full border rounded px-4 py-2 text-sm resize-none outline-blue-400"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Experience Date (MMYYYY)
            </label>
            <input
              type="text"
              name="experienceDate"
              value={form.experienceDate}
              onChange={handleChange}
              placeholder="06/2024"
              className="w-full border rounded px-4 py-2 text-sm outline-blue-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tags</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={form.tagInput}
              onChange={(e) => setForm({ ...form, tagInput: e.target.value })}
              placeholder="Add a tag"
              className="flex-1 border rounded px-3 py-2 text-sm outline-blue-400"
            />
            <button
              type="button"
              onClick={handleTagAdd}
              className="bg-blue-500 text-white px-3 rounded"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs flex items-center"
              >
                {tag}
                <button
                  onClick={() => handleTagRemove(i)}
                  className="ml-1 text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="isPublic"
              checked={form.isPublic}
              onChange={handleChange}
            />
            Public
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 text-sm outline-blue-400"
          >
            <option value="placement">Placement</option>
            <option value="internship">Internship</option>
            <option value="research">Research</option>
            <option value="miscellaneous">Miscellaneous</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
};

export default ExperienceForm;
