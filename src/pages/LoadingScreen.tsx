const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center gap-6">

        <img
          src="/favicon.png"
          alt="logo"
          className="w-20 h-20 animate-pulse"
        />

        <h1 className="text-2xl font-semibold tracking-wide">
          StreamAI
        </h1>

        <div className="flex gap-2 mt-2">
          <span className="w-2 h-2 bg-white rounded-full animate-bounce" />
          <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-150" />
          <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-300" />
        </div>

      </div>
    </div>
  )
}

export default LoadingScreen