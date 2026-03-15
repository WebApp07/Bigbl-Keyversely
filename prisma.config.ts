import { defineConfig } from "prisma/config";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
  schema: {
    kind: "single",
    filePath: path.resolve(__dirname, "./prisma/schema.prisma"),
  },
  earlyAccess: true,
});
