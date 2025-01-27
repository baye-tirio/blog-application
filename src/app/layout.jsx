import "./globals.css";
//import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
// const myFont = localFont({
//   src: [
//     {
//       path: "../fonts/Poppins-Bold.ttf",
//       weight: "600",
//       style: "bold",
//     },
//     {
//       path: "../fonts/Poppins-Light.ttf",
//       weight: "200",
//       style: "light",
//     },
//   ],
// });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "700"],
});
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <header>
          <NavBar />
        </header>
        <main>
          <center>{children}</center>
        </main>
        <Footer />
      </body>
    </html>
  );
}
