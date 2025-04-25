"use client";

export default function Loading() {
  return (
    <div className="h-[100dvh] w-full flex items-center justify-center">
      <div className="spinner">
        <div className="flex gap-2 text-3xl">
          <div className="animate-bounce" style={{ animationDuration: "0.5s" }}>
            .
          </div>
          <div className="animate-bounce" style={{ animationDuration: "1s" }}>
            .
          </div>

          <div className="animate-bounce" style={{ animationDuration: "0.3s" }}>
            .
          </div>
          <div className="animate-bounce" style={{ animationDuration: "1.5s" }}>
            .
          </div>
          <div className="animate-bounce" style={{ animationDuration: "0.8s" }}>
            .
          </div>
        </div>
      </div>
    </div>
  );
}
