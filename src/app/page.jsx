import Banner from "@/components/home/Banner";
import Services from "@/components/home/Services";
import FAQSection from "@/components/home/FAQSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import Test from "@/components/Test";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="space-y-20">
      {/* <Test></Test>
      <p>{JSON.stringify(session)}</p> */}
      <section>
        <Banner />
      </section>

      <section>
        <Services />
      </section>

      <TestimonialsSection />

      <FAQSection />
    </div>
  );
}
