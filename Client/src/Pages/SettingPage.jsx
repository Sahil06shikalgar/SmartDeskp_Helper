import React, { useEffect, useState } from "react";
import axios from "axios";
import API_PATHS from "../Utils/apiPath";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    // Add your settings fields here, e.g.:
    notificationsEnabled: false,
    theme: "light",
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_PATHS.CONFIG.GET);
      setSettings(response.data);
    } catch (err) {
      setError("Failed to load settings.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccessMsg(null);

    try {
      await axios.put(API_PATHS.CONFIG.UPDATE, settings);
      setSuccessMsg("Settings saved successfully!");
    } catch (err) {
      setError("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading settings...</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}

      <form onSubmit={handleSubmit}>
        {/* Example setting: Notifications toggle */}
        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="notificationsEnabled"
              checked={settings.notificationsEnabled}
              onChange={handleChange}
            />
            <span>Enable Notifications</span>
          </label>
        </div>

        {/* Example setting: Theme select */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="theme">
            Theme
          </label>
          <select
            id="theme"
            name="theme"
            value={settings.theme}
            onChange={handleChange}
            className="w-full border p-2"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
