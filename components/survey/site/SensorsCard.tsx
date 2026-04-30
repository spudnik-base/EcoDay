"use client";

import { useRef } from "react";
import Card from "@/components/ui/Card";
import SpecLabel from "@/components/ui/SpecLabel";
import SensorRow from "./SensorRow";
import type { UseSurveyState } from "@/lib/useSurveyState";

type Props = { survey: UseSurveyState };

type AmbientLightSensorLike = {
  illuminance: number;
  start: () => void;
  stop: () => void;
  addEventListener: (type: string, cb: () => void) => void;
};

export default function SensorsCard({ survey }: Props) {
  const { state, updateGps } = survey;
  const lightRef = useRef<AmbientLightSensorLike | null>(null);

  function captureGps() {
    updateGps({ gpsStatus: "loading" });
    if (!navigator.geolocation) {
      updateGps({ gpsStatus: "error" });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (p) =>
        updateGps({
          lat: p.coords.latitude.toFixed(6),
          lng: p.coords.longitude.toFixed(6),
          alt: p.coords.altitude != null ? p.coords.altitude.toFixed(0) : null,
          gpsStatus: "ok"
        }),
      () => updateGps({ gpsStatus: "error" }),
      { enableHighAccuracy: true, timeout: 12000 }
    );
  }

  function captureLux() {
    const w = window as unknown as {
      AmbientLightSensor?: new () => AmbientLightSensorLike;
    };
    if (!w.AmbientLightSensor) {
      updateGps({ luxStatus: "unsupported" });
      return;
    }
    updateGps({ luxStatus: "loading" });
    try {
      const s = new w.AmbientLightSensor();
      lightRef.current = s;
      s.addEventListener("reading", () => {
        updateGps({ lux: Math.round(s.illuminance), luxStatus: "ok" });
        s.stop();
      });
      s.addEventListener("error", () => updateGps({ luxStatus: "error" }));
      s.start();
    } catch {
      updateGps({ luxStatus: "error" });
    }
  }

  return (
    <Card>
      <SpecLabel>Auto-captured sensors</SpecLabel>
      <SensorRow
        label="Altitude (GPS)"
        value={state.gps.alt}
        unit=" m"
        status={state.gps.gpsStatus}
        onCapture={captureGps}
      />
      <SensorRow
        label="Ambient light"
        value={state.gps.lux}
        unit=" lux"
        status={state.gps.luxStatus}
        onCapture={captureLux}
      />
      {state.gps.gpsStatus === "ok" && (
        <div className="text-[10px] font-mono text-ink4 pt-2">
          {state.gps.lat}, {state.gps.lng} (logged for ArcGIS)
        </div>
      )}
    </Card>
  );
}
