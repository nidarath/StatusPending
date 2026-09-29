"use client";

import { useRef, useState, type FormEvent } from "react";
import { Brand } from "./brand";

type Stage = "Saved" | "Applied" | "Assessment" | "Interview" | "Offer" | "Rejected" | "Withdrawn";
type Application = { id: number; company: string; role: string; location: string; stage: Stage; date: string };
const stages: Stage[] = ["Saved", "Applied", "Assessment", "Interview", "Offer", "Rejected", "Withdrawn"];
const initialApplications: Application[] = [
  { id: 1, company: "Linear", role: "Product Design Intern", location: "San Francisco, CA", stage: "Interview", date: "Sep 24" },
  { id: 2, company: "Notion", role: "Software Engineering Intern", location: "New York, NY", stage: "Applied", date: "Sep 22" },
  { id: 3, company: "Figma", role: "Product Design Intern", location: "San Francisco, CA", stage: "Assessment", date: "Sep 20" },
  { id: 4, company: "Vercel", role: "Frontend Engineering Intern", location: "Remote", stage: "Saved", date: "Sep 19" },
];
const initialTasks = [{ id: 1, title: "Coffee chat with Maya", company: "Linear", time: "Today, 2:00 PM", done: false }, { id: 2, title: "Finish design challenge", company: "Figma", time: "Tomorrow", done: false }, { id: 3, title: "Follow up with recruiter", company: "Notion", time: "Sep 30", done: true }];

function Icon({ name }: { name: "grid" | "briefcase" | "check" | "chart" | "search" | "plus" }) {
  const paths = { grid: "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z", briefcase: "M8 6V3h8v3 M3 7h18v13H3z M3 12c6 3 12 3 18 0 M12 12v4", check: "M9 4H4v16h16V11 M9 10l4 4L22 4", chart: "M4 3v17h17 M8 15v-4 M13 15V7 M18 15V4", search: "M20 20l-5-5 M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0", plus: "M12 5v14 M5 12h14" };
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}

export default function WorkspacePreview() {
  const [applications, setApplications] = useState(initialApplications);
  const [tasks, setTasks] = useState(initialTasks);
  const [tab, setTab] = useState("Overview");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All stages");
  const [selected, setSelected] = useState<Application | null>(null);
  const [notice, setNotice] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const shown = applications.filter((app) => `${app.company} ${app.role}`.toLowerCase().includes(query.toLowerCase()) && (filter === "All stages" || app.stage === filter));
  const openApplication = (app: Application | null) => {
    dialog.current?.querySelector("form")?.reset();
    setSelected(app);
    dialog.current?.showModal();
  };
  function saveApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const company = String(data.get("company") ?? "").trim();
    const role = String(data.get("role") ?? "").trim();
    if (!company || !role) return;
    const application: Application = { id: selected?.id ?? Date.now(), company, role, location: String(data.get("location") ?? "").trim() || "Not specified", stage: data.get("stage") as Stage, date: selected?.date ?? "Just added" };
    setApplications((current) => selected ? current.map((app) => app.id === selected.id ? application : app) : [...current, application]);
    setNotice(`${application.company} ${selected ? "updated" : "added"} in this demo.`);
    setQuery(""); setFilter("All stages"); setTab("Applications"); dialog.current?.close();
  }
  const stats = [{ label: "Applications", value: applications.length, sub: "Every possibility, together", icon: "briefcase" as const }, { label: "In progress", value: applications.filter((app) => ["Applied", "Assessment", "Interview"].includes(app.stage)).length, sub: "Good things are in motion", icon: "chart" as const }, { label: "Interviews", value: applications.filter((app) => app.stage === "Interview").length, sub: "A chance to be yourself", icon: "grid" as const }, { label: "Offers", value: applications.filter((app) => app.stage === "Offer").length, sub: "Your next chapter awaits", icon: "check" as const }];
  return (
    <div className="workspace-window">
      <div className="window-topbar"><div className="window-dots" aria-hidden="true"><i /><i /><i /></div><span>YOUR NEXT CHAPTER / WORKSPACE</span><span className="demo-badge">INTERACTIVE DEMO</span></div>
      <div className="workspace-body">
        <aside className="workspace-sidebar"><Brand compact /><div className="workspace-switch"><span className="workspace-avatar">Y</span><div>Your workspace<small>Make yourself at home</small></div></div><span className="sidebar-label">WORKSPACE</span><nav aria-label="Demo workspace">{([['Overview', 'grid'], ['Applications', 'briefcase'], ['Tasks', 'check'], ['Insights', 'chart']] as const).map(([label, icon]) => <button key={label} className={tab === label ? "active" : ""} onClick={() => setTab(label)} aria-pressed={tab === label}><Icon name={icon} />{label}{label === "Applications" && <span className="nav-count">{applications.length}</span>}</button>)}</nav><div className="sidebar-bottom"><div className="small-dot" /><p>A work in progress.<br /><strong>Just like the good stuff.</strong></p><span className="sidebar-spark" aria-hidden="true">✳</span></div><div className="demo-user"><span className="workspace-avatar">JD</span><div>Jamie Davis<small>Demo workspace</small></div></div></aside>
        <div className="workspace-main">
          <div className="workspace-breadcrumb"><span>Workspace <span>/</span> <strong>{tab}</strong></span><span className="live-note"><span className="small-dot" /> A fresh start</span></div>
          <div className="workspace-title"><div><h2>{tab === "Overview" ? "A little progress, every day." : tab === "Insights" ? "Look how far you’ve come." : tab === "Tasks" ? "One thing at a time." : "Your next possibilities."}</h2><p>{tab === "Overview" ? "Welcome back, Jamie. Let’s make your next move a good one." : "A little clarity for wherever your search takes you."}</p></div><button className="button button-dark add-button" onClick={() => openApplication(null)}><Icon name="plus" /> Add application</button></div>
          <div className="workspace-stats">{stats.map((stat) => <div className="stat" key={stat.label}><span>{stat.label}<Icon name={stat.icon} /></span><strong>{String(stat.value).padStart(2, "0")}</strong><small>{stat.sub}</small></div>)}</div>
          {tab === "Insights" ? <section className="insights-panel"><div className="panel-heading"><h3>Your pipeline</h3><span>Current stage counts</span></div>{stages.map((stage) => <div className="insight-row" key={stage}><span>{stage}</span><div><i style={{ width: `${applications.filter((app) => app.stage === stage).length / Math.max(applications.length, 1) * 100}%` }} /></div><strong>{applications.filter((app) => app.stage === stage).length}</strong></div>)}</section> : <div className={`workspace-panels ${tab === "Overview" ? "" : "single-panel"}`}>
            {tab !== "Tasks" && <section className="applications-panel"><div className="panel-heading"><h3>Your applications <span>{applications.length}</span></h3><label className="stage-filter"><span className="sr-only">Filter by stage</span><select value={filter} onChange={(event) => setFilter(event.target.value)}><option>All stages</option>{stages.map((stage) => <option key={stage}>{stage}</option>)}</select></label></div><label className="app-search"><Icon name="search" /><input placeholder="Find your next possibility…" aria-label="Search applications" value={query} onChange={(event) => setQuery(event.target.value)} /></label><div className="application-list">{shown.map((app) => <button className="application-row" key={app.id} onClick={() => openApplication(app)}><span className={`company-avatar company-${app.company.toLowerCase()}`}>{app.company === "Linear" ? "◒" : app.company === "Vercel" ? "▲" : app.company.charAt(0)}</span><span className="app-description"><strong>{app.company}</strong><small>{app.role}</small></span><span className={`stage stage-${app.stage.toLowerCase()}`}><i />{app.stage}</span><span className="row-arrow" aria-hidden="true">↗</span></button>)}{!shown.length && <p className="empty-state">No matches yet. Try another company or stage.</p>}</div><div className="panel-bottom"><span>{shown.length} possibilities. One organized place.</span><span aria-hidden="true">↗</span></div></section>}
            {tab !== "Applications" && <section className="tasks-panel"><div className="panel-heading"><h3>Up next</h3><span className="task-count">{tasks.filter((task) => !task.done).length} to-dos</span></div><p className="panel-subtitle">Small steps. Real momentum.</p><div className="task-list">{tasks.map((task) => <label className={`task-row ${task.done ? "completed" : ""}`} key={task.id}><input type="checkbox" checked={task.done} onChange={() => setTasks((current) => current.map((item) => item.id === task.id ? { ...item, done: !item.done } : item))} /><span><strong>{task.title}</strong><small>{task.company} <span>·</span> {task.time}</small></span></label>)}</div><div className="gentle-note"><span aria-hidden="true">✳</span><p>You don’t have to figure it all out today.<br /><strong>Just take the next step.</strong></p></div></section>}
          </div>}
          <p className="demo-notice" role="status">{notice || "Sample data · Changes reset on refresh"}</p>
        </div>
      </div>
      <dialog ref={dialog} className="application-dialog" aria-labelledby="dialog-title" onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}><div className="dialog-inner"><div className="panel-heading"><span className="eyebrow">YOUR NEXT POSSIBILITY</span><button className="close-dialog" aria-label="Close application form" onClick={() => dialog.current?.close()}>×</button></div><h2 id="dialog-title">{selected ? "The next step is yours." : "Something to look forward to."}</h2><p>This is a demo. Your changes reset on refresh.</p><form key={selected?.id ?? "new"} onSubmit={saveApplication}><label>Company<input name="company" required maxLength={80} defaultValue={selected?.company} placeholder="e.g. Linear" /></label><label>Role<input name="role" required maxLength={120} defaultValue={selected?.role} placeholder="e.g. Product Design Intern" /></label><label>Location<input name="location" maxLength={100} defaultValue={selected?.location} placeholder="e.g. Remote" /></label><label>Stage<select name="stage" defaultValue={selected?.stage ?? "Saved"}>{stages.map((stage) => <option key={stage}>{stage}</option>)}</select></label><button type="submit" className="button button-dark">{selected ? "Save changes" : "Add to your possibilities"}<Icon name="plus" /></button></form></div></dialog>
    </div>
  );
}
