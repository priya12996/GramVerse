import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./CommunityHub.css";

const initialTasks = [
  { id: 1, title: "Check the hand pump near Ward 2", category: "Water", priority: "High", done: false },
  { id: 2, title: "Share the vaccination camp schedule", category: "Health", priority: "Medium", done: false },
  { id: 3, title: "Report the damaged streetlight", category: "Electricity", priority: "Low", done: true },
];

const announcements = [
  { date: "OCT 24", tag: "HEALTH", title: "Community health camp", text: "A general check-up camp is planned at the Panchayat Bhawan. Bring your health records if available.", icon: "✚" },
  { date: "OCT 26", tag: "AGRICULTURE", title: "Farmer advisory meeting", text: "Join the local agriculture officer for seasonal crop-care advice and questions about soil health.", icon: "🌾" },
  { date: "OCT 29", tag: "COMMUNITY", title: "Village cleanliness drive", text: "Residents are invited to help clean shared spaces and report waste collection points that need attention.", icon: "♻" },
];

const services = [
  { icon: "📣", title: "Report a problem", text: "Submit an issue affecting your neighbourhood.", href: "/complaints", tone: "peach" },
  { icon: "🗺️", title: "Explore the village", text: "See local places and infrastructure on the map.", href: "/map", tone: "blue" },
  { icon: "💧", title: "Water status", text: "Review water availability and shortage indicators.", href: "/water-prediction", tone: "mint" },
  { icon: "🌱", title: "Crop health", text: "Explore crop monitoring and agricultural insights.", href: "/crop-health", tone: "lilac" },
];

function readTasks() {
  try {
    const saved = localStorage.getItem("gramverse-community-tasks");
    return saved ? JSON.parse(saved) : initialTasks;
  } catch {
    return initialTasks;
  }
}

export default function CommunityHub() {
  const [tasks, setTasks] = useState(readTasks);
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("Community");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("gramverse-community-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const completed = tasks.filter((task) => task.done).length;
  const visibleTasks = useMemo(
    () => filter === "All" ? tasks : tasks.filter((task) => filter === "Open" ? !task.done : task.done),
    [tasks, filter],
  );

  function addTask(event) {
    event.preventDefault();
    const title = newTask.trim();
    if (!title) return;
    setTasks((current) => [{ id: Date.now(), title, category, priority: "Medium", done: false }, ...current]);
    setNewTask("");
  }

  function toggleTask(id) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, done: !task.done } : task));
  }

  return (
    <div className="community-page">
      <header className="community-header">
        <Link to="/dashboard" className="community-brand"><span className="brand-mark">🌿</span><span>GramVerse</span></Link>
        <nav aria-label="Main navigation">
          <Link to="/dashboard">Dashboard</Link><Link to="/map">Village map</Link><Link to="/complaints">Complaints</Link>
        </nav>
        <Link className="community-profile" to="/profile" aria-label="Your profile">👤</Link>
      </header>

      <main className="community-main">
        <section className="community-hero">
          <div className="hero-copy">
            <span className="eyebrow"><span className="live-dot" /> YOUR VILLAGE, CONNECTED</span>
            <h1>Community <em>Hub</em></h1>
            <p>Stay in the loop, take action together, and help make your village a better place to live.</p>
            <div className="hero-actions"><a className="primary-action" href="#task-board">＋ Add a community task</a><Link className="secondary-action" to="/complaints">Report an issue ↗</Link></div>
          </div>
          <div className="hero-art" aria-hidden="true"><div className="sun-disc" /><div className="hill hill-back" /><div className="hill hill-front" /><div className="little-house">⌂</div><div className="hero-stat"><span>✦</span><div><strong>Small steps.</strong><small>Stronger communities.</small></div></div></div>
        </section>

        <section className="community-section">
          <div className="section-heading"><div><span className="eyebrow">QUICK ACCESS</span><h2>What would you like to do?</h2></div><span className="section-note">Services for everyone</span></div>
          <div className="community-services">{services.map((service) => <Link to={service.href} className="service-card" key={service.title}><span className={`service-icon ${service.tone}`}>{service.icon}</span><span className="service-title">{service.title}</span><span className="service-text">{service.text}</span><span className="service-arrow">↗</span></Link>)}</div>
        </section>

        <div className="community-columns">
          <section className="community-panel announcements-panel">
            <div className="section-heading compact"><div><span className="eyebrow">WHAT'S HAPPENING</span><h2>Village updates</h2></div><span className="count-pill">03 updates</span></div>
            <div className="announcement-list">{announcements.map((item) => <article className="announcement-item" key={item.title}><div className="announcement-date">{item.date.split(" ")[0]}<strong>{item.date.split(" ")[1]}</strong></div><div className="announcement-body"><span className="announcement-tag">{item.tag}</span><h3>{item.title}</h3><p>{item.text}</p></div><span className="announcement-icon">{item.icon}</span></article>)}</div>
            <p className="demo-note">Sample announcements — replace these with verified local notices.</p>
          </section>

          <section className="community-panel task-panel" id="task-board">
            <div className="section-heading compact"><div><span className="eyebrow">MAKE IT HAPPEN</span><h2>Community task board</h2></div><span className="count-pill">{completed}/{tasks.length} done</span></div>
            <div className="task-progress"><span style={{ width: `${tasks.length ? completed / tasks.length * 100 : 0}%` }} /></div>
            <form className="task-form" onSubmit={addTask}><label htmlFor="task-title">Add a task</label><input id="task-title" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="e.g. Organise a lane clean-up" maxLength={120} /><div className="task-form-row"><select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Task category"><option>Community</option><option>Water</option><option>Health</option><option>Agriculture</option><option>Electricity</option><option>Roads</option></select><button type="submit" disabled={!newTask.trim()}>Add task +</button></div></form>
            <div className="task-filters" role="group" aria-label="Filter tasks">{["All", "Open", "Done"].map((item) => <button type="button" className={filter === item ? "active" : ""} key={item} onClick={() => setFilter(item)}>{item}</button>)}</div>
            <div className="task-list">{visibleTasks.map((task) => <label className={`task-row ${task.done ? "task-done" : ""}`} key={task.id}><input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} /><span className="task-copy"><strong>{task.title}</strong><small>{task.category} · {task.priority} priority</small></span><span className={`priority-dot ${task.priority.toLowerCase()}`} /></label>)}{visibleTasks.length === 0 && <p className="empty-tasks">No tasks here yet. Add one above to get started.</p>}</div>
            <p className="demo-note">Tasks are saved in this browser on this device; they are not shared with other users.</p>
          </section>
        </div>

        <footer className="community-footer"><span>🌿 <strong>GramVerse</strong> · Better villages, together.</span><span>Community Hub · Preview</span></footer>
      </main>
    </div>
  );
}
