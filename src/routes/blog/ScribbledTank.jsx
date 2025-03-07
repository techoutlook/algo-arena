import BlogCard from "./BlogCard";
import { sampleBlogPosts } from "./blogData";

function ScribbledTank() {
  // Filter posts tagged as 'experimental' for Scribbled Tank
  const experimentalPosts = sampleBlogPosts.filter((post) =>
    post.tags.includes("experimental")
  );

  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          📝 Scribbled Tank
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A space for raw ideas, experimental content, and brainstorming
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experimentalPosts.map((post) => (
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

export default ScribbledTank;
