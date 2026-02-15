function Loading({ count = 3 }) {
  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-10">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="space-y-4">
          <div className="skeleton h-[220px] w-full rounded-xl"></div>
          <div className="skeleton h-8 w-3/4"></div>
          <div className="skeleton h-4 w-1/2"></div>
          <div className="skeleton h-7 w-1/3"></div>
          <div className="skeleton h-12 w-48"></div>
        </div>
      ))}
    </div>
  );
}

export default Loading;
