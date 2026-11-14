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
  const [errors, setErrors] = useState({})
  const [fsNotSupported, setFsNotSupported] = useState(false)

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
      await document.documentElement.requestFullscreen()
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

          <Button variant="primary" className="w-full mt-2" onClick={handleSubmit}>
            Register &amp; Continue →
          </Button>
        </div>
      </div>
    </div>
  )
}
