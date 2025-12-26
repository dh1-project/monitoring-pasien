import { useEffect, useMemo, useRef, useState } from "react";
import { connectMqtt } from "./mqttservice";
import { useBeep } from "./beep";
import { createAlarmEngine } from "./alarm15mnt";

export default function Alrm() {
  const mqttUrl = import.meta.env.VITE_MQTT_URL;
  const mqttTopic = import.meta.env.VITE_MQTT_TOPIC;
  const mqttUser = import.meta.env.VITE_MQTT_USERNAME;
  const mqttPass = import.meta.env.VITE_MQTT_PASSWORD;

  const [mqttStatus, setMqttStatus] = useState({ state: "idle" });
  const [alarms, setAlarms] = useState([]);
  const [rooms, setRooms] = useState({});

  const { start, stop } = useBeep();

  const engineRef = useRef(null);
  if (!engineRef.current) {
    engineRef.current = createAlarmEngine({
      outOfBedMinutes: 15,
      onAlarm: (a) => {
        setAlarms((prev) => [a, ...prev].slice(0, 50));
      },
    });
  }

  const latestAlarm = useMemo(() => alarms[0] || null, [alarms]);

  // MQTT connect
  useEffect(() => {
    let disconnect;
    try {
      disconnect = connectMqtt({
        url: mqttUrl,
        topic: mqttTopic,
        username: mqttUser,
        password: mqttPass,
        onStatus: setMqttStatus,
        onMessage: (evt) => {
          engineRef.current.ingest(evt);
          setRooms(engineRef.current.getRooms());
        },
      });
    } catch (err) {
      setMqttStatus({ state: "error", error: err.message });
    }

    return () => {
      stop();
      disconnect?.();
    };
  }, [mqttUrl, mqttTopic, mqttUser, mqttPass, stop]);

  // Timer tick untuk rule 15 menit
  useEffect(() => {
    const t = setInterval(() => {
      engineRef.current.tick();
      setRooms(engineRef.current.getRooms());
    }, 1000);
    return () => clearInterval(t);
  }, []);

  // bunyi saat alarm baru
  useEffect(() => {
    if (!latestAlarm) return;
    start();
    const t = setTimeout(() => stop(), 5000);
    return () => clearTimeout(t);
  }, [latestAlarm, start, stop]);

  // return (
  //   <div style={{ padding: 16 }}>
  //     <h3>Alarm Monitoring</h3>

  //     <h4 style={{ marginTop: 12 }}>Rooms</h4>
  //     {Object.values(rooms).map((r) => (
  //       <div key={r.room_id} style={{ border: "1px solid #444", padding: 10, borderRadius: 10, marginTop: 8 }}>
  //         <div><b>{r.room_id}</b> • {r.status}</div>
  //         <div>Alarm: <b>{r.alarm?.type || "NORMAL"}</b></div>
  //       </div>
  //     ))}

  //     <h4 style={{ marginTop: 12 }}>Alarm Log</h4>
  //     {alarms.map((a) => (
  //       <div key={a.id} style={{ border: "1px solid #333", padding: 10, borderRadius: 10, marginTop: 8 }}>
  //         <div><b>{a.type}</b> • {a.room_id} • <code>{a.ts}</code></div>
  //         <div>{a.message}</div>
  //       </div>
  //     ))}
  //   </div>
  // );
}
