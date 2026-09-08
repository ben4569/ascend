
import Navbar from "./components/navbar";

function App() {
  return (
    <div className="min-h-screen bg-[#090D16] text-white">
      <Navbar />

      <main className="pt-20">
        <section className="flex min-h-[80vh] items-center justify-center">
          <h1 className="text-6xl font-bold">
            ASCEND
          </h1>
        </section>
      </main>
    </div>
  );
}

export default App;