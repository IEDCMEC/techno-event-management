// Define the fonts here
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'], // Subset options: 'latin', 'latin-ext', etc.
  weight: ['400', '600'], // Specify weights like 400 (regular), 700 (bold), etc.
  variable: '--font-inter', // Define a CSS variable for easier usage
});

export { inter };
