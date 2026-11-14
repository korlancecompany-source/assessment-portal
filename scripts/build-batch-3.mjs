import { applyBatch } from './build-batch-1.mjs'

export const batch3Questions = {
  "UI-UX": [
    {
      id: "UIUX-01",
      question: "Which term describes a visual cue that hints at how an interactive interface element should be used?",
      options: {
        A: "Affordance",
        B: "Skeuomorphism",
        C: "Fitts Law",
        D: "Gestalt Closure"
      },
      correct: "A"
    },
    {
      id: "UIUX-02",
      question: "According to WCAG 2.1 Level AA standards, what is the minimum required color contrast ratio for normal body text?",
      options: {
        A: "3 to 1",
        B: "4.5 to 1",
        C: "7 to 1",
        D: "10 to 1"
      },
      correct: "B"
    },
    {
      id: "UIUX-03",
      question: "What is the primary deliverable of an Information Architecture (IA) design phase?",
      options: {
        A: "High-fidelity micro-interaction animations",
        B: "CSS stylesheet token definitions",
        C: "A structured sitemap and taxonomy system",
        D: "Final production code for responsive navigation bars"
      },
      correct: "C"
    },
    {
      id: "UIUX-04",
      question: "In usability evaluation, what does Jakob Nielsen heuristic Visibility of System Status recommend?",
      options: {
        A: "Keeping users informed about what is happening through timely feedback",
        B: "Hiding background process indicators to reduce cognitive load",
        C: "Disabling error alerts so user journeys remain uninterrupted",
        D: "Always showing full technical exception stack traces to users"
      },
      correct: "A"
    },
    {
      id: "UIUX-05",
      question: "What is the main distinction between low-fidelity and high-fidelity wireframes?",
      options: {
        A: "Low-fidelity wireframes contain production vector illustrations while high-fidelity wireframes use sketches",
        B: "Low-fidelity wireframes focus on structural layout without visual styling, while high-fidelity models typography, color, and UI details",
        C: "Low-fidelity wireframes are clickable in production while high-fidelity wireframes are static images",
        D: "Low-fidelity wireframes require database connections while high-fidelity wireframes do not"
      },
      correct: "B"
    },
    {
      id: "UIUX-06",
      question: "Which UX research methodology involves observing users while they speak their thoughts aloud during a workflow?",
      options: {
        A: "Card sorting",
        B: "A/B multivariate split testing",
        C: "Think-aloud protocol usability testing",
        D: "Heatmap click analytics"
      },
      correct: "C"
    },
    {
      id: "UIUX-07",
      question: "According to Fitts Law, which adjustment makes an on-screen target easiest and fastest to click?",
      options: {
        A: "Decreasing the target size and placing it in the screen center",
        B: "Increasing the target distance from the cursor position",
        C: "Hiding the target inside a nested dropdown accordion",
        D: "Increasing the target size and placing it near the cursor or screen edge"
      },
      correct: "D"
    },
    {
      id: "UIUX-08",
      question: "Which Gestalt principle explains why elements positioned close together are perceived as belonging to the same group?",
      options: {
        A: "Law of Proximity",
        B: "Law of Continuity",
        C: "Law of Symmetry",
        D: "Law of Common Fate"
      },
      correct: "A"
    },
    {
      id: "UIUX-09",
      question: "What is the primary purpose of creating user personas during product discovery?",
      options: {
        A: "To compile legal compliance forms for user data collection",
        B: "To represent key user segment motivations, goals, and pain points to guide design decisions",
        C: "To determine backend database indexing strategies",
        D: "To create fictitious marketing employee profiles for internal hiring"
      },
      correct: "B"
    },
    {
      id: "UIUX-10",
      question: "In responsive web design, what does the term mobile-first design signify?",
      options: {
        A: "Refusing to build desktop interfaces for any user group",
        B: "Designing native Android APKs before publishing web domains",
        C: "Designing for the smallest viewport first and progressively enhancing the layout for larger displays",
        D: "Limiting all typography to single-column monospace fonts"
      },
      correct: "C"
    },
    {
      id: "UIUX-11",
      question: "Which research method is specifically used to understand how users mentally categorize information for navigation menu hierarchies?",
      options: {
        A: "First click testing",
        B: "Eye tracking analysis",
        C: "Tree testing",
        D: "Card sorting"
      },
      correct: "D"
    },
    {
      id: "UIUX-12",
      question: "What is microcopy in UI design?",
      options: {
        A: "Short contextual text snippets such as button labels, form field hints, and tooltip descriptions",
        B: "Minified CSS code bundles embedded in SVG icons",
        C: "Legal copyright notices printed at the bottom of terms of service pages",
        D: "Microscopic typography used to hide unwanted tracking disclosures"
      },
      correct: "A"
    },
    {
      id: "UIUX-13",
      question: "In design systems, what are design tokens?",
      options: {
        A: "Encrypted authentication cookies exchanged between Figma and browser sessions",
        B: "Named values for design variables like colors, spacing, and typography that sync across design and code",
        C: "Cryptocurrency vouchers given to usability testing participants",
        D: "Figma plug-in licenses required for team collaboration"
      },
      correct: "B"
    },
    {
      id: "UIUX-14",
      question: "Which UX metric measures the percentage of users who drop off at each successive step in a multi-step workflow?",
      options: {
        A: "Net Promoter Score (NPS)",
        B: "System Usability Scale (SUS)",
        C: "Funnel drop-off rate",
        D: "Single Ease Question (SEQ)"
      },
      correct: "C"
    },
    {
      id: "UIUX-15",
      question: "What does the heuristic Error Prevention suggest as the most user-friendly design approach?",
      options: {
        A: "Showing elaborate error messages after invalid inputs are submitted",
        B: "Preventing errors through confirmation dialogs and sensible constraints before an action occurs",
        C: "Automatically clearing all form inputs whenever an error is encountered",
        D: "Silently ignoring incorrect data and replacing it with random values"
      },
      correct: "B"
    },
    {
      id: "UIUX-16",
      question: "What is an empathy map primarily designed to visualize about a target user?",
      options: {
        A: "Their network latency and device operating system specifications",
        B: "Their financial transactions and credit card limits",
        C: "What they say, think, do, and feel during an experience",
        D: "Their daily screen time spent on third-party competitor apps"
      },
      correct: "C"
    },
    {
      id: "UIUX-17",
      question: "In typographic hierarchy, which element should have the greatest visual weight to guide reading order?",
      options: {
        A: "Footer disclaimer text",
        B: "Form input helper text",
        C: "Secondary body paragraphs",
        D: "Primary page headers (H1)"
      },
      correct: "D"
    },
    {
      id: "UIUX-18",
      question: "What is a major benefit of using an 8pt grid system in UI layouts?",
      options: {
        A: "It provides consistent visual rhythm and simplifies developer handoff across multiple display densities",
        B: "It reduces web page download size by 50 percent",
        C: "It eliminates the need for user testing on mobile screens",
        D: "It forces all vector graphics to render in black and white"
      },
      correct: "A"
    },
    {
      id: "UIUX-19",
      question: "What does the System Usability Scale (SUS) score provide?",
      options: {
        A: "The precise millisecond rendering duration of DOM nodes",
        B: "A standardized composite score from 0 to 100 assessing perceived system usability",
        C: "The total number of bugs filed in the bug tracker during sprint reviews",
        D: "The percentage of code covered by automated Cypress unit tests"
      },
      correct: "B"
    },
    {
      id: "UIUX-20",
      question: "What is the primary role of progressive disclosure in interface design?",
      options: {
        A: "Displaying all available options and settings on the initial landing screen",
        B: "Encrypting form inputs progressively as characters are typed",
        C: "Showing only essential information upfront and revealing advanced details on demand",
        D: "Disclosing user location data to advertisers gradually over time"
      },
      correct: "C"
    }
  ],
  "App Development": [
    {
      id: "AD-01",
      question: "In Android application architecture, which component represents a single screen with a user interface?",
      options: {
        A: "Activity",
        B: "BroadcastReceiver",
        C: "ContentProvider",
        D: "Service"
      },
      correct: "A"
    },
    {
      id: "AD-02",
      question: "In iOS development using UIKit, which lifecycle method is called immediately after a view controller has loaded its view into memory?",
      options: {
        A: "viewWillAppear",
        B: "viewDidLoad",
        C: "viewDidAppear",
        D: "viewWillDisappear"
      },
      correct: "B"
    },
    {
      id: "AD-03",
      question: "What is the primary role of Flutter widget tree in cross-platform development?",
      options: {
        A: "Compiling native Java bytecode directly into Swift code",
        B: "Managing backend database tables and migration files",
        C: "Describing the user interface structure declaratively as a hierarchy of immutable widgets",
        D: "Configuring push notification certificates for the Apple App Store"
      },
      correct: "C"
    },
    {
      id: "AD-04",
      question: "In React Native, how do JavaScript code and native platform components communicate across thread boundaries?",
      options: {
        A: "Direct shared memory pointers without serialization",
        B: "Asynchronous JSON message passing through the React Native bridge or JSI",
        C: "Writing temporary XML files to local disk storage",
        D: "Periodic HTTP REST polling over localhost ports"
      },
      correct: "B"
    },
    {
      id: "AD-05",
      question: "Which local storage solution in Android provides an abstraction layer over SQLite for robust database management?",
      options: {
        A: "Shared Preferences",
        B: "DataStore",
        C: "Room Persistence Library",
        D: "Proto DataStore"
      },
      correct: "C"
    },
    {
      id: "AD-06",
      question: "What happens on Android when an application performs a long-running network request on the main UI thread?",
      options: {
        A: "The operating system automatically moves the task to an idle CPU core",
        B: "The request succeeds faster because the UI thread has highest priority",
        C: "The operating system skips SSL certificate checks",
        D: "A NetworkOnMainThreadException is thrown and the app freezes or crashes with an ANR"
      },
      correct: "D"
    },
    {
      id: "AD-07",
      question: "In modern mobile development, what is the core architectural principle of Model-View-ViewModel (MVVM)?",
      options: {
        A: "Separating UI presentation from business logic where the ViewModel exposes observable state to the View",
        B: "Embedding database SQL queries directly into UI layout XML files",
        C: "Combining the network client and UI views into a single unified class",
        D: "Requiring every button click to trigger an immediate server reboot"
      },
      correct: "A"
    },
    {
      id: "AD-08",
      question: "What is the purpose of declaring runtime permissions in mobile operating systems?",
      options: {
        A: "To increase application download speed from app stores",
        B: "To prompt the user for consent before accessing sensitive resources like camera or location",
        C: "To allow the app to bypass antivirus scanner checks",
        D: "To grant third-party apps read access to root system files"
      },
      correct: "B"
    },
    {
      id: "AD-09",
      question: "Which mechanism allows mobile apps to receive and display notifications even when the app is killed or running in the background?",
      options: {
        A: "Continuous background socket polling on the main UI thread",
        B: "Local cron timers scheduled inside the app memory space",
        C: "Push Notification Services like Firebase Cloud Messaging (FCM) or Apple Push Notification service (APNs)",
        D: "Periodic Bluetooth advertising broadcasts"
      },
      correct: "C"
    },
    {
      id: "AD-10",
      question: "In Android Gradle builds, what is the role of ProGuard or R8?",
      options: {
        A: "Translating Java source files into Objective-C headers",
        B: "Downloading third-party audio and video assets",
        C: "Generating mock API responses for staging tests",
        D: "Shrinking, optimizing, and obfuscating bytecode to reduce APK size and deter reverse engineering"
      },
      correct: "D"
    },
    {
      id: "AD-11",
      question: "What is deep linking in mobile application development?",
      options: {
        A: "A URL mechanism that opens a specific screen or resource directly inside the installed mobile app",
        B: "Linking multiple local SQLite databases together using foreign keys",
        C: "Chaining asynchronous HTTP requests in a promise waterfall",
        D: "Connecting a phone directly to a laptop using a USB debugging cable"
      },
      correct: "A"
    },
    {
      id: "AD-12",
      question: "In iOS development with Swift, what is the purpose of the weak keyword on a delegate reference?",
      options: {
        A: "To downgrade network request security to plain HTTP",
        B: "To prevent strong reference cycles and avoid memory leaks",
        C: "To allow the delegate to be invoked from background threads only",
        D: "To disable compiler type safety warnings for that variable"
      },
      correct: "B"
    },
    {
      id: "AD-13",
      question: "What is the primary benefit of using Jetpack Compose or SwiftUI compared to traditional XML or storyboard layouts?",
      options: {
        A: "They eliminate the need to write unit tests for mobile applications",
        B: "They require manual view hierarchy inflation and explicit tag lookups",
        C: "They offer declarative UI paradigms where views react automatically to underlying state changes",
        D: "They allow mobile applications to run without operating system permissions"
      },
      correct: "C"
    },
    {
      id: "AD-14",
      question: "Which tool is commonly used to inspect network traffic, view logs, and profile memory allocations during Android app development?",
      options: {
        A: "Android Studio Profiler and Logcat",
        B: "Xcode Instruments",
        C: "Wireshark packet capture exclusively",
        D: "Git blame utility"
      },
      correct: "A"
    },
    {
      id: "AD-15",
      question: "What is an Application Not Responding (ANR) error in Android?",
      options: {
        A: "An error triggered when the device loses cellular connection",
        B: "A dialog shown when the main UI thread is blocked for more than 5 seconds without handling input events",
        C: "A warning emitted when an APK contains unsigned native libraries",
        D: "A notification indicating that the user device storage is 100 percent full"
      },
      correct: "B"
    },
    {
      id: "AD-16",
      question: "In mobile caching strategies, what does cache-then-network pattern accomplish?",
      options: {
        A: "It permanently disables network access to save user mobile data",
        B: "It clears all local storage every time the app opens",
        C: "It displays cached data immediately for fast load times and then updates the UI once fresh network data arrives",
        D: "It sends requests to the server twice to ensure consistency"
      },
      correct: "C"
    },
    {
      id: "AD-17",
      question: "What is an Android Keystore used for during production deployment?",
      options: {
        A: "Storing downloaded user assets like images and videos",
        B: "Managing database migration scripts for SQLite",
        C: "Hosting public web URLs for app store listings",
        D: "Securely storing cryptographic keys used to digitally sign the APK or Android App Bundle"
      },
      correct: "D"
    },
    {
      id: "AD-18",
      question: "Which component in Android allows apps to share structured data securely with other applications?",
      options: {
        A: "ContentProvider",
        B: "BroadcastReceiver",
        C: "ForegroundService",
        D: "JobScheduler"
      },
      correct: "A"
    },
    {
      id: "AD-19",
      question: "What is the primary function of an Intent in Android?",
      options: {
        A: "To compile C++ code into shared object libraries",
        B: "An asynchronous messaging object used to request an action from another app component",
        C: "To format JSON payloads returned from RESTful backends",
        D: "To define layout animations using CSS syntax"
      },
      correct: "B"
    },
    {
      id: "AD-20",
      question: "What is the primary difference between a Hot Reload and a Full Restart in Flutter or React Native development?",
      options: {
        A: "Hot Reload compiles the native C++ engine while Full Restart clears Git commits",
        B: "Hot Reload deletes app user preferences while Full Restart keeps device cache",
        C: "Hot Reload injects updated code into the running VM without losing current app state, while Full Restart reloads the entire app from scratch",
        D: "Hot Reload only works on physical iOS hardware while Full Restart works on emulators"
      },
      correct: "C"
    }
  ],
  "Digital Marketing": [
    {
      id: "DM-01",
      question: "In Search Engine Optimization (SEO), what is the primary role of a canonical tag (rel=canonical)?",
      options: {
        A: "To indicate the preferred URL of a page and prevent duplicate content indexing issues",
        B: "To block search engine crawlers from indexing confidential company pages",
        C: "To automatically translate web page text into multiple international languages",
        D: "To track user mouse hover coordinates for paid ad networks"
      },
      correct: "A"
    },
    {
      id: "DM-02",
      question: "What does Click-Through Rate (CTR) measure in digital advertising campaigns?",
      options: {
        A: "The percentage of users who make a purchase after seeing an advertisement",
        B: "The percentage of impressions that resulted in a click (clicks divided by impressions)",
        C: "The cost charged by an ad network for every 1000 page views",
        D: "The speed at which an advertising landing page loads on mobile devices"
      },
      correct: "B"
    },
    {
      id: "DM-03",
      question: "In Google Ads, which factor directly influences the Ad Rank besides maximum bid amount?",
      options: {
        A: "The physical server room temperature of the advertiser",
        B: "The total number of employees listed on the company LinkedIn page",
        C: "Quality Score, which includes expected CTR, ad relevance, and landing page experience",
        D: "The programming language used to build the company website"
      },
      correct: "C"
    },
    {
      id: "DM-04",
      question: "What does Cost Per Acquisition (CPA) calculate in performance marketing?",
      options: {
        A: "The total cost to acquire new domain names from a domain registrar",
        B: "The monthly subscription fee paid for marketing automation tools",
        C: "The total ad spend divided by the number of impressions received",
        D: "The total ad spend divided by the number of successful conversions or customer acquisitions"
      },
      correct: "D"
    },
    {
      id: "DM-05",
      question: "Which file placed in the root directory instructs search engine web crawlers which URLs they can or cannot request?",
      options: {
        A: "robots.txt",
        B: "sitemap.xml",
        C: "manifest.json",
        D: "index.html"
      },
      correct: "A"
    },
    {
      id: "DM-06",
      question: "What is the primary objective of A/B split testing in conversion rate optimization (CRO)?",
      options: {
        A: "To duplicate backend database clusters across two cloud regions",
        B: "To compare two versions of a webpage with one varying element to determine which yields higher conversions",
        C: "To split traffic equally between desktop and mobile native applications",
        D: "To verify whether an email server has valid DKIM and SPF records"
      },
      correct: "B"
    },
    {
      id: "DM-07",
      question: "In Google Analytics 4 (GA4), how is data measurement primarily modeled?",
      options: {
        A: "Around page views and sessions exclusively",
        B: "Around server file system directory trees",
        C: "Around events and parameters capturing user interactions",
        D: "Around raw SQL table transaction logs"
      },
      correct: "C"
    },
    {
      id: "DM-08",
      question: "What do UTM parameters appended to a marketing URL allow marketers to track?",
      options: {
        A: "The client GPU clock speed and memory bus width",
        B: "The specific operating system root certificate fingerprints",
        C: "The password hashes submitted during registration forms",
        D: "The traffic source, medium, campaign name, and content variation driving the visit"
      },
      correct: "D"
    },
    {
      id: "DM-09",
      question: "What does the marketing funnel acronym AIDA stand for?",
      options: {
        A: "Attention, Interest, Desire, Action",
        B: "Analysis, Insight, Design, Architecture",
        C: "Audience, Interaction, Delivery, Assessment",
        D: "Acquisition, Indexing, Deployment, Automation"
      },
      correct: "A"
    },
    {
      id: "DM-10",
      question: "In email marketing, what is a hard bounce?",
      options: {
        A: "An email delayed temporarily due to a full recipient inbox",
        B: "A permanent delivery failure caused by an invalid, non-existent, or blocked email address",
        C: "An email marked as spam by an automated sentiment filter",
        D: "An email opened on a mobile device instead of a desktop client"
      },
      correct: "B"
    },
    {
      id: "DM-11",
      question: "What is retargeting (or remarketing) in digital marketing?",
      options: {
        A: "Deleting inactive subscriber contacts from a mailing list every six months",
        B: "Changing the target demographic keywords of a YouTube channel annually",
        C: "Serving targeted advertisements to users who have previously visited your website or app",
        D: "Migrating marketing assets from Facebook Ads to Google Ads"
      },
      correct: "C"
    },
    {
      id: "DM-12",
      question: "In on-page SEO, why is the HTML title tag considered high priority?",
      options: {
        A: "It provides search engines and users with a concise summary of page topic and appears as the clickable search headline",
        B: "It is required to establish TLS handshake encryption with client browsers",
        C: "It is the only place where CSS animations can be registered",
        D: "It determines the server IP address during DNS resolution"
      },
      correct: "A"
    },
    {
      id: "DM-13",
      question: "What does Return On Ad Spend (ROAS) calculate?",
      options: {
        A: "Total ad spend divided by total clicks received",
        B: "Gross revenue generated from advertising divided by the total advertising spend",
        C: "Net profit margin after subtracting overhead salaries",
        D: "The percentage of ad creative images approved by review teams"
      },
      correct: "B"
    },
    {
      id: "DM-14",
      question: "Which organic marketing strategy focuses on creating, publishing, and distributing valuable, relevant material to attract a clearly defined audience?",
      options: {
        A: "Display banner bidding",
        B: "Pay-Per-Click search auctioning",
        C: "Content Marketing",
        D: "SMS bulk broadcasting"
      },
      correct: "C"
    },
    {
      id: "DM-15",
      question: "In SEO, what is the significance of acquiring high-quality backlinks from authoritative domain sources?",
      options: {
        A: "They allow search engines to bypass paywalls on private corporate blogs",
        B: "They speed up database query execution times on the hosting server",
        C: "They guarantee immediate ranking as the number one result on Google for all keywords",
        D: "They signal trust, relevance, and authority to search engines, boosting organic search visibility"
      },
      correct: "D"
    },
    {
      id: "DM-16",
      question: "What is the primary function of a Meta Description tag in HTML?",
      options: {
        A: "To provide a concise summary snippet displayed underneath the title in search engine results pages",
        B: "To instruct search bots to bypass all image compression checks",
        C: "To store database session identifiers in the browser cookie jar",
        D: "To define media queries for responsive mobile styling"
      },
      correct: "A"
    },
    {
      id: "DM-17",
      question: "What is the key difference between Black Hat SEO and White Hat SEO?",
      options: {
        A: "Black Hat SEO focuses on mobile devices while White Hat SEO focuses on desktop platforms",
        B: "Black Hat SEO uses deceptive manipulative techniques violating search guidelines, while White Hat follows approved search engine best practices",
        C: "Black Hat SEO requires paid Google Ads while White Hat SEO is free",
        D: "Black Hat SEO is used for e-commerce sites while White Hat is used for non-profits"
      },
      correct: "B"
    },
    {
      id: "DM-18",
      question: "In social media advertising, what is lookalike audience targeting?",
      options: {
        A: "Targeting people who have identical first and last names as current customers",
        B: "Targeting users with fake profile accounts created by automated bots",
        C: "Reaching new users whose demographics and online behaviors closely resemble your existing high-value customer base",
        D: "Targeting competitors executive employees with recruiting messages"
      },
      correct: "C"
    },
    {
      id: "DM-19",
      question: "What does churn rate measure in subscription-based digital marketing?",
      options: {
        A: "The speed at which social media comments are responded to by moderators",
        B: "The total number of blog articles published within a 30-day window",
        C: "The cost per thousand ad impressions across third-party display networks",
        D: "The percentage of existing subscribers or customers who cancel or do not renew their service during a given period"
      },
      correct: "D"
    },
    {
      id: "DM-20",
      question: "What is an influencer marketing disclosure requirement mandated by regulatory bodies like the FTC?",
      options: {
        A: "Influencers must clearly and conspicuously disclose material connections or sponsorships (such as using #ad or #sponsored)",
        B: "Influencers must hold an accredited marketing degree before promoting products",
        C: "Influencers must publish the brand source code alongside video reviews",
        D: "Influencers must remit fifty percent of review proceeds directly to consumers"
      },
      correct: "A"
    }
  ],
  "Human Resource": [
    {
      id: "HR-01",
      question: "What is the primary distinction between recruitment and selection in Human Resource Management?",
      options: {
        A: "Recruitment is the process of generating a pool of qualified candidates, while selection is the process of evaluating and choosing the best candidate",
        B: "Recruitment deals with salary disbursement while selection deals with employee discipline",
        C: "Recruitment is managed by legal counsel while selection is handled by finance teams",
        D: "Recruitment is only performed for executive roles while selection is for entry-level roles"
      },
      correct: "A"
    },
    {
      id: "HR-02",
      question: "What is a 360-degree performance appraisal method?",
      options: {
        A: "An annual review conducted exclusively by the company board of directors",
        B: "A performance evaluation gathering feedback from an employee peers, subordinates, supervisors, and self-assessment",
        C: "A test assessing an employee physical health and eye rotation vision",
        D: "A financial audit examining company travel and expense accounts"
      },
      correct: "B"
    },
    {
      id: "HR-03",
      question: "What does the human resources metric employee turnover rate calculate?",
      options: {
        A: "The total revenue generated per full-time employee each fiscal year",
        B: "The average number of days required to complete mandatory cyber safety training",
        C: "The percentage of employees who leave an organization over a specified time period",
        D: "The ratio of male to female employees across leadership positions"
      },
      correct: "C"
    },
    {
      id: "HR-04",
      question: "What is the main objective of conducting a Training Needs Analysis (TNA)?",
      options: {
        A: "To calculate tax withholdings on employee incentive stock options",
        B: "To negotiate lower pricing on conference center catering contracts",
        C: "To identify performance gaps that can be resolved through specific learning and skill development programs",
        D: "To schedule employee annual paid vacation dates across departments"
      },
      correct: "C"
    },
    {
      id: "HR-05",
      question: "What does the acronym SMART stand for in employee goal setting?",
      options: {
        A: "Strategic, Managed, Actionable, Relevant, Timed",
        B: "Specific, Measurable, Achievable, Relevant, Time-bound",
        C: "Standardized, Monitored, Automated, Resilient, Transparent",
        D: "Synchronous, Measured, Adaptable, Rigorous, Tracked"
      },
      correct: "B"
    },
    {
      id: "HR-06",
      question: "Which document defines the duties, responsibilities, reporting relationships, and working conditions of a role?",
      options: {
        A: "Job Specification",
        B: "Employee Timesheet",
        C: "Job Offer Letter",
        D: "Job Description"
      },
      correct: "D"
    },
    {
      id: "HR-07",
      question: "What does a Job Specification primarily detail as opposed to a Job Description?",
      options: {
        A: "The required qualifications, skills, knowledge, and experience needed by a person to perform the role",
        B: "The organizational profit and loss targets for the fiscal year",
        C: "The physical floor plan of the office desk allocation",
        D: "The health insurance premiums deducted from gross salary"
      },
      correct: "A"
    },
    {
      id: "HR-08",
      question: "In compensation management, what is the principle of internal equity?",
      options: {
        A: "Paying employees based on stock market fluctuations",
        B: "Ensuring employees with similar responsibilities and performance are compensated fairly relative to colleagues within the company",
        C: "Paying employees in company cryptocurrency tokens rather than cash",
        D: "Matching competitor salary offers regardless of internal grading scales"
      },
      correct: "B"
    },
    {
      id: "HR-09",
      question: "What is an Employee Assistance Program (EAP)?",
      options: {
        A: "A mandatory overtime scheduling roster for manufacturing plant workers",
        B: "An automated software bot that sends daily inspirational email quotes",
        C: "A confidential work-based program providing professional support and counseling for personal or work-related issues",
        D: "A discount club for buying company branded merchandise"
      },
      correct: "C"
    },
    {
      id: "HR-10",
      question: "What is the primary purpose of an exit interview when an employee resigns?",
      options: {
        A: "To legally prevent the employee from accepting offers at competing firms",
        B: "To renegotiate non-compete clauses and confiscate personal mobile phones",
        C: "To audit the employee personal tax returns from previous years",
        D: "To understand reasons for departure and gather candid feedback to improve organizational retention"
      },
      correct: "D"
    },
    {
      id: "HR-11",
      question: "What is an Applicant Tracking System (ATS)?",
      options: {
        A: "A software application that manages the end-to-end recruitment process, from job postings to candidate screening and resumes",
        B: "A GPS tracker installed in company-owned sales fleet vehicles",
        C: "A biometric fingerprint scanner installed at office entrance turnstiles",
        D: "A payroll module calculating overtime tax rates for hourly workers"
      },
      correct: "A"
    },
    {
      id: "HR-12",
      question: "In performance management, what does the halo effect refer to as a cognitive bias?",
      options: {
        A: "Evaluating an employee poorly based solely on a single recent mistake",
        B: "Allowing a positive impression of one specific trait or achievement to favorably influence the overall rating of an employee",
        C: "Rating all employees strictly as average to avoid internal workplace conflict",
        D: "Giving higher marks to employees who share identical cultural backgrounds"
      },
      correct: "B"
    },
    {
      id: "HR-13",
      question: "What does an onboarding program aim to achieve during a new hire initial weeks?",
      options: {
        A: "Testing whether the new hire can endure unassisted high-stress emergencies without guidance",
        B: "Restricting the new hire access to internal communication channels for sixty days",
        C: "Integrating the new employee into the organizational culture, workflow tools, team dynamics, and compliance expectations",
        D: "Assessing how many sales leads the new employee can generate before formal training"
      },
      correct: "C"
    },
    {
      id: "HR-14",
      question: "What is succession planning in strategic talent management?",
      options: {
        A: "Scheduling consecutive shifts across 24-hour customer support call centers",
        B: "Organizing annual team-building retreats in international resort locations",
        C: "Filing intellectual property patent paperwork with government agencies",
        D: "Identifying and developing internal employees with high potential to fill critical future leadership vacancies"
      },
      correct: "D"
    },
    {
      id: "HR-15",
      question: "Under labor standards, what does the term constructive dismissal signify?",
      options: {
        A: "When an employer creates or permits intolerable working conditions that coerce an employee into resigning",
        B: "When an employee is promoted to a managerial tier with increased responsibilities",
        C: "When an employee voluntarily retires at the official retirement age with full pension",
        D: "When an employer dissolves an entire business unit due to financial bankruptcy"
      },
      correct: "A"
    },
    {
      id: "HR-16",
      question: "What is the primary focus of Human Resource Information Systems (HRIS)?",
      options: {
        A: "Running deep learning computer vision algorithms for factory automation",
        B: "Centralizing and automating HR functions such as payroll, benefits administration, attendance, and employee records",
        C: "Managing public relations campaigns for product launch announcements",
        D: "Designing responsive user interfaces for consumer mobile applications"
      },
      correct: "B"
    },
    {
      id: "HR-17",
      question: "What is emotional intelligence (EQ) in workplace leadership and team collaboration?",
      options: {
        A: "The score achieved on standard mathematical logic and spatial reasoning exams",
        B: "The ability to memorize extensive company policy manuals and employment contracts",
        C: "The capacity to recognize, understand, and constructively manage one own emotions and those of others",
        D: "The speed at which a manager responds to urgent slack messages outside business hours"
      },
      correct: "C"
    },
    {
      id: "HR-18",
      question: "What does the HR term bench strength measure in organizational planning?",
      options: {
        A: "The physical weight-lifting capacity required for warehouse logistics staff",
        B: "The total number of empty office chairs in open-plan corporate work areas",
        C: "The battery lifespan of corporate laptops deployed to remote employees",
        D: "The capability and readiness of internal talent to step into key roles if current occupants depart"
      },
      correct: "D"
    },
    {
      id: "HR-19",
      question: "What is the primary role of a non-disclosure agreement (NDA) signed during employment onboarding?",
      options: {
        A: "To protect proprietary company trade secrets, confidential client data, and business strategies from unauthorized disclosure",
        B: "To prohibit employees from ever joining labor unions or employee welfare associations",
        C: "To prevent employees from discussing their annual personal income tax returns with accountants",
        D: "To transfer employee personal vehicle ownership titles to the corporate leasing pool"
      },
      correct: "A"
    },
    {
      id: "HR-20",
      question: "In conflict resolution, which approach focuses on finding a collaborative solution where both parties achieve their key objectives?",
      options: {
        A: "Avoidance approach",
        B: "Win-Win (Collaborative) approach",
        C: "Authoritative mandate approach",
        D: "Accommodation with surrender approach"
      },
      correct: "B"
    }
  ]
}

if (process.argv[1] && process.argv[1].endsWith('build-batch-3.mjs')) {
  applyBatch(batch3Questions)
}
