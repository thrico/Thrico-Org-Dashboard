"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { ConfigProvider } from "antd";

// Define the theme interface
interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  backgroundColor: string;
  fontFamily: string;
}

// Create a context for the theme
const ThemeContext = createContext<{
  theme: ThemeConfig;
  updateTheme: (newTheme: Partial<ThemeConfig>) => void;
}>({
  theme: {
    primaryColor: "#1890ff",
    secondaryColor: "#52c41a",
    accentColor: "#722ed1",
    textColor: "rgba(0, 0, 0, 0.85)",
    backgroundColor: "#ffffff",
    fontFamily: "",
  },
  updateTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ThemeConfig>({
    primaryColor: "#1890ff",
    secondaryColor: "#52c41a",
    accentColor: "#722ed1",
    textColor: "rgba(0, 0, 0, 0.85)",
    backgroundColor: "#ffffff",
    fontFamily: "",
  });

  const updateTheme = (newTheme: Partial<ThemeConfig>) => {
    setTheme((prevTheme) => ({ ...prevTheme, ...newTheme }));
  };

  // Apply theme to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary-color", theme.primaryColor);
    root.style.setProperty("--secondary-color", theme.secondaryColor);
    root.style.setProperty("--accent-color", theme.accentColor);
    root.style.setProperty("--text-color", theme.textColor);
    root.style.setProperty("--background-color", theme.backgroundColor);
    root.style.setProperty("--font-family", theme.fontFamily);
  }, [theme]);

  // Configure Ant Design theme
  const antdTheme = {
    token: {
      colorPrimary: theme.primaryColor,
      colorSuccess: theme.secondaryColor,
      colorInfo: theme.accentColor,
      colorText: theme.textColor,
      colorBgContainer: theme.backgroundColor,
      fontFamily: theme.fontFamily,
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
};
