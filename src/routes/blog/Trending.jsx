import BlogCard from "./BlogCard";
import { sampleBlogPosts } from "./blogData";

function Trending() {
  // Sort by views for trending content
  const trendingPosts = [...sampleBlogPosts]
    .sort((a, b) => b.views - a.views)
    .slice(0, 9);

  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          🔥 Trending Articles
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          The hottest and most discussed blog posts right now
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300">
          Load More
        </button>
      </div>
    </div>
  );
}

export default Trending;
