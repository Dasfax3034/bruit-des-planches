import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getFolderMarkups = (
  directory: string
): matter.GrayMatterFile<string>[] | null => {
  /* Converts all files in a directory to gray-matter objects */
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
  /* Converts specific file to a gray-matter object */
  try {
    const file = matter.read(path.join(process.cwd(), directory, filename));
    return file;
  } catch (error) {
    console.error(error);
    return null;
  }
};