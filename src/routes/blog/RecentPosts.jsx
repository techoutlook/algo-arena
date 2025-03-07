import BlogCard from "./BlogCard";
import { sampleBlogPosts } from "./blogData";

function RecentPosts() {
  // Sort by date for recent posts
  const recentPosts = [...sampleBlogPosts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 9);

  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          🆕 Recent Articles
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Freshly published blogs and latest insights from our writers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentPosts.map((post) => (
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

export default RecentPosts;
