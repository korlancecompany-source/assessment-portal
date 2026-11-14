// Central configuration — edit here to change test behaviour
export const CONFIG = {
  TEST_DURATION_MIN: 20,
  QUESTIONS_PER_TEST: 20,
  MAX_WARNINGS: 3,
  COUNT_TAB_SWITCH_AS_VIOLATION: false,
  APPS_SCRIPT_URL:
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_APPS_SCRIPT_URL) ||
    'https://script.google.com/macros/s/AKfycbyC3vg56fRnynDPro1X-bvu4oAEL2BHgQ24zWkKlzWPysVtVDSvPcU6xuZ8KIunI48ZzA/exec',

  // --- CODING ROUND CONFIGURATION ---
  CODING_ROUND_COURSES: [
    "Full Stack Web Development",
    "Data Science",
    "Artificial Intelligence & Machine Learning (AIML)",
    "Python with Data Science",
    "Python with Machine Learning",
    "Data Analytics",
    "App Development",
    "Internet of Things (IOT)",
    "Embedded System"
  ],
  CODING_DURATION_MIN: 30,
  CODING_MAX_MARKS: 10,
  TEST_CASES_PER_QUESTION: 5,
  MAX_RUNS: 15,
  RUN_COOLDOWN_SEC: 5,
  SHOW_TESTCASE_RESULTS: true,
  LANGUAGES: ["Python 3", "Java", "C", "C++"],
};
