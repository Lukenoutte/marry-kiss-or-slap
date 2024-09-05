"use client";

import { useEffect } from "react";

export default function Error({ error }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex-col text-center">
        <p className="text-2xl text-gray-400">Something went wrong! :(</p>
      </div>
    </div>
  );
}
