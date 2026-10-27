import { articles } from "../data/articles";
import Card from "./Card";

function Articles() {
  return (
    <section id="articles" className="px-5 py-12">
      <h2 className="mb-8 text-center text-3xl font-bold">
        Featured Articles
      </h2>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
        {articles.map((article) => (
          <Card key={article.id} item={article} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="rounded-full bg-gray-200 px-6 py-2 hover:bg-gray-300">
          See all articles
        </button>
      </div>
    </section>
  );
}

export default Articles;