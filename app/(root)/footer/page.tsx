"use client";

import { navLinks } from "@/components/Nav";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LocateIcon, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const contact = [
    { name: "123 Pisa Ave,Chicago", icon: LocateIcon },
    { name: "(312) 593-2744", icon: Phone },
    { name: "service@littlelemon.com", icon: LocateIcon },
  ];
  const socials = [
    { name: "Facebook", icon: faFacebook },
    { name: "Twitter", icon: faTwitter },
    { name: "Instagram", icon: faInstagram },
  ];

  return (
    <footer className="flex items-center justify-center">
      <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-1 items-center justify-center gap-x-10 w-full bg-gray-900">
        <div className="flex m-10 items-center justify-start">
          <Image
            src={"/Logo-bottom.png"}
            width={100}
            height={100}
            alt="Bottom Logo"
            className="xl:ml-20"
          />
        </div>
        <div className="text-white m-10 flex items-start justify-start flex-col ">
          <p className="text-3xl mb-5">Footer Navigation</p>
          <ul className=" flex flex-col ">
            {navLinks.map((link) => (
              <li
                key={link.name}
                className="flex flex-col mb-2 hover:underline"
              >
                <Link href={link.path} className={"text-yellow-400"}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex m-10 items-start justify-start flex-col ">
          <p className="text-white text-3xl mb-5">Contact</p>
          <ul className="flex flex-col  gap-x-5">
            {contact.map((con) => (
              <li key={con.name} className="flex flex-col mb-2">
                <p className={"text-yellow-400"}>{con.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex m-10 items-start justify-start flex-col ">
          <p className="text-white text-3xl mb-5">Social Medias</p>
          <ul className="flex  gap-5">
            {socials.map((social) => (
              <li key={social.name} className="flex mb-2">
                <FontAwesomeIcon
                  icon={social.icon}
                  className="text-white hover:text-yellow-400 transition-all"
                  size="lg"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
