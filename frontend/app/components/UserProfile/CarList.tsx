import type { Car } from "@/app/types/car";

export default function CarsList({ data }: { data: Car[] }) {
  // console.log(data);
  return (
    <ul className="mt-6 space-y-2">
      {/* {data.map((car) => (
        <li key={car.id} className="border p-3 rounded-lg shadow-sm">
          <strong>{car.title}</strong> — ${car.price}
        </li> */}
      {/* ))} */}
    </ul>
  );
}
