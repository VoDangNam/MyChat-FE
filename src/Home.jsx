const Home = () => {
  return (
    <div>
      {/* HEADER */}
      <header className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 sticky top-0 z-50 shadow-md">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a className="flex items-center gap-2 text-white" href="#">
              <div className="bg-[url('/LogoMyChat.png')] w-10 h-10 bg-cover rounded-full border-2 border-white" />
              <h1 className="text-lg sm:text-xl font-semibold">MyChat</h1>
            </a>

            <nav className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a className="text-white hover:text-gray-200" href="#">
                    About
                  </a>
                </li>
                <li>
                  <a className="text-white hover:text-gray-200" href="#">
                    Services
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="/login"
                className="rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-teal-600"
              >
                Login
              </a>
              <a
                href="/register"
                className="inline-block rounded-md bg-white px-4 py-2 text-sm font-medium text-teal-600 hover:bg-teal-600 hover:text-white"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="min-h-screen bg-white">
        {/* Section 1 */}
        <section className="flex flex-col-reverse md:flex-row items-center justify-center gap-6 px-6 py-16 max-w-screen-xl mx-auto">
          <div className="text-center md:text-left md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Connect Smarter with MyChat
            </h2>
            <p className="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed">
              MyChat is a next-generation communication platform designed for
              individuals and teams who value speed, privacy, and intelligence.
              With an intuitive interface and built-in AI support, MyChat makes
              collaboration effortless — from casual conversations to complex
              project discussions.
            </p>
            <a
              href="#"
              className="inline-block rounded-full border border-indigo-600 px-8 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
            >
              Chat Now
            </a>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <img
              src="/LogoMyChat.png"
              alt="MyChat Logo"
              className="w-64 sm:w-80 md:w-96 rounded-2xl shadow-lg object-cover"
            />
          </div>
        </section>

        {/* Section 2 */}
        <section className="flex flex-col md:flex-row items-center justify-center gap-6 px-6 py-16 max-w-screen-xl mx-auto">
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/dsMcHAT.jpg"
              alt="Realtime Chat"
              className="w-64 sm:w-80 md:w-96 rounded-2xl shadow-lg object-cover"
            />
          </div>

          <div className="text-center md:text-left md:w-1/2">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Realtime Chat & Instant Friend Search
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Chat live and find people instantly. MyChat shows matching users
              as you type and lets you start a real-time conversation with one
              click.
            </p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-50 text-center py-10 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">MyChat</h2>
        <p className="text-gray-600 max-w-md mx-auto text-sm mb-4">
          From every message, a connection is born linking people across places,
          time, and emotion.
        </p>
        <a
          href="/login"
          className="inline-block rounded-full border border-indigo-600 px-10 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
        >
          Get Started
        </a>
      </footer>
    </div>
  );
};

export default Home;
