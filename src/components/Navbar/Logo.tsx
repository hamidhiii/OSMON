export default function Logo() {
    return (
      <a href="/" className="flex items-center gap-2 flex-shrink-0">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">O</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 hidden sm:block">
          Osmon Ilova
        </h1>
      </a>
    );
  }