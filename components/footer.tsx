import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaUpwork } from "react-icons/fa6";
import ContactForm from "./contact-form";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full mt-20 bg-card text-card-foreground p-3">
      <div className="xl:w-[80%] flex flex-col md:flex-row justify-between items-center h-full mb-2 md:w-[90%] w-full mx-auto">
        <div>
          <p className="text-muted-foreground">Contact me</p>
          <div className="flex items-center gap-4 text-2xl mt-2">
            <Link href="https://www.instagram.com/binay._.shrestha/">
              <FaInstagram />
            </Link>
            <Link href="https://github.com/BinayaShrestha556">
              <FaGithub />
            </Link>
            <Link href="https://www.facebook.com/Binaya.Shrestha.00">
              <FaFacebook />
            </Link>
            <Link href="https://www.linkedin.com/in/binaya-shrestha-1b906a326/">
              <FaLinkedin />
            </Link>
            <Link href="">
              <FaUpwork />
            </Link>
          </div>

          <p className="text-muted-foreground text-sm font-semibold mt-2">
            <span className="text-base font-normal">Email:</span>{" "}
            binayashrestha862@gmail.com
          </p>
          <p className="font-semibold mt-2">Binaya Shrestha</p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
};

export default Footer;
