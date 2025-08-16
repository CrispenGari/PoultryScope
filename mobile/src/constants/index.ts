export const SERVER_BASE_URL = "https://poultryscope.onrender.com";

export const COLORS = {
  main: "#F8F8F8",
  primary: "#E5E0D8",
  secondary: "#D1A980",
  tertiary: "#748873",
  black: "#000000",
  white: "#ffffff",
  red: "#FB2576",
  gray: "#758694",
  transparent: "transparent",
  gray100: "#DDDDDD",
  gray200: "#7F8CAA",
};

export const PLOT_COLORS = ["#443627", "#57B4BA", "#E4004B", "#1C6EA4"];

export const AUDIOS = {
  predicting: require("@/assets/sounds/diagnosing.wav"),
  results: require("@/assets/sounds/response.wav"),
};

export const Fonts = {
  "JosefinSans-Bold": require("@/assets/fonts/JosefinSans-Bold.ttf"),
  "JosefinSans-Regular": require("@/assets/fonts/JosefinSans-Regular.ttf"),
};
export const FONTS = {
  regular: "JosefinSans-Regular",
  bold: "JosefinSans-Bold",
};

export const STORAGE_NAME = {
  SETTINGS: "poultryscope:settings",
  HISTORY: "poultryscope:history",
  DAILY_TIP: "poultryscope:tip",
  TIP_NOTIFICATION_FLAG_KEY: "poultryscope:notification",
};

export const APP_NAME = "Poultry Scope";

export const relativeTimeObject = {
  future: "in %s",
  past: "%s",
  s: "now",
  m: "1m",
  mm: "%dm",
  h: "1h",
  hh: "%dh",
  d: "1d",
  dd: "%dd",
  M: "1M",
  MM: "%dM",
  y: "1y",
  yy: "%dy",
};

export const LANDING_MESSAGES = [
  {
    id: 1,
    image: require("@/assets/images/0.png"),
    title: "Welcome to Poultry Scope!",
    message:
      "Your AI-powered assistant for poultry health — Poultry Scope uses deep learning to detect diseases directly from poultry feces. Early detection made simple.",
  },
  {
    id: 2,
    image: require("@/assets/images/1.png"),
    title: "Accurate Disease Prediction",
    message:
      "Poultry Scope analyzes feces images using advanced AI models like MobileNetV3, providing fast and reliable disease detection results for your flock.",
  },
  {
    id: 3,
    image: require("@/assets/images/2.png"),
    title: "Clear Results for Better Flock Care",
    message:
      "Get easy-to-understand results with visual indicators — from healthy to possibly or confirmed disease — helping you take informed action for your poultry.",
  },
  {
    id: 4,
    image: require("@/assets/images/3.png"),
    title: "AI Support Anytime, Anywhere",
    message:
      "Whether at the farm or remotely, Poultry Scope puts advanced poultry disease detection in your pocket — accessible through our secure mobile app.",
  },
];
