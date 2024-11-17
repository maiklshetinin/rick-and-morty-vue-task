import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// https://vite.dev/config/
export default defineConfig({
  base: "/rick-and-morty-vue-task/", // замените на имя вашего репозитория
  plugins: [vue()],
  resolve: {
    extensions: [".js", ".ts", ".vue"],
    alias: {
      src: "/src",
    },
  },
});
