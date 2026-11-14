import React, { useState, useEffect, useRef, useCallback } from 'react'
import Editor from '@monaco-editor/react'
import { CONFIG } from '../config'
import Button from '../components/Button'
import Timer from '../components/Timer'
import Modal from '../components/Modal'
import { useFullscreenGuard } from '../hooks/useFullscreenGuard'
import { useAntiCopy } from '../hooks/useAntiCopy'
import codingQuestionsData from '../data/coding-questions.json'

const CODING_SESSION_KEY = 'stp_coding_session'

export default function CodingScreen({
  studentInfo,
  initialWarnings = 0,
  onCodingComplete,
}) {
  // Screen width guard (< 1024px)
  const [isTooNarrow, setIsTooNarrow] = useState(() => window.innerWidth < 1024)

  useEffect(() => {
    const handleResize = () => setIsTooNarrow(window.innerWidth < 1024)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Session state
  const [token, setToken] = useState('')
  const [question, setQuestion] = useState(null)
  const [endTime, setEndTime] = useState(0)
  const [selectedLanguage, setSelectedLanguage] = useState('Python 3')
  const [codeDrafts, setCodeDrafts] = useState({})
  const [customInput, setCustomInput] = useState('')
  const [runsUsed, setRunsUsed] = useState(0)
  const [cooldownSec, setCooldownSec] = useState(0)

  // Execution & UI state
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeConsoleTab, setActiveConsoleTab] = useState('output') // 'output' | 'testcases'
  const [customOutput, setCustomOutput] = useState(null) // { stdout, stderr, status }
  const [testCasesResults, setTestCasesResults] = useState([])
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [showTimeUpOverlay, setShowTimeUpOverlay] = useState(false)
  const [currentWarnings, setCurrentWarnings] = useState(initialWarnings)
  const [showMobileEditor, setShowMobileEditor] = useState(false)

  const editorRef = useRef(null)
  const submittedRef = useRef(false)
  const editorContainerRef = useRef(null)

  // 1. Initialize or restore session on mount
  useEffect(() => {
    const restoreOrStart = async () => {
      // 1. Try restoring from sessionStorage
      try {
        const raw = sessionStorage.getItem(CODING_SESSION_KEY)
        if (raw) {
          const saved = JSON.parse(raw)
          if (
            saved &&
            saved.email === studentInfo.email &&
            saved.course === studentInfo.course &&
            saved.question &&
            saved.endTime > Date.now()
          ) {
            setToken(saved.token || `local_${Date.now()}`)
            setQuestion(saved.question)
            setEndTime(saved.endTime)
            setSelectedLanguage(saved.selectedLanguage || 'Python 3')
            setCodeDrafts(saved.codeDrafts || {})
            setCustomInput(saved.customInput || saved.question?.sampleInput || '')
            setRunsUsed(saved.runsUsed || 0)
            setCurrentWarnings(saved.warnings || initialWarnings)
            return
          }
        }
      } catch (err) {
        console.warn('[Coding] Failed to restore session:', err)
      }

      // 2. Try backend start API if available
      let loadedQuestion = null
      let loadedEndsAt = Date.now() + (CONFIG.CODING_DURATION_MIN || 30) * 60 * 1000
      let sessionToken = `local_${Date.now()}`

      try {
        const res = await fetch('/api/coding/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: studentInfo.name,
            email: studentInfo.email,
            phone: studentInfo.phone,
            course: studentInfo.course,
            warningsUsed: initialWarnings,
          }),
        })

        if (res.ok) {
          const data = await res.json()
          if (data && data.ok && data.question) {
            loadedQuestion = data.question
            loadedEndsAt = data.endsAt || loadedEndsAt
            sessionToken = data.token || sessionToken
          }
        }
      } catch (err) {
        console.warn('[Coding] Start endpoint unavailable, using bundled question data:', err)
      }

      // 3. Fallback to bundled course question (guarantees question opens immediately)
      if (!loadedQuestion) {
        const courseQuestions =
          codingQuestionsData[studentInfo.course] ||
          codingQuestionsData['Full Stack Web Development'] ||
          []
        loadedQuestion = courseQuestions[0] || null
      }

      if (loadedQuestion) {
        const drafts = {}
        if (loadedQuestion.starterCode) {
          for (const lang of CONFIG.LANGUAGES) {
            drafts[lang] = loadedQuestion.starterCode[lang] || ''
          }
        }

        setToken(sessionToken)
        setQuestion(loadedQuestion)
        setEndTime(loadedEndsAt)
        setCodeDrafts(drafts)
        setCustomInput(loadedQuestion.sampleInput || '')
      }
    }

    restoreOrStart()
  }, [initialWarnings, studentInfo])

  // Save session state to sessionStorage
  useEffect(() => {
    if (!token || !question || submittedRef.current) return
    const sessionData = {
      email: studentInfo.email,
      course: studentInfo.course,
      token,
      question,
      endTime,
      selectedLanguage,
      codeDrafts,
      customInput,
      runsUsed,
      warnings: currentWarnings,
    }
    sessionStorage.setItem(CODING_SESSION_KEY, JSON.stringify(sessionData))
  }, [codeDrafts, currentWarnings, customInput, endTime, question, runsUsed, selectedLanguage, studentInfo, token])

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldownSec <= 0) return
    const timer = setInterval(() => {
      setCooldownSec((prev) => Math.max(0, prev - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [cooldownSec])

  // Fullscreen guard
  const {
    requestFullscreen,
    violationCount,
    showWarningModal,
    dismissWarning,
  } = useFullscreenGuard({
    active: !submittedRef.current && !isTooNarrow,
    maxWarnings: CONFIG.MAX_WARNINGS,
    countTabSwitch: CONFIG.COUNT_TAB_SWITCH_AS_VIOLATION,
    onViolation: (count) => {
      setCurrentWarnings(count)
    },
    onForceSubmit: () => {
      handleSubmit('Auto - Violation')
    },
  })

  // Global anti-copy
  useAntiCopy(!submittedRef.current)

  // Block copy/paste/cut/drag directly in Monaco DOM & commands
  const handleEditorMount = (editor, monaco) => {
    editorRef.current = editor

    // Override Monaco internal commands for clipboard
    const noop = () => {}
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyC, noop)
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV, noop)
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyX, noop)
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Insert, noop)
    editor.addCommand(monaco.KeyMod.Shift | monaco.KeyCode.Insert, noop)

    // Capture-phase DOM event blocker on editor container
    const domNode = editor.getDomNode()
    if (domNode) {
      const block = (e) => {
        e.preventDefault()
        e.stopPropagation()
      }
      domNode.addEventListener('paste', block, true)
      domNode.addEventListener('copy', block, true)
      domNode.addEventListener('cut', block, true)
      domNode.addEventListener('drop', block, true)
      domNode.addEventListener('contextmenu', block, true)
    }
  }

  // Handle language switch (preserves each language's draft)
  const handleLanguageChange = (newLang) => {
    setSelectedLanguage(newLang)
  }

  // Update current language code
  const handleCodeChange = (newCode) => {
    setCodeDrafts((prev) => ({
      ...prev,
      [selectedLanguage]: newCode || '',
    }))
  }

  // Reset to starter template
  const handleResetCode = () => {
    if (question?.starterCode?.[selectedLanguage]) {
      handleCodeChange(question.starterCode[selectedLanguage])
    }
  }

  // Run code against custom input and all test cases
  const handleRunCode = async () => {
    if (isRunning || cooldownSec > 0 || runsUsed >= CONFIG.MAX_RUNS) return

    setIsRunning(true)
    setRunsUsed((prev) => prev + 1)
    setCooldownSec(CONFIG.RUN_COOLDOWN_SEC)

    const currentCode = codeDrafts[selectedLanguage] || ''

    try {
      const res = await fetch('/api/coding/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          language: selectedLanguage,
          code: currentCode,
          customInput,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        if (data.ok) {
          setCustomOutput(data.customOutput)
          setTestCasesResults(data.testCases || [])
        } else {
          setCustomOutput({
            status: 'Runtime Error',
            stdout: '',
            stderr: data.error || 'Execution failed',
          })
        }
      } else {
        setCustomOutput({
          status: 'Note',
          stdout: 'Code syntax saved.',
          stderr: 'Note: Live execution runner requires a Docker backend. You can proceed to submit your code directly — it will be recorded and evaluated on the management server.',
        })
      }
    } catch (err) {
      setCustomOutput({
        status: 'Note',
        stdout: 'Code saved locally.',
        stderr: 'Note: Live execution runner requires a Docker backend. You can proceed to submit your code directly — it will be recorded and evaluated on the management server.',
      })
    } finally {
      setIsRunning(false)
    }
  }

  // Submit code
  const handleSubmit = useCallback(
    async (submissionType = 'Manual') => {
      if (submittedRef.current) return
      submittedRef.current = true

      setShowSubmitModal(false)
      setIsSubmitting(true)

      const currentCode = codeDrafts[selectedLanguage] || ''

      let apiSubmitted = false
      try {
        const res = await fetch('/api/coding/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token,
            language: selectedLanguage,
            code: currentCode,
            submissionType,
          }),
        })
        if (res.ok) {
          const data = await res.json()
          if (data && data.ok) apiSubmitted = true
        }
      } catch (err) {
        console.warn('[CodingSubmit] Submit API failed, falling back to direct Apps Script logging:', err)
      }

      // If backend API was unreachable (e.g. on static GitHub Pages), post directly to Google Apps Script
      if (!apiSubmitted && CONFIG.APPS_SCRIPT_URL) {
        try {
          await fetch(CONFIG.APPS_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify({
              action: 'codingPending',
              name: studentInfo.name,
              email: studentInfo.email,
              phone: studentInfo.phone,
              course: studentInfo.course,
              language: selectedLanguage,
              code: currentCode,
              reason: 'Direct client submission from portal',
            }),
          })
        } catch (asErr) {
          console.error('[CodingSubmit] Direct Apps Script logging failed:', asErr)
        }
      }

      // Clear coding session state
      sessionStorage.removeItem(CODING_SESSION_KEY)

      // Exit fullscreen
      if (document.fullscreenElement) {
        try {
          await document.exitFullscreen()
        } catch {}
      }

      onCodingComplete()
    },
    [codeDrafts, onCodingComplete, selectedLanguage, studentInfo, token]
  )

  // Timer expire -> auto-submit immediately
  const handleTimeUp = useCallback(() => {
    setShowTimeUpOverlay(true)
    handleSubmit('Auto - Time Up')
  }, [handleSubmit])

  // Screen width guard UI (Mobile friendly fallback)
  if (isTooNarrow) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-lg w-full border border-gray-200 screen-enter">
          <div className="text-center">
            <div className="text-4xl mb-3">📱</div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Mobile Device Detected</h2>
            <p className="text-xs text-indigo-600 font-semibold mb-3 uppercase tracking-wider">
              {studentInfo?.course} • Coding Assessment
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              The full split-pane IDE is optimized for desktop screens (width ≥ 1024px). Since you attended on mobile, you can submit your assessment now, or write your code directly below.
            </p>
          </div>

          {/* Optional Mobile Code Input */}
          {question && (
            <div className="mb-4">
              <button
                type="button"
                onClick={() => setShowMobileEditor(!showMobileEditor)}
                className="w-full text-left text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50/70 hover:bg-indigo-50 border border-indigo-200 rounded-lg p-3 flex items-center justify-between transition"
              >
                <span>{showMobileEditor ? '▲ Hide Coding Problem & Input' : '▼ View Problem & Type Code on Mobile (Optional)'}</span>
                <span className="text-xs text-gray-400">{selectedLanguage}</span>
              </button>

              {showMobileEditor && (
                <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-3 text-left">
                  <div>
                    <h3 className="text-xs font-bold text-gray-900">{question.title}</h3>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{question.scenario}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-700">Language:</label>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => handleLanguageChange(e.target.value)}
                      className="text-xs border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      {CONFIG.LANGUAGES.map((lang) => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Your Code:</label>
                    <textarea
                      rows={8}
                      value={codeDrafts[selectedLanguage] || ''}
                      onChange={(e) => handleCodeChange(e.target.value)}
                      placeholder="Write or paste your code here..."
                      className="w-full font-mono text-xs p-2.5 bg-gray-900 text-gray-100 rounded-lg border border-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      spellCheck="false"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <Button
              variant="primary"
              className="w-full justify-center text-sm py-3 font-semibold shadow-md"
              disabled={isSubmitting}
              onClick={() => {
                const hasCode = !!(codeDrafts[selectedLanguage] && codeDrafts[selectedLanguage].trim())
                handleSubmit(hasCode ? 'Mobile - Code Submitted' : 'Mobile - Submitted Without Code')
              }}
            >
              {isSubmitting ? 'Submitting...' : '✓ Submit & Complete Assessment'}
            </Button>

            <p className="text-[11px] text-gray-400 text-center leading-normal">
              Clicking submit will finalize your test and record your application with management. You will see the completion confirmation next.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Loading state if question not loaded yet
  if (!question || !endTime) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-indigo-600 mx-auto mb-3" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-gray-600 font-medium text-sm">Loading your coding question...</p>
        </div>
      </div>
    )
  }

  // Monaco language mapping
  const monacoLanguage =
    selectedLanguage === 'Python 3'
      ? 'python'
      : selectedLanguage === 'Java'
      ? 'java'
      : selectedLanguage === 'C++'
      ? 'cpp'
      : 'c'

  const currentCode = codeDrafts[selectedLanguage] || ''
  const runsLeft = Math.max(0, CONFIG.MAX_RUNS - runsUsed)

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-gray-100 no-select overflow-hidden">
      {/* Top Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-2.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <span className="bg-indigo-600 text-white text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
            Round 2
          </span>
          <div>
            <h1 className="text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
              {studentInfo.course}
            </h1>
            <p className="text-xs text-gray-400">Coding Assessment</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-xs text-gray-300 font-mono">
            Runs Left:{' '}
            <span className={`font-bold ${runsLeft <= 3 ? 'text-red-400' : 'text-emerald-400'}`}>
              {runsLeft} / {CONFIG.MAX_RUNS}
            </span>
          </div>

          <div className="bg-gray-900 px-3 py-1 rounded-lg border border-gray-700">
            <Timer endTime={endTime} onExpire={handleTimeUp} />
          </div>
        </div>
      </header>

      {/* Main 2-Pane Work Area */}
      <div
        className={`flex-1 flex overflow-hidden ${
          showWarningModal ? 'filter blur-md pointer-events-none' : ''
        }`}
      >
        {/* LEFT PANE: Problem Statement (~40%) */}
        <section
          className="w-[42%] bg-gray-50 text-gray-900 border-r border-gray-200 overflow-y-auto p-6 flex flex-col gap-5 select-none"
          onContextMenu={(e) => e.preventDefault()}
        >
          <div>
            <span className="text-xs font-semibold text-indigo-600 tracking-wider uppercase">
              Problem ID: {question.id}
            </span>
            <h2 className="text-xl font-extrabold text-gray-900 mt-1">{question.title}</h2>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Scenario</h3>
            <p className="text-sm text-gray-800 leading-relaxed">{question.scenario}</p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Input Format</h3>
            <pre className="text-xs bg-white border border-gray-200 p-3 rounded-lg text-gray-800 font-mono whitespace-pre-wrap">
              {question.inputFormat}
            </pre>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Output Format</h3>
            <pre className="text-xs bg-white border border-gray-200 p-3 rounded-lg text-gray-800 font-mono whitespace-pre-wrap">
              {question.outputFormat}
            </pre>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Constraints</h3>
            <pre className="text-xs bg-white border border-gray-200 p-3 rounded-lg text-gray-700 font-mono whitespace-pre-wrap">
              {question.constraints}
            </pre>
          </div>

          {/* Sample Input & Output */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Sample Input</h3>
              <pre className="text-xs bg-gray-100 border border-gray-300 p-3 rounded-lg font-mono text-gray-900 whitespace-pre-wrap">
                {question.sampleInput}
              </pre>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Sample Output</h3>
              <pre className="text-xs bg-gray-100 border border-gray-300 p-3 rounded-lg font-mono text-gray-900 whitespace-pre-wrap">
                {question.sampleOutput}
              </pre>
            </div>
          </div>

          {question.explanation && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Explanation</h3>
              <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
                {question.explanation}
              </p>
            </div>
          )}
        </section>

        {/* RIGHT PANE: Code Editor & Console (~58%) */}
        <section className="flex-1 flex flex-col bg-gray-900 overflow-hidden">
          {/* Editor Toolbar */}
          <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <label htmlFor="lang-select" className="text-xs text-gray-400 font-medium">
                Language:
              </label>
              <select
                id="lang-select"
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-gray-900 text-gray-200 text-xs rounded-md border border-gray-700 px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
              >
                {CONFIG.LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleResetCode}
              className="text-xs text-gray-400 hover:text-white transition-colors"
            >
              ↺ Reset Code
            </button>
          </div>

          {/* Monaco Editor Container */}
          <div
            ref={editorContainerRef}
            className="flex-1 overflow-hidden"
            onContextMenu={(e) => e.preventDefault()}
          >
            <Editor
              height="100%"
              language={monacoLanguage}
              theme="vs-dark"
              value={currentCode}
              onChange={handleCodeChange}
              onMount={handleEditorMount}
              options={{
                fontSize: 14,
                fontFamily: 'Consolas, "Fira Code", monospace',
                minimap: { enabled: false },
                lineNumbers: 'on',
                roundedSelection: true,
                scrollBeyondLastLine: false,
                readOnly: isRunning || isSubmitting,
                automaticLayout: true,
                autoIndent: 'full',
                bracketPairColorization: { enabled: true },
                contextmenu: false,
              }}
            />
          </div>

          {/* Bottom Collapsible Console & Action Bar */}
          <div className="bg-gray-800 border-t border-gray-700 flex flex-col h-64 shrink-0">
            {/* Console Tab Selector */}
            <div className="flex items-center justify-between px-4 border-b border-gray-700 bg-gray-850">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setActiveConsoleTab('output')}
                  className={`text-xs font-semibold py-2.5 border-b-2 transition-colors ${
                    activeConsoleTab === 'output'
                      ? 'border-indigo-500 text-white'
                      : 'border-transparent text-gray-400 hover:text-gray-200'
                  }`}
                >
                  Output & Custom Input
                </button>
                {CONFIG.SHOW_TESTCASE_RESULTS && (
                  <button
                    type="button"
                    onClick={() => setActiveConsoleTab('testcases')}
                    className={`text-xs font-semibold py-2.5 border-b-2 transition-colors ${
                      activeConsoleTab === 'testcases'
                        ? 'border-indigo-500 text-white'
                        : 'border-transparent text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    Test Cases ({testCasesResults.length > 0 ? `${testCasesResults.filter(t => t.status === 'Passed').length}/5 Passed` : '5 Cases'})
                  </button>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 py-1.5">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleRunCode}
                  disabled={isRunning || cooldownSec > 0 || runsLeft <= 0 || isSubmitting}
                >
                  {isRunning
                    ? 'Compiling & Running...'
                    : cooldownSec > 0
                    ? `Cooldown (${cooldownSec}s)`
                    : '▷ Run Code'}
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setShowSubmitModal(true)}
                  disabled={isSubmitting}
                >
                  Submit Code
                </Button>
              </div>
            </div>

            {/* Console Tab Content */}
            <div className="flex-1 overflow-y-auto p-4 text-xs font-mono">
              {activeConsoleTab === 'output' ? (
                <div className="flex gap-4 h-full">
                  {/* Custom Input */}
                  <div className="w-1/2 flex flex-col">
                    <span className="text-gray-400 font-sans text-xs mb-1">
                      Custom Stdin:
                    </span>
                    <textarea
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      onPaste={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onContextMenu={(e) => e.preventDefault()}
                      className="flex-1 bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-gray-200 focus:outline-none focus:border-indigo-500 resize-none font-mono text-xs select-none"
                      placeholder="Enter custom input..."
                    />
                  </div>

                  {/* Execution Output */}
                  <div className="w-1/2 flex flex-col">
                    <span className="text-gray-400 font-sans text-xs mb-1">
                      Execution Result:
                    </span>
                    <div className="flex-1 bg-gray-900 border border-gray-700 rounded-lg p-2.5 overflow-y-auto text-gray-200 font-mono text-xs">
                      {customOutput ? (
                        <div>
                          <div className="mb-2">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                customOutput.status === 'Success'
                                  ? 'bg-emerald-900 text-emerald-300'
                                  : 'bg-red-900 text-red-300'
                              }`}
                            >
                              {customOutput.status}
                            </span>
                          </div>
                          {customOutput.stdout && (
                            <div>
                              <span className="text-gray-500 block text-[10px]">Stdout:</span>
                              <pre className="text-gray-200 whitespace-pre-wrap">{customOutput.stdout}</pre>
                            </div>
                          )}
                          {customOutput.stderr && (
                            <div className="mt-2">
                              <span className="text-red-400 block text-[10px]">Stderr / Compiler:</span>
                              <pre className="text-red-300 whitespace-pre-wrap">{customOutput.stderr}</pre>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">Click "Run Code" to view stdout/stderr.</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Test Cases Tab */
                <div className="flex flex-col gap-3">
                  {testCasesResults.length === 0 ? (
                    <p className="text-gray-500 italic">
                      Run your code to evaluate against test cases.
                    </p>
                  ) : (
                    <div className="flex flex-col gap-2.5">
                      <div className="flex gap-2">
                        {testCasesResults.map((tc) => (
                          <div
                            key={tc.caseNumber}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-sans font-semibold flex items-center gap-1.5 ${
                              tc.status === 'Passed'
                                ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300'
                                : 'bg-red-950/80 border-red-700 text-red-300'
                            }`}
                          >
                            <span>Case {tc.caseNumber}:</span>
                            <span>{tc.status}</span>
                          </div>
                        ))}
                      </div>

                      {/* Expanded View for Case 1 (Public Sample) */}
                      {testCasesResults[0] && (
                        <div className="bg-gray-900 border border-gray-700 p-3 rounded-lg mt-1">
                          <span className="text-gray-400 font-sans text-xs block mb-1 font-semibold">
                            Case 1 (Sample Case Details):
                          </span>
                          <div className="grid grid-cols-3 gap-3 text-xs">
                            <div>
                              <span className="text-gray-500 block text-[10px]">Input:</span>
                              <pre className="text-gray-300 whitespace-pre-wrap">{testCasesResults[0].input}</pre>
                            </div>
                            <div>
                              <span className="text-gray-500 block text-[10px]">Expected:</span>
                              <pre className="text-emerald-400 whitespace-pre-wrap">{testCasesResults[0].expected}</pre>
                            </div>
                            <div>
                              <span className="text-gray-500 block text-[10px]">Your Output:</span>
                              <pre className="text-indigo-300 whitespace-pre-wrap">{testCasesResults[0].actual || '(no output)'}</pre>
                            </div>
                          </div>
                        </div>
                      )}

                      <p className="text-[11px] text-gray-500 italic">
                        🔒 Cases 2–5 are hidden system evaluation cases.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Warning Modal (Carried over warning count from MCQ) */}
      <Modal
        isOpen={showWarningModal}
        title={`⚠️ Warning ${violationCount} of ${CONFIG.MAX_WARNINGS}`}
        footer={
          <Button
            variant="primary"
            onClick={async () => {
              dismissWarning()
              await requestFullscreen()
            }}
          >
            Return to Fullscreen
          </Button>
        }
      >
        <p className="mb-2">
          You exited fullscreen mode during the coding assessment.
        </p>
        <p className="font-medium text-amber-700 mb-2">
          {violationCount < CONFIG.MAX_WARNINGS
            ? `You have ${
                CONFIG.MAX_WARNINGS - violationCount
              } warning(s) remaining across the whole test.`
            : 'This is your final warning! The next violation will auto-submit your code.'}
        </p>
        <p className="text-xs text-gray-500">
          The 30-minute timer is still running. Please return to fullscreen immediately.
        </p>
      </Modal>

      {/* Submit Confirmation Modal */}
      <Modal
        isOpen={showSubmitModal}
        title="Submit Code?"
        onClose={() => setShowSubmitModal(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowSubmitModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => handleSubmit('Manual')}>
              Yes, Submit Code
            </Button>
          </>
        }
      >
        <p className="mb-2">
          Are you sure you want to finalize and submit your code in{' '}
          <strong>{selectedLanguage}</strong>?
        </p>
        <p className="text-xs text-gray-500">
          You cannot change or re-submit your code after this. Final marks will be evaluated on the server and shared by management.
        </p>
      </Modal>

      {/* Time's Up Overlay */}
      {showTimeUpOverlay && (
        <div className="fixed inset-0 bg-indigo-950/90 backdrop-blur-md z-50 flex items-center justify-center p-6 text-white text-center">
          <div className="max-w-md">
            <div className="text-6xl mb-4 animate-bounce">⏰</div>
            <h2 className="text-3xl font-extrabold mb-2">Time is Up!</h2>
            <p className="text-indigo-200 text-sm">
              Your code is being submitted automatically for final evaluation...
            </p>
          </div>
        </div>
      )}

      {/* Submitting Overlay */}
      {isSubmitting && !showTimeUpOverlay && (
        <div className="fixed inset-0 bg-gray-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 text-center text-white">
          <div className="max-w-md">
            <svg className="animate-spin h-12 w-12 text-indigo-500 mx-auto mb-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <h3 className="text-xl font-bold mb-1">Evaluating & Submitting Code...</h3>
            <p className="text-sm text-gray-400">Recording results to the management portal.</p>
          </div>
        </div>
      )}
    </div>
  )
}
