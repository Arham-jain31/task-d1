import { Star } from "lucide-react";

function Card({ item }) {
  return (
    <div className="w-full max-w-sm">
      <img
        src={item.image}
        alt={item.title}
        className="h-44 w-full rounded border object-cover"
      />

      <h3 className="mt-3 text-lg font-bold">{item.title}</h3>

      <p className="mt-1 text-sm font-semibold">Description</p>
      <p className="text-sm text-gray-600">{item.description}</p>

      <p className="mt-2 text-sm">{item.topic}</p>

      <div className="mt-2 flex items-center gap-2 text-sm">
        <Star size={18} className="fill-yellow-400 text-yellow-500" />
        <span>{item.rating}</span>
        <span className="font-semibold">{item.author}</span>
      </div>
    </div>
  );
}

export default Card;