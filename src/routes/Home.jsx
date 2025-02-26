import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <div className="min-h-screen bg-slate-50 w-full flex items-center justify-center">
        <div className="flex flex-col items-start max-w-3xl gap-5">
          <h1 className="text-6xl font-bold text-black text-center mt-20">
            Home
          </h1>
          <p>This is a Home Page</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
