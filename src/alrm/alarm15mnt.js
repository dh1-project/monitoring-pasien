export function createAlarmEngine({
  outOfBedMinutes = 15,
  cooldownMs = 60_000,
  onAlarm,
} = {}) {
  const rooms = {}; // room_id -> state
  const cooldown = {}; // `${room_id}:${type}` -> lastNotifyMs
  const outOfBedMs = outOfBedMinutes * 60_000;

  const now = () => Date.now();

  function isFall(evt) {
    if (evt?.fall_detected === true) return true;
    const e = String(evt?.event || "").toUpperCase();
    const t = String(evt?.target_status || "").toUpperCase();
    return e === "FALL" || t === "FALL";
  }

  function emit(room_id, type, message, raw) {
    const key = `${room_id}:${type}`;
    const ms = now();
    if (ms - (cooldown[key] || 0) < cooldownMs) return;
    cooldown[key] = ms;

    onAlarm?.({
      id: `${key}:${ms}`,
      ts: new Date(ms).toISOString(),
      room_id,
      type, // "WASPADA" | "JATUH"
      message,
      raw,
    });
  }

  function ingest(evt) {
    const room_id = evt?.room_id;
    if (!room_id) return;

    const status = String(evt?.status || "").toUpperCase(); // PEOPLE/NO_PEOPLE
    const ms = now();

    const prev = rooms[room_id] || {
      room_id,
      status: "UNKNOWN",
      lastSeenMs: 0,
      noPeopleSinceMs: null,
      alarm: null,
    };

    const next = { ...prev, status, lastSeenMs: ms };

    // track NO_PEOPLE duration
    if (status === "NO_PEOPLE") {
      if (!prev.noPeopleSinceMs) next.noPeopleSinceMs = ms;
    } else if (status === "PEOPLE") {
      next.noPeopleSinceMs = null;
      if (prev.alarm?.type === "WASPADA") next.alarm = null;
    }

    // jatuh: PEOPLE + indikator jatuh
    if (status === "PEOPLE" && isFall(evt)) {
      next.alarm = { type: "JATUH", sinceMs: ms };
      emit(room_id, "JATUH", `🚨 Jatuh di ${room_id}`, evt);
    }

    rooms[room_id] = next;
    return next;
  }

  function tick() {
    const ms = now();
    for (const room_id of Object.keys(rooms)) {
      const r = rooms[room_id];
      if (r.status === "NO_PEOPLE" && r.noPeopleSinceMs) {
        const dur = ms - r.noPeopleSinceMs;
        if (dur >= outOfBedMs && r.alarm?.type !== "WASPADA") {
          r.alarm = { type: "WASPADA", sinceMs: r.noPeopleSinceMs };
          emit(room_id, "WASPADA", `⚠️ Waspada: ${room_id} NO_PEOPLE ≥ ${outOfBedMinutes} menit`, r);
        }
      }
    }
  }

  function getRooms() {
    return { ...rooms };
  }

  function clearRoomAlarm(room_id) {
    if (rooms[room_id]) rooms[room_id].alarm = null;
  }

  return { ingest, tick, getRooms, clearRoomAlarm };
}
