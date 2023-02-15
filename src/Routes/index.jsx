import { lazy } from "react";

const Landing = lazy(() => import("../Pages/Landing"));
const Login = lazy(() => import("../Pages/Login"));
const Register = lazy(() => import("../Pages/Register"));
const Profiles = lazy(() => import("../Pages/Profiles"));
const Profile = lazy(() => import("../Pages/Profile"));
const Dashboard = lazy(() => import("../Pages/Dashboard"));
const CreateProfile = lazy(() => import("../Pages/CreateProfile"));
const EditProfile = lazy(() => import("../Pages/EditProfile"));
const AddExperience = lazy(() => import("../Pages/AddExperience"));
const AddEducation = lazy(() => import("../Pages/AddEducation"));
const Posts = lazy(() => import("../Pages/Posts"));
const Post = lazy(() => import("../Pages/Post"));
const NotFound = lazy(() => import("../Pages/NotFound"));

// import Landing from "../Pages/Landing";
// import Login from "../Pages/Login";
// import Register from "../Pages/Register";
// import Profiles from "../Pages/Profiles";
// import Profile from "../Pages/Profile";
// import Dashboard from "../Pages/Dashboard";
// import CreateProfile from "../Pages/CreateProfile";
// import EditProfile from "../Pages/EditProfile";
// import AddExperience from "../Pages/AddExperience";
// import AddEducation from "../Pages/AddEducation";
// import Posts from "../Pages/Posts";
// import Post from "../Pages/Post";
// import NotFound from "../Pages/NotFound";

const routes = [
  {
    id: "landing",
    path: "/",
    element: <Landing />,
  },
  {
    id: "register",
    path: "/register",
    element: <Register />,
  },
  {
    id: "login",
    path: "/login",
    element: <Login />,
  },
  {
    id: "profiles",
    path: "/profiles",
    element: <Profiles />,
  },
  {
    id: "profile",
    path: "/profiles/:id",
    element: <Profile />,
  },
  {
    id: "dashboard",
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    id: "create-profile",
    path: "/create-profile",
    element: <CreateProfile />,
  },
  {
    id: "edit-profile",
    path: "/edit-profile",
    element: <EditProfile />,
  },
  {
    id: "add-experience",
    path: "/add-experience",
    element: <AddExperience />,
  },
  {
    id: "add-education",
    path: "/add-education",
    element: <AddEducation />,
  },
  {
    id: "posts",
    path: "/posts",
    element: <Posts />,
  },
  {
    id: "post",
    path: "/posts/:id",
    element: <Post />,
  },
  {
    id: "not-found",
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
