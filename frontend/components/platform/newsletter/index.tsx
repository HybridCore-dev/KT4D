import Image from "next/image";
import DevicesImage from "./assets/image.png";
import Button from "../button";

export default function Newsletter() {
  return (
    <section className="py-0 md:py-24">
      <div className="bg-border-light">
        <div className="container mx-auto px-4 md:px-0 py-12 md:py-0">
          <div className="md:flex items-center">
            <div className="md:w-2/5 text-center md:text-left">
              <h1 className="text-4xl">Subscribe to Our Newsletter!</h1>
              <p className="text-text-secondary my-4">
                Sign up with your e-mail address to receive news and updates.
              </p>

              <div className="flex bg-white shadow-lg rounded-full justify-between p-3 ps-6 mt-8">
                <input
                  placeholder="Enter your email address"
                  className="w-full outline-none"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
            <div className="hidden md:block md:w-3/5 h-48 md:h-[400px] relative">
              <Image
                src={DevicesImage}
                height={500}
                alt="Subscribe to the Newsletter"
                style={{ objectFit: "contain" }}
                className="absolute md:-top-12 md:max-w-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
