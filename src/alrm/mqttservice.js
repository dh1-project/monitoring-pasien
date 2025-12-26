import mqtt from "mqtt";

export function connectMqtt({ url, topic, username, password, onStatus, onMessage }) {
  if (!url) throw new Error("MQTT URL kosong. Isi .env (VITE_MQTT_URL).");
  if (!topic) throw new Error("MQTT topic kosong. Isi .env (VITE_MQTT_TOPIC).");

  const client = mqtt.connect(url, {
    username: username || undefined,
    password: password || undefined,
    keepalive: 30,
    reconnectPeriod: 1500,
    connectTimeout: 10000,
    clean: true,
    clientId: `react-alarm-${Math.random().toString(16).slice(2)}`
  });

  const setStatus = (s) => onStatus?.(s);

  client.on("connect", () => {
    setStatus({ state: "connected" });
    client.subscribe(topic, { qos: 0 }, (err) => {
      if (err) setStatus({ state: "error", error: err.message });
      else setStatus({ state: "subscribed", topic });
    });
  });

  client.on("reconnect", () => setStatus({ state: "reconnecting" }));
  client.on("offline", () => setStatus({ state: "offline" }));
  client.on("close", () => setStatus({ state: "closed" }));
  client.on("error", (err) => setStatus({ state: "error", error: err.message }));

  client.on("message", (t, buf) => {
    const raw = buf.toString();
    let evt = { topic: t, raw, ts: new Date().toISOString(), alarm: false, message: raw };

    // kalau alat kirim JSON, kita parse
    try {
      const obj = JSON.parse(raw);
      evt = {
        ...evt,
        ...obj,
        alarm: Boolean(obj.alarm ?? obj.fall_detected ?? false),
        message: obj.message ?? obj.msg ?? raw,
        room_id: obj.room_id ?? obj.room ?? undefined
      };
    } catch {
      // kalau bukan JSON, heuristik sederhana
      const s = raw.toLowerCase();
      if (s.includes("alarm") || s.includes("fall") || s.includes("jatuh")) {
        evt.alarm = true;
      }
    }

    onMessage?.(evt);
  });

  return () => client.end(true);
}
