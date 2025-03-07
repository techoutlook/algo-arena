// WisdomWall.jsx
import BlogCard from "./BlogCard";
import { sampleBlogPosts } from "./blogData";

function WisdomWall() {
  // Featured posts - using first 6 from sample data
  const featuredPosts = sampleBlogPosts.slice(0, 6);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Featured Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <BlogCard key={post.id} post={post} featured={true} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WisdomWall;
