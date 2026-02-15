import ServiceCard from "../cards/ServiceCard";
import { getServices } from "@/actions/server/service";

export default async function Services() {
  const services = await getServices();
  return (
    <div>
      <h2 className="text-center text-6xl font-bold mb-10">
        Our{" "}
        <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
          Services
        </span>
      </h2>
      <div className="grid md:grid-cols-3 gap-5">
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
    </div>
  );
}
