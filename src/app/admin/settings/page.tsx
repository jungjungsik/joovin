"use client";

import { useState, useEffect } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { MultiImageUploader } from "@/components/admin/MultiImageUploader";
import { TagInput } from "@/components/admin/TagInput";
import { MultiTextArea } from "@/components/admin/MultiTextArea";

interface SettingsData {
  // Site Identity
  siteName: string;
  artistStatement: string;

  // Profile Info
  name: string;
  title: string;
  classYear: string;

  // Education
  school: string;
  graduationDate: string;

  // Creative Interests
  interests: string[];

  // My Process
  processTitle: string;
  processText: string[];

  // Closing Quote
  closingQuote: string;

  // Images
  profileImages: string[];
  homeHeroImage: string;
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SettingsData>({
    // Site Identity
    siteName: "Joovin NAM",
    artistStatement: "",

    // Profile Info
    name: "",
    title: "",
    classYear: "",

    // Education
    school: "",
    graduationDate: "",

    // Creative Interests
    interests: [],

    // My Process
    processTitle: "",
    processText: [],

    // Closing Quote
    closingQuote: "",

    // Images
    profileImages: [],
    homeHeroImage: "",
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        // Parse JSON string arrays
        const arrayFields = ["profileImages", "interests", "processText"];
        arrayFields.forEach((field) => {
          if (data[field] && typeof data[field] === "string") {
            try {
              data[field] = JSON.parse(data[field]);
            } catch {
              data[field] = [];
            }
          }
        });
        setSettings((prev) => ({ ...prev, ...data }));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Stringify array fields for storage
      const dataToSave = {
        ...settings,
        profileImages: JSON.stringify(settings.profileImages),
        interests: JSON.stringify(settings.interests),
        processText: JSON.stringify(settings.processText),
      };
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSave),
      });
      if (res.ok) {
        alert("Settings saved successfully!");
      } else {
        alert("Failed to save settings");
      }
    } catch {
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-semibold">Site Settings</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary text-background-dark px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Site Identity */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Site Identity</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Site Name</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Artist Statement</label>
            <textarea
              value={settings.artistStatement}
              onChange={(e) => setSettings({ ...settings, artistStatement: e.target.value })}
              rows={4}
              placeholder="Your artistic statement for the home page"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
          </div>
        </div>
      </section>

      {/* Profile Info */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={settings.name}
              onChange={(e) => setSettings({ ...settings, name: e.target.value })}
              placeholder="Your full name"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={settings.title}
              onChange={(e) => setSettings({ ...settings, title: e.target.value })}
              placeholder="e.g., Visual Artist, Designer"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Class Year</label>
            <input
              type="text"
              value={settings.classYear}
              onChange={(e) => setSettings({ ...settings, classYear: e.target.value })}
              placeholder="e.g., Class of 2024"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Education</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">School</label>
            <input
              type="text"
              value={settings.school}
              onChange={(e) => setSettings({ ...settings, school: e.target.value })}
              placeholder="Your educational institution"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Graduation Date</label>
            <input
              type="text"
              value={settings.graduationDate}
              onChange={(e) => setSettings({ ...settings, graduationDate: e.target.value })}
              placeholder="e.g., May 2024"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
          </div>
        </div>
      </section>

      {/* Creative Interests */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Creative Interests</h2>
        <TagInput
          label="Interests"
          description="Add creative interests, techniques, or areas of focus"
          value={settings.interests}
          onChange={(tags) => setSettings({ ...settings, interests: tags })}
          placeholder="e.g., Typography, Motion Design, Photography"
        />
      </section>

      {/* My Process */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">My Process</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Process Title</label>
            <input
              type="text"
              value={settings.processTitle}
              onChange={(e) => setSettings({ ...settings, processTitle: e.target.value })}
              placeholder="e.g., My Creative Approach"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
          </div>
          <MultiTextArea
            label="Process Description"
            description="Describe your creative process in multiple paragraphs"
            value={settings.processText}
            onChange={(texts) => setSettings({ ...settings, processText: texts })}
          />
        </div>
      </section>

      {/* Closing Quote */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Closing Quote</h2>
        <div>
          <label className="block text-sm font-medium mb-1">Quote</label>
          <textarea
            value={settings.closingQuote}
            onChange={(e) => setSettings({ ...settings, closingQuote: e.target.value })}
            rows={3}
            placeholder="A closing quote or statement for your about page"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
          />
        </div>
      </section>

      {/* Images */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Site Images</h2>
        <div className="space-y-6">
          <ImageUploader
            label="Home Hero Image"
            description="Main hero image displayed on the home page. Use a 4:5 portrait image."
            value={settings.homeHeroImage}
            onChange={(url) => setSettings({ ...settings, homeHeroImage: url })}
            aspectRatio="aspect-[4/5]"
          />
          <MultiImageUploader
            label="Profile Images"
            description="Profile photos displayed on the About page. You can upload multiple images for a gallery effect."
            value={settings.profileImages}
            onChange={(urls) => setSettings({ ...settings, profileImages: urls })}
            maxImages={5}
          />
        </div>
      </section>
    </div>
  );
}
