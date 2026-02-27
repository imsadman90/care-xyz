import Banner from "@/components/home/Banner";
import Services from "@/components/home/Services";
import HomeAbout from "@/components/home/HomeAbout";
import HowItWorks from "@/components/home/HowItWorks";
import FAQSection from "@/components/home/FAQSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import Test from "@/components/Test";
import WhyChoose from "@/components/home/WhyChoose";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="space-y-20">
      <section>
        <Banner />
      </section>

      <HowItWorks />

      <WhyChoose />

      <HomeAbout />

      <section>
        <Services />
      </section>

      <TestimonialsSection />

      <FAQSection />
    </div>
  );
}
