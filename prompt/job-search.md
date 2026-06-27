# Job-search prompt — Benjamin Madani (Pole Position)

> **Purpose.** This is a reusable instruction for a future AI session. Run it to refresh the job
> leads in Benjamin's job-hunt app ("Pole Position"). It tells you who he is, which employers to
> always check, how to find new jobs in the Zürich area, exactly what data to capture, **how to
> research links properly**, and the output format the app imports.
>
> **When to run.** Whenever Harry asks to "refresh Ben's jobs", "find new positions", or "update the
> board". Job postings expire within weeks, so links and listings need re-checking periodically.
>
> **Output.** A `pole-position-import@1` JSON file (see §7) that Ben imports via **Menu → Import**.
> Update `import.example.json` and/or hand Harry a fresh file. Optionally also update the `seed()`
> leads in `index.html` for fresh installs.

---

## 1. The candidate (match jobs to this, and write the "why he fits")

- **Benjamin Madani, 20.** Finishing his **Automobilmechatroniker EFZ** (4-year Swiss federal
  apprenticeship) at **Merbag** — Switzerland's largest Mercedes-Benz workshop — qualifying **August 2026**.
  This is his **first real full-time job**.
- **Home base:** Zürich-Albisrieden, 8047. Target radius: **~30 minutes by car**. He has an iPhone
  (at work) and a Windows laptop (at home).
- **Standout skills (lead with these — they are scarce):**
  - **HV/EV certified** (AGVS + Mercedes-Benz factory). Hands-on Tesla Model Y, EQE, EQS, EQB.
  - **AMG high-performance** experience: SLS AMG, G63, E63, C63, plus AMG/Maybach S-Class —
    engine and manual-gearbox overhauls.
  - **Diagnostics:** a 4-month stint in Merbag's diagnostics team + **Xentry** fluency (and WIS).
  - **Languages:** German native, English fluent.
  - **Soft signals that matter for motorsport/teams:** Scout leader (Pfadi), calisthenics, 2× half
    marathons, martial arts — fitness, leadership, resilience.
- **Career interest:** the **Automobildiagnostiker (eidg. Fachausweis)** route (admission needs EFZ +
  2 yrs experience; his HV cert already covers a prerequisite). So diagnostician roles are a strong fit.
- **Segment bias:** **premium / sport** brands first (Porsche, AMG/Mercedes, BMW M, Audi, Ferrari/
  Maserati) and **motorsport**. Then large dealer groups (structured training). Then solid local garages.

## 2. The mission (what a good result looks like)

A board of **real, currently-open** positions Ben can act on this week, **closest first**, each with:
a deep link to the **actual posting**, the German job title verbatim, commute time from 8047, a
realistic salary target, any application deadline, and a one-line "why it fits". Quality over
quantity — every lead must be a real job he could apply to today (or a clearly-flagged "watch" item).

## 3. Where to search

### 3a. Seed employers — ALWAYS check these (the established target list)

Premium / sport:
- **AMAG** (Porsche, Audi, VW, Bentley) — `https://jobs.amag-group.ch` — Porsche Academy → Master Technician. Branches: Zürich (Letzigrund/Ueberlandstr.), Altstetten, Wallisellen, Dübendorf, Kloten, Uster, Horgen, Winterthur.
- **Sportec AG** (Porsche/Audi specialist + own Motorsport & Classic divisions) — `https://sportec.ch/de/jobs` — Höri ZH.
- **Porsche Zentrum Zug (Risch AG)** — `https://dealer.porsche.com/ch/zug` — Rotkreuz ZG (note: roles may relocate to Kriens LU).

Large dealer groups:
- **Emil Frey** (Toyota, Lexus, JLR, +) — `https://jobs.emilfrey.ch` — multi-brand; also the route into Emil Frey Racing. Branches incl. Dübendorf, Au-Wädenswil, Altendorf, Schlieren.
- **Hedin Automotive** (BMW, MINI) — `https://hedinautomotive.ch/stellen/` — Dielsdorf, Samstagern.
- **Binelli Group** (BMW, MINI, Maserati) — `https://www.jobs.ch/de/stellenangebote/?term=binelli` — Adliswil, Zürich.
- **Th. Willy AG** (Ford, MG, CUPRA) — `https://thwilly.ch/karriere` — Schlieren.

Stay-with-Mercedes (lowest friction):
- **Merbag** (current employer — internal move) — `https://www.jobs.ch/de/stellenangebote/?term=merbag`.

Motorsport:
- **Sauber / Audi F1** (Formula One factory, Hinwil) — `https://sauber-group.com/corporate/jobs` — Trainee / Future Race Team Mechanic (Car Assembly / Sub-Assembly) is the career-starter track.
- **Emil Frey Racing** (Ferrari 296 GT3, DTM/GTWC, Safenwil) — `https://emilfreyracing.com` — speculative/No.2 Mechanic.
- (Also: FACH Auto Tech — Sattel SZ; Jenzer Motorsport — Lyss BE, F4.)

Independent garages within ~30 min:
- **Garage H.U. Eugster AG** — Zürich (on jobs.ch).
- **Seegarage Müller AG** — Horgen — `https://www.seegarage-jobs.ch/`.
- **Karl Graf Automobile AG** — Mettmenstetten — `https://grafauto.ch/uber-uns/offene-stellen-jobs` (posts ads as PDFs).
- **Kanton Zürich** vehicle fleet — Urdorf — `https://www.zh.ch/de/arbeiten-kanton-zuerich/offene-stellen.html` (public sector; intermittent).
- Also worth a look: **Kessel AG** (Ferrari/Maserati, Volketswil).

### 3b. Broaden — find OTHER Zürich-area jobs

Search the general boards too, then deep-link each real hit:
- **jobs.ch** (largest), **jobscout24.ch**, **auto-stellen.ch**, **jobagent.ch**.
- **Search terms (German):** `Automobilmechatroniker`, `Automobil-Diagnostiker`, `Automobil-Fachmann`,
  `Servicetechniker Automobil`, `Rennmechaniker`, `Kfz-Mechatroniker`. Add brand terms: `Porsche`,
  `AMG`, `BMW M`, `Audi`, `Ferrari`.
- **Filter to:** location within ~30 min of 8047 (Zürich + Schlieren, Dietikon, Urdorf, Dübendorf,
  Wallisellen, Kloten, Uster, Horgen, Adliswil, Hinwil, Höri, Rotkreuz/Zug, Wädenswil); workload
  **80–100%**; **entry-level / EFZ** (avoid roles demanding 5+ yrs or a Meister). Prefer premium/sport.

## 4. Selection criteria (what counts as a lead)

Include a job only if **all** hold: (a) it's a **currently-open** posting; (b) role fits an EFZ
Automobilmechatroniker / Diagnostiker / Fachmann (or motorsport mechanic); (c) commute ≤ ~30 min from
8047 (a few exceptional premium/motorsport ones up to ~45 min are OK — flag the distance); (d) you can
link the **actual posting**. Rank: premium/sport + HV/diagnostics fit + closeness → higher priority &
`favourite: true`. Mark the 2–4 best as favourites only.

## 5. Key data to capture — per job

This maps 1:1 to the app's lead schema. Capture every field you can:

| Field | What to put | Notes |
|-------|-------------|-------|
| `company` | Employer + branch, e.g. "AMAG — Porsche Zentrum Zürich" | Branch matters; commute depends on it. |
| `role` | The German job title **verbatim** | **Do NOT translate.** Keep "(m/w/d)", "80–100%", "*in", etc. |
| `link` | **Deep link to the specific posting** | See §6 — this is the part that's easy to get wrong. |
| `location` | City + canton + commute, e.g. "Zürich — ~10 Min" | Estimate driving time from 8047. |
| `salary` | Realistic target band, e.g. "CHF 5'500–6'500 / Mt (Ziel)" | Entry ≈ CHF 5'000–5'600/mo (~65–73k incl. 13th). GAV floor CHF 5'000×13. Premium pays 5–15% more. Leave blank if unknown rather than guess wildly. |
| `source` | Where you found it, e.g. "AMAG careers", "jobs.ch" | |
| `favourite` | `true` only for the 2–4 strongest | Premium/sport + close + great fit. |
| `priority` | 1–5 (5 = top) | Drives board sort. |
| `stage` | `researching` (default); `applied` if he already applied | Stages: researching, resume, cover, applied, contacted, interviewing, offer, closed. |
| `nextAction` | The single next move, in German | e.g. "Dossier auf Porsche zuschneiden". |
| `nextDue` | ISO date `YYYY-MM-DD` | Use real application **deadlines** when the posting states one. |
| `notes` | Why it fits + any catch | German. Mention the HV/AMG/diagnostics angle; flag relocations, deadlines, "Stelle ist re-pointed" etc. |
| `contacts` | Names of network people who can help (optional) | |

Also refresh **tasks** if relevant (CV, references, portfolio, HV certs) — same file, `tasks[]` array.

## 6. Researching links — DO THIS RIGHT (most important section)

**The link must open the actual job description.** A careers homepage, a company profile page, or a
search-results page is **NOT acceptable** (this was an explicit correction from Harry).

**Method that works:**
1. **Use a real browser, not WebFetch.** Most Swiss job portals (jobs.amag-group.ch, jobs.emilfrey.ch,
   jobs.ch, seegarage-jobs.ch) are JavaScript SPAs. `WebFetch` silently returns the **homepage** or an
   empty shell, which is exactly how the wrong links got shipped the first time. Drive a real browser
   (Interceptor, or the `claude-in-chrome` MCP) and read the **rendered** anchors.
2. **Navigate to the employer's own job portal** (or a jobs.ch search), find the matching posting, and
   extract its **deep URL**. Patterns seen:
   - jobs.ch: `https://www.jobs.ch/{de|en}/{stellenangebote|vacancies}/detail/<uuid>`
   - AMAG: `https://jobs.amag-group.ch/<Slug>-de-j<NNNNN>.html`
   - Emil Frey: `https://jobs.emilfrey.ch/<Slug>-de-j<NNNN>.html`
   - Seegarage: `https://www.seegarage-jobs.ch/jobdetails.php?key=<n>`
   - Karl Graf: a PDF under `…mtfcloud.ch/customers/graf-auto/<Title>.pdf`
   - Sauber/Porsche/etc.: the posting's own detail URL on their site.
3. **Verify it resolves:** `curl -s -o /dev/null -m 8 -w '%{http_code}' -L "<url>"` → expect **200**.
   (Some SPAs still 200 on a removed posting — when in doubt, eyeball the rendered title in the browser.)
4. **Capture the real title + location from the posting** and make the card match it.
5. **If the cited posting has closed:** re-point the lead to the employer's **closest currently-live
   posting**, and **correct the card's title/location** so it matches what opens. Note the change in
   `notes` (e.g. "(Die Schlieren-Stelle ist nicht mehr offen.)").
6. **Only-allowed exception:** if an employer has **nothing** matching open, link to their official
   open-positions page and set `notes` + `nextAction` to flag it as a periodic "watch" item (this is
   how Kanton Zürich is handled). Use this sparingly — it is the exception, not the fallback.

**Anti-goals:** never ship a portal homepage / search URL as a job link; never invent a URL; never
machine-translate the German role title; never claim a posting is live without seeing it render.

## 7. Output format — `pole-position-import@1`

Write a JSON file the app imports (Menu → Import). Import **adds** these to existing data (then
Menu → 🧹 dedupes by company+role). Shape:

```json
{
  "_format": "pole-position-import@1",
  "_howto": "Links verified live on <DATE>. Menu → Import → choose this file. German titles on purpose.",
  "leads": [
    {
      "company": "AMAG — Porsche Zentrum Zürich",
      "role": "Automobil-Mechatroniker Porsche (m/w/d) 80–100%",
      "link": "https://jobs.amag-group.ch/Automobil-Mechatroniker-Porsche-mwd-80-100-de-j23042.html",
      "location": "Zürich — ~10 Min",
      "salary": "CHF 5'500–6'500 / Mt (Ziel)",
      "source": "AMAG careers",
      "favourite": true,
      "priority": 5,
      "stage": "researching",
      "nextAction": "Dossier auf Porsche zuschneiden (HV-Zert. zuoberst)",
      "nextDue": "2026-07-02",
      "notes": "Premium-Sportwagen vor der Haustür. HV + AMG sind die Hebel."
    }
  ],
  "tasks": [
    { "title": "CV final machen (DE + EN)", "category": "setup", "due": "2026-07-01", "priority": "high", "notes": "AGVS + Mercedes HV/EV-Zert. zuoberst." }
  ]
}
```

Field rules: `nextDue`/`due` are absolute `YYYY-MM-DD` (the import does not compute relative dates).
Optional fields may be omitted. `priority` 1–5. `task.priority` ∈ {high, med, low}. `task.category`
∈ {setup, network, admin, …}. Keep the existing curated `import.example.json` as the canonical example.

## 8. How it reaches Ben

- The **board positions** live in `import.example.json` (and the `seed()` leads in `index.html` for a
  fresh install). Changing `seed()` only affects fresh installs — Ben's existing phone install must
  **import** the file to get new jobs.
- After delivering, tell Harry the date links were verified and which (if any) leads are "watch" items
  with no live posting.

## 9. Final checklist before handing it over

- [ ] Every seed employer in §3a checked for current openings.
- [ ] A broader Zürich-area search run (§3b) for anything new.
- [ ] Every lead links to the **actual posting** (deep link), verified 200 / eyeballed — no portal homepages.
- [ ] German role titles kept verbatim; cards match what the link opens.
- [ ] Closest-first; 2–4 favourites; deadlines captured in `nextDue`.
- [ ] Output is valid `pole-position-import@1` JSON; dates absolute.
- [ ] Note the verification date + any "watch" exceptions to Harry.
