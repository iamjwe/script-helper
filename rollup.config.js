import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/io/index.js",
  output: [
    {
      file: "build/io.js",
      format: "cjs",
    },
  ],
  plugins: [resolve(), commonjs()],
};
