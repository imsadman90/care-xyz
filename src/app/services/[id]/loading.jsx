function Loading({ count = 6 }) {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-10">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="">
          <div className="skeleton h-[300px] w-full rounded-xl"></div>
        </div>
      ))}
    </div>
  );
}

export default Loading;
