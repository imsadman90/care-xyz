function Loading() {
  return (
    <div className="grid md:grid-cols-3 gap-5">
      {[...Array(9)].map((_, index) => (
        <div key={index} className="skeleton h-48 w-full rounded-md mb-4"></div>
      ))}
    </div>
  );
}

export default Loading;
