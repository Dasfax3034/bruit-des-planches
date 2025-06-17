import fs from "fs";
import path from "path";
import matter from "gray-matter";


export function getAllArticles(directory: string) {
  const directoryPath = path.join(process.cwd(), directory);
    const files = fs.readdirSync(directoryPath);

  return files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const fullPath = path.join(directoryPath, file);
    const content = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(content);

    return {
      slug,
      ...(data as { date?: string; title?: string; description?: string; image?: string }),
    };
  }).sort((a, b) => new Date(b.date || new Date()).getTime() - new Date(a.date || new Date()).getTime());
}

export const getFolderMarkups = (
  directory: string
): matter.GrayMatterFile<string>[] | null => {
  try {
    const directoryPath = path.join(process.cwd(), directory);
    const files = fs.readdirSync(directoryPath);

    return files.map((filename) => {
      const filePath = path.join(directoryPath, filename);
      const data = matter.read(filePath);
      return data;
    });
  } catch {
    return null;
  }
};

export const getMarkup = (
  directory: string,
  filename: string
): matter.GrayMatterFile<string> | null => {
  try {
    const file = matter.read(path.join(process.cwd(), directory, filename));
    return file;
  } catch (error) {
    console.error(error);
    return null;
  }
};