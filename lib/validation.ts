import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(600),
  category: z.string().min(2).max(50),
  link: z
    .string()
    .url()
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const contentType = res.headers.get("content-type");
        if (contentType?.startsWith("image/")) {
          return contentType.startsWith("image/");
        }
        return false;
      } catch (e) {
        return false;
      }
    }),
  pitch: z.string().min(10),
});
