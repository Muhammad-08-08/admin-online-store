
const Loader = () => {
  return (
    <div className="flex justify-center items-center space-x-1">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="w-2.5 h-5 bg-blue-500 rounded-md"
          style={{
            animation: `loader3 3s ease-in-out infinite`,
            animationDelay: `${-0.8 + i * 0.1}s`,
          }}
        ></div>
      ))}
      <style>{`
        @keyframes loader3 {
          0% {
            transform: scale(1);
          }
          20% {
            transform: scale(1, 2.32);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
