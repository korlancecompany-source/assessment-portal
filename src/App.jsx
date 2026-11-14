import React, { useState, useEffect, useRef } from 'react'
import RegisterScreen from './screens/RegisterScreen'
import InstructionsScreen from './screens/InstructionsScreen'
import TestScreen from './screens/TestScreen'
import CodingIntroScreen from './screens/CodingIntroScreen'
import CodingScreen from './screens/CodingScreen'
import CompletedScreen from './screens/CompletedScreen'
import { loadOfflineRetry, SESSION_KEY } from './utils'
import { CONFIG } from './config'

export default function App() {
  const [screen, setScreen] = useState('register')
  const [studentInfo, setStudentInfo] = useState(null)
  const [mcqWarnings, setMcqWarnings] = useState(0)
  const testCompletedRef = useRef(false)

  // On mount: attempt offline retry queue flush and restore session if mid-test or mid-coding
  useEffect(() => {
    loadOfflineRetry()

    // 1. Check if returning to an active coding session
    try {
      const codingRaw = sessionStorage.getItem('stp_coding_session')
      if (codingRaw) {
        const codingSession = JSON.parse(codingRaw)
        if (
          codingSession &&
          codingSession.email &&
          codingSession.course &&
          codingSession.token &&
          codingSession.endTime > Date.now()
        ) {
          setStudentInfo({
            name: codingSession.email.split('@')[0],
            email: codingSession.email,
            course: codingSession.course,
          })
          setMcqWarnings(codingSession.warnings || 0)
          setScreen('coding')
          return
        }
      }
    } catch {
      sessionStorage.removeItem('stp_coding_session')
    }

    // 2. Check if returning to an active MCQ test session
    try {
      const raw = sessionStorage.getItem(SESSION_KEY)
      if (raw) {
        const session = JSON.parse(raw)
        if (session?.phase === 'test' && session?.studentInfo) {
          setStudentInfo(session.studentInfo)
          setScreen('test')
        }
      }
    } catch {
      sessionStorage.removeItem(SESSION_KEY)
    }
  }, [])

  // Handler: student submitted registration form
  function onRegistered(info) {
    if (testCompletedRef.current) return
    setStudentInfo(info)
    setScreen('instructions')
  }

  // Handler: student clicked "Start Test" on instructions screen
  function onStartTest() {
    if (testCompletedRef.current) return
    setScreen('test')
  }

  // Handler: MCQ test completed
  function onTestComplete(mcqMeta = {}) {
    const isViolation = mcqMeta.submissionType === 'Auto - Violation'
    const isCodingCourse = CONFIG.CODING_ROUND_COURSES?.includes(studentInfo?.course)
    const warnings = mcqMeta.warningsUsed || 0
    setMcqWarnings(warnings)

    sessionStorage.removeItem(SESSION_KEY)

    // Route to coding round if course qualifies and student was not auto-submitted for violation
    if (isCodingCourse && !isViolation) {
      setScreen('codingIntro')
    } else {
      testCompletedRef.current = true
      setScreen('completed')
    }
  }

  // Handler: student clicked "Start Coding Round"
  function onStartCoding() {
    if (testCompletedRef.current) return
    setScreen('coding')
  }

  // Handler: coding round completed
  function onCodingComplete() {
    testCompletedRef.current = true
    sessionStorage.removeItem('stp_coding_session')
    setScreen('completed')
  }

  // Render the correct screen for current phase
  switch (screen) {
    case 'register':
      return <RegisterScreen onRegistered={onRegistered} />

    case 'instructions':
      return (
        <InstructionsScreen
          studentInfo={studentInfo}
          onStartTest={onStartTest}
        />
      )

    case 'test':
      return (
        <TestScreen
          studentInfo={studentInfo}
          onTestComplete={onTestComplete}
        />
      )

    case 'codingIntro':
      return (
        <CodingIntroScreen
          studentInfo={studentInfo}
          warningsUsed={mcqWarnings}
          onStartCoding={onStartCoding}
        />
      )

    case 'coding':
      return (
        <CodingScreen
          studentInfo={studentInfo}
          initialWarnings={mcqWarnings}
          onCodingComplete={onCodingComplete}
        />
      )

    case 'completed':
      return <CompletedScreen />

    default:
      return <RegisterScreen onRegistered={onRegistered} />
  }
}
