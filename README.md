# Student Test Portal

A production-ready, locked-fullscreen examination and practical coding assessment web application built with **React 18**, **Vite**, **Tailwind CSS**, and **Monaco Editor**. 

Students register, select their enrolled course, review test instructions, accept a non-malpractice declaration, and complete a timed 20-question randomized multiple-choice test in an anti-cheat fullscreen environment. For technical domains, students automatically advance to a **30-minute Practical Coding Assessment** with a dark-themed Monaco editor, multi-language support (Python 3, Java, C, C++), custom input testing, and automated hidden test-case grading. **Students never see their scores, marks, or correctness.** All evaluations occur server-side with verified results logged into management's Google Sheet.

---

## 🚀 Key Features

### Round 1: MCQ Assessment
- **Strict Fullscreen Enforcement**: Warning modals blur the screen on exit; 4th violation auto-submits (`Auto - Violation`).
- **Absolute Drift-Free Timer**: Uses absolute Unix `endTime` timestamp; auto-submits at `0:00`.
- **Anti-Cheat Restrictions**: Disables right-click, text selection, copy/cut/paste, drag-drop, `F12`, and DevTools shortcuts.
- **Zero-Knowledge Front-End**: `questions.json` contains no correct answers. Scoring is handled exclusively server-side in Google Apps Script.
- **Session Resumption**: Shuffled questions, selected options, and timer state are preserved across refreshes in `sessionStorage`.

### Round 2: Practical Coding Assessment (Additive)
- **Domain-Specific Indirect Problems**: Real-world scenario problems designed specifically for technical courses (e.g. API Gateway Windowing for Full Stack, Telemetry Variance for Data Science, Parity Bits for Embedded Systems).
- **Multi-Language Monaco Editor**: Dark theme (`vs-dark`), bracket pairing, line numbers, and language-specific starter code for Python 3, Java (using `public class Main`), C, and C++.
- **Independent Draft Preservation**: Switching between languages preserves the student's code in each language draft.
- **Interactive Test Runner & Console**:
  - **Output Tab**: Custom stdin box (prefilled with sample input), with real-time stdout, stderr, and compilation errors.
  - **Test Cases Tab**: 5 test cases. Case 1 expands to show input, expected, and actual output. Cases 2–5 show status chips only (`Passed`, `Failed`, `Runtime Error`, `Time Limit`) to protect hidden inputs and edge cases.
- **Quota & Cooldown Enforced**: Maximum 15 runs per session with a 5-second cooldown between executions.
- **Continuous Anti-Cheat**: Fullscreen violation count seamlessly continues from the MCQ round (3 total warnings across both rounds; 4th auto-submits). DOM capture-phase listeners and Monaco command overrides prevent pasting into editor and custom input boxes.
- **Server-Side Grading & Pending Queue**: Grades against hidden test cases. If code execution is offline, submissions are saved to `CodingPending` for manual evaluation.

---

## 📂 Project Structure

```
student-test-portal/
├── api/
│   ├── _data/
│   │   ├── coding-testcases.json   # 5 test cases per question (cases 2-5 hidden from client)
│   │   └── reference-solutions.json # Verified Python reference solvers
│   ├── _utils/
│   │   ├── judge0.js               # Execution adapter for Judge0 CE with fallback runner
│   │   └── token.js                # HMAC-SHA256 session token generator & verifier
│   └── coding/
│       ├── start.js                # POST /api/coding/start (session creation / resume)
│       ├── run.js                  # POST /api/coding/run (batch runner for custom + 5 test cases)
│       └── submit.js               # POST /api/coding/submit (server-side grading & Apps Script dispatch)
├── apps-script/
│   └── Code.gs                     # Google Apps Script Web App (doPost router & sheets logger)
├── scripts/
│   ├── generate_coding_data.py     # Generates coding problems and test cases deterministically
│   └── seed-questions.js           # Seeds & merges MCQ questions and answer keys
├── src/
│   ├── components/                 # Button, Input, Combobox, Modal, ProgressBar, QuestionCard, QuestionPalette, Timer
│   ├── data/
│   │   ├── coding-questions.json   # Public problem descriptions and starter templates
│   │   ├── questions.json          # 380 MCQ questions across 19 courses
│   │   └── answer_key_part1/2.csv  # MCQ answer keys
│   ├── hooks/                      # useAntiCopy, useFullscreenGuard, useTimer
│   ├── screens/
│   │   ├── RegisterScreen.jsx      # Screen 1: Registration
│   │   ├── InstructionsScreen.jsx  # Screen 2: MCQ instructions
│   │   ├── TestScreen.jsx          # Screen 3: Timed 20-question MCQ test
│   │   ├── CodingIntroScreen.jsx   # Screen 4: Coding round rules and overview
│   │   ├── CodingScreen.jsx        # Screen 5: Split-pane problem & Monaco code editor
│   │   └── CompletedScreen.jsx     # Screen 6: Final completion screen (scores sealed)
│   ├── utils/
│   │   └── index.js                # Shuffling, time formatting, offline queue, submit retry
│   ├── App.jsx                     # State machine router: register -> instructions -> test -> codingIntro -> coding -> completed
│   ├── config.js                   # Central app configuration
│   └── index.css                   # Tailwind base & animations
├── answer_key.csv                  # Master MCQ answer key for Google Sheets
└── vite.config.js                  # Vite bundler with local dev API middleware
```

---

## ⚙️ Configuration (`src/config.js`)

| Setting | Default | Description |
|---|---|---|
| `TEST_DURATION_MIN` | `20` | Duration of the MCQ round (minutes) |
| `QUESTIONS_PER_TEST` | `20` | Questions per MCQ test session |
| `MAX_WARNINGS` | `3` | Max fullscreen exit warnings across entire portal |
| `COUNT_TAB_SWITCH_AS_VIOLATION` | `false` | When `true`, window blur or tab switching triggers a violation |
| `APPS_SCRIPT_URL` | `VITE_APPS_SCRIPT_URL` | Google Apps Script deployment URL |
| `CODING_ROUND_COURSES` | `9 courses` | Array of courses that proceed to Round 2 (others skip to completed) |
| `CODING_DURATION_MIN` | `30` | Duration of the coding round (minutes) |
| `CODING_MAX_MARKS` | `10` | Maximum marks awarded for the coding round |
| `TEST_CASES_PER_QUESTION` | `5` | Test cases evaluated per problem |
| `MAX_RUNS` | `15` | Maximum code compilation runs allowed per session |
| `RUN_COOLDOWN_SEC` | `5` | Mandatory cooldown between runs (seconds) |
| `SHOW_TESTCASE_RESULTS` | `true` | Toggle visibility of test case status chips in editor |
| `LANGUAGES` | `["Python 3", "Java", "C", "C++"]` | Supported programming languages |

---

## 📊 Google Sheets Setup (5 Sheet Tabs)

The Google Sheet consists of 5 dedicated tabs:

1. **`Results`**: MCQ assessment submissions (Timestamp, Name, Email, Phone, Course, Score, Total, Answered, Time Taken, Submission Type, Warnings, Answers JSON).
2. **`AnswerKey`**: Master MCQ answer keys (`id`, `correct`).
3. **`CodingSessions`**: Active session records (`Email`, `Course`, `QuestionId`, `StartedAt`, `Status`).
4. **`CodingResults`**: Evaluated coding submissions (`Timestamp`, `Name`, `Email`, `Phone`, `Course`, `Language`, `Test Cases Passed`, `Total Test Cases`, `Coding Marks`, `Max Marks`, `Submission Type`, `Warnings`).
5. **`CodingPending`**: Fallback queue for un-evaluated code submissions during service outages (`Timestamp`, `Name`, `Email`, `Course`, `Language`, `Code`, `Reason`).

> [!TIP]
> **Auto-Generate All Tabs**: Open your Google Sheet → **Extensions** → **Apps Script**, select the **`setupSheets`** function from the dropdown, and click **Run**. It will automatically create and format all 5 tabs!

---

## 🐳 Judge0 CE Setup Guide (Docker on Linux VPS)

To deploy an isolated, self-hosted code execution backend for production:

### 1. Requirements
- Ubuntu 22.04 LTS (or Debian 12)
- At least 2 CPU cores, 2 GB RAM
- Docker & Docker Compose installed

### 2. Install Judge0 CE
```bash
# Update and install Docker
sudo apt update && sudo apt install -y docker.io docker-compose git

# Clone Judge0
git clone https://github.com/judge0/judge0.git
cd judge0

# Download release archive (v1.13.1)
wget https://github.com/judge0/judge0/releases/download/v1.13.1/judge0-v1.13.1.zip
unzip judge0-v1.13.1.zip

# Generate configuration
cp judge0.conf.example judge0.conf

# Start services
docker-compose up -d db redis
sleep 10
docker-compose up -d
```

### 3. Verify Deployment
```bash
curl http://localhost:2358/languages
```
This returns the supported languages and IDs. Point your app's `JUDGE0_URL` to your VPS IP or domain (e.g. `http://your-server-ip:2358`).

---

## 🚢 Vercel Production Deployment

1. **Push to GitHub / GitLab**.
2. **Import into Vercel**.
3. **Configure Environment Variables** in Vercel Project Settings:
   - `APPS_SCRIPT_URL`: Your deployed Google Apps Script URL (`https://script.google.com/macros/s/.../exec`).
   - `APPS_SCRIPT_SECRET`: Optional shared secret string.
   - `SESSION_SECRET`: Random 32-character string for HMAC session token signing.
   - `JUDGE0_URL`: URL of your Judge0 CE instance (or leave blank to use the built-in runner).
   - `JUDGE0_AUTH_TOKEN`: Optional auth token for Judge0.
4. **Deploy**: Vercel will automatically build the React Vite bundle and deploy the serverless functions in `/api/coding/*`.

---

## 🧪 Comprehensive Manual Testing Checklist

| Test Scenario | Action | Expected Result | Pass? |
|---|---|---|:---:|
| **Non-Coding Course** | Select *UI-UX* or *Auto CAD & CATIA* and submit MCQ. | Skips coding round directly and shows the final completion screen. | [x] |
| **Coding Round Course** | Select *Full Stack Web Development* or *Data Science* and submit MCQ normally. | Transitions to the Coding Intro screen; fullscreen remains active. | [x] |
| **All 5 Test Cases Pass** | Submit correct solution in Python 3. | Server records 5/5 test cases passed, awards full marks (10.0) in `CodingResults`. | [x] |
| **Proportional Grading** | Submit solution passing 3 out of 5 cases. | Server records 3/5 passed, awards exactly 6.0 marks (`3/5 * 10 = 6.0`). | [x] |
| **Submit Without Running** | Type code and click "Submit Code" without clicking "Run". | Confirm modal appears; submission succeeds; server grades code against all 5 cases. | [x] |
| **Empty Submission** | Submit completely blank code editor. | Submits successfully; server awards 0.0 marks with 0 test cases passed. | [x] |
| **Paste Blocked** | Try `Ctrl+V`, right-click paste, or dragging text into editor or custom input. | All paste and drop actions are intercepted and suppressed. | [x] |
| **4th Violation Auto-Submit** | Exit fullscreen 4 times during the coding round. | 4th violation locks editor and automatically submits code with type `Auto - Violation`. | [x] |
| **Timer Auto-Submit** | Let the 30-minute coding timer reach `0:00`. | "Time is Up!" overlay appears; code auto-submits with type `Auto - Time Up`. | [x] |
| **MCQ Violation Auto-Submit** | Cause 4 violations in the MCQ round. | Test auto-submits with `Auto - Violation` and **skips coding round entirely** straight to completion screen. | [x] |
| **Coding Refresh Resume** | Edit code, run tests, and press `F5` / refresh browser. | Session restores automatically with identical question, code drafts, and remaining timer. | [x] |
| **MCQ Flow Untouched** | Complete MCQ assessment for any course. | Results are logged in `Results` sheet exactly as originally configured. | [x] |

---

## 📜 License
This project is licensed under the MIT License.
