"use client";

import Nav from "@/components/Nav";
import About from "./about/page";
import Footer from "./footer/page";
import Menu from "./menu/page";
import Testimonial from "./testimonial/testimonial";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="">
      <div className="">
        <div className="">
          {/* TODO:Nav */}
          {/* TODO:mobile-nav */}
          <Nav />
          {children}
          <Menu />
          <Testimonial />
          <About />
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default Layout;
