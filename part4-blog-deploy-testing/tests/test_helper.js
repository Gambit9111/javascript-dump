const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "initial test title 1",
    author: "initial test author 1",
    content: "initial test content 1",
  },
  {
    title: "initial test title 2",
    author: "initial test author 2",
    content: "initial test content 2",
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "willremovethissoon",
    author: "removable author",
    content: "removable content",
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
