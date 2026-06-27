/* =========================================================================
   Pole Position — translations.
   ALL user-facing strings live here, never hardcoded in index.html.
   Add a language by adding a locale with the SAME keys (a unit test enforces
   parity). German is Swiss High German: no "ß" (use "ss"), "Hoi/Grüezi" not
   "Servus", CHF with apostrophes.
   Usage: PP_I18N.setLang('en'|'de'); PP_I18N.t('focus.greet', {name:'Ben'})
   ========================================================================= */
(function () {
  "use strict";

  const en = {
    nav: { focus: "Focus", board: "Board", tasks: "Tasks", network: "Network", guide: "Guide" },
    bar: { update: "🚀 New version available.", update_btn: "Update" },
    focus: {
      greet: "Hey {name}! 🏎️",
      xp_sub: "XP · Lvl {lvl}",
      streak_sub: "Day streak",
      open_sub: "Open leads",
      tacho_sub: "today",
      next_heading: "What matters now — next steps",
      empty: "All done. 🏁 Time to hunt new leads.",
    },
    due: { today: "today", over: "{n}d over", in: "in {n}d" },
    board: { heading: "Application pipeline", open: "Open", help: "{n} in your network can help" },
    stages: {
      researching: { label: "Researching", tip: "Find roles that fit. Save the link, company & why. Favour premium/sport — that's where your AMG + HV experience shines." },
      resume: { label: "Resume Ready", tip: "Tailor your CV to THIS role. AGVS + MB HV/EV certification and Merbag first. DE + EN ready." },
      cover: { label: "Cover Letter", tip: "3 short paragraphs: why them, why you (HV, AMG, Merbag), what you bring. Address a person if you can." },
      applied: { label: "Applied", tip: "Log the date. Set a follow-up 7 days out — most people never follow up, which is exactly why it works." },
      contacted: { label: "Followed up", tip: "Contacted / chased. Use your Merbag network for a warm referral wherever you can." },
      interviewing: { label: "Interviewing", tip: "Prep: 3 stories (a hard diagnosis, an HV/EV job, working under deadline). Bring questions. Debrief right after." },
      offer: { label: "Offer / Negotiation", tip: "Anchor at CHF 5'500/mo ×13. Confirm the 13th salary. Lead with the HV certification. Never accept on the spot — sleep on it." },
      closed: { label: "Closed", tip: "Won or lost — record both and learn. A no today sharpens the next yes." },
    },
    tasks: { heading: "General tasks", heading_sub: "(not application-specific)", empty: "No tasks. Add one with +." },
    cats: { setup: "Setup", admin: "Admin", skill: "Skill", network: "Network", other: "Other" },
    network: {
      heading: "Network — contacts & referrals",
      sub: "Your Merbag network is gold. A referral beats any cold application.",
      empty: "No contacts yet. Capture your Merbag network with +.",
      helps_count: "🤝 {n} jobs",
    },
    guide: {
      heading: "Guide",
      tab_pipeline: "First application", tab_employers: "Employers", tab_salary: "Salary", tab_career: "Career paths", tab_negotiate: "Negotiate", tab_motorsport: "Motorsport",
      pipeline_html: `
        <h4>Your plan in 6 steps</h4>
        <ol>
          <li><b>Collect roles</b> — premium/sport first (Porsche, AMG, BMW M). Save each as a lead with its link.</li>
          <li><b>Tailor your CV</b> — AGVS + Mercedes HV/EV certification and Merbag <i>at the top</i>. One page, DE + EN ready.</li>
          <li><b>Short cover letter</b> — why them, why you, what you bring. Address a real person if you can.</li>
          <li><b>Apply & log the date</b> — and immediately set a follow-up 7 days out.</li>
          <li><b>Follow up</b> — politely chase. Most people never do — your unfair advantage.</li>
          <li><b>Interview → debrief</b> — 3 stories ready (a hard diagnosis, an HV/EV job, working under deadline). Write a debrief after.</li>
        </ol>
        <h4>Your network is the turbo</h4>
        <p>You know people at Merbag/Mercedes. A warm referral beats 20 cold applications. Ask for intros — track them under "Network".</p>`,
      salary_html: `
        <h4>What you can earn in Zürich (2026)</h4>
        <div class="salbar">
          <div class="b" style="height:62%"><span class="mono">~62k</span><small>low</small></div>
          <div class="b" style="height:72%"><span class="mono">~66k</span><small>entry median</small></div>
          <div class="b" style="height:88%;background:linear-gradient(180deg,var(--accent2),transparent)"><span class="mono">~71.5k</span><small>your anchor</small></div>
          <div class="b" style="height:100%"><span class="mono">~75k+</span><small>premium stretch</small></div>
        </div>
        <ul>
          <li><b>Legal floor (Zürich GAV, 4-year EFZ):</b> CHF 5'000/mo ×13 ≈ <b>65k</b>. Nobody may offer less.</li>
          <li><b>Market entry median:</b> ~CHF 66k (jobs.ch: Zürich CHF 66'300).</li>
          <li><b>Your negotiation anchor:</b> <b>CHF 5'500/mo ×13 ≈ 71'500</b>. Walk-floor CHF 5'300, stretch 5'600–5'800.</li>
          <li>A 13th salary is standard — <b>always calculate ×13</b> and confirm it.</li>
          <li>~42.5 h/week; hourly ≈ CHF 29–32.</li>
        </ul>
        <p class="muted tiny">Sources: AGVS-ZH GAV wage sheet (signed 06.11.2025), jobs.ch, lohnanalyse.ch.</p>`,
      negotiate_html: `
        <h4>6 rules for the salary talk</h4>
        <ol>
          <li><b>Lead with the HV certification</b>, not experience (that comes later): "I can bill high-voltage work from day one — most fresh EFZ hires can't."</li>
          <li><b>Always negotiate the monthly figure and confirm ×13.</b> "Is the 13th included?" is the first question.</li>
          <li><b>Name the GAV</b> — it shows you did your homework and shifts the talk to "how far above the floor".</li>
          <li><b>Ask about the whole package:</b> expenses, tools, paid training (diagnostics courses), who pays HV re-certification.</li>
          <li><b>Never accept on the spot.</b> "Can I sleep on it?" is normal in Switzerland and looks serious.</li>
          <li><b>No room on base?</b> Agree a 6-month review with a concrete number (e.g. "review to 5'500 after probation").</li>
        </ol>
        <h4>Your strongest levers</h4>
        <p>AGVS + Mercedes HV/EV certification · Merbag reference (largest MB workshop in CH) · AMG experience · DE + EN.</p>`,
      employers_html: `
        <h4>Employers to watch (Zürich, ≤30 min)</h4>
        <p class="muted tiny">Tap an employer to open their own jobs page — postings move fast, the careers page stays current.</p>
        <h4>Premium &amp; sports brands — his target</h4>
        <ul>
          <li><a href="https://jobs.amag-group.ch" target="_blank" rel="noopener"><b>AMAG</b></a> — Porsche, Audi, VW, Bentley. Porsche Academy → Certified Master Technician. Branches 5–25 min (Letzigrund, Altstetten, Wallisellen). <i>Hiring Porsche mechatronics now.</i></li>
          <li><a href="https://sportec.ch/de/jobs" target="_blank" rel="noopener"><b>Sportec AG</b></a> — Porsche &amp; Audi specialist with its own Motorsport &amp; Classic divisions. Höri, ~20 min. The most motorsport-flavoured daily workshop.</li>
        </ul>
        <h4>Large dealer groups — most openings, structured training</h4>
        <ul>
          <li><a href="https://jobs.emilfrey.ch" target="_blank" rel="noopener"><b>Emil Frey Group</b></a> — Toyota, Lexus, Jaguar, Land Rover and more. Multi-brand academy; also the route into Emil Frey Racing.</li>
          <li><a href="https://hedinautomotive.ch/stellen/" target="_blank" rel="noopener"><b>Hedin Automotive</b></a> — BMW &amp; MINI. Factory master-technician training, annualised flexible hours.</li>
          <li><a href="https://www.jobs.ch/de/stellenangebote/?term=binelli" target="_blank" rel="noopener"><b>Binelli Group</b></a> — BMW, MINI, Maserati. Modern, highly digitised workshops, ~12–15 min.</li>
          <li><a href="https://thwilly.ch/karriere" target="_blank" rel="noopener"><b>Th. Willy AG</b></a> — Ford (largest in CH), MG, CUPRA. Large family group, Schlieren ~10 min.</li>
        </ul>
        <h4>Staying with Mercedes — lowest friction</h4>
        <ul>
          <li><a href="https://www.jobs.ch/de/stellenangebote/?term=merbag" target="_blank" rel="noopener"><b>Merbag</b></a> — Mercedes-Benz / AMG. Internal move across teams or sites; he already knows the workshop and tools (Xentry, WIS).</li>
        </ul>
        <h4>Motorsport</h4>
        <ul>
          <li><a href="https://sauber-group.com/corporate/jobs" target="_blank" rel="noopener"><b>Sauber / Audi F1</b></a> — Formula One factory in Hinwil, ~35 min. Trainee race-team mechanic track for career-starters. See the Motorsport tab.</li>
          <li><a href="https://emilfreyracing.com" target="_blank" rel="noopener"><b>Emil Frey Racing</b></a> — Ferrari 296 GT3 in DTM &amp; GTWC, Safenwil. Speculative application via the dealer group.</li>
        </ul>
        <p class="muted tiny">Public-fleet option: Kanton Zürich workshop, Urdorf (~12 min) — stable hours, posted on jobs.ch.</p>`,
      career_html: `
        <h4>Where this trade can take you</h4>
        <p>The Swiss system is built to climb in steps. Pay rises fastest in the first five years (20–30%), then flattens if you stay purely on the tools — which is where these routes come in.</p>
        <ul>
          <li><b>First job:</b> ~CHF 5'000–5'600 / mo (≈ 65–73k incl. 13th). HV cert + a premium brand push you toward the top of the band.</li>
          <li><b>5 years on the tools:</b> ~CHF 6'300–6'800 / mo (≈ 82–88k) with brand &amp; HV certifications and a Master-Technician track.</li>
        </ul>
        <h4>The routes</h4>
        <ul>
          <li><b>★ Automobildiagnostiker (eidg. Fachausweis)</b> — the highest-leverage next step. The workshop's fault-finder, often deputy lead. Admission: EFZ + 2 yrs experience; his HV cert already covers a prerequisite. 2–3 yrs part-time, ~CHF 12–17k fees, Confederation refunds ~50%. Pay ~CHF 6'000/mo, ~7–8k as deputy lead.</li>
          <li><b>Werkstattleiter</b> — run the workshop &amp; team. Usually via diagnostics + a few years. ~CHF 8'000–12'000/mo.</li>
          <li><b>Betriebsleiter (HFP, eidg. Diplom)</b> — run a whole garage. Top of the trade ladder. ~CHF 10'000–14'000/mo.</li>
          <li><b>Engineering — dipl. Techniker HF / Bachelor FH</b> — importers, makers, R&amp;D, motorsport engineering. HF ~3 yrs (no Berufsmatura); FH needs Berufsmatura first. ~CHF 6'500–8'500+/mo.</li>
          <li><b>Serviceberater (eidg. FA)</b> — customer-facing track if he enjoys the people side.</li>
        </ul>
        <h4>A sensible sequence</h4>
        <ol>
          <li><b>Years 0–2:</b> bank experience at a strong brand, earn near the top of the entry band.</li>
          <li><b>~Year 2:</b> start the Diagnostiker course — he hits the experience bar, HV covers a prerequisite, the state pays half. The clear first move.</li>
          <li><b>Years 3–5:</b> qualify → diagnostician / deputy workshop lead, pay toward CHF 7–8k.</li>
          <li><b>Then pick the ceiling:</b> leadership (highest pay, management) or engineering (design/motorsport, more study).</li>
        </ol>
        <p class="muted tiny">Sources: AGVS / mechaniker.ch, lohncheck.ch, autoberufe.ch, SBFI (federal 50% refund). Gross, incl. 13th, Zürich-area bands — a guide, not a promise.</p>`,
      motorsport_html: `
        <h4>The Swiss motorsport route</h4>
        <p>Yes — there is a Formula One team on his doorstep, and it hires people at exactly his stage. A year or two here opens doors almost nothing else can; the trade is heavy travel and long days for rare experience and CV value.</p>
        <h4>★ Audi F1 / Sauber — Hinwil (~35 min)</h4>
        <p>For 2026 the Sauber factory becomes the <b>Audi F1</b> works team. Chassis build and race operations run from Hinwil. Two trainee tracks fit him now:</p>
        <ul>
          <li><b>Trainee / Future Race Team Mechanic — Car Assembly</b> &amp; <b>Sub-Assembly.</b> Built for career-starters: EFZ + max 1–2 yrs experience. Chassis assembly, driver seat-fits, prototype turning/milling, show-car builds.</li>
        </ul>
        <p>Their asks vs Ben: completed mechanical EFZ ✓ · career-starter ✓ · manual dexterity / careful / independent ✓ · good technical understanding (engine, gearbox, diagnostics) ✓ · fluent English, German native ✓ · willing to travel worldwide &amp; irregular hours — <i>worth confirming he's up for it</i>.</p>
        <h4>Other Swiss teams</h4>
        <ul>
          <li><b>Emil Frey Racing — Safenwil (~45 min):</b> Ferrari 296 GT3 in DTM &amp; GTWC. No.2 Mechanic roles. His AMG engine + manual-gearbox overhauls translate straight to GT3 drivetrain work.</li>
          <li><b>Sportec AG — Höri (~20 min):</b> Porsche GT, custom suspension &amp; classics. The motorsport flavour with a daily commute and no global travel. <i>Hiring now — apply by 13 Jul 2026.</i></li>
          <li><b>Jenzer Motorsport — Lyss / FACH Auto Tech — Sattel:</b> F4 single-seaters and Porsche Cup cars (EU passport / travel needed).</li>
        </ul>
        <h4>How to stand out</h4>
        <p>Build a short visual technical portfolio (AMG cylinder heads, gearbox rebuilds, an Xentry diagnostic workflow). Lead with the AMG depth, your scout-leader teamwork, and English. Expect a practical bench test — they watch <i>how</i> you work: calm, systematic, clean.</p>
        <p class="muted tiny">All Sauber/Audi roles: sauber-group.com/corporate/jobs. Reviews note long days &amp; heavy travel — normal for F1; the learning is exceptional.</p>`,
    },
    lead: {
      new: "New lead", edit: "Lead",
      company: "Company", role: "Role", link: "Job link", link_ph: "https://…", view_posting: "View posting",
      location: "Location", salary: "Salary / target", stage: "Stage", priority: "Priority (1–5)",
      fav: "★ Dream employer (prioritise)", next: "Next step", due: "Due", notes: "Notes",
      debriefs_h: "Interview debriefs", add_debrief: "+ Debrief",
      debrief_hint: "After each interview: jot it down while it's fresh. (Tip: the iPhone keyboard mic dictates.)",
      save: "Save", delete: "Delete",
      d_good: "✓ Good:", d_better: "△ Better:", d_follow: "→ Follow-up:",
      helpers_h: "Who in your network can help here?",
      helpers_none: "No contacts yet — add people under Network.",
      helpers_newhint: "Save the lead first, then link contacts who can help.",
    },
    debrief: {
      title: "Interview debrief",
      hint: "While it's fresh. Dictate: iPhone keyboard → 🎤.",
      well: "What went well?", improve: "What could you do better?", follow: "Follow-ups / next steps?",
      save: "Save debrief (+{xp} XP)",
    },
    task: {
      new: "New task", edit: "Task", title: "Title", category: "Category", priority: "Priority",
      due: "Due", recurring: "Recurring", notes: "Notes", save: "Save", delete: "Delete", title_missing: "Title missing",
    },
    contact: {
      new: "New contact", edit: "Contact", name: "Name", company: "Company", relationship: "Relationship",
      rel_ph: "e.g. trainer, colleague, referral", notes: "Notes", save: "Save", delete: "Delete", name_missing: "Name missing",
      helps_h: "Which jobs can this person help with?",
      helps_none: "No leads yet — add jobs on the Board.",
    },
    menu: {
      title: "Menu", language: "Language", theme: "Theme", goal: "Daily goal (actions)",
      export: "⬇ Export (JSON)", import: "⬆ Import", pair: "⇄ Devices & sync", install: "📲 Install app",
      cleanup: "🧹 Clean up duplicates", check_updates: "⟳ Check for updates",
      footer: "v{v} · Your data stays on your devices. No server, no login.",
    },
    themes: { drift: "JDM / Drift", porsche: "Porsche", amg: "Mercedes-AMG", mblue: "BMW M" },
    sync: {
      title: "Pair devices",
      intro: "Both devices online → live sync. Otherwise use the file export/import below.",
      where_h: "Where does my data live?",
      where_b: "Each device keeps its own copy in this browser. Pairing connects the two browsers directly (encrypted WebRTC) and they swap a snapshot — no server ever stores your data.",
      share_h: "Share this device", share_p: "Generate a code, enter/scan it on the other device.",
      host_btn: "Generate code", connecting: "Connecting…", code_hint: "Enter this code on the other device",
      broker_fail: "Broker unreachable. Use export/import.",
      connect_h: "Connect to a device", code_label: "Enter code", code_ph: "e.g. pp-ab12cd",
      join_btn: "Connect & sync", code_missing: "Code missing",
      export_file: "⬇ Export file", import_file: "⬆ Import file",
      status_sending: "Connected ✓ — sending…", status_synced: "Synced ✓", status_failed: "Connection failed. Use export/import.",
      phone: "Phone", computer: "Computer",
      this_device: "This device", your_code: "Your code — add it on another device:",
      add_device: "Add a device", add_hint: "Enter the code shown on the other device.", add_btn: "Add & connect",
      known: "Your devices", none_known: "No devices yet. Add one above.",
      online: "connected", offline: "offline", forget: "Forget", save: "Save",
      code_self: "That's this device's own code.",
    },
    conn: { connected: "● Live: {name}", connected_n: "● {n} connected", disconnected: "Not connected", live: "Synced ✓" },
    toast: {
      lead_saved: "Lead saved", saved: "Saved", deleted: "Deleted", merged: "Data merged",
      imported: "{n} entries imported", exported: "Exported", bad_file: "Invalid file",
      advance: "→ {stage}  (+{xp} XP)", task_done: "Done +{xp} XP", debrief_saved: "Debrief saved",
      connected_to: "Connected to {name} ✓", synced: "Devices synced ✓",
      device_added: "Device added ✓", device_forgotten: "Device removed",
      cleaned: "{n} duplicates merged", cleaned_none: "No duplicates found",
    },
    confirm: {
      delete_task: "Delete this task? This cannot be undone.",
      delete_contact: "Delete this contact? This cannot be undone.",
      delete_lead: "Delete this lead and its debriefs? This cannot be undone.",
      cleanup: "Merge duplicate entries with the same name? Keeps the most recently edited.",
      forget: "Forget this device? You can pair it again later.",
    },
    install: {
      title: "Install Pole Position",
      why: "Add it to your home screen — full screen, works offline, syncs across your devices.",
      ios: "Tap the Share button in Safari (the box with an ↑), then choose “Add to Home Screen”.",
      desktop: "Click Install below, or the install icon in your browser's address bar.",
      install_btn: "Install", later: "Maybe later",
    },
    update: {
      checking: "Checking for updates…", found: "Update found — installing…",
      uptodate: "You're on the latest version (v{v})", no_sw: "Updates aren't available here",
    },
  };

  // ---- Swiss German (de-CH): no ß, "Hoi/Grüezi", CHF with apostrophes ----
  const de = {
    nav: { focus: "Fokus", board: "Board", tasks: "Tasks", network: "Netzwerk", guide: "Guide" },
    bar: { update: "🚀 Neue Version verfügbar.", update_btn: "Aktualisieren" },
    focus: {
      greet: "Hoi {name}! 🏎️",
      xp_sub: "XP · Lvl {lvl}",
      streak_sub: "Tage-Streak",
      open_sub: "Offene Leads",
      tacho_sub: "heute",
      next_heading: "Was jetzt zählt — nächste Schritte",
      empty: "Alles erledigt. 🏁 Zeit, neue Leads zu jagen.",
    },
    due: { today: "heute", over: "{n}d über", in: "in {n}d" },
    board: { heading: "Bewerbungs-Pipeline", open: "Öffnen", help: "{n} aus deinem Netzwerk können helfen" },
    stages: {
      researching: { label: "Recherche", tip: "Passende Stellen finden. Link, Firma & Warum speichern. Premium/Sport bevorzugen — da glänzt deine AMG- + HV-Erfahrung." },
      resume: { label: "CV bereit", tip: "CV auf DIESE Stelle zuschneiden. AGVS + MB HV/EV-Zertifizierung und Merbag zuerst. DE + EN bereit." },
      cover: { label: "Anschreiben", tip: "3 kurze Absätze: warum sie, warum du (HV, AMG, Merbag), was du bringst. Wenn möglich eine Person ansprechen." },
      applied: { label: "Beworben", tip: "Datum notieren. Follow-up in 7 Tagen setzen — die meisten haken nie nach, genau deshalb wirkt es." },
      contacted: { label: "Nachgefasst", tip: "Kontaktiert / nachgefasst. Nutze dein Merbag-Netzwerk für eine warme Empfehlung." },
      interviewing: { label: "Interview", tip: "Vorbereiten: 3 Geschichten (harte Diagnose, ein HV/EV-Job, unter Termindruck). Fragen mitbringen. Danach sofort Debrief." },
      offer: { label: "Angebot / Verhandlung", tip: "Anker CHF 5'500/Monat ×13. 13. Monatslohn bestätigen. Mit HV-Zertifizierung führen. Nie sofort zusagen — eine Nacht drüber schlafen." },
      closed: { label: "Abgeschlossen", tip: "Gewonnen oder verloren — beides festhalten und lernen. Ein Nein heute schärft das nächste Ja." },
    },
    tasks: { heading: "Allgemeine Aufgaben", heading_sub: "(nicht bewerbungsspezifisch)", empty: "Keine Aufgaben. Mit + eine hinzufügen." },
    cats: { setup: "Setup", admin: "Admin", skill: "Skill", network: "Netzwerk", other: "Sonstiges" },
    network: {
      heading: "Netzwerk — Kontakte & Empfehlungen",
      sub: "Dein Merbag-Netzwerk ist Gold wert. Eine Empfehlung schlägt jede Kaltbewerbung.",
      empty: "Noch keine Kontakte. Mit + dein Merbag-Netzwerk erfassen.",
      helps_count: "🤝 {n} Jobs",
    },
    guide: {
      heading: "Guide",
      tab_pipeline: "Erste Bewerbung", tab_employers: "Arbeitgeber", tab_salary: "Lohn", tab_career: "Karriereweg", tab_negotiate: "Verhandeln", tab_motorsport: "Motorsport",
      pipeline_html: `
        <h4>Dein Plan in 6 Schritten</h4>
        <ol>
          <li><b>Stellen sammeln</b> — Premium/Sport zuerst (Porsche, AMG, BMW M). Jede als Lead mit Link speichern.</li>
          <li><b>CV zuschneiden</b> — AGVS + Mercedes HV/EV-Zertifizierung und Merbag <i>zuoberst</i>. Eine Seite, DE + EN.</li>
          <li><b>Kurzes Anschreiben</b> — warum sie, warum du, was du bringst. Wenn möglich eine Person ansprechen.</li>
          <li><b>Bewerben & Datum notieren</b> — und sofort einen Follow-up in 7 Tagen setzen.</li>
          <li><b>Nachfassen</b> — höflich nachhaken. Die meisten tun's nie — dein unfairer Vorteil.</li>
          <li><b>Interview → Debrief</b> — 3 Geschichten parat (harte Diagnose, HV/EV-Job, Termindruck). Danach Debrief schreiben.</li>
        </ol>
        <h4>Dein Netzwerk ist der Turbo</h4>
        <p>Du kennst Leute bei Merbag/Mercedes. Eine warme Empfehlung schlägt 20 Kaltbewerbungen. Frag aktiv nach Intros — unter „Netzwerk“ festhalten.</p>`,
      salary_html: `
        <h4>Was du in Zürich verdienen kannst (2026)</h4>
        <div class="salbar">
          <div class="b" style="height:62%"><span class="mono">~62k</span><small>tief</small></div>
          <div class="b" style="height:72%"><span class="mono">~66k</span><small>Median Einstieg</small></div>
          <div class="b" style="height:88%;background:linear-gradient(180deg,var(--accent2),transparent)"><span class="mono">~71.5k</span><small>dein Anker</small></div>
          <div class="b" style="height:100%"><span class="mono">~75k+</span><small>Premium-Stretch</small></div>
        </div>
        <ul>
          <li><b>Gesetzlicher Boden (GAV Zürich, 4-Jahres-EFZ):</b> CHF 5'000/Monat ×13 ≈ <b>65k</b>. Niemand darf weniger bieten.</li>
          <li><b>Markt-Einstieg Median:</b> ~CHF 66k (jobs.ch: Zürich CHF 66'300).</li>
          <li><b>Dein Anker in der Verhandlung:</b> <b>CHF 5'500/Monat ×13 ≈ 71'500</b>. Walk-Floor CHF 5'300, Stretch 5'600–5'800.</li>
          <li>13. Monatslohn ist Standard — <b>immer ×13 rechnen</b> und bestätigen lassen.</li>
          <li>~42.5 Std/Woche; Stundenwert ≈ CHF 29–32.</li>
        </ul>
        <p class="muted tiny">Quellen: AGVS-ZH GAV-Lohnblatt (unterz. 06.11.2025), jobs.ch, lohnanalyse.ch.</p>`,
      negotiate_html: `
        <h4>6 Regeln für die Lohnverhandlung</h4>
        <ol>
          <li><b>Mit der HV-Zertifizierung führen</b>, nicht mit Erfahrung (die kommt noch): „Ich darf Hochvolt-Arbeit ab Tag 1 verrechnen — die meisten frischen EFZ nicht.“</li>
          <li><b>Immer den Monatslohn verhandeln und ×13 bestätigen.</b> „Ist der 13. inklusive?“ ist die erste Frage.</li>
          <li><b>Den GAV nennen</b> — zeigt, dass du deine Hausaufgaben gemacht hast. Verschiebt das Gespräch auf „wie viel über dem Boden“.</li>
          <li><b>Gesamtpaket fragen:</b> Spesen, Werkzeug, bezahlte Weiterbildung (Diagnostiker-Kurse), wer die HV-Rezertifizierung zahlt.</li>
          <li><b>Nie sofort zusagen.</b> „Kann ich das über Nacht anschauen?“ ist in der Schweiz normal und wirkt seriös.</li>
          <li><b>Kein Spielraum beim Lohn?</b> 6-Monats-Review mit konkreter Zahl vereinbaren (z.B. „Review auf 5'500 nach Probezeit“).</li>
        </ol>
        <h4>Deine stärksten Hebel</h4>
        <p>AGVS + Mercedes HV/EV-Zertifizierung · Merbag-Referenz (grösste MB-Werkstatt der CH) · AMG-Erfahrung · DE + EN.</p>`,
      employers_html: `
        <h4>Arbeitgeber im Blick (Zürich, ≤30 Min)</h4>
        <p class="muted tiny">Tipp auf einen Arbeitgeber, um seine eigene Stellenseite zu öffnen — Inserate ändern schnell, die Karriereseite bleibt aktuell.</p>
        <h4>Premium- &amp; Sportmarken — sein Ziel</h4>
        <ul>
          <li><a href="https://jobs.amag-group.ch" target="_blank" rel="noopener"><b>AMAG</b></a> — Porsche, Audi, VW, Bentley. Porsche Academy → Certified Master Technician. Standorte 5–25 Min (Letzigrund, Altstetten, Wallisellen). <i>Sucht jetzt Porsche-Mechatroniker.</i></li>
          <li><a href="https://sportec.ch/de/jobs" target="_blank" rel="noopener"><b>Sportec AG</b></a> — Porsche- &amp; Audi-Spezialist mit eigenen Motorsport- &amp; Classic-Abteilungen. Höri, ~20 Min. Die motorsportlichste Tageswerkstatt.</li>
        </ul>
        <h4>Grosse Händlergruppen — am meisten offene Stellen, strukturierte Ausbildung</h4>
        <ul>
          <li><a href="https://jobs.emilfrey.ch" target="_blank" rel="noopener"><b>Emil Frey Gruppe</b></a> — Toyota, Lexus, Jaguar, Land Rover u.a. Multi-Brand-Academy; auch der Weg zu Emil Frey Racing.</li>
          <li><a href="https://hedinautomotive.ch/stellen/" target="_blank" rel="noopener"><b>Hedin Automotive</b></a> — BMW &amp; MINI. Werks-Master-Technician-Ausbildung, Jahresarbeitszeit.</li>
          <li><a href="https://www.jobs.ch/de/stellenangebote/?term=binelli" target="_blank" rel="noopener"><b>Binelli Gruppe</b></a> — BMW, MINI, Maserati. Moderne, stark digitalisierte Werkstätten, ~12–15 Min.</li>
          <li><a href="https://thwilly.ch/karriere" target="_blank" rel="noopener"><b>Th. Willy AG</b></a> — Ford (grösster der CH), MG, CUPRA. Grosse Familiengruppe, Schlieren ~10 Min.</li>
        </ul>
        <h4>Bei Mercedes bleiben — geringste Reibung</h4>
        <ul>
          <li><a href="https://www.jobs.ch/de/stellenangebote/?term=merbag" target="_blank" rel="noopener"><b>Merbag</b></a> — Mercedes-Benz / AMG. Interner Wechsel über Teams oder Standorte; er kennt Werkstatt und Tools (Xentry, WIS) bereits.</li>
        </ul>
        <h4>Motorsport</h4>
        <ul>
          <li><a href="https://sauber-group.com/corporate/jobs" target="_blank" rel="noopener"><b>Sauber / Audi F1</b></a> — Formel-1-Fabrik in Hinwil, ~35 Min. Trainee-Rennmechaniker-Track für Einsteiger. Siehe Tab Motorsport.</li>
          <li><a href="https://emilfreyracing.com" target="_blank" rel="noopener"><b>Emil Frey Racing</b></a> — Ferrari 296 GT3 in DTM &amp; GTWC, Safenwil. Spontanbewerbung über die Händlergruppe.</li>
        </ul>
        <p class="muted tiny">Option öffentlicher Fuhrpark: Werkstatt Kanton Zürich, Urdorf (~12 Min) — geregelte Stunden, auf jobs.ch ausgeschrieben.</p>`,
      career_html: `
        <h4>Wohin dich dieser Beruf bringen kann</h4>
        <p>Das Schweizer System ist auf Aufstieg in Etappen gebaut. Der Lohn steigt in den ersten fünf Jahren am schnellsten (20–30%), flacht dann ab, wenn du rein an den Tools bleibst — genau dafür gibt es diese Wege.</p>
        <ul>
          <li><b>Erster Job:</b> ~CHF 5'000–5'600 / Mt (≈ 65–73k inkl. 13.). HV-Zert. + Premium-Marke schieben dich an den oberen Rand des Bandes.</li>
          <li><b>5 Jahre an den Tools:</b> ~CHF 6'300–6'800 / Mt (≈ 82–88k) mit Marken- &amp; HV-Zertifizierungen und Master-Technician-Track.</li>
        </ul>
        <h4>Die Wege</h4>
        <ul>
          <li><b>★ Automobildiagnostiker (eidg. Fachausweis)</b> — der hebelstärkste nächste Schritt. Der Fehlersucher der Werkstatt, oft Stv. Werkstattleiter. Zulassung: EFZ + 2 Jahre Erfahrung; seine HV-Zert. deckt eine Voraussetzung bereits. 2–3 Jahre berufsbegleitend, ~CHF 12–17k Gebühren, Bund erstattet ~50%. Lohn ~CHF 6'000/Mt, ~7–8k als Stv.</li>
          <li><b>Werkstattleiter</b> — Werkstatt &amp; Team führen. Meist über Diagnostik + ein paar Jahre. ~CHF 8'000–12'000/Mt.</li>
          <li><b>Betriebsleiter (HFP, eidg. Diplom)</b> — eine ganze Garage führen. Spitze der Berufsleiter. ~CHF 10'000–14'000/Mt.</li>
          <li><b>Ingenieurweg — dipl. Techniker HF / Bachelor FH</b> — Importeure, Hersteller, F&amp;E, Motorsport-Engineering. HF ~3 Jahre (keine Berufsmatura); FH braucht zuerst Berufsmatura. ~CHF 6'500–8'500+/Mt.</li>
          <li><b>Serviceberater (eidg. FA)</b> — kundennaher Track, falls ihm die Menschen-Seite liegt.</li>
        </ul>
        <h4>Eine sinnvolle Reihenfolge</h4>
        <ol>
          <li><b>Jahre 0–2:</b> Erfahrung bei einer starken Marke sammeln, nahe am oberen Einstiegsband verdienen.</li>
          <li><b>~Jahr 2:</b> Diagnostiker-Kurs starten — er erreicht die Erfahrungs-Hürde, HV deckt eine Voraussetzung, der Bund zahlt die Hälfte. Der klare erste Zug.</li>
          <li><b>Jahre 3–5:</b> abschliessen → Diagnostiker / Stv. Werkstattleiter, Lohn Richtung CHF 7–8k.</li>
          <li><b>Dann das Dach wählen:</b> Führung (höchster Lohn, Management) oder Engineering (Konstruktion/Motorsport, mehr Studium).</li>
        </ol>
        <p class="muted tiny">Quellen: AGVS / mechaniker.ch, lohncheck.ch, autoberufe.ch, SBFI (50% Bundesbeitrag). Brutto, inkl. 13., Zürich-Bänder — ein Anhaltspunkt, kein Versprechen.</p>`,
      motorsport_html: `
        <h4>Der Schweizer Motorsport-Weg</h4>
        <p>Ja — es gibt ein Formel-1-Team vor seiner Haustür, und es stellt Leute genau auf seiner Stufe ein. Ein, zwei Jahre hier öffnen Türen wie kaum etwas sonst; der Deal ist viel Reiserei und lange Tage für seltene Erfahrung und CV-Wert.</p>
        <h4>★ Audi F1 / Sauber — Hinwil (~35 Min)</h4>
        <p>Ab 2026 wird die Sauber-Fabrik zum <b>Audi-F1</b>-Werksteam. Chassisbau und Renneinsatz laufen ab Hinwil. Zwei Trainee-Tracks passen ihm jetzt:</p>
        <ul>
          <li><b>Trainee / Future Race Team Mechanic — Car Assembly</b> &amp; <b>Sub-Assembly.</b> Für Einsteiger gebaut: EFZ + max. 1–2 Jahre Erfahrung. Chassis-Montage, Fahrer-Sitzanpassung, Prototyp-Dreh-/Fräsarbeit, Show-Car-Bau.</li>
        </ul>
        <p>Ihre Anforderungen vs. Ben: abgeschlossene mechanische EFZ ✓ · Einsteiger ✓ · geschickt / sorgfältig / selbstständig ✓ · gutes technisches Verständnis (Motor, Getriebe, Diagnose) ✓ · fliessend Englisch, Deutsch Muttersprache ✓ · bereit für weltweite Reisen &amp; unregelmässige Stunden — <i>noch zu bestätigen</i>.</p>
        <h4>Weitere Schweizer Teams</h4>
        <ul>
          <li><b>Emil Frey Racing — Safenwil (~45 Min):</b> Ferrari 296 GT3 in DTM &amp; GTWC. No.2-Mechaniker-Rollen. Seine AMG-Motoren- + Handschaltgetriebe-Revisionen übertragen sich direkt auf GT3-Antrieb.</li>
          <li><b>Sportec AG — Höri (~20 Min):</b> Porsche GT, Custom-Fahrwerk &amp; Classics. Der Motorsport-Touch mit Tagespendeln und ohne globale Reisen. <i>Sucht jetzt — Bewerbung bis 13. Juli 2026.</i></li>
          <li><b>Jenzer Motorsport — Lyss / FACH Auto Tech — Sattel:</b> F4-Monoposto und Porsche-Cup-Autos (EU-Pass / Reisebereitschaft nötig).</li>
        </ul>
        <h4>Wie er auffällt</h4>
        <p>Ein kurzes visuelles technisches Portfolio bauen (AMG-Zylinderköpfe, Getriebe-Revisionen, ein Xentry-Diagnose-Ablauf). Mit der AMG-Tiefe, der Pfadi-Teamführung und Englisch führen. Rechne mit einem praktischen Bench-Test — sie schauen, <i>wie</i> du arbeitest: ruhig, systematisch, sauber.</p>
        <p class="muted tiny">Alle Sauber/Audi-Stellen: sauber-group.com/corporate/jobs. Bewertungen nennen lange Tage &amp; viel Reisen — bei F1 normal; das Lernen ist aussergewöhnlich.</p>`,
    },
    lead: {
      new: "Neuer Lead", edit: "Lead",
      company: "Firma", role: "Rolle", link: "Link zur Stelle", link_ph: "https://…", view_posting: "Stelle ansehen",
      location: "Ort", salary: "Lohn / Ziel", stage: "Stage", priority: "Priorität (1–5)",
      fav: "★ Wunsch-Arbeitgeber (priorisieren)", next: "Nächster Schritt", due: "Fällig", notes: "Notizen",
      debriefs_h: "Interview-Debriefs", add_debrief: "+ Debrief",
      debrief_hint: "Nach jedem Interview: kurz festhalten, solange es frisch ist. (Tipp: Mikrofon-Taste der iPhone-Tastatur zum Diktieren.)",
      save: "Speichern", delete: "Löschen",
      d_good: "✓ Gut:", d_better: "△ Besser:", d_follow: "→ Follow-up:",
      helpers_h: "Wer aus deinem Netzwerk kann hier helfen?",
      helpers_none: "Noch keine Kontakte — unter Netzwerk hinzufügen.",
      helpers_newhint: "Lead zuerst speichern, dann helfende Kontakte verknüpfen.",
    },
    debrief: {
      title: "Interview-Debrief",
      hint: "Solange es frisch ist. Diktieren: iPhone-Tastatur → 🎤.",
      well: "Was lief gut?", improve: "Was könntest du besser machen?", follow: "Follow-ups / nächste Schritte?",
      save: "Debrief speichern (+{xp} XP)",
    },
    task: {
      new: "Neue Aufgabe", edit: "Aufgabe", title: "Titel", category: "Kategorie", priority: "Priorität",
      due: "Fällig", recurring: "Wiederkehrend", notes: "Notizen", save: "Speichern", delete: "Löschen", title_missing: "Titel fehlt",
    },
    contact: {
      new: "Neuer Kontakt", edit: "Kontakt", name: "Name", company: "Firma", relationship: "Beziehung",
      rel_ph: "z.B. Ausbildner, Kollege, Empfehlung", notes: "Notizen", save: "Speichern", delete: "Löschen", name_missing: "Name fehlt",
      helps_h: "Bei welchen Jobs kann diese Person helfen?",
      helps_none: "Noch keine Leads — auf dem Board hinzufügen.",
    },
    menu: {
      title: "Menü", language: "Sprache", theme: "Theme", goal: "Tagesziel (Aktionen)",
      export: "⬇ Export (JSON)", import: "⬆ Import", pair: "⇄ Geräte & Sync", install: "📲 App installieren",
      cleanup: "🧹 Duplikate bereinigen", check_updates: "⟳ Nach Updates suchen",
      footer: "v{v} · Deine Daten bleiben auf deinen Geräten. Kein Server, kein Login.",
    },
    themes: { drift: "JDM / Drift", porsche: "Porsche", amg: "Mercedes-AMG", mblue: "BMW M" },
    sync: {
      title: "Geräte koppeln",
      intro: "Beide Geräte online → Live-Sync. Sonst Export/Import als Datei unten.",
      where_h: "Wo liegen meine Daten?",
      where_b: "Jedes Gerät behält seine eigene Kopie in diesem Browser. Beim Koppeln verbinden sich die zwei Browser direkt (verschlüsseltes WebRTC) und tauschen einen Snapshot — kein Server speichert deine Daten.",
      share_h: "Dieses Gerät teilen", share_p: "Code erzeugen, am anderen Gerät eingeben/scannen.",
      host_btn: "Code erzeugen", connecting: "Verbinde…", code_hint: "Code am anderen Gerät eingeben",
      broker_fail: "Broker nicht erreichbar. Nutze Export/Import.",
      connect_h: "Mit Gerät verbinden", code_label: "Code eingeben", code_ph: "z.B. pp-ab12cd",
      join_btn: "Verbinden & syncen", code_missing: "Code fehlt",
      export_file: "⬇ Export-Datei", import_file: "⬆ Import-Datei",
      status_sending: "Verbunden ✓ — sende…", status_synced: "Synchronisiert ✓", status_failed: "Verbindung fehlgeschlagen. Nutze Export/Import.",
      phone: "Telefon", computer: "Computer",
      this_device: "Dieses Gerät", your_code: "Dein Code — auf einem anderen Gerät hinzufügen:",
      add_device: "Gerät hinzufügen", add_hint: "Code vom anderen Gerät eingeben.", add_btn: "Hinzufügen & verbinden",
      known: "Deine Geräte", none_known: "Noch keine Geräte. Oben hinzufügen.",
      online: "verbunden", offline: "offline", forget: "Entfernen", save: "Speichern",
      code_self: "Das ist der Code dieses Geräts.",
    },
    conn: { connected: "● Live: {name}", connected_n: "● {n} verbunden", disconnected: "Nicht verbunden", live: "Synchronisiert ✓" },
    toast: {
      lead_saved: "Lead gespeichert", saved: "Gespeichert", deleted: "Gelöscht", merged: "Daten zusammengeführt",
      imported: "{n} Einträge importiert", exported: "Exportiert", bad_file: "Ungültige Datei",
      advance: "→ {stage}  (+{xp} XP)", task_done: "Erledigt +{xp} XP", debrief_saved: "Debrief gespeichert",
      connected_to: "Verbunden mit {name} ✓", synced: "Geräte synchronisiert ✓",
      device_added: "Gerät hinzugefügt ✓", device_forgotten: "Gerät entfernt",
      cleaned: "{n} Duplikate zusammengeführt", cleaned_none: "Keine Duplikate gefunden",
    },
    confirm: {
      delete_task: "Diese Aufgabe löschen? Kann nicht rückgängig gemacht werden.",
      delete_contact: "Diesen Kontakt löschen? Kann nicht rückgängig gemacht werden.",
      delete_lead: "Diesen Lead und seine Debriefs löschen? Kann nicht rückgängig gemacht werden.",
      cleanup: "Doppelte Einträge mit gleichem Namen zusammenführen? Behält den zuletzt bearbeiteten.",
      forget: "Dieses Gerät entfernen? Du kannst es später wieder koppeln.",
    },
    install: {
      title: "Pole Position installieren",
      why: "Zum Home-Bildschirm hinzufügen — Vollbild, offline nutzbar, synct über deine Geräte.",
      ios: "In Safari auf Teilen tippen (das Kästchen mit ↑), dann „Zum Home-Bildschirm“.",
      desktop: "Unten auf Installieren klicken, oder das Installations-Symbol in der Adressleiste.",
      install_btn: "Installieren", later: "Vielleicht später",
    },
    update: {
      checking: "Suche nach Updates…", found: "Update gefunden — wird installiert…",
      uptodate: "Du hast die neuste Version (v{v})", no_sw: "Updates hier nicht verfügbar",
    },
  };

  const DICT = { en, de };
  let current = "en";

  function lookup(lang, key) {
    return key.split(".").reduce((o, k) => (o && o[k] != null ? o[k] : null), DICT[lang]);
  }
  function interp(s, vars) {
    return vars ? s.replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? vars[k] : "{" + k + "}")) : s;
  }
  function t(key, vars) {
    let s = lookup(current, key);
    if (s == null) s = lookup("en", key); // fall back to English, never blank
    if (s == null) return key;
    return interp(s, vars);
  }

  const root = typeof self !== "undefined" ? self : globalThis;
  root.PP_I18N = {
    DICT,
    langs: ["en", "de"],
    names: { en: "English", de: "Deutsch (CH)" },
    default: "en",
    setLang(l) { current = DICT[l] ? l : "en"; },
    getLang() { return current; },
    t,
    lookup,
  };
})();
