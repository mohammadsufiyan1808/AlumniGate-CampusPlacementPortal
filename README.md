TheAlumniGateFinal/
├── Backend/                          # Node.js Backend
│   ├── app.js                        # Main server file
│   ├── cloudConfig.js                # Cloudinary configuration
│   ├── package.json                  # Backend dependencies
│   ├── package-lock.json             # Dependency lock file
│   ├── init/                         # Database initialization
│   │   ├── companies.js              # Company data initialization
│   │   ├── index.js                  # Main initialization file
│   │   └── students.js               # Student data initialization
│   ├── middlewares/                  # Express middlewares
│   │   ├── multer.js                 # File upload middleware
│   │   ├── VerifyAdminToken.js       # Admin token verification
│   │   └── verifyToken.js            # JWT token verification
│   ├── src/                          # Source code
│   │   ├── AdminRoutes/              # Admin-specific routes
│   │   │   ├── adminDetails.js       # Admin details management
│   │   │   ├── companyRoute.js       # Company CRUD operations
│   │   │   ├── evaluateResultsRoute.js # Application evaluation
│   │   │   ├── login.js              # Admin authentication
│   │   │   └── studentRoute.js       # Student management
│   │   ├── models/                   # Database models
│   │   │   ├── admin.js              # Admin model
│   │   │   ├── application.js        # Application model
│   │   │   ├── company.js            # Company model
│   │   │   └── student.js            # Student model
│   │   ├── routes/                   # API routes
│   │   │   ├── admin.js              # Admin routes
│   │   │   ├── applications.js       # Application routes
│   │   │   ├── auth.js               # Authentication routes
│   │   │   ├── companies.js          # Company routes
│   │   │   ├── eligibility.js        # Eligibility check routes
│   │   │   └── profile.js            # Profile management routes
│   │   └── utils/                    # Utility functions
│   │       └── sendEmail.js          # Email service utility
│   └── uploads/                      # File uploads directory
│       └── 1759345983861.pdf         # Example uploaded file
├── Frontend/                         # React Frontend
│   ├── index.html                    # HTML entry point
│   ├── package.json                  # Frontend dependencies
│   ├── package-lock.json             # Dependency lock file
│   ├── vite.config.js                # Vite configuration
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   ├── postcss.config.js             # PostCSS configuration
│   ├── eslint.config.js              # ESLint configuration
│   ├── public/                       # Static assets
│   │   ├── ag logo bw.png            # Application logo (black & white)
│   │   ├── massmutual.png            # MassMutual logo
│   │   ├── vce-logo.svg              # VCE logo (SVG)
│   │   └── vce.png                   # VCE logo (PNG)
│   └── src/                          # Source code
│       ├── App.jsx                   # Main App component
│       ├── App.css                   # Global styles
│       ├── index.css                 # Entry CSS
│       ├── main.jsx                  # React entry point
│       ├── AdminComponents/          # Admin-specific components
│       │   ├── AddCompanyForm.jsx    # Company addition form
│       │   ├── EvaluateResults.jsx   # Application evaluation component
│       │   └── StudentDetails.jsx    # Student details component
│       ├── AdminPages/               # Admin page components
│       │   ├── AdminHome.jsx         # Admin dashboard home
│       │   ├── AdminLogin.jsx        # Admin login page
│       │   └── AdminNavbar.jsx       # Admin navigation bar
│       ├── AdminRoutes/              # Admin route components
│       │   ├── AdminPrivateRoute.jsx # Protected admin routes
│       │   └── AdminPublicRoute.jsx  # Public admin routes
│       ├── components/               # Reusable components
│       │   ├── DarkModeToggle.jsx    # Theme toggle component
│       │   ├── EligibleRoute.jsx     # Eligibility check wrapper
│       │   ├── LightRays.jsx         # Background light rays effect
│       │   ├── MovingCircles.jsx     # Animated background circles
│       │   ├── Navbar.jsx            # Main navigation bar
│       │   ├── PostRegistrationRoute.jsx # Post-registration route wrapper
│       │   ├── PrivateRoute.jsx      # Protected route wrapper
│       │   ├── PublicRoute.jsx       # Public route wrapper
│       │   ├── RegistrationRoute.jsx # Registration route wrapper
│       │   ├── Toast.jsx             # Toast notification component
│       │   ├── ToastContainer.jsx    # Toast container component
│       │   └── TrueFocus.jsx         # Focus management component
│       ├── constants/                # Application constants
│       │   ├── api.js                # API endpoints
│       │   ├── routes.js             # Route definitions
│       │   └── validation.js         # Validation rules
│       ├── context/                  # React Context providers
│       │   ├── AdminAuthContext.js   # Admin authentication context
│       │   ├── AdminAuthProvider.jsx # Admin auth provider
│       │   ├── AuthContext.js        # User authentication context
│       │   ├── AuthProvider.jsx      # Auth provider
│       │   └── ThemeContext.jsx      # Theme management context
│       ├── hooks/                    # Custom React hooks
│       │   ├── useApi.js             # API call hook
│       │   ├── useAuth.js            # Authentication hook
│       │   ├── useLocalStorage.js    # Local storage hook
│       │   ├── useTheme.js           # Theme management hook
│       │   └── useToast.js           # Toast notification hook
│       ├── pages/                    # Page components
│       │   ├── AppliedCompanies.jsx  # Applied companies page
│       │   ├── ApplyPage.jsx         # Company application page
│       │   ├── Auth.jsx              # Login page
│       │   ├── Companies.jsx         # Companies listing page
│       │   ├── CompaniesForYou.jsx   # Personalized companies page
│       │   ├── CompanyDetails.jsx    # Company details page
│       │   ├── Confirmation.jsx      # Application confirmation page
│       │   ├── ForgotPassword.jsx    # Password reset request page
│       │   ├── Home.jsx              # Landing page
│       │   ├── Profile.jsx           # User profile page
│       │   ├── Registration.jsx      # Student registration page
│       │   ├── ResetPassword.jsx     # Password reset page
│       │   ├── Resources.jsx         # Resources hub page
│       │   ├── update-preferences.jsx # Preferences update page
│       │   └── resources/            # Resource pages
│       │       ├── CIVILprep.jsx     # Civil engineering prep
│       │       ├── Commuincation.jsx # Communication skills
│       │       ├── CSEprep.jsx       # Computer science prep
│       │       ├── DSAprep.jsx       # Data structures prep
│       │       ├── DSAprep.module.css # DSA prep styles
│       │       ├── ECEprep.jsx       # Electronics prep
│       │       ├── EEEprep.jsx       # Electrical prep
│       │       ├── HRandTR.jsx       # HR and technical rounds
│       │       ├── HRandTR.module.css # HR styles
│       │       ├── MECHprep.jsx      # Mechanical prep
│       │       ├── Placementprep.jsx # General placement prep
│       │       ├── Placementprep.module.css # Placement prep styles
│       │       ├── Productcomp.jsx   # Product companies info
│       │       ├── Productcomp.module.css # Product comp styles
│       │       ├── Pseudocode.jsx    # Pseudocode guide
│       │       ├── Pseudocode.module.css # Pseudocode styles
│       │       ├── Servicecomp.jsx   # Service companies info
│       │       ├── Servicecomp.module.css # Service comp styles
│       │       ├── Technicalconcepcard.jsx # Technical concepts card
│       │       ├── Technicalconcepcard.module.css # Technical concepts styles
│       │       └── TechnicalConcepts.jsx # Technical concepts page
│       ├── services/                 # API service functions
│       │   ├── api.js                # Base API configuration
│       │   ├── applicationService.js # Application API calls
│       │   ├── authService.js        # Authentication API calls
│       │   ├── companyService.js     # Company API calls
│       │   └── profileService.js     # Profile API calls
│       ├── types/                    # TypeScript type definitions
│       │   └── index.js              # Type definitions
│       ├── utils/                    # Utility functions
│       │   ├── helpers.js            # Helper functions
│       │   ├── storage.js            # Storage utilities
│       │   └── validation.js         # Validation utilities
│       └── assets/                   # Static assets
│           └── react.svg             # React logo
├── CHAT_TRANSCRIPT.txt               # Chat transcript file
├── CHAT_TRANSCRIPT_FULL.txt          # Full chat transcript file
└── README.md                         # Project documentation

