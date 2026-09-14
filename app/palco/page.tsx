"use client";

import { TemaProvider } from "@/components/ui/TemaProvider";
import { MotorPalco } from "@/components/palco/MotorPalco";

export default function PaginaPalco() {
  return (
    <TemaProvider tema="palco">
      <MotorPalco />
    </TemaProvider>
  );
}
