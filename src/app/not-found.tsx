import { Image } from "@nextui-org/image";
import clsx from "clsx";

import "@/src/styles/globals.css";
import { Navbar } from "@/src/components/navbar";
import { fontSans } from "@/src/config/fonts";

import { Providers } from "./providers";

export default function NotFoundPage() {
  return (
    <html lang="en">
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div>
            <Navbar hideLocalSwitch={true} />
          </div>
          <div className="flex min-h-[calc(100vh-100px)] justify-center items-center">
            <Image
              alt="404 not found"
              className="object-cover w-full lg:w-[500px] lg:h-[300px]"
              src="/404.png"
              title="Image by: @SAWARATSUKI"
            />
          </div>
        </Providers>
      </body>
    </html>
  );
}
