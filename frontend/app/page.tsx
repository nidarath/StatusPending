import WorkspacePreview from "./workspace-preview";
import { Arrow, Brand } from "./brand";

const questions = [
  ["What is status:pending?", "A calmer home for your internship search. Keep applications, recruiting stages, contacts, and next steps together, so you can focus on the opportunities ahead."],
  ["Can I try it without an account?", "Yes. The interactive preview above is yours to explore. Add a sample application, change its stage, or check off a task. This demo stays in your current session and resets when you refresh."],
  ["Is this just for software engineering internships?", "Not at all. Your search is your own. Track internships in design, finance, marketing, engineering, or any field you’re exploring."],
  ["Will this submit applications for me?", "You’re in charge of applying. Status:pending helps organize what comes next: where you applied, what stage you’re at, and who you need to follow up with."],
];

export default function Home() {
  return (
    <div className="site-shell" id="top">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a href="#top" aria-label="Status pending home"><Brand /></a>
        <nav aria-label="Main navigation"><a href="#features">the essentials.</a><a href="#how-it-works">how it works.</a><a href="#faq">FAQs.</a></nav>
        <a className="button button-small" href="#workspace">Explore the demo <Arrow /></a>
      </header>
      <main id="main">
        <section className="hero">
          <div className="hero-grid" aria-hidden="true" />
          <div className="eyebrow hero-label"><span className="status-dot" /> YOUR NEXT CHAPTER STARTS HERE</div>
          <h1>Less chaos.<br /><span>More possibility.</span></h1>
          <p className="hero-description">Your internship search has a lot of moving parts.<br className="desktop-break" /> Give every application, follow-up, and next step a home.</p>
          <div className="hero-actions"><a className="button button-dark" href="#workspace">Find your flow <Arrow /></a><a className="button button-light" href="#how-it-works">See how it works <span aria-hidden="true">↗</span></a></div>
          <p className="hero-footnote"><span aria-hidden="true">✓</span> Built for students. Ready for what’s next.</p>
          <div className="hero-margin-note left-note" aria-hidden="true">LESS TAB SWITCHING</div><div className="hero-margin-note right-note" aria-hidden="true">MORE FORWARD MOTION</div>
        </section>
        <section className="preview-section" id="workspace" aria-label="Interactive application workspace demo">
          <div className="preview-caption"><span><span className="small-dot" /> A LITTLE CLARITY GOES A LONG WAY</span><span>YOUR WORKSPACE, AT A GLANCE <span aria-hidden="true">↙</span></span></div>
          <WorkspacePreview />
          <p className="demo-caption"><span className="small-dot" /> A real little demo. Click around, make it yours. <span>No account needed.</span></p>
        </section>
        <div className="statement-strip"><span>From the first “what if”</span><div className="journey" aria-hidden="true"><i /> <b /> <i /> <b /> <i /> <b /> <i className="filled" /></div><span>to the “you’re hired.”</span></div>
        <section id="features" className="features section-block">
          <div className="section-heading"><div><span className="eyebrow">01 / THE ESSENTIALS</span><h2>A clear head.<br /><span>A clearer next step.</span></h2></div><p>You bring the ambition.<br />We’ll help you keep it all together.</p></div>
          <div className="feature-grid">
            <article className="feature-card"><div className="feature-art mini-pipeline" aria-hidden="true"><div><span>SAVED</span><i /><i /></div><div><span>APPLIED</span><i /><i /><i /></div><div><span>INTERVIEW</span><i className="active-mini" /><i /></div><div className="floating-tag">↗ Moving forward</div></div><span className="feature-number">[ 01 ]</span><h3>Every opportunity.<br />One place.</h3><p>Turn scattered tabs and spreadsheets into a pipeline that makes sense. See exactly where you stand.</p></article>
            <article className="feature-card"><div className="feature-art mini-tasks" aria-hidden="true"><div><span className="fake-checkbox checked">✓</span><span>Send your application</span></div><div className="highlight-task"><span className="fake-checkbox" /><span>Follow up with Maya<small>TODAY · 10:00 AM</small></span><span>↗</span></div><div><span className="fake-checkbox" /><span>Prepare for your interview</span></div></div><span className="feature-number">[ 02 ]</span><h3>A little nudge.<br />At the right time.</h3><p>Keep deadlines, follow-ups, and the people behind each opportunity close. Always know what’s next.</p></article>
            <article className="feature-card"><div className="feature-art mini-chart" aria-hidden="true"><div className="chart-top">YOUR MOMENTUM <span>↗</span></div><div className="chart-bars">{[27, 43, 36, 57, 50, 73, 89, 100].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div><div className="chart-axis"><span>FIRST STEP</span><span>LOOK AT YOU GO</span></div></div><span className="feature-number">[ 03 ]</span><h3>See the progress.<br />Not just the pending.</h3><p>Make sense of your search with a view of your applications and stages. Small steps add up.</p></article>
          </div>
        </section>
        <section id="how-it-works" className="how-section section-block"><div className="section-heading"><div><span className="eyebrow">02 / FIND YOUR RHYTHM</span><h2>Big plans.<br /><span>Simple beginnings.</span></h2></div><a href="#workspace" className="text-link">Take a look around <Arrow /></a></div><div className="steps">{[["01", "Save the possibility.", "Found a role you love? Add the company, position, and where you found it."], ["02", "Keep things moving.", "Update your stage, set a next step, and keep the details in one place."], ["03", "Make room for what’s next.", "See your progress, learn from your search, and go after the next opportunity."]].map(([number, title, description]) => <article key={number}><span className="step-number">{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>
        <section className="faq-section section-block" id="faq"><div><span className="eyebrow">03 / A FEW GOOD QUESTIONS</span><h2>Glad you asked.</h2><p>A little more about your<br />new application companion.</p></div><div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
        <section className="closing-section"><span className="eyebrow"><span className="status-dot" /> STILL PENDING. STILL POSSIBLE.</span><h2>Your future isn’t a spreadsheet.</h2><p>Give your next chapter a little space to grow.</p><a href="#workspace" className="button button-dark">Explore your possibilities <Arrow /></a></section>
      </main>
      <footer className="site-footer"><a href="#top" aria-label="Back to top"><Brand /></a><span>A little structure for a big next step.</span><span className="footer-note">MADE FOR THE IN-BETWEEN.</span></footer>
    </div>
  );
}
