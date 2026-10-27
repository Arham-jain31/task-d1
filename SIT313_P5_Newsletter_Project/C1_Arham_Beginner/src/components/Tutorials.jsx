import { tutorials } from "../data/articles";
import Card from "./Card";

function Tutorials() {
  return (
    <section className="px-5 py-12">
      <h2 className="mb-8 text-center text-3xl font-bold">
        Featured Tutorials
      </h2>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
        {tutorials.map((tutorial) => (
          <Card key={tutorial.id} item={tutorial} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="rounded-full bg-gray-200 px-6 py-2 hover:bg-gray-300">
          See all tutorials
        </button>
      </div>
    </section>
  );
}

export default Tutorials;