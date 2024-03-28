
import Image from "next/image";
import CategoryCard from "./CatetoryCard";
import hospitality from '../../public/hospitality.jpg';
import construction from '../../public/construction.jpg';
import event from '../../public/events.jpg';
import retail from '../../public/retail.jpg';
import manufacturing from '../../public/manufacturing.jpg';
import agedCare from '../../public/aged-care.jpg';
import customerService from '../../public/customer-service.jpg';
import agriCulture from '../../public/agriculture.jpg';


const jobCategory = [
  {
    title: "Hospitality",
    img: (
      <Image
        src={hospitality}
        alt="Hospitality"
        className="object-cover w-[150px]"
        width={150}
        height={150}
      />
    ),
    description:
      "Explore opportunities in the hospitality industry, including hotels, restaurants, and catering services.",
  },
  {
    title: "Construction",
    img: (
      <Image
        src={construction}
        alt="Construction"
        className="object-cover w-[150px]"
        width={150}
        height={150}
      />
    ),
    description:
      "Join the construction field and be a part of building and shaping structures.",
  },
  {
    title: "Event",
    img: <Image src={event} alt="Event" className="object-cover w-[150px]"  width={150}
    height={150}/>,
    description:
      "Get involved in organizing and coordinating events of all kinds.",
  },
  {
    title: "Retail",
    img: <Image src={retail} alt="Retail" className="object-cover w-[150px]"  width={150}
    height={150}/>,
    description:
      "Work in the retail sector, assisting customers and managing store operations.",
  },
  {
    title: "Manufacturing",
    img: (
      <Image
        src={manufacturing}
        alt="Manufacturing"
        className="object-cover w-[150px]"
        width={150}
        height={150}
      />
    ),
    description:
      "Be a part of the manufacturing industry, contributing to the production of goods and materials.",
  },
  {
    title: "Aged Care",
    img: (
      <Image
        src={agedCare}
        alt="Aged Care"
        className="object-cover w-[150px]"
        width={150}
        height={150}
      />
    ),
    description:
      "Work in the aged care sector, providing support and care for elderly individuals.",
  },
  {
    title: "Customer Service",
    img: (
      <Image
        src={customerService}
        alt="Customer Service"
        className="object-cover w-[150px]"
        width={150}
        height={150}
      />
    ),
    description:
      "Join the customer service field, assisting and providing support to customers.",
  },
  {
    title: "Agriculture",
    img: (
      <Image
        src={agriCulture}
        alt="Agriculture"
        className="object-cover w-[150px]"
        width={150}
        height={150}
      />
    ),
    description:
      "Work in the agriculture sector, contributing to the production of crops and livestock.",
  },
];

export default function JobCategory() {
  return (
    <div>
      <h1 className="font-bold text-2xl mt-20 mb-8">
        Navigate Your Work Disciplines
      </h1>
      <div className="flex items-center justify-center gap-4 flex-wrap">
        {jobCategory.map((category) => (
          <CategoryCard
            key={category.title}
            title={category.title}
            image={category.img}
            description={category.description}
          />
        ))}
      </div>
    </div>
  );
}
