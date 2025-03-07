import PropTypes from "prop-types";
import { Clock, ThumbsUp, Eye } from "lucide-react";

function BlogCard({ post, featured = false }) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md ${
        featured ? "border-l-4 border-green-500" : ""
      }`}
    >
      {/* Image */}
      <div className="relative bg-yellow-300 h-48 overflow-hidden">
        <img
          src={post.image || `/api/placeholder/400/320`}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        {post.category && (
          <span className="absolute bottom-0 left-0 bg-yellow-400 text-black text-xs font-bold px-4 py-2">
            {post.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-2xl font-bold text-black mb-2">{post.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>

        {/* Stats Row */}
        <div className="flex items-center justify-between">
          {/* Published Date */}
          <div className="flex items-center">
            <Clock size={16} />
            <p className="text-xs text-gray-500 pl-1">{post.date}</p>
          </div>

          {/* Likes and Views */}
          <div className="flex items-center">
            <div className="flex items-center mr-3">
              <ThumbsUp size={16} />
              <span className="text-xs text-gray-500 pl-1">{post.likes}</span>
            </div>
            <div className="flex items-center">
              <Eye size={16} />
              <span className="text-xs text-gray-500 pl-1">{post.views}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add prop type validation
BlogCard.propTypes = {
  post: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    category: PropTypes.string,
    excerpt: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    views: PropTypes.number.isRequired,
  }).isRequired,
  featured: PropTypes.bool,
};

// Default props
BlogCard.defaultProps = {
  featured: false,
};

export default BlogCard;
