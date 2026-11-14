import React, { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import Combobox from '../components/Combobox'

const COURSES = [
  "Full Stack Web Development",
  "Data Science",
  "Cloud Computing",
  "Artificial Intelligence & Machine Learning (AIML)",
  "UI-UX",
  "Auto CAD & CATIA",
  "Cyber Security",
  "VLSI",
  "Python with Data Science",
  "Python with Machine Learning",
  "Human Resource",
  "Data Analytics",
  "Digital Marketing",
  "Internet of Things (IOT)",
  "Embedded System",
  "Hybrid Electric Vehicles",
  "App Development",
  "Agriculture Domains",
  "Auto CAD, SketchUp, Revit",
]

export default function RegisterScreen({ onRegistered }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [course, setCourse] = useState('')
  const [resume, setResume] = useState(null)
  const [resumeError, setResumeError] = useState('')
  const [errors, setErrors] = useState({})
  const [fsNotSupported, setFsNotSupported] = useState(false)

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setResumeError('')
    const allowed = ['.pdf', '.doc', '.docx']
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
    if (!allowed.includes(ext)) {
      setResumeError('Please upload a PDF, DOC, or DOCX document.')
      return
    }

    const MAX_SIZE = 5 * 1024 * 1024 // 5MB
    if (file.size > MAX_SIZE) {
      setResumeError('File size exceeds the 5MB limit. Please upload a smaller file.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setResume({
        name: file.name,
        size: file.size,
        type: file.type || 'application/pdf',
        base64: reader.result,
      })
    }
    reader.onerror = () => {
      setResumeError('Failed to read file. Please try again.')
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveResume = () => {
    setResume(null)
    setResumeError('')
  }

  const validate = () => {
    const errs = {}

    const trimmedName = name.trim()
    if (!trimmedName || !/^[a-zA-Z\s]{2,}$/.test(trimmedName)) {
      errs.name = 'Please enter a valid full name (letters and spaces only, min 2 characters).'
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email address.'
    }

    // Strip +91 or 91 prefix if the resulting number is 10 digits
    let cleanPhone = phone.trim()
    const stripped = cleanPhone.replace(/^(\+91|91)/, '').trim()
    if (stripped.length === 10) {
      cleanPhone = stripped
    }
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      errs.phone = 'Please enter a valid 10-digit Indian mobile number.'
    }

    if (!course) {
      errs.course = 'Please select a course.'
    }

    if (resumeError) {
      errs.resume = resumeError
    }

    return errs
  }

  const handleSubmit = async () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    if (!document.fullscreenEnabled) {
      setFsNotSupported(true)
      return
    }

    try {
      document.documentElement.requestFullscreen?.().catch?.(() => {})
    } catch (e) {
      // proceed anyway
    }

    // Clean phone
    let cleanPhone = phone.trim()
    const stripped = cleanPhone.replace(/^(\+91|91)/, '').trim()
    if (stripped.length === 10) {
      cleanPhone = stripped
    }

    onRegistered({
      name: name.trim(),
      email,
      phone: cleanPhone,
      course,
      resume,
    })
  }

  if (fsNotSupported) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md screen-enter text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Fullscreen Not Supported</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Please use <strong>Chrome or Edge</strong> on a <strong>laptop or desktop computer</strong> to take
            this test. Fullscreen mode is required.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md screen-enter">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">📝</div>
          <h1 className="text-2xl font-bold text-gray-900">Student Test Portal</h1>
          <p className="text-sm text-gray-500 mt-1">Register to begin your assessment</p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <div>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }))
              }}
              error={errors.name}
            />
          </div>

          <div>
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
              }}
              error={errors.email}
            />
          </div>

          <div>
            <Input
              label="Phone Number"
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value)
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }))
              }}
              error={errors.phone}
            />
          </div>

          <div>
            <Combobox
              label="Course"
              options={COURSES}
              value={course}
              onChange={(val) => {
                setCourse(val)
                if (errors.course) setErrors((prev) => ({ ...prev, course: undefined }))
              }}
              placeholder="Select your course"
              error={errors.course}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resume / CV <span className="text-gray-400 font-normal">(PDF, DOC, DOCX - Max 5MB)</span>
            </label>
            {!resume ? (
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-indigo-500 rounded-xl p-4 cursor-pointer transition-colors bg-gray-50/50 hover:bg-indigo-50/20">
                <svg className="w-8 h-8 text-indigo-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="text-sm font-medium text-gray-700">Click to upload your resume</span>
                <span className="text-xs text-gray-400 mt-0.5">PDF or Word document</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="flex items-center justify-between p-3 bg-indigo-50/60 border border-indigo-200 rounded-xl">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <span className="text-2xl">📄</span>
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium text-gray-900 truncate">{resume.name}</p>
                    <p className="text-xs text-gray-500">{(resume.size / 1024).toFixed(1)} KB • Ready to submit</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveResume}
                  className="text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50 transition"
                >
                  Remove
                </button>
              </div>
            )}
            {resumeError && <p className="text-xs text-red-600 mt-1">{resumeError}</p>}
          </div>

          <Button variant="primary" className="w-full mt-2" onClick={handleSubmit}>
            Register &amp; Continue →
          </Button>
        </div>
      </div>
    </div>
  )
}
