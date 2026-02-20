import { useState, useRef, useCallback } from "react";

const ROOMS = [
  { id: "room1", title: "Room 101", subtitle: "AC Computer Lab", capacity: 30, color: "#6366f1" },
  { id: "room2", title: "Room 102", subtitle: "Projector Hall", capacity: 50, color: "#0ea5e9" },
  { id: "room3", title: "Room 103", subtitle: "Practical Lab", capacity: 25, color: "#10b981" },
  { id: "room4", title: "Seminar Hall", subtitle: "Main Auditorium", capacity: 100, color: "#f59e0b" },
  { id: "room5", title: "Room 201", subtitle: "Discussion Room", capacity: 20, color: "#ec4899" },
];

const COLORS = {
  mern: { bg: "#6366f1", light: "#eef2ff", text: "#4338ca" },
  java: { bg: "#0ea5e9", light: "#e0f2fe", text: "#0369a1" },
  python: { bg: "#10b981", light: "#d1fae5", text: "#065f46" },
  react: { bg: "#f59e0b", light: "#fef3c7", text: "#92400e" },
  data: { bg: "#ec4899", light: "#fce7f3", text: "#9d174d" },
  devops: { bg: "#8b5cf6", light: "#ede9fe", text: "#5b21b6" },
  node: { bg: "#14b8a6", light: "#ccfbf1", text: "#115e59" },
  angular: { bg: "#ef4444", light: "#fee2e2", text: "#991b1b" },
};

const INITIAL_EVENTS = [
  { id: "1", title: "MERN Morning Batch", instructor: "Rajesh Kumar", students: 28, day: 1, startH: 9, endH: 11, roomId: "room1", colorKey: "mern" },
  { id: "2", title: "Java Full Stack", instructor: "Priya Sharma", students: 45, day: 1, startH: 11.5, endH: 13, roomId: "room2", colorKey: "java" },
  { id: "3", title: "Python Evening Batch", instructor: "Amit Patel", students: 22, day: 1, startH: 15, endH: 17, roomId: "room3", colorKey: "python" },
  { id: "4", title: "React Weekend Batch", instructor: "Sneha Iyer", students: 18, day: 2, startH: 10, endH: 13, roomId: "room1", colorKey: "react" },
  { id: "5", title: "Data Science Pro", instructor: "Dr. Vikram Nair", students: 32, day: 2, startH: 14, endH: 17, roomId: "room2", colorKey: "data" },
  { id: "6", title: "DevOps Bootcamp", instructor: "Kiran Reddy", students: 20, day: 1, startH: 13.5, endH: 15.5, roomId: "room4", colorKey: "devops" },
  { id: "7", title: "Node.js Advanced", instructor: "Meena Krishnan", students: 15, day: 2, startH: 9, endH: 11, roomId: "room3", colorKey: "node" },
  { id: "8", title: "Angular Enterprise", instructor: "Suresh Babu", students: 24, day: 1, startH: 9, endH: 11.5, roomId: "room5", colorKey: "angular" },
  { id: "9", title: "Python Data Analysis", instructor: "Ravi Shankar", students: 19, day: 2, startH: 11, endH: 13, roomId: "room5", colorKey: "python" },
  { id: "10", title: "MERN Evening Batch", instructor: "Deepa Thomas", students: 26, day: 2, startH: 15, endH: 17.5, roomId: "room1", colorKey: "mern" },
  { id: "11", title: "Java Spring Boot", instructor: "Anand Kumar", students: 38, day: 1, startH: 16, endH: 18, roomId: "room2", colorKey: "java" },
  { id: "12", title: "Data Science Intro", instructor: "Lakshmi Devi", students: 48, day: 2, startH: 10, endH: 12, roomId: "room4", colorKey: "data" },
];

const START_HOUR = 8;
const END_HOUR = 20;
const TOTAL_HOURS = END_HOUR - START_HOUR;
const DAY_LABELS = ["Mon Feb 20", "Tue Feb 21"];
const TIME_SLOTS = Array.from({ length: TOTAL_HOURS * 2 + 1 }, (_, i) => {
  const h = START_HOUR + Math.floor(i / 2);
  const m = i % 2 === 0 ? "00" : "30";
  return `${String(h).padStart(2, "0")}:${m}`;
});

function pct(h) {
  return ((h - START_HOUR) / TOTAL_HOURS) * 100;
}

function formatH(h) {
  const hr = Math.floor(h);
  const min = (h % 1) * 60;
  const ampm = hr >= 12 ? "PM" : "AM";
  const displayHr = hr > 12 ? hr - 12 : hr || 12;
  return `${displayHr}:${String(min).padStart(2, "0")} ${ampm}`;
}

function hasConflict(events, updatedEvent) {
  return events.some(ev => {
    if (ev.id === updatedEvent.id) return false;

    const sameRoom = ev.roomId === updatedEvent.roomId;
    const sameDay = ev.day === updatedEvent.day;

    const overlap =
      updatedEvent.startH < ev.endH &&
      updatedEvent.endH > ev.startH;

    return sameRoom && sameDay && overlap;
  });
}

export default function BatchScheduler() {
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [dragging, setDragging] = useState(null);
  const [resizing, setResizing] = useState(null);
  const [selected, setSelected] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [activeDay, setActiveDay] = useState(0);
  const gridRef = useRef(null);

  const handleDragStart = useCallback((e, event) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setDragging({ event, offsetY: e.clientY - rect.top });
    setSelected(event.id);
  }, []);

  const handleResizeStart = useCallback((e, event) => {
    e.stopPropagation();
    setResizing({ event });
    const updatedEvent = {
  ...resizing.event,
  endH: newEnd,
};

if (!hasConflict(events, updatedEvent)) {
  setEvents(prev =>
    prev.map(ev =>
      ev.id === updatedEvent.id ? updatedEvent : ev
    )
  );
}

  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!gridRef.current) return;

    if (dragging) {
      const grid = gridRef.current;
      const gridRect = grid.getBoundingClientRect();
      const rows = grid.querySelectorAll("[data-room-row]");

      let targetRoomId = dragging.event.roomId;
      for (const row of rows) {
        const rowRect = row.getBoundingClientRect();
        if (e.clientY >= rowRect.top && e.clientY <= rowRect.bottom) {
          targetRoomId = row.dataset.roomRow;
          break;
        }
      }

      const timelineEl = grid.querySelector("[data-timeline]");
      if (!timelineEl) return;
      const tlRect = timelineEl.getBoundingClientRect();
      const relX = (e.clientX - tlRect.left) / tlRect.width;
      const duration = dragging.event.endH - dragging.event.startH;
      let newStart = Math.round((relX * TOTAL_HOURS + START_HOUR) * 4) / 4;
      newStart = Math.max(START_HOUR, Math.min(END_HOUR - duration, newStart));

      setEvents(prev =>
        prev.map(ev =>
          ev.id === dragging.event.id
            ? { ...ev, startH: newStart, endH: newStart + duration, roomId: targetRoomId }
            : ev
        )
      );
    }

    if (resizing) {
      const timelineEl = gridRef.current.querySelector("[data-timeline]");
      if (!timelineEl) return;
      const tlRect = timelineEl.getBoundingClientRect();
      const relX = (e.clientX - tlRect.left) / tlRect.width;
      let newEnd = Math.round((relX * TOTAL_HOURS + START_HOUR) * 4) / 4;
      newEnd = Math.max(resizing.event.startH + 0.5, Math.min(END_HOUR, newEnd));

      setEvents(prev =>
        prev.map(ev =>
          ev.id === resizing.event.id ? { ...ev, endH: newEnd } : ev
        )
      );
    }

    const updatedEvent = {
  ...dragging.event,
  startH: newStart,
  endH: newStart + duration,
  roomId: targetRoomId,
};

if (!hasConflict(events, updatedEvent)) {
  setEvents(prev =>
    prev.map(ev =>
      ev.id === updatedEvent.id ? updatedEvent : ev
    )
  );
}

  }, [dragging, resizing]);

  const handleMouseUp = useCallback(() => {
    setDragging(null);
    setResizing(null);
  }, []);

  const filteredEvents = events.filter(e => e.day === activeDay + 1);
  const stats = {
    total: events.length,
    today: filteredEvents.length,
    students: filteredEvents.reduce((s, e) => s + e.students, 0),
    rooms: new Set(filteredEvents.map(e => e.roomId)).size,
  };

  return (
    <div
      style={{
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        background: "#f8fafc",
        minHeight: "100vh",
        padding: "24px",
        boxSizing: "border-box",
        color: "#0f172a",
        userSelect: dragging || resizing ? "none" : "auto",
        cursor: dragging ? "grabbing" : "default",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 12px rgba(99,102,241,0.3)"
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px" }}>
                Batch Scheduler
              </h1>
            </div>
            <p style={{ margin: 0, color: "#64748b", fontSize: 13 }}>
              Room allocation & training schedule management
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { label: "Total Batches", value: stats.total, color: "#6366f1" },
              { label: "Today's Sessions", value: stats.today, color: "#0ea5e9" },
              { label: "Students Enrolled", value: stats.students, color: "#10b981" },
              { label: "Rooms Active", value: stats.rooms, color: "#f59e0b" },
            ].map(s => (
              <div key={s.label} style={{
                background: "white", borderRadius: 12, padding: "10px 16px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
                border: "1px solid #e2e8f0", minWidth: 110,
              }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: s.color, lineHeight: 1.2 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Day tabs */}
        <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
          {DAY_LABELS.map((d, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              style={{
                padding: "8px 20px", borderRadius: 8, border: "none", cursor: "pointer",
                fontSize: 13, fontWeight: 600, transition: "all 0.15s",
                background: activeDay === i ? "#6366f1" : "white",
                color: activeDay === i ? "white" : "#64748b",
                boxShadow: activeDay === i
                  ? "0 4px 12px rgba(99,102,241,0.3)"
                  : "0 1px 3px rgba(0,0,0,0.06)",
                transform: activeDay === i ? "translateY(-1px)" : "none",
              }}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Scheduler Grid */}
      <div style={{
        background: "white", borderRadius: 16,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
        border: "1px solid #e2e8f0", overflow: "hidden",
      }}>
        <div style={{ display: "flex" }} ref={gridRef}>
          {/* Room labels column */}
          <div style={{ width: 180, flexShrink: 0, borderRight: "1px solid #e2e8f0" }}>
            <div style={{
              height: 44, borderBottom: "1px solid #e2e8f0",
              background: "#f8fafc", display: "flex", alignItems: "center",
              padding: "0 16px",
            }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.05em", textTransform: "uppercase" }}>Rooms</span>
            </div>
            {ROOMS.map((room, i) => (
              <div key={room.id} style={{
                height: 80, borderBottom: i < ROOMS.length - 1 ? "1px solid #f1f5f9" : "none",
                display: "flex", alignItems: "center", padding: "0 16px",
                background: i % 2 === 0 ? "white" : "#fafafa",
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: room.color, marginRight: 10, flexShrink: 0,
                  boxShadow: `0 0 0 3px ${room.color}22`,
                }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{room.title}</div>
                  <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 1 }}>{room.subtitle}</div>
                  <div style={{ fontSize: 10, color: "#cbd5e1", marginTop: 1 }}>👥 {room.capacity} seats</div>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline area */}
          <div style={{ flex: 1, overflow: "auto" }}>
            {/* Time header */}
            <div style={{
              height: 44, borderBottom: "1px solid #e2e8f0",
              background: "#f8fafc", position: "relative",
              minWidth: 900,
            }} data-timeline>
              {TIME_SLOTS.filter((_, i) => i % 2 === 0).map((slot, i) => (
                <div key={slot} style={{
                  position: "absolute",
                  left: `${(i / TOTAL_HOURS) * 100}%`,
                  top: 0, bottom: 0,
                  display: "flex", alignItems: "center",
                  paddingLeft: 6,
                }}>
                  <span style={{ fontSize: 11, fontWeight: 500, color: "#94a3b8", whiteSpace: "nowrap" }}>
                    {parseInt(slot) > 12 ? `${parseInt(slot) - 12}:00 PM` : `${parseInt(slot)}:00 ${parseInt(slot) < 12 ? "AM" : "PM"}`}
                  </span>
                </div>
              ))}
            </div>

            {/* Room rows */}
            {ROOMS.map((room, ri) => {
              const roomEvents = filteredEvents.filter(e => e.roomId === room.id);
              return (
                <div
                  key={room.id}
                  data-room-row={room.id}
                  style={{
                    height: 80,
                    borderBottom: ri < ROOMS.length - 1 ? "1px solid #f1f5f9" : "none",
                    position: "relative",
                    background: ri % 2 === 0 ? "white" : "#fafafa",
                    minWidth: 900,
                  }}
                >
                  {/* Hour grid lines */}
                  {Array.from({ length: TOTAL_HOURS }, (_, i) => (
                    <div key={i} style={{
                      position: "absolute",
                      left: `${(i / TOTAL_HOURS) * 100}%`,
                      top: 0, bottom: 0, width: 1,
                      background: i === 0 ? "transparent" : "#f1f5f9",
                    }} />
                  ))}
                  {/* Half-hour lines */}
                  {Array.from({ length: TOTAL_HOURS }, (_, i) => (
                    <div key={`h${i}`} style={{
                      position: "absolute",
                      left: `${((i + 0.5) / TOTAL_HOURS) * 100}%`,
                      top: 0, bottom: 0, width: 1,
                      background: "#f8fafc",
                    }} />
                  ))}

                  {roomEvents.map(event => {
                    const col = COLORS[event.colorKey];
                    const leftPct = pct(event.startH);
                    const widthPct = pct(event.endH) - leftPct;
                    const isSelected = selected === event.id;
                    const isDraggingThis = dragging?.event.id === event.id;

                    return (
                      <div
                        key={event.id}
                        onMouseDown={e => handleDragStart(e, event)}
                        onMouseEnter={e => setTooltip({ event, x: e.clientX, y: e.clientY })}
                        onMouseLeave={() => setTooltip(null)}
                        onClick={() => setSelected(isSelected ? null : event.id)}
                        style={{
                          position: "absolute",
                          left: `calc(${leftPct}% + 2px)`,
                          width: `calc(${widthPct}% - 4px)`,
                          top: 6, bottom: 6,
                          borderRadius: 8,
                          background: col.light,
                          borderLeft: `3px solid ${col.bg}`,
                          cursor: "grab",
                          padding: "4px 8px",
                          overflow: "hidden",
                          transition: isDraggingThis ? "none" : "box-shadow 0.15s, transform 0.15s",
                          boxShadow: isSelected
                            ? `0 0 0 2px ${col.bg}, 0 4px 16px ${col.bg}33`
                            : `0 1px 3px rgba(0,0,0,0.08)`,
                          transform: isDraggingThis ? "scale(1.02) rotate(0.5deg)" : "none",
                          zIndex: isDraggingThis ? 100 : isSelected ? 10 : 1,
                        }}
                      >
                        <div style={{ fontSize: 11, fontWeight: 700, color: col.text, lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {event.title}
                        </div>
                        <div style={{ fontSize: 10, color: col.bg, opacity: 0.8, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {formatH(event.startH)} – {formatH(event.endH)}
                        </div>
                        {widthPct > 12 && (
                          <div style={{ fontSize: 10, color: "#64748b", marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            👨‍🏫 {event.instructor}
                          </div>
                        )}
                        {/* Resize handle */}
                        <div
                          onMouseDown={e => { e.stopPropagation(); handleResizeStart(e, event); }}
                          style={{
                            position: "absolute", right: 0, top: 0, bottom: 0, width: 8,
                            cursor: "ew-resize", borderRadius: "0 8px 8px 0",
                            background: `${col.bg}44`,
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, marginRight: 4 }}>LEGEND</span>
        {Object.entries(COLORS).map(([key, col]) => (
          <div key={key} style={{
            display: "flex", alignItems: "center", gap: 5,
            background: "white", borderRadius: 6, padding: "4px 10px",
            border: "1px solid #e2e8f0", fontSize: 11, color: "#475569",
          }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: col.bg }} />
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </div>
        ))}
        <div style={{ marginLeft: "auto", fontSize: 11, color: "#94a3b8", display: "flex", gap: 16 }}>
          <span>🖱️ Drag to reschedule</span>
          <span>↔️ Resize to adjust duration</span>
        </div>
      </div>

      {/* Detail panel for selected event */}
      {selected && (() => {
        const ev = events.find(e => e.id === selected);
        if (!ev) return null;
        const col = COLORS[ev.colorKey];
        const room = ROOMS.find(r => r.id === ev.roomId);
        return (
          <div style={{
            marginTop: 16,
            background: "white", borderRadius: 12,
            border: `1px solid ${col.bg}44`,
            padding: 16,
            boxShadow: `0 4px 20px ${col.bg}22`,
            display: "flex", gap: 20, alignItems: "flex-start",
            flexWrap: "wrap",
          }}>
            <div style={{
              width: 4, alignSelf: "stretch", borderRadius: 4,
              background: col.bg, flexShrink: 0,
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700, color: col.text }}>{ev.title}</h3>
                  <div style={{ fontSize: 12, color: "#64748b" }}>
                    {DAY_LABELS[ev.day - 1]} · {formatH(ev.startH)} – {formatH(ev.endH)} · {Math.round((ev.endH - ev.startH) * 60)} min
                  </div>
                </div>
                <button onClick={() => setSelected(null)} style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "#94a3b8", fontSize: 18, lineHeight: 1, padding: 4,
                }}>✕</button>
              </div>
              <div style={{ display: "flex", gap: 16, marginTop: 12, flexWrap: "wrap" }}>
                {[
                  { icon: "👨‍🏫", label: "Instructor", value: ev.instructor },
                  { icon: "🏛️", label: "Room", value: `${room?.title} – ${room?.subtitle}` },
                  { icon: "👥", label: "Students", value: `${ev.students} enrolled` },
                  { icon: "📊", label: "Occupancy", value: `${Math.round((ev.students / (room?.capacity || 1)) * 100)}%` },
                ].map(item => (
                  <div key={item.label} style={{
                    background: col.light, borderRadius: 8, padding: "8px 14px",
                  }}>
                    <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600, marginBottom: 2 }}>{item.icon} {item.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: col.text }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}