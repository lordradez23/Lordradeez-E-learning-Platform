import { Trefoil } from "ldrs/react";
import "ldrs/react/Trefoil.css";

// Default values shown
export default function Loading() {
  return (
    <div className="z-50 flex items-center justify-center min-h-screen">
      <Trefoil size="60" stroke="4" strokeLength="0.15" bgOpacity="0.4" speed="1.4" color="#1f60e2" />
    </div>
  );
}
