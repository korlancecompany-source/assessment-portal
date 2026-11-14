// ============================================================
// Student Test Portal — Google Apps Script Backend
// Deploy as Web App: Execute as "Me", Access "Anyone"
// Sheet tabs:
//   - "Results"         : MCQ Assessment Submissions
//   - "AnswerKey"       : Master Answer Key for MCQ
//   - "CodingSessions"  : Tracks active coding sessions
//   - "CodingResults"   : Evaluated marks for coding submissions
//   - "CodingPending"   : Submissions pending server grading
// ============================================================

var PORTAL_CONFIG = {
  /**
   * Email address where student test completion notifications and resumes will be sent.
   * Multiple emails can be separated by a comma (e.g. 'admin@company.com, hr@company.com').
   */
  NOTIFICATION_EMAIL: 'kishore31122k4@gmail.com',

  /**
   * When true, the same email address cannot submit for the same course twice.
   * The check is case-insensitive.
   */
  ONE_ATTEMPT_PER_EMAIL: true,

  /**
   * Shared secret between backend API and Apps Script to verify coding submissions.
   * Leave blank ('') to allow unauthenticated or set matching APPS_SCRIPT_SECRET.
   */
  APPS_SCRIPT_SECRET: '',

  /**
   * Leave blank ('') if this script is bound to the spreadsheet (created via Extensions > Apps Script).
   * Set to the spreadsheet's ID if deployed as a standalone script.
   */
  SPREADSHEET_ID: '',
};

// ------------------------------------------------------------
// Helper: get the spreadsheet instance
// ------------------------------------------------------------
function getSS() {
  return PORTAL_CONFIG.SPREADSHEET_ID
    ? SpreadsheetApp.openById(PORTAL_CONFIG.SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
}

// ------------------------------------------------------------
// doPost — receives JSON submissions (MCQ or Coding Action)
// ------------------------------------------------------------
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
  } catch (err) {
    return jsonResponse({ ok: false, error: 'Server busy, please retry' });
  }

  try {
    var payload = JSON.parse(e.postData.contents);

    // ==========================================================
    // ACTION ROUTING (Coding Round Handlers)
    // ==========================================================
    if (payload.action) {
      if (payload.action === 'codingStart') {
        return handleCodingStart(payload);
      }
      if (payload.action === 'codingResult') {
        return handleCodingResult(payload);
      }
      if (payload.action === 'codingPending') {
        return handleCodingPending(payload);
      }
      return jsonResponse({ ok: false, error: 'Unknown action: ' + payload.action });
    }

    // ==========================================================
    // EXISTING MCQ ASSESSMENT LOGIC (Runs exactly as before)
    // ==========================================================
    var required = [
      'name',
      'email',
      'phone',
      'course',
      'answers',
      'answeredCount',
      'submissionType',
      'submittedAt',
    ];
    for (var i = 0; i < required.length; i++) {
      if (payload[required[i]] === undefined || payload[required[i]] === null) {
        return jsonResponse({ ok: false, error: 'Missing field: ' + required[i] });
      }
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(payload.email))) {
      return jsonResponse({ ok: false, error: 'Invalid email address.' });
    }

    var ss = getSS();
    var resultsSheet = ss.getSheetByName('Results');
    if (!resultsSheet) {
      return jsonResponse({ ok: false, error: "Sheet 'Results' not found." });
    }

    var answerKeySheet = ss.getSheetByName('AnswerKey');
    if (!answerKeySheet) {
      return jsonResponse({ ok: false, error: "Sheet 'AnswerKey' not found." });
    }

    // ONE_ATTEMPT_PER_EMAIL check:
    // If student previously had an entry (e.g. refreshed, registration-only, or retry),
    // update their row instead of failing, ensuring answers and scores are never lost!
    var existingRowIndex = -1;
    var data = resultsSheet.getDataRange().getValues();
    for (var r = 1; r < data.length; r++) {
      var existingEmail  = String(data[r][2]).toLowerCase().trim();
      var existingCourse = String(data[r][4]).trim();
      var incomingEmail  = String(payload.email).toLowerCase().trim();
      var incomingCourse = String(payload.course).trim();

      if (existingEmail === incomingEmail && existingCourse === incomingCourse) {
        existingRowIndex = r + 1; // 1-based row index for Sheets
        break;
      }
    }

    // Load answer key
    var keyData = answerKeySheet.getDataRange().getValues();
    var answerKey = {};
    for (var k = 1; k < keyData.length; k++) {
      var colA = String(keyData[k][0]).trim();
      var colB = keyData[k][1] !== undefined ? String(keyData[k][1]).trim().toUpperCase() : '';
      
      // Support both 2-column layout and single-column comma-separated paste
      if (colA && colA.indexOf(',') !== -1 && !colB) {
        var parts = colA.split(',');
        var qId = parts[0].trim();
        var correct = (parts[1] || '').trim().toUpperCase();
        if (qId && correct) {
          answerKey[qId] = correct;
        }
      } else if (colA) {
        answerKey[colA] = colB;
      }
    }

    // Score submission
    var TOTAL = 20;
    var score = 0;
    var answers = payload.answers; // { [questionId]: "A"|"B"|"C"|"D" }

    for (var qId in answers) {
      if (
        Object.prototype.hasOwnProperty.call(answers, qId) &&
        answerKey[qId] &&
        answers[qId]
      ) {
        if (String(answers[qId]).toUpperCase() === answerKey[qId]) {
          score++;
        }
      }
    }

    // Extract resume info (if provided)
    var resumeInfo = '';
    var resumeName = '';
    var resumeBlob = null;
    var fileUrl = '';
    if (payload.resume) {
      if (typeof payload.resume === 'string') {
        resumeInfo = payload.resume;
      } else if (payload.resume.name) {
        resumeName = String(payload.resume.name);
        resumeInfo = resumeName;
        if (payload.resume.base64) {
          try {
            var b64Parts = payload.resume.base64.split(',');
            var rawB64 = b64Parts.length > 1 ? b64Parts[1] : b64Parts[0];
            var decoded = Utilities.base64Decode(rawB64);
            var mime = payload.resume.type || 'application/pdf';
            var safeName = String(payload.name).replace(/[^a-zA-Z0-9_\s-]/g, '').trim() + ' - ' + resumeName;

            // Get or create "Student Resumes" folder in Google Drive
            var folders = DriveApp.getFoldersByName('Student Resumes');
            var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder('Student Resumes');

            resumeBlob = Utilities.newBlob(decoded, mime, safeName);
            var file = folder.createFile(resumeBlob);

            try {
              file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
            } catch (shareErr) {}

            fileUrl = file.getUrl();
            resumeInfo = '=HYPERLINK("' + fileUrl + '", "📄 View ' + resumeName + '")';
          } catch (e) {
            Logger.log('Drive save error: ' + e.toString());
            resumeInfo = resumeName + ' (attached)';
          }
        }
      }
    }

    var resultRow = [
      new Date(payload.submittedAt || Date.now()), // 1  Timestamp
      String(payload.name).trim(),                 // 2  Name
      String(payload.email).trim(),                // 3  Email
      String(payload.phone).trim(),                // 4  Phone
      String(payload.course).trim(),               // 5  Course
      score,                                       // 6  Score
      TOTAL,                                       // 7  Total
      Number(payload.answeredCount) || 0,          // 8  Answered
      Number(payload.timeTakenSec)  || 0,          // 9  Time Taken (sec)
      String(payload.submissionType),              // 10 Submission Type
      Number(payload.warningsUsed)  || 0,          // 11 Warnings
      JSON.stringify(payload.answers || {}),       // 12 Answers JSON
      resumeInfo                                   // 13 Resume Link / Name
    ];

    // If student previously had a row (e.g. timeout retry or re-entry), update that row!
    // Otherwise append a new row.
    if (existingRowIndex > 0) {
      resultsSheet.getRange(existingRowIndex, 1, 1, resultRow.length).setValues([resultRow]);
    } else {
      resultsSheet.appendRow(resultRow);
    }

    // Also record in dedicated Resumes tab for easy HR access
    if (payload.resume) {
      try {
        var resumeSheet = ss.getSheetByName('Resumes');
        if (!resumeSheet) {
          resumeSheet = ss.insertSheet('Resumes');
          resumeSheet.appendRow([
            'Timestamp', 'Candidate Name', 'Email', 'Phone', 'Course',
            'Resume File Name', 'File Size', 'Drive Link / View'
          ]);
          resumeSheet.setFrozenRows(1);
        }
        var fileSizeStr = payload.resume.size ? (Math.round(payload.resume.size / 1024) + ' KB') : '';
        resumeSheet.appendRow([
          new Date(payload.submittedAt || Date.now()),
          String(payload.name).trim(),
          String(payload.email).trim(),
          String(payload.phone).trim(),
          String(payload.course).trim(),
          payload.resume.name || 'Resume',
          fileSizeStr,
          resumeInfo || 'Attached'
        ]);
      } catch (rErr) {
        Logger.log('Resumes tab error: ' + rErr.toString());
      }
    }

    // Send instant email notification to admin with student details & resume
    try {
      sendAdminNotification(payload, score, TOTAL, resumeBlob, fileUrl);
    } catch (mailErr) {
      Logger.log('Admin notification email error: ' + mailErr.toString());
    }

    return jsonResponse({ ok: true });

  } catch (err) {
    return jsonResponse({ ok: false, error: err.toString() });
  } finally {
    lock.releaseLock();
  }
}

// ============================================================
// CODING ROUND ACTION HANDLERS
// ============================================================

/**
 * Action: codingStart
 * Gets or creates an active coding session so refreshes resume the same question and start time.
 */
function handleCodingStart(payload) {
  var ss = getSS();
  var sessionsSheet = ss.getSheetByName('CodingSessions');
  if (!sessionsSheet) {
    sessionsSheet = ss.insertSheet('CodingSessions');
    sessionsSheet.appendRow(['Email', 'Course', 'QuestionId', 'StartedAt', 'Status']);
    sessionsSheet.setFrozenRows(1);
  }

  var resultsSheet = ss.getSheetByName('CodingResults');
  var email = String(payload.email).toLowerCase().trim();
  var course = String(payload.course).trim();

  // Check if already submitted in CodingResults
  if (resultsSheet) {
    var resultsData = resultsSheet.getDataRange().getValues();
    for (var r = 1; r < resultsData.length; r++) {
      if (String(resultsData[r][2]).toLowerCase().trim() === email &&
          String(resultsData[r][4]).trim() === course) {
        return jsonResponse({ ok: false, error: 'Coding round already completed for this course.' });
      }
    }
  }

  // Check existing session
  var sessionsData = sessionsSheet.getDataRange().getValues();
  for (var s = 1; s < sessionsData.length; s++) {
    if (String(sessionsData[s][0]).toLowerCase().trim() === email &&
        String(sessionsData[s][1]).trim() === course) {
      return jsonResponse({
        ok: true,
        isResume: true,
        questionId: sessionsData[s][2],
        startedAt: sessionsData[s][3],
      });
    }
  }

  // Create new session
  var startedAt = new Date().toISOString();
  sessionsSheet.appendRow([email, course, payload.questionId, startedAt, 'In Progress']);

  return jsonResponse({
    ok: true,
    isResume: false,
    questionId: payload.questionId,
    startedAt: startedAt,
  });
}

/**
 * Action: codingResult
 * Logs official grading result to CodingResults tab.
 */
function handleCodingResult(payload) {
  // Validate secret if configured
  if (PORTAL_CONFIG.APPS_SCRIPT_SECRET && payload.secret !== PORTAL_CONFIG.APPS_SCRIPT_SECRET) {
    return jsonResponse({ ok: false, error: 'Unauthorized secret.' });
  }

  var ss = getSS();
  var resultsSheet = ss.getSheetByName('CodingResults');
  if (!resultsSheet) {
    resultsSheet = ss.insertSheet('CodingResults');
    resultsSheet.appendRow([
      'Timestamp', 'Name', 'Email', 'Phone', 'Course', 'Language',
      'Test Cases Passed', 'Total Test Cases', 'Coding Marks', 'Max Marks',
      'Submission Type', 'Warnings'
    ]);
    resultsSheet.setFrozenRows(1);
  }

  var email = String(payload.email).toLowerCase().trim();
  var course = String(payload.course).trim();

  // Check duplicate attempt
  if (PORTAL_CONFIG.ONE_ATTEMPT_PER_EMAIL) {
    var data = resultsSheet.getDataRange().getValues();
    for (var r = 1; r < data.length; r++) {
      if (String(data[r][2]).toLowerCase().trim() === email &&
          String(data[r][4]).trim() === course) {
        return jsonResponse({ ok: false, error: 'Duplicate coding round submission.' });
      }
    }
  }

  // Append row
  resultsSheet.appendRow([
    new Date(payload.submittedAt || Date.now()),
    String(payload.name).trim(),
    String(payload.email).trim(),
    String(payload.phone).trim(),
    String(payload.course).trim(),
    String(payload.language).trim(),
    Number(payload.testCasesPassed) || 0,
    Number(payload.totalTestCases) || 5,
    Number(payload.codingMarks) || 0,
    Number(payload.maxMarks) || 10,
    String(payload.submissionType),
    Number(payload.warnings) || 0,
  ]);

  // Update CodingSessions status to 'Completed'
  var sessionsSheet = ss.getSheetByName('CodingSessions');
  if (sessionsSheet) {
    var sessionsData = sessionsSheet.getDataRange().getValues();
    for (var s = 1; s < sessionsData.length; s++) {
      if (String(sessionsData[s][0]).toLowerCase().trim() === email &&
          String(sessionsData[s][1]).trim() === course) {
        sessionsSheet.getRange(s + 1, 5).setValue('Completed');
        break;
      }
    }
  }

  return jsonResponse({ ok: true });
}

/**
 * Action: codingPending
 * Records code submissions that could not be evaluated by the execution runner for manual review.
 */
function handleCodingPending(payload) {
  var ss = getSS();
  var pendingSheet = ss.getSheetByName('CodingPending');
  if (!pendingSheet) {
    pendingSheet = ss.insertSheet('CodingPending');
    pendingSheet.appendRow([
      'Timestamp', 'Name', 'Email', 'Course', 'Language', 'Code', 'Reason'
    ]);
    pendingSheet.setFrozenRows(1);
  }

  pendingSheet.appendRow([
    new Date(),
    String(payload.name).trim(),
    String(payload.email).trim(),
    String(payload.course).trim(),
    String(payload.language).trim(),
    String(payload.code),
    String(payload.reason || 'Pending Execution')
  ]);

  return jsonResponse({ ok: true, pending: true });
}

// ------------------------------------------------------------
// doGet — health-check endpoint
// ------------------------------------------------------------
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Student Test Portal API is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ------------------------------------------------------------
// Helper: build a JSON ContentService response
// ------------------------------------------------------------
function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ------------------------------------------------------------
// Helper: Escapes HTML special characters for safe email display
// ------------------------------------------------------------
function escapeHtml(text) {
  if (text === undefined || text === null) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ------------------------------------------------------------
// Email Notification: sends student details & resume to admin
// ------------------------------------------------------------
function sendAdminNotification(payload, score, total, resumeBlob, fileUrl) {
  var recipient = PORTAL_CONFIG.NOTIFICATION_EMAIL;
  if (!recipient || String(recipient).trim() === '') return;

  var candidateName = String(payload.name || 'Candidate').trim();
  var courseName = String(payload.course || '').trim();
  var subject = '🎓 Student Assessment Submitted: ' + candidateName + ' (' + courseName + ')';

  var timeMinutes = Math.floor((Number(payload.timeTakenSec) || 0) / 60);
  var timeSeconds = (Number(payload.timeTakenSec) || 0) % 60;
  var timeStr = timeMinutes + ' min ' + timeSeconds + ' sec';

  var resumeDisplay = 'None uploaded';
  if (fileUrl) {
    resumeDisplay = '<a href="' + fileUrl + '" style="color: #4f46e5; font-weight: bold; text-decoration: underline;">📄 View in Google Drive</a>';
  } else if (payload.resume && payload.resume.name) {
    resumeDisplay = escapeHtml(payload.resume.name);
  } else if (typeof payload.resume === 'string' && payload.resume) {
    resumeDisplay = escapeHtml(payload.resume);
  }

  var htmlBody = 
    '<div style="font-family: Arial, Helvetica, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff; color: #1f2937;">' +
      '<div style="border-bottom: 2px solid #4f46e5; padding-bottom: 12px; margin-bottom: 20px;">' +
        '<h2 style="color: #4f46e5; margin: 0; font-size: 20px;">🎓 Student Test Portal — New Submission</h2>' +
        '<p style="color: #6b7280; font-size: 13px; margin: 4px 0 0 0;">A student has completed their test. Full details are recorded below:</p>' +
      '</div>' +

      '<table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">' +
        '<tr style="background-color: #f9fafb;"><td style="padding: 10px 12px; font-weight: bold; width: 35%; color: #4b5563;">Candidate Name</td><td style="padding: 10px 12px; font-weight: bold; color: #111827;">' + escapeHtml(payload.name) + '</td></tr>' +
        '<tr><td style="padding: 10px 12px; font-weight: bold; color: #4b5563;">Email Address</td><td style="padding: 10px 12px;"><a href="mailto:' + escapeHtml(payload.email) + '" style="color: #2563eb; text-decoration: none;">' + escapeHtml(payload.email) + '</a></td></tr>' +
        '<tr style="background-color: #f9fafb;"><td style="padding: 10px 12px; font-weight: bold; color: #4b5563;">Phone Number</td><td style="padding: 10px 12px;"><a href="tel:' + escapeHtml(payload.phone) + '" style="color: #2563eb; text-decoration: none;">' + escapeHtml(payload.phone) + '</a></td></tr>' +
        '<tr><td style="padding: 10px 12px; font-weight: bold; color: #4b5563;">Course</td><td style="padding: 10px 12px; font-weight: bold; color: #4f46e5;">' + escapeHtml(payload.course) + '</td></tr>' +
        '<tr style="background-color: #f9fafb;"><td style="padding: 10px 12px; font-weight: bold; color: #4b5563;">Score</td><td style="padding: 10px 12px; font-size: 16px; font-weight: bold; color: #059669;">' + score + ' / ' + total + ' (' + (payload.answeredCount || 0) + ' questions answered)</td></tr>' +
        '<tr><td style="padding: 10px 12px; font-weight: bold; color: #4b5563;">Time Taken</td><td style="padding: 10px 12px;">' + timeStr + '</td></tr>' +
        '<tr style="background-color: #f9fafb;"><td style="padding: 10px 12px; font-weight: bold; color: #4b5563;">Submission Type</td><td style="padding: 10px 12px;">' + escapeHtml(payload.submissionType) + '</td></tr>' +
        '<tr><td style="padding: 10px 12px; font-weight: bold; color: #4b5563;">Warnings Used</td><td style="padding: 10px 12px; color: #d97706;">' + (payload.warningsUsed || 0) + '</td></tr>' +
        '<tr style="background-color: #f9fafb;"><td style="padding: 10px 12px; font-weight: bold; color: #4b5563;">Resume</td><td style="padding: 10px 12px;">' + resumeDisplay + '</td></tr>' +
      '</table>' +

      (resumeBlob ? '<div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 12px; margin-bottom: 20px; font-size: 13px; color: #065f46;">📎 <strong>Resume is attached to this email</strong> for instant download and review.</div>' : '') +

      '<p style="font-size: 12px; color: #9ca3af; text-align: center; margin: 20px 0 0 0;">This email was sent automatically by Student Test Portal via Google Apps Script.</p>' +
    '</div>';

  var mailOptions = {
    to: recipient,
    subject: subject,
    htmlBody: htmlBody,
    name: 'Student Test Portal'
  };

  if (resumeBlob) {
    mailOptions.attachments = [resumeBlob];
  }

  MailApp.sendEmail(mailOptions);
}

// ------------------------------------------------------------
// Admin helper: authorizes Google Drive & auto-creates all 6 tabs
// ------------------------------------------------------------
function authorizeDrive() {
  var folders = DriveApp.getFoldersByName('Student Resumes');
  var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder('Student Resumes');
  Logger.log('SUCCESS: Google Drive authorized! "Student Resumes" folder URL: ' + folder.getUrl());
  Logger.log('MailApp daily remaining quota: ' + MailApp.getRemainingDailyQuota());
}

function setupSheets() {
  // 0. Trigger Drive authorization & create folder
  try {
    var folders = DriveApp.getFoldersByName('Student Resumes');
    if (!folders.hasNext()) {
      DriveApp.createFolder('Student Resumes');
    }
    Logger.log('Google Drive folder "Student Resumes" verified.');
  } catch (dErr) {
    Logger.log('Notice: ' + dErr.toString());
  }

  var ss = getSS();

  // 1. Results sheet
  var results = ss.getSheetByName('Results');
  if (!results) results = ss.insertSheet('Results');
  if (results.getLastRow() === 0) {
    results.appendRow([
      'Timestamp', 'Name', 'Email', 'Phone', 'Course',
      'Score', 'Total', 'Answered', 'Time Taken (sec)',
      'Submission Type', 'Warnings', 'Answers JSON', 'Resume'
    ]);
    results.setFrozenRows(1);
  } else if (results.getLastColumn() === 12) {
    results.getRange(1, 13).setValue('Resume');
  }

  // 2. AnswerKey sheet
  var ak = ss.getSheetByName('AnswerKey');
  if (!ak) ak = ss.insertSheet('AnswerKey');
  if (ak.getLastRow() === 0) {
    ak.appendRow(['id', 'correct']);
    ak.setFrozenRows(1);
  }

  // 3. CodingSessions sheet
  var cs = ss.getSheetByName('CodingSessions');
  if (!cs) cs = ss.insertSheet('CodingSessions');
  if (cs.getLastRow() === 0) {
    cs.appendRow(['Email', 'Course', 'QuestionId', 'StartedAt', 'Status']);
    cs.setFrozenRows(1);
  }

  // 4. CodingResults sheet
  var cr = ss.getSheetByName('CodingResults');
  if (!cr) cr = ss.insertSheet('CodingResults');
  if (cr.getLastRow() === 0) {
    cr.appendRow([
      'Timestamp', 'Name', 'Email', 'Phone', 'Course', 'Language',
      'Test Cases Passed', 'Total Test Cases', 'Coding Marks', 'Max Marks',
      'Submission Type', 'Warnings'
    ]);
    cr.setFrozenRows(1);
  }

  // 5. CodingPending sheet
  var cp = ss.getSheetByName('CodingPending');
  if (!cp) cp = ss.insertSheet('CodingPending');
  if (cp.getLastRow() === 0) {
    cp.appendRow(['Timestamp', 'Name', 'Email', 'Course', 'Language', 'Code', 'Reason']);
    cp.setFrozenRows(1);
  }

  // 6. Resumes sheet
  var rs = ss.getSheetByName('Resumes');
  if (!rs) rs = ss.insertSheet('Resumes');
  if (rs.getLastRow() === 0) {
    rs.appendRow([
      'Timestamp', 'Candidate Name', 'Email', 'Phone', 'Course',
      'Resume File Name', 'File Size', 'Drive Link / View'
    ]);
    rs.setFrozenRows(1);
  }

  Logger.log('All 6 sheets set up successfully.');
}
