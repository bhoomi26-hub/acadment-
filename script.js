// =========================================================
// Acadment - University Admissions Consultancy
// Main Client Script (script.js)
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
    // ---------------------------------------------------------
    // 1. Core DOM Elements
    // ---------------------------------------------------------
    const navbar = document.getElementById("topNavbar");
    const mobileToggle = document.getElementById("mobileToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");
    const guidanceForm = document.getElementById("guidanceForm");
    const fullNameInput = document.getElementById("fullName");
    const mobileNumberInput = document.getElementById("mobileNumber");
    const emailInput = document.getElementById("emailAddress");
    const studyModeSelect = document.getElementById("studyMode");
    const preferredUnivSelect = document.getElementById("preferredUniversity");
    const preferredCourseSelect = document.getElementById("preferredCourse");
    const studentMessageInput = document.getElementById("studentMessage");
    const enquiryConsentCheckbox = document.getElementById("enquiryConsent");
    const submitBtn = document.getElementById("submitBtn");
    const formAlert = document.getElementById("formAlert");

    // Form Groups (for field error styling)
    const groupFullName = document.getElementById("groupFullName");
    const groupMobileNumber = document.getElementById("groupMobileNumber");
    const groupEmailAddress = document.getElementById("groupEmailAddress");
    const groupStudyMode = document.getElementById("groupStudyMode");
    const groupPreferredUniversity = document.getElementById("groupPreferredUniversity");
    const groupPreferredCourse = document.getElementById("groupPreferredCourse");
    const groupConsent = document.getElementById("groupConsent");

    // University Modal DOM Elements
    const univModalBackdrop = document.getElementById("univModalBackdrop");
    const universityModal = document.getElementById("universityModal");
    const modalCloseBtn = document.getElementById("modalCloseBtn");
    const modalDismissBtn = document.getElementById("modalDismissBtn");
    const modalBackToUnivsBtn = document.getElementById("modalBackToUnivsBtn");
    const modalInquireBtn = document.getElementById("modalInquireBtn");
    const modalUnivOfficialLink = document.getElementById("modalUnivOfficialLink");
    const tabCoursesBtn = document.getElementById("tabCoursesBtn");
    const tabOverviewBtn = document.getElementById("tabOverviewBtn");
    const tabCoursesPanel = document.getElementById("tabCoursesPanel");
    const tabOverviewPanel = document.getElementById("tabOverviewPanel");
    const modalUnivCrest = document.getElementById("modalUnivCrest");
    const modalUnivBadge = document.getElementById("modalUnivBadge");
    const modalUnivTitle = document.getElementById("modalUnivTitle");
    const modalUnivLocation = document.getElementById("modalUnivLocation");
    const modalCoursesList = document.getElementById("modalCoursesList");
    const modalOverviewContent = document.getElementById("modalOverviewContent");

    // Course Discovery & Course Details DOM Elements
    const courseSearchInput = document.getElementById("courseSearchInput");
    const courseSearchClearBtn = document.getElementById("courseSearchClearBtn");
    const courseFilterGroup = document.getElementById("courseFilterGroup");
    const courseUnivFilterGroup = document.getElementById("courseUnivFilterGroup");
    const courseToolbarClearAllBtn = document.getElementById("courseToolbarClearAllBtn");
    const coursesCountDisplay = document.getElementById("coursesCountDisplay");
    const coursesDiscoveryGrid = document.getElementById("coursesDiscoveryGrid");
    const coursesEmptyState = document.getElementById("coursesEmptyState");
    const resetCoursesFilterBtn = document.getElementById("resetCoursesFilterBtn");

    // Course Modal DOM Elements
    const courseModalBackdrop = document.getElementById("courseModalBackdrop");
    const courseDetailsModal = document.getElementById("courseDetailsModal");
    const courseModalCloseBtn = document.getElementById("courseModalCloseBtn");
    const courseModalDismissBtn = document.getElementById("courseModalDismissBtn");
    const courseModalEnquireBtn = document.getElementById("courseModalEnquireBtn");
    const modalCourseIcon = document.getElementById("modalCourseIcon");
    const modalCourseCategoryBadge = document.getElementById("modalCourseCategoryBadge");
    const modalCourseTitle = document.getElementById("modalCourseTitle");
    const modalCourseLevel = document.getElementById("modalCourseLevel");
    const modalCourseDuration = document.getElementById("modalCourseDuration");
    const modalCourseCategoryName = document.getElementById("modalCourseCategoryName");
    const modalCourseOverview = document.getElementById("modalCourseOverview");
    const modalCourseEligibility = document.getElementById("modalCourseEligibility");
    const modalCourseUnivList = document.getElementById("modalCourseUnivList");

    // WhatsApp Direct Integration Elements & Official Number
    const OFFICIAL_WHATSAPP_NUMBER = "916262151178";
    const formWhatsAppBtn = document.getElementById("formWhatsAppBtn");
    const sidebarWhatsAppBtn = document.getElementById("sidebarWhatsAppBtn");
    const modalUnivWhatsAppBtn = document.getElementById("modalUnivWhatsAppBtn");
    const modalCourseWhatsAppBtn = document.getElementById("modalCourseWhatsAppBtn");
    const floatingWhatsAppBtn = document.getElementById("floatingWhatsAppBtn");

    // Helper: Build WhatsApp wa.me URL with contextual prefilled messages
    function buildWhatsAppUrl(univName, courseName) {
        let message = "Hello Acadment Team, I would like admission guidance. Please help me explore suitable universities and courses.";
        const cleanUniv = (univName || "").trim();
        const cleanCourse = (courseName || "").trim();

        if (cleanUniv && cleanCourse) {
            message = `Hello Acadment Team, I would like admission guidance for ${cleanCourse} at ${cleanUniv}. Please help me explore eligibility and admission procedure.`;
        } else if (cleanUniv) {
            message = `Hello Acadment Team, I would like admission guidance for ${cleanUniv}. Please help me explore suitable courses and eligibility.`;
        } else if (cleanCourse) {
            message = `Hello Acadment Team, I would like admission guidance for ${cleanCourse}. Please help me explore suitable universities and eligibility.`;
        }

        return `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    }

    // Helper: Update form and floating WhatsApp button href based on current form inputs
    function updateFormWhatsAppButton() {
        const selectedUniv = preferredUnivSelect ? preferredUnivSelect.value : "";
        const selectedCourse = preferredCourseSelect ? preferredCourseSelect.value : "";
        const url = buildWhatsAppUrl(selectedUniv, selectedCourse);
        if (formWhatsAppBtn) {
            formWhatsAppBtn.href = url;
        }
        if (floatingWhatsAppBtn) {
            floatingWhatsAppBtn.href = url;
        }
    }

    // State Tracking
    let activeUnivKey = "dpu";
    let activeCourseId = null;
    let triggerElementBeforeModal = null;
    let triggerElementBeforeCourseModal = null;
    let currentCategoryFilter = "all";
    let currentUnivFilter = "all";
    let currentSearchTerm = "";
    let isSubmitting = false; // Guard against accidental duplicate submissions

    // ---------------------------------------------------------
    // 2. Verified University Data Dictionary (Neutral & Factual)
    // ---------------------------------------------------------
    const universityData = {
        dpu: {
            id: "dpu",
            fullName: "Dr. D. Y. Patil University",
            subTitle: "Dr. D. Y. Patil Vidyapeeth (Pune & Navi Mumbai)",
            crest: "DPU",
            officialWebsite: "https://dpu.edu.in",
            formSelectValue: "DPU (Dr. D. Y. Patil University)",
            badge: "Deemed-to-be University",
            location: "Pune & Navi Mumbai, Maharashtra",
            primaryCampuses: "Pimpri (Pune) & Nerul (Navi Mumbai)",
            statutoryStatus: "Deemed University under Section 3 of UGC Act, 1956",
            regulatoryBodies: "UGC, NMC, DCI, PCI, AICTE",
            overview: "Dr. D. Y. Patil University (Dr. D. Y. Patil Vidyapeeth) is an established deemed-to-be university recognized for its comprehensive health science complexes, specialized tertiary teaching hospitals, modern biotechnology research infrastructure, and global management pedagogy.",
            keyPillars: [
                "Extensive clinical training infrastructure including tertiary teaching hospitals supporting medical, dental, and allied health sciences.",
                "Advanced research centers dedicated to biotechnology, genomics, and bioinformatics innovations.",
                "Structured management faculty offering specialized tracks in Hospital & Healthcare Management.",
                "Modern multi-campus academic ecosystem featuring advanced simulation suites and digital resource centers."
            ],
            streams: [
                {
                    category: "Medicine, Health & Allied Sciences",
                    badge: "Health Sciences",
                    degrees: [
                        "MBBS (Bachelor of Medicine & Bachelor of Surgery)",
                        "BDS (Bachelor of Dental Surgery)",
                        "MD / MS (Medical Postgraduate Specializations)",
                        "B.Sc Nursing & Post Basic B.Sc Nursing",
                        "BPT (Bachelor of Physiotherapy) & MPT",
                        "B.Pharm & M.Pharm (Pharmaceutical Sciences)"
                    ]
                },
                {
                    category: "Biotechnology & Bioinformatics",
                    badge: "Biotech",
                    degrees: [
                        "B.Tech in Biotechnology",
                        "B.Tech in Bioinformatics",
                        "M.Tech in Biotechnology",
                        "M.Sc in Biotechnology & Applied Sciences"
                    ]
                },
                {
                    category: "Management & Business Studies",
                    badge: "Management",
                    degrees: [
                        "BBA (Bachelor of Business Administration)",
                        "MBA in Hospital & Healthcare Management",
                        "MBA in Marketing, Finance, and Human Resource Management"
                    ]
                },
                {
                    category: "Design & Allied Programs",
                    badge: "Allied",
                    degrees: [
                        "B.Des (Bachelor of Design)",
                        "Allied Health Science Diplomas & Certifications"
                    ]
                }
            ]
        },
        amity: {
            id: "amity",
            fullName: "Amity University",
            subTitle: "Noida (Main Campus), Gurugram & Pan-India",
            crest: "AU",
            officialWebsite: "https://www.amity.edu",
            formSelectValue: "Amity University",
            badge: "Multi-Disciplinary University",
            location: "Noida, Uttar Pradesh & Pan-India Campuses",
            primaryCampuses: "Noida (Main Campus), Gurugram, Lucknow, Jaipur, Mumbai",
            statutoryStatus: "State Legislature Act; Recognized under Section 2(f) of UGC Act",
            regulatoryBodies: "UGC, AICTE, BCI, Council of Architecture",
            overview: "Amity University is a major multi-disciplinary private university established through state legislation, featuring cutting-edge campus facilities, corporate linkages, interdisciplinary credit frameworks, and an extensive array of undergraduate and postgraduate degree programs.",
            keyPillars: [
                "Comprehensive high-tech research centers equipped with computational clusters, robotics facilities, and incubation hubs.",
                "Choice-based credit curricula allowing students to pursue interdisciplinary minors alongside core degrees.",
                "International collaboration networks facilitating global educational exposure and semester-abroad options.",
                "Extensive campus amenities including modern law moot courts, engineering workshops, and digital libraries."
            ],
            streams: [
                {
                    category: "Engineering & Applied Technology",
                    badge: "Engineering",
                    degrees: [
                        "B.Tech in Computer Science & Engineering",
                        "B.Tech in Artificial Intelligence & Machine Learning",
                        "B.Tech in Electronics & Communication Engineering",
                        "B.Tech in Mechanical & Aerospace Engineering",
                        "M.Tech in Advanced Computer Sciences & System Engineering"
                    ]
                },
                {
                    category: "Business, Management & Commerce",
                    badge: "Business",
                    degrees: [
                        "BBA (General & International Business Pathways)",
                        "MBA (Marketing, Finance, HR, and Digital Transformation)",
                        "B.Com (Honours) & M.Com"
                    ]
                },
                {
                    category: "Computer Applications & IT",
                    badge: "Computing",
                    degrees: [
                        "BCA (Bachelor of Computer Applications)",
                        "MCA (Master of Computer Applications)",
                        "B.Sc in Information Technology"
                    ]
                },
                {
                    category: "Law, Media & Applied Humanities",
                    badge: "Law & Arts",
                    degrees: [
                        "BA LLB (Hons) & BBA LLB (Hons) (BCI Approved)",
                        "LLM (Master of Laws in Corporate & Cyber Law)",
                        "BA in Journalism & Mass Communication",
                        "BA / B.Sc in Applied Psychology"
                    ]
                }
            ]
        },
        manipal: {
            id: "manipal",
            fullName: "Manipal Academy of Higher Education (MAHE)",
            subTitle: "Manipal (Main Campus), Mangaluru & Bengaluru",
            crest: "MU",
            officialWebsite: "https://manipal.edu",
            formSelectValue: "Manipal University",
            badge: "Institution of Eminence",
            location: "Manipal, Mangaluru & Bengaluru, Karnataka",
            primaryCampuses: "Manipal (Main Campus), Mangaluru, Bengaluru, Jamshedpur",
            statutoryStatus: "Deemed University; Formally Designated Institution of Eminence (IoE)",
            regulatoryBodies: "UGC, Ministry of Education (IoE), NMC, DCI, PCI, AICTE",
            overview: "Manipal Academy of Higher Education (MAHE) is an internationally acknowledged Institution of Eminence celebrated for more than seven decades of academic excellence, research output, world-class engineering, and acclaimed health sciences institutions.",
            keyPillars: [
                "Declared an Institution of Eminence (IoE) by the Ministry of Education, Government of India.",
                "Home to landmark constituent units including Kasturba Medical College (KMC) and Manipal Institute of Technology (MIT).",
                "High research output and citation impact across clinical, biomedical, and technological disciplines.",
                "Cosmopolitan residential campus community hosting students and researchers from over 60 nations."
            ],
            streams: [
                {
                    category: "Engineering & Applied Technology (MIT Manipal)",
                    badge: "MIT Manipal",
                    degrees: [
                        "B.Tech in Computer Science & Engineering",
                        "B.Tech in Data Science & Artificial Intelligence",
                        "B.Tech in Aeronautical & Mechanical Engineering",
                        "B.Tech in Mechatronics, Civil & Electrical Engineering",
                        "M.Tech across Specialized Engineering Disciplines"
                    ]
                },
                {
                    category: "Health, Medicine & Pharmacy (KMC & MCOPS)",
                    badge: "Health Sciences",
                    degrees: [
                        "MBBS (Kasturba Medical College, Manipal & Mangaluru)",
                        "BDS (Manipal College of Dental Sciences)",
                        "B.Pharm & Pharm.D (Doctor of Pharmacy)",
                        "Master of Public Health (MPH)",
                        "B.Sc & M.Sc in Allied Health Sciences"
                    ]
                },
                {
                    category: "Management, Commerce & Humanities",
                    badge: "Commerce",
                    degrees: [
                        "BBA (Bachelor of Business Administration)",
                        "MBA (TAPMI & Department of Commerce)",
                        "B.Com (Professional & Accounting Tracks)"
                    ]
                },
                {
                    category: "Media, Design & Architecture",
                    badge: "Creative Arts",
                    degrees: [
                        "BA in Media & Communication",
                        "B.Arch (Bachelor of Architecture)",
                        "B.Des in Interior & Industrial Design"
                    ]
                }
            ]
        },
        ipu: {
            id: "ipu",
            fullName: "Guru Gobind Singh Indraprastha University",
            subTitle: "GGSIPU (Dwarka & East Delhi Campus)",
            crest: "IPU",
            officialWebsite: "http://www.ipu.ac.in",
            formSelectValue: "IPU (Guru Gobind Singh Indraprastha University)",
            badge: "State University (Delhi Govt.)",
            location: "Dwarka & East Delhi Campus, New Delhi",
            primaryCampuses: "Dwarka Sector 16-C (Main Campus) & Surajmal Vihar (East Delhi Campus)",
            statutoryStatus: "Public State University established by Govt. of NCT of Delhi (1998)",
            regulatoryBodies: "UGC, AICTE, BCI, NCTE",
            overview: "Guru Gobind Singh Indraprastha University (GGSIPU) is a premier public state teaching-cum-affiliating university in New Delhi, established by the Delhi Government to foster professional, technical, management, and legal higher education.",
            keyPillars: [
                "Administers specialized on-campus University Schools of Studies alongside an established network of affiliated professional colleges across Delhi-NCR.",
                "Admissions organized through centralized counseling based on national entrance examinations (JEE Main, CUET, NEET, CLAT, NIMCET) and institutional CETs.",
                "High public demand for technical and professional curricula, experienced faculty, and regulated fee structures.",
                "Modern dual campuses in Dwarka and Surajmal Vihar (East Delhi) featuring state-of-the-art academic blocks and computing clusters."
            ],
            streams: [
                {
                    category: "Engineering & Applied Technology",
                    badge: "Engineering",
                    degrees: [
                        "B.Tech in Computer Science & Engineering (USICT & Affiliated)",
                        "B.Tech in Information Technology",
                        "B.Tech in Electronics & Communication Engineering",
                        "B.Tech in Artificial Intelligence & Data Science",
                        "M.Tech in Information Technology & Robotics"
                    ]
                },
                {
                    category: "Computer Applications & Software",
                    badge: "Computing",
                    degrees: [
                        "BCA (Bachelor of Computer Applications)",
                        "MCA (Master of Computer Applications - USICT & Affiliated)"
                    ]
                },
                {
                    category: "Management, Commerce & Business",
                    badge: "Management",
                    degrees: [
                        "BBA (General, Banking & Insurance, Computer Aided)",
                        "MBA (Financial Analysis, Analytics, International Business)",
                        "B.Com (Honours)"
                    ]
                },
                {
                    category: "Law, Education & Media Studies",
                    badge: "Law & Arts",
                    degrees: [
                        "BA LLB (Integrated) & BBA LLB (Integrated - USLLS)",
                        "LLM (Master of Laws)",
                        "BA in Journalism & Mass Communication (BJMC)",
                        "B.Ed (Bachelor of Education)"
                    ]
                }
            ]
        }
    };

    // ---------------------------------------------------------
    // 3. Verified Courses Catalog (With Officially Verified Associations)
    // ---------------------------------------------------------
    const courseData = [
        // --- ENGINEERING ---
        {
            id: "btech-cse",
            name: "B.Tech in Computer Science & Engineering",
            category: "engineering",
            categoryLabel: "Engineering",
            streamSelectValue: "Engineering & Technology",
            duration: "4 Years (8 Semesters)",
            level: "Undergraduate Degree",
            shortDesc: "Foundational software architecture, algorithm design, computational theory, operating systems, and computer networks.",
            overview: "The Bachelor of Technology in Computer Science & Engineering is an intensive four-year engineering program delivering foundational mastery in programming languages, data structures, computer networks, and full-stack software development. Prepares students for roles in software development, cloud infrastructure, and technical consulting.",
            eligibility: "Passed 10+2 examination with Physics and Mathematics as compulsory subjects, along with Chemistry or Computer Science, securing minimum qualifying percentage as mandated by AICTE/university regulations. Qualification in JEE Main or relevant university entrance test.",
            universities: [
                { univId: "amity", name: "Amity University", isOffered: true, note: "Offered across Noida, Gurugram, Lucknow, and regional engineering campuses." },
                { univId: "manipal", name: "Manipal University", isOffered: true, note: "Flagship program offered at Manipal Institute of Technology (MIT Manipal) and Bengaluru campus." },
                { univId: "ipu", name: "IPU (GGSIPU)", isOffered: true, note: "Offered at USICT and leading affiliated engineering institutes via JEE Main counseling." },
                { univId: "dpu", name: "Dr. D. Y. Patil University", isOffered: false, note: "Not offered as general CSE. DPU specializes in B.Tech Biotechnology and Bioinformatics. Please confirm with the university." }
            ]
        },
        {
            id: "btech-biotech",
            name: "B.Tech in Biotechnology",
            category: "engineering",
            categoryLabel: "Engineering",
            streamSelectValue: "Engineering & Technology",
            duration: "4 Years (8 Semesters)",
            level: "Undergraduate Degree",
            shortDesc: "Integrates biological science principles with genetic engineering, bioprocess development, and pharmaceutical biotechnology.",
            overview: "A specialized interdisciplinary engineering program that combines principles of molecular biology, biochemistry, genetic engineering, and bioprocess technology. Focuses on biopharmaceutical development, clinical diagnostics, and agricultural biotechnology.",
            eligibility: "Passed 10+2 with Physics and Chemistry along with Biology or Mathematics from a recognized educational board with prescribed minimum aggregate marks.",
            universities: [
                { univId: "dpu", name: "Dr. D. Y. Patil University", isOffered: true, note: "Offered at Dr. D. Y. Patil Biotechnology & Bioinformatics Institute (DPUBBI, Pune)." },
                { univId: "amity", name: "Amity University", isOffered: true, note: "Offered at Amity Institute of Biotechnology." },
                { univId: "manipal", name: "Manipal University", isOffered: true, note: "Offered by the Department of Biotechnology, MIT Manipal." },
                { univId: "ipu", name: "IPU (GGSIPU)", isOffered: true, note: "Offered via University School of Biotechnology (USBT, Dwarka campus). Please confirm seat allocation." }
            ]
        },
        {
            id: "btech-ai-ds",
            name: "B.Tech in Artificial Intelligence & Data Science",
            category: "engineering",
            categoryLabel: "Engineering",
            streamSelectValue: "Engineering & Technology",
            duration: "4 Years (8 Semesters)",
            level: "Undergraduate Degree",
            shortDesc: "Focuses on predictive statistical modeling, neural networks, machine learning algorithms, and massive data processing pipelines.",
            overview: "An advanced specialized computing curriculum delivering deep expertise in mathematical statistics, machine learning algorithms, deep neural networks, and scalable cloud data pipelines for modern data-driven industries.",
            eligibility: "Passed 10+2 with Physics and Mathematics as compulsory subjects; qualified in relevant engineering entrance examinations as per AICTE/university norms.",
            universities: [
                { univId: "amity", name: "Amity University", isOffered: true, note: "Offered under specialized computing pathways at Amity School of Engineering & Technology." },
                { univId: "manipal", name: "Manipal University", isOffered: true, note: "Offered at MIT Manipal and Bengaluru campus." },
                { univId: "ipu", name: "IPU (GGSIPU)", isOffered: true, note: "Offered at USICT and top affiliated engineering institutions." },
                { univId: "dpu", name: "Dr. D. Y. Patil University", isOffered: false, note: "Please confirm specialized computing offerings with the university." }
            ]
        },
        {
            id: "mtech-eng",
            name: "M.Tech in Advanced Engineering Disciplines",
            category: "engineering",
            categoryLabel: "Engineering",
            streamSelectValue: "Engineering & Technology",
            duration: "2 Years (4 Semesters)",
            level: "Postgraduate Degree",
            shortDesc: "Advanced postgraduate engineering research, system modeling, and specialized technical problem-solving.",
            overview: "Master of Technology program designed for engineering graduates seeking specialized domain research, advanced simulations, and technological leadership in specialized branches.",
            eligibility: "Passed B.E. / B.Tech or equivalent in relevant branch from a recognized university with minimum required marks; GATE or institutional test score as applicable.",
            universities: [
                { univId: "dpu", name: "Dr. D. Y. Patil University", isOffered: true, note: "Offered with specialization in Biotechnology at DPU Pune." },
                { univId: "amity", name: "Amity University", isOffered: true, note: "Offered in computer science, electronics, and environmental engineering." },
                { univId: "manipal", name: "Manipal University", isOffered: true, note: "Offered across multiple specialized engineering streams at MIT Manipal." },
                { univId: "ipu", name: "IPU (GGSIPU)", isOffered: true, note: "Offered at USICT and constituent technical schools." }
            ]
        },

        // --- MANAGEMENT ---
        {
            id: "mba-general",
            name: "MBA (Master of Business Administration)",
            category: "management",
            categoryLabel: "Management",
            streamSelectValue: "Management & Business Studies",
            duration: "2 Years (4 Semesters)",
            level: "Postgraduate Degree",
            shortDesc: "Postgraduate corporate leadership, financial analytics, strategic planning, marketing management, and organizational dynamics.",
            overview: "A comprehensive management degree delivering functional mastery in business strategy, financial analysis, marketing management, human resources, and operations for modern enterprise leadership.",
            eligibility: "Bachelor's degree of minimum 3 years duration in any discipline from a recognized university with minimum aggregate marks (typically 50% for general, 45% for reserved categories). Valid score in national management aptitude tests (CAT, MAT, CMAT, XAT) or university entrance test.",
            universities: [
                { univId: "dpu", name: "Dr. D. Y. Patil University", isOffered: true, note: "Offered at Global Business School & Research Centre, Pune." },
                { univId: "amity", name: "Amity University", isOffered: true, note: "Offered at Amity Business School with multiple functional specializations." },
                { univId: "manipal", name: "Manipal University", isOffered: true, note: "Offered at T. A. Pai Management Institute (TAPMI) and Department of Commerce." },
                { univId: "ipu", name: "IPU (GGSIPU)", isOffered: true, note: "Offered at University School of Management Studies (USMS) and premier affiliated management institutes." }
            ]
        },
        {
            id: "bba-general",
            name: "BBA (Bachelor of Business Administration)",
            category: "management",
            categoryLabel: "Management",
            streamSelectValue: "Management & Business Studies",
            duration: "3 Years (6 Semesters)",
            level: "Undergraduate Degree",
            shortDesc: "Foundational business administration, principles of management, business economics, and marketing practices.",
            overview: "An undergraduate degree focused on commercial operations, business decision-making, accounting practices, organizational behavior, and modern corporate fundamentals.",
            eligibility: "Passed 10+2 examination in any stream (Science, Commerce, or Arts) from a recognized board with minimum aggregate percentage as prescribed by the university.",
            universities: [
                { univId: "dpu", name: "Dr. D. Y. Patil University", isOffered: true, note: "Offered at DPU Pune campus." },
                { univId: "amity", name: "Amity University", isOffered: true, note: "Offered at Amity University campuses nationwide." },
                { univId: "manipal", name: "Manipal University", isOffered: true, note: "Offered at Manipal campus and Bengaluru campus." },
                { univId: "ipu", name: "IPU (GGSIPU)", isOffered: true, note: "Offered across university schools and major affiliated colleges via GGSIPU CET / CUET." }
            ]
        },
        {
            id: "mba-healthcare",
            name: "MBA in Hospital & Healthcare Management",
            category: "management",
            categoryLabel: "Management",
            streamSelectValue: "Management & Business Studies",
            duration: "2 Years (4 Semesters)",
            level: "Postgraduate Degree",
            shortDesc: "Tailored management education for hospital systems, clinical quality accreditation, healthcare policy, and health insurance.",
            overview: "Specialized postgraduate program designed to develop qualified administrative leaders for hospital networks, clinical diagnostic enterprises, medical tourism, and public health systems.",
            eligibility: "Graduation in any discipline from a recognized university. Candidates with background in MBBS, BDS, Nursing, Pharmacy, Physiotherapy, or Allied Health Sciences often receive specialized preference as per university criteria.",
            universities: [
                { univId: "dpu", name: "Dr. D. Y. Patil University", isOffered: true, note: "Flagship specialized program at Dr. D. Y. Patil University, backed by tertiary research hospital infrastructure." },
                { univId: "amity", name: "Amity University", isOffered: true, note: "Offered under specialized healthcare administration electives." },
                { univId: "manipal", name: "Manipal University", isOffered: true, note: "Offered via Prasanna School of Public Health (PSPH Manipal)." },
                { univId: "ipu", name: "IPU (GGSIPU)", isOffered: false, note: "Please confirm with the university for specific affiliated college seat availability." }
            ]
        },
        {
            id: "bcom-hons",
            name: "B.Com (Honours)",
            category: "management",
            categoryLabel: "Management",
            streamSelectValue: "Management & Business Studies",
            duration: "3 Years (6 Semesters)",
            level: "Undergraduate Degree",
            shortDesc: "Rigorous commerce curriculum encompassing corporate financial accounting, taxation law, auditing, and financial markets.",
            overview: "Bachelor of Commerce (Honours) provides in-depth analytical training in corporate financial accounting, cost management, direct and indirect taxation, business law, and capital markets.",
            eligibility: "Passed 10+2 examination with Commerce or Mathematics subjects from a recognized educational board with required minimum marks.",
            universities: [
                { univId: "amity", name: "Amity University", isOffered: true, note: "Offered at Amity School of Commerce." },
                { univId: "manipal", name: "Manipal University", isOffered: true, note: "Offered at Department of Commerce, MAHE Manipal." },
                { univId: "ipu", name: "IPU (GGSIPU)", isOffered: true, note: "Offered extensively across leading affiliated commerce institutes in Delhi-NCR." },
                { univId: "dpu", name: "Dr. D. Y. Patil University", isOffered: false, note: "Please confirm with the university." }
            ]
        },

        // --- COMPUTER APPLICATIONS ---
        {
            id: "bca",
            name: "BCA (Bachelor of Computer Applications)",
            category: "computer-applications",
            categoryLabel: "Computer Applications",
            streamSelectValue: "Computer Applications & IT",
            duration: "3 Years (6 Semesters)",
            level: "Undergraduate Degree",
            shortDesc: "Software programming, relational databases, web development, data structures, and operating system basics.",
            overview: "A foundational computing degree preparing students for software application engineering, database administration, full-stack web development, and cloud computing roles.",
            eligibility: "Passed 10+2 examination from a recognized board with Mathematics, Computer Science, or Information Practices preferred or required as per individual university criteria.",
            universities: [
                { univId: "amity", name: "Amity University", isOffered: true, note: "Offered at Amity Institute of Information Technology." },
                { univId: "manipal", name: "Manipal University", isOffered: true, note: "Offered at Department of Computer Applications, MAHE Manipal." },
                { univId: "ipu", name: "IPU (GGSIPU)", isOffered: true, note: "One of the most widely enrolled programs across top affiliated institutes of GGSIPU in Delhi-NCR via CET." },
                { univId: "dpu", name: "Dr. D. Y. Patil University", isOffered: false, note: "Not offered as standard BCA. DPU focuses on specialized engineering/biotech. Please confirm with the university." }
            ]
        },
        {
            id: "mca",
            name: "MCA (Master of Computer Applications)",
            category: "computer-applications",
            categoryLabel: "Computer Applications",
            streamSelectValue: "Computer Applications & IT",
            duration: "2 Years (4 Semesters)",
            level: "Postgraduate Degree",
            shortDesc: "Advanced software engineering, distributed computing, cloud deployment, and secure application architecture.",
            overview: "Two-year postgraduate degree designed to produce high-level software architects, system analysts, and technology consultants through rigorous exposure to advanced algorithms and enterprise software design.",
            eligibility: "Passed BCA / Bachelor's degree in Computer Science or equivalent, or passed B.Sc / B.Com / B.A. with Mathematics at 10+2 or graduation level (with bridge courses as per AICTE guidelines). NIMCET or university CET qualification.",
            universities: [
                { univId: "amity", name: "Amity University", isOffered: true, note: "Offered at Amity Institute of Information Technology." },
                { univId: "manipal", name: "Manipal University", isOffered: true, note: "Offered at Department of Computer Applications, MAHE Manipal." },
                { univId: "ipu", name: "IPU (GGSIPU)", isOffered: true, note: "Offered at USICT and leading affiliated colleges through NIMCET and centralized counseling." },
                { univId: "dpu", name: "Dr. D. Y. Patil University", isOffered: false, note: "Please confirm with the university." }
            ]
        },
        {
            id: "bsc-it",
            name: "B.Sc in Information Technology",
            category: "computer-applications",
            categoryLabel: "Computer Applications",
            streamSelectValue: "Computer Applications & IT",
            duration: "3 Years (6 Semesters)",
            level: "Undergraduate Degree",
            shortDesc: "Network architecture, systems administration, internet security, and server-side scripting.",
            overview: "A science-grounded technical program focusing on the deployment, configuration, and security of computer networks, database servers, and modern communications software.",
            eligibility: "Passed 10+2 examination with Science / Mathematics from a recognized board.",
            universities: [
                { univId: "amity", name: "Amity University", isOffered: true, note: "Offered at Amity Institute of Information Technology." },
                { univId: "manipal", name: "Manipal University", isOffered: true, note: "Offered at MAHE constituent schools." },
                { univId: "ipu", name: "IPU (GGSIPU)", isOffered: false, note: "Please confirm with the university for specific affiliated college availability." },
                { univId: "dpu", name: "Dr. D. Y. Patil University", isOffered: false, note: "Please confirm with the university." }
            ]
        },

        // --- HEALTHCARE ---
        {
            id: "mbbs",
            name: "MBBS (Bachelor of Medicine & Bachelor of Surgery)",
            category: "healthcare",
            categoryLabel: "Healthcare",
            streamSelectValue: "Healthcare & Allied Sciences",
            duration: "4.5 Years academic study + 1 Year mandatory rotating internship (Total 5.5 Years)",
            level: "Professional Medical Degree",
            shortDesc: "Primary medical qualification recognized by the National Medical Commission (NMC) covering clinical medicine, surgery, and human anatomy.",
            overview: "The premier undergraduate medical qualification in India, preparing registered medical practitioners in pre-clinical, para-clinical, and clinical medical specialties through extensive hospital ward training.",
            eligibility: "Passed 10+2 examination with Physics, Chemistry, Biology/Biotechnology and English with minimum 50% marks (40% for reserved categories). Mandatory qualification in the National Eligibility cum Entrance Test (NEET-UG) and centralized MCC/state counseling.",
            universities: [
                { univId: "dpu", name: "Dr. D. Y. Patil University", isOffered: true, note: "Offered at Dr. D. Y. Patil Medical College, Hospital & Research Centre, Pune & Navi Mumbai." },
                { univId: "manipal", name: "Manipal University", isOffered: true, note: "Offered at Kasturba Medical College (KMC Manipal & KMC Mangaluru) through NEET-UG counseling." },
                { univId: "ipu", name: "IPU (GGSIPU)", isOffered: true, note: "Offered through premier affiliated government medical colleges (VMMC, ABVIMS, Dr. BSA) via MCC/state NEET counseling." },
                { univId: "amity", name: "Amity University", isOffered: false, note: "Amity does not currently operate an on-campus NMC-recognized medical college for MBBS. Please confirm with the university." }
            ]
        },
        {
            id: "bds",
            name: "BDS (Bachelor of Dental Surgery)",
            category: "healthcare",
            categoryLabel: "Healthcare",
            streamSelectValue: "Healthcare & Allied Sciences",
            duration: "4 Years academic study + 1 Year mandatory rotatory internship (Total 5 Years)",
            level: "Professional Dental Degree",
            shortDesc: "Comprehensive dental surgical education, oral pathology, maxillofacial therapy, and restorative prosthodontics.",
            overview: "A recognized professional healthcare qualification under the Dental Council of India (DCI), providing thorough clinical and laboratory instruction in oral surgery, periodontics, and dental hygiene.",
            eligibility: "Passed 10+2 with Physics, Chemistry, Biology and English from a recognized board; mandatory qualification in NEET-UG.",
            universities: [
                { univId: "dpu", name: "Dr. D. Y. Patil University", isOffered: true, note: "Offered at Dr. D. Y. Patil Dental College & Hospital (Pune & Navi Mumbai)." },
                { univId: "manipal", name: "Manipal University", isOffered: true, note: "Offered at Manipal College of Dental Sciences (MCODS Manipal & Mangaluru)." },
                { univId: "ipu", name: "IPU (GGSIPU)", isOffered: true, note: "Offered at affiliated dental institutions through centralized NEET counseling." },
                { univId: "amity", name: "Amity University", isOffered: false, note: "Please confirm with the university." }
            ]
        },
        {
            id: "bsc-nursing",
            name: "B.Sc Nursing",
            category: "healthcare",
            categoryLabel: "Healthcare",
            streamSelectValue: "Healthcare & Allied Sciences",
            duration: "4 Years",
            level: "Undergraduate Degree",
            shortDesc: "Patient-centered healthcare delivery, medical-surgical nursing, maternal health, and clinical pharmacology.",
            overview: "A four-year degree recognized by the Indian Nursing Council (INC), developing skilled nursing professionals capable of managing hospital intensive care units, emergency care, and community healthcare initiatives.",
            eligibility: "Passed 10+2 with Physics, Chemistry, Biology and English with minimum 45% aggregate marks from a recognized board. Qualification in NEET-UG or state/university nursing entrance examination as mandated.",
            universities: [
                { univId: "dpu", name: "Dr. D. Y. Patil University", isOffered: true, note: "Offered at Dr. D. Y. Patil College of Nursing, Pune." },
                { univId: "amity", name: "Amity University", isOffered: true, note: "Offered at Amity College of Nursing (Gurugram campus)." },
                { univId: "manipal", name: "Manipal University", isOffered: true, note: "Offered at Manipal College of Nursing (MCON Manipal)." },
                { univId: "ipu", name: "IPU (GGSIPU)", isOffered: true, note: "Offered across top affiliated nursing colleges in Delhi-NCR via GGSIPU CET / NEET." }
            ]
        },
        {
            id: "bpharm",
            name: "B.Pharm (Bachelor of Pharmacy)",
            category: "healthcare",
            categoryLabel: "Healthcare",
            streamSelectValue: "Healthcare & Allied Sciences",
            duration: "4 Years (8 Semesters)",
            level: "Undergraduate Degree",
            shortDesc: "Pharmaceutical drug design, pharmacology, pharmaceutical analysis, quality control, and clinical dosage systems.",
            overview: "Four-year professional degree recognized by the Pharmacy Council of India (PCI), preparing graduates for careers in drug discovery, pharmaceutical manufacturing, regulatory affairs, and community pharmacy.",
            eligibility: "Passed 10+2 examination with Physics and Chemistry as compulsory subjects along with Mathematics or Biology from a recognized board as per PCI guidelines.",
            universities: [
                { univId: "dpu", name: "Dr. D. Y. Patil University", isOffered: true, note: "Offered at Dr. D. Y. Patil College of Pharmacy, Pune." },
                { univId: "amity", name: "Amity University", isOffered: true, note: "Offered at Amity Institute of Pharmacy." },
                { univId: "manipal", name: "Manipal University", isOffered: true, note: "Offered at Manipal College of Pharmaceutical Sciences (MCOPS Manipal)." },
                { univId: "ipu", name: "IPU (GGSIPU)", isOffered: true, note: "Offered in affiliated pharmaceutical institutes. Please confirm with the university." }
            ]
        },
        {
            id: "bpt",
            name: "Bachelor of Physiotherapy (BPT)",
            category: "healthcare",
            categoryLabel: "Healthcare",
            streamSelectValue: "Healthcare & Allied Sciences",
            duration: "4 Years of academic study + 6 Months compulsory clinical internship (Total 4.5 Years)",
            level: "Undergraduate Professional Degree",
            shortDesc: "Physical rehabilitation science, musculoskeletal physiotherapy, biomechanics, and neurological recovery therapy.",
            overview: "A comprehensive clinical rehabilitation program instructing students in biomechanics, manual therapy, sports rehabilitation, neurological physiotherapy, and post-surgical recovery techniques.",
            eligibility: "Passed 10+2 examination with Physics, Chemistry, and Biology from a recognized board with minimum required aggregate marks.",
            universities: [
                { univId: "dpu", name: "Dr. D. Y. Patil University", isOffered: true, note: "Offered at Dr. D. Y. Patil College of Physiotherapy, Pune." },
                { univId: "amity", name: "Amity University", isOffered: true, note: "Offered at Amity Institute of Physiotherapy." },
                { univId: "manipal", name: "Manipal University", isOffered: true, note: "Offered at Manipal College of Health Professions (MCHP Manipal)." },
                { univId: "ipu", name: "IPU (GGSIPU)", isOffered: true, note: "Offered at affiliated physiotherapy colleges across Delhi-NCR." }
            ]
        }
    ];

    // ---------------------------------------------------------
    // 4. University Modal Rendering & Management
    // ---------------------------------------------------------
    function renderModalContent(univKey) {
        const data = universityData[univKey];
        if (!data) return;

        activeUnivKey = univKey;

        if (modalUnivCrest) modalUnivCrest.textContent = data.crest;
        if (modalUnivBadge) modalUnivBadge.textContent = data.badge;
        if (modalUnivTitle) modalUnivTitle.textContent = data.fullName;
        if (modalUnivLocation) modalUnivLocation.textContent = data.location;

        // Verified Official Portal Link
        if (modalUnivOfficialLink && data.officialWebsite) {
            modalUnivOfficialLink.href = data.officialWebsite;
            modalUnivOfficialLink.setAttribute("aria-label", `Visit verified official portal for ${data.fullName}`);
        }

        // Contextual WhatsApp button for this university
        if (modalUnivWhatsAppBtn) {
            modalUnivWhatsAppBtn.href = buildWhatsAppUrl(data.fullName, "");
            modalUnivWhatsAppBtn.setAttribute("aria-label", `Enquire on WhatsApp for ${data.fullName}`);
        }

        if (modalCoursesList) {
            // Find verified degree offerings for this specific university from the catalog
            const verifiedDegreeOfferings = courseData.filter(c => 
                c.universities.some(u => u.univId === univKey && u.isOffered)
            );

            const verifiedOfferingsHtml = verifiedDegreeOfferings.length > 0 ? `
                <div class="stream-group-card" style="grid-column: 1 / -1; background-color: var(--navy-50); border: 1px solid rgba(197, 155, 39, 0.35);">
                    <div class="stream-group-header">
                        <h4 class="stream-group-title" style="color: var(--navy-950);">Officially Verified Degree Programs & Criteria</h4>
                        <span class="stream-group-badge" style="background-color: var(--gold-100); color: var(--gold-700);">${verifiedDegreeOfferings.length} Programs Verified</span>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;">
                        ${verifiedDegreeOfferings.map(c => {
                            const uEntry = c.universities.find(u => u.univId === univKey);
                            return `
                                <div style="background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 12px 14px;">
                                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 4px; flex-wrap: wrap;">
                                        <strong style="color: var(--navy-950); font-size: 0.92rem;">${escapeHtml(c.name)}</strong>
                                        <span style="font-size: 0.74rem; font-weight: 700; background: var(--bg-surface-alt); padding: 2px 8px; border-radius: 4px; color: var(--navy-850); border: 1px solid var(--border-light);">${escapeHtml(c.duration)}</span>
                                    </div>
                                    <p style="font-size: 0.82rem; color: var(--text-body); margin-bottom: 4px;"><strong>Verified Eligibility:</strong> ${escapeHtml(c.eligibility)}</p>
                                    ${uEntry && uEntry.note ? `<p style="font-size: 0.78rem; color: var(--text-muted); font-style: italic; margin-bottom: 0;"><strong>Campus Offering Note:</strong> ${escapeHtml(uEntry.note)}</p>` : ''}
                                </div>
                            `;
                        }).join("")}
                    </div>
                </div>
            ` : '';

            const streamsHtml = data.streams.map(stream => `
                <div class="stream-group-card">
                    <div class="stream-group-header">
                        <h4 class="stream-group-title">${escapeHtml(stream.category)}</h4>
                        <span class="stream-group-badge">${escapeHtml(stream.badge)}</span>
                    </div>
                    <ul class="stream-degree-list">
                        ${stream.degrees.map(deg => `
                            <li class="stream-degree-item">
                                <span class="stream-bullet">›</span>
                                <span>${escapeHtml(deg)}</span>
                            </li>
                        `).join("")}
                    </ul>
                </div>
            `).join("");

            modalCoursesList.innerHTML = verifiedOfferingsHtml + streamsHtml;
        }

        if (modalOverviewContent) {
            // Find verified degree offerings for this specific university from the catalog
            const verifiedDegreeOfferings = courseData.filter(c => 
                c.universities.some(u => u.univId === univKey && u.isOffered)
            );

            modalOverviewContent.innerHTML = `
                <div class="overview-meta-grid">
                    <div class="overview-meta-card">
                        <span class="meta-card-label">Primary Campuses</span>
                        <span class="meta-card-value">${escapeHtml(data.primaryCampuses)}</span>
                    </div>
                    <div class="overview-meta-card">
                        <span class="meta-card-label">Statutory Status</span>
                        <span class="meta-card-value">${escapeHtml(data.statutoryStatus)}</span>
                    </div>
                </div>

                <div class="overview-narrative-card">
                    <h4>Institutional Overview</h4>
                    <p>${escapeHtml(data.overview)}</p>
                    <p style="margin-bottom: 0;"><strong>Regulatory Recognition:</strong> Approved and compliant with regulatory bodies including ${escapeHtml(data.regulatoryBodies)}.</p>
                </div>

                <div class="overview-narrative-card">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
                        <h4 style="margin: 0;">Available Courses Verified Against Official Sources</h4>
                        <span class="stream-group-badge" style="background-color: var(--gold-100); color: var(--gold-700); font-weight: 700;">${verifiedDegreeOfferings.length} Programs Verified</span>
                    </div>
                    <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 12px;">Verified degree offerings with official durations, statutory eligibility, and campus offering notes:</p>
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        ${verifiedDegreeOfferings.map(c => {
                            const uEntry = c.universities.find(u => u.univId === univKey);
                            return `
                                <div style="background: var(--bg-surface-alt); border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 12px 14px;">
                                    <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 8px; margin-bottom: 4px; flex-wrap: wrap;">
                                        <strong style="color: var(--navy-950); font-size: 0.92rem;">${escapeHtml(c.name)}</strong>
                                        <span style="font-size: 0.76rem; font-weight: 700; background: var(--bg-surface); padding: 2px 8px; border-radius: 4px; color: var(--navy-850); border: 1px solid var(--border-light);">${escapeHtml(c.duration)}</span>
                                    </div>
                                    <p style="font-size: 0.84rem; color: var(--text-body); margin: 0 0 4px 0;"><strong>Verified Eligibility:</strong> ${escapeHtml(c.eligibility)}</p>
                                    ${uEntry && uEntry.note ? `<p style="font-size: 0.78rem; color: var(--text-muted); font-style: italic; margin: 0;"><strong>Campus Offering:</strong> ${escapeHtml(uEntry.note)}</p>` : ''}
                                </div>
                            `;
                        }).join("")}
                    </div>
                </div>

                <div class="overview-narrative-card">
                    <h4>Key Academic &amp; Infrastructure Highlights</h4>
                    <ul class="overview-pillars-list">
                        ${data.keyPillars.map(pillar => `
                            <li class="overview-pillar-item">
                                <span>✓</span>
                                <span>${escapeHtml(pillar)}</span>
                            </li>
                        `).join("")}
                    </ul>
                </div>
            `;
        }
    }

    function switchModalTab(tabName) {
        if (tabName === "courses") {
            tabCoursesBtn.classList.add("active");
            tabCoursesBtn.setAttribute("aria-selected", "true");
            tabCoursesPanel.removeAttribute("hidden");
            tabCoursesPanel.classList.add("active");

            tabOverviewBtn.classList.remove("active");
            tabOverviewBtn.setAttribute("aria-selected", "false");
            tabOverviewPanel.setAttribute("hidden", "");
            tabOverviewPanel.classList.remove("active");
        } else if (tabName === "overview") {
            tabOverviewBtn.classList.add("active");
            tabOverviewBtn.setAttribute("aria-selected", "true");
            tabOverviewPanel.removeAttribute("hidden");
            tabOverviewPanel.classList.add("active");

            tabCoursesBtn.classList.remove("active");
            tabCoursesBtn.setAttribute("aria-selected", "false");
            tabCoursesPanel.setAttribute("hidden", "");
            tabCoursesPanel.classList.remove("active");
        }
    }

    function openModal(univKey, initialTab, triggerEl) {
        triggerElementBeforeModal = triggerEl;
        renderModalContent(univKey);
        switchModalTab(initialTab);

        if (univModalBackdrop) {
            univModalBackdrop.classList.add("is-open");
            univModalBackdrop.setAttribute("aria-hidden", "false");
            document.body.classList.add("modal-open");

            setTimeout(() => {
                if (modalCloseBtn) modalCloseBtn.focus();
            }, 100);
        }
    }

    function closeModal() {
        if (univModalBackdrop) {
            univModalBackdrop.classList.remove("is-open");
            univModalBackdrop.setAttribute("aria-hidden", "true");
            document.body.classList.remove("modal-open");

            if (triggerElementBeforeModal && typeof triggerElementBeforeModal.focus === "function") {
                triggerElementBeforeModal.focus();
                triggerElementBeforeModal = null;
            }
        }
    }

    if (tabCoursesBtn) {
        tabCoursesBtn.addEventListener("click", () => switchModalTab("courses"));
    }
    if (tabOverviewBtn) {
        tabOverviewBtn.addEventListener("click", () => switchModalTab("overview"));
    }
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener("click", closeModal);
    }
    if (modalDismissBtn) {
        modalDismissBtn.addEventListener("click", closeModal);
    }
    if (modalBackToUnivsBtn) {
        modalBackToUnivsBtn.addEventListener("click", () => {
            closeModal();
            const universitiesSec = document.getElementById("universities");
            if (universitiesSec) {
                universitiesSec.scrollIntoView({ behavior: "smooth" });
            }
        });
    }
    if (univModalBackdrop) {
        univModalBackdrop.addEventListener("click", (e) => {
            if (e.target === univModalBackdrop) closeModal();
        });
    }

    if (modalInquireBtn) {
        modalInquireBtn.addEventListener("click", () => {
            closeModal();
            preselectUniversity(activeUnivKey);

            if (studentMessageInput && studentMessageInput.value.trim() === "") {
                const uData = universityData[activeUnivKey];
                const uName = uData ? uData.fullName : "your university";
                studentMessageInput.value = `I am interested in admission opportunities and eligibility guidance for ${uName}.`;
            }

            scrollToContact();
        });
    }

    // ---------------------------------------------------------
    // 5. Course Discovery: Rendering, Search & Category Filters
    // ---------------------------------------------------------
    function renderCourses() {
        if (!coursesDiscoveryGrid) return;

        const query = currentSearchTerm.trim().toLowerCase();

        // Filter courses matching active category, university, and search term
        const filtered = courseData.filter(course => {
            const matchesCategory = (currentCategoryFilter === "all" || course.category === currentCategoryFilter);
            const matchesSearch = query === "" || 
                course.name.toLowerCase().includes(query) || 
                course.shortDesc.toLowerCase().includes(query) || 
                course.categoryLabel.toLowerCase().includes(query) ||
                course.id.toLowerCase().includes(query) ||
                course.overview.toLowerCase().includes(query) ||
                (course.universities && course.universities.some(u => u.isOffered && (u.name.toLowerCase().includes(query) || u.univId.toLowerCase() === query)));
            const matchesUniv = (currentUnivFilter === "all" ||
                course.universities.some(u => u.univId === currentUnivFilter && u.isOffered));

            return matchesCategory && matchesSearch && matchesUniv;
        });

        // Toggle clear button on search input
        if (courseSearchClearBtn) {
            courseSearchClearBtn.style.display = query.length > 0 ? "flex" : "none";
        }

        // Update count indicator
        if (coursesCountDisplay) {
            const categoryText = currentCategoryFilter === "all" 
                ? "All Categories" 
                : courseFilterGroup.querySelector(`[data-category="${currentCategoryFilter}"]`)?.textContent.trim() || "";
            
            let univText = "";
            if (currentUnivFilter !== "all" && courseUnivFilterGroup) {
                const uBtn = courseUnivFilterGroup.querySelector(`[data-univ="${currentUnivFilter}"]`);
                if (uBtn) univText = ` • ${uBtn.textContent.trim()}`;
            }

            const countLabel = filtered.length === 1 ? "1 Course" : `${filtered.length} Courses`;
            coursesCountDisplay.textContent = query 
                ? `Showing ${countLabel} matching "${currentSearchTerm}" (${categoryText}${univText})`
                : `Showing ${countLabel} in ${categoryText}${univText}`;
        }

        // Render Cards or Empty State
        if (filtered.length === 0) {
            coursesDiscoveryGrid.innerHTML = "";
            coursesDiscoveryGrid.style.display = "none";
            if (coursesEmptyState) {
                coursesEmptyState.style.display = "block";
                const emptyMsg = coursesEmptyState.querySelector("p");
                if (emptyMsg) {
                    emptyMsg.textContent = "No verified courses matched your search, category, or university filter. Try clearing your filters or switching to another university or category.";
                }
            }
            return;
        }

        if (coursesEmptyState) coursesEmptyState.style.display = "none";
        coursesDiscoveryGrid.style.display = "grid";

        coursesDiscoveryGrid.innerHTML = filtered.map(course => {
            // Find verified partner universities for chips
            const verifiedUnivChips = course.universities
                .filter(u => u.isOffered)
                .map(u => `<span class="univ-avail-chip">${escapeHtml(u.name.split(" ")[0])}</span>`)
                .join("");

            return `
                <article class="course-card-item" data-course-id="${escapeHtml(course.id)}">
                    <div class="course-card-header">
                        <span class="course-category-badge badge-${escapeHtml(course.category)}">
                            ${escapeHtml(course.categoryLabel)}
                        </span>
                        <span class="course-duration-chip">${escapeHtml(course.duration.split(" ")[0])} ${escapeHtml(course.duration.split(" ")[1])}</span>
                    </div>

                    <h3 class="course-card-title">${escapeHtml(course.name)}</h3>
                    <p class="course-card-desc">${escapeHtml(course.shortDesc)}</p>

                    <div class="course-card-univs">
                        <span class="card-univs-label">Verified Availability:</span>
                        <div class="card-univs-chips">
                            ${verifiedUnivChips || '<span class="univ-avail-chip">Confirm with Univ</span>'}
                        </div>
                    </div>

                    <div class="course-card-actions">
                        <button type="button" class="btn btn-course-details" data-course-id="${escapeHtml(course.id)}" aria-haspopup="dialog" aria-controls="courseDetailsModal" aria-label="View verified details for ${escapeHtml(course.name)}">
                            <span>View Details</span>
                            <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                            </svg>
                        </button>
                        <button type="button" class="btn btn-course-enquire" data-course-id="${escapeHtml(course.id)}" aria-label="Enquire for ${escapeHtml(course.name)}">
                            <span>Enquire</span>
                            <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor">
                                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                            </svg>
                        </button>
                        <a href="${buildWhatsAppUrl(currentUnivFilter !== 'all' ? (universityData[currentUnivFilter]?.fullName || '') : '', course.name)}" target="_blank" rel="noopener noreferrer" class="btn btn-course-whatsapp" aria-label="Enquire on WhatsApp for ${escapeHtml(course.name)}" title="Enquire on WhatsApp for ${escapeHtml(course.name)}">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                                <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.476-.15-.677.15-.201.3-.777.98-.953 1.18-.175.2-.351.226-.652.075s-1.272-.469-2.424-1.496c-.896-.799-1.501-1.786-1.677-2.087-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.201-.301.301-.502.1-.2.05-.376-.025-.527s-.677-1.632-.928-2.235c-.244-.587-.493-.507-.677-.517-.175-.01-.376-.01-.577-.01s-.527.075-.803.376c-.276.301-1.054 1.029-1.054 2.509s1.079 2.91 1.23 3.111c.15.201 2.122 3.24 5.141 4.544.718.31 1.278.495 1.716.634.721.229 1.377.197 1.895.12.578-.087 1.782-.728 2.032-1.431.251-.703.251-1.305.176-1.431-.076-.126-.276-.201-.577-.351zM12.042 21.844c-1.777 0-3.518-.478-5.044-1.385l-.361-.215-3.75.983 1.001-3.655-.235-.375a10.02 10.02 0 0 1-1.537-5.35c0-5.545 4.512-10.057 10.057-10.057 2.686 0 5.21 1.047 7.109 2.946a10.007 10.007 0 0 1 2.946 7.111c0 5.545-4.512 10.057-10.057 10.057zm8.532-18.589A12.01 12.01 0 0 0 12.042.844C5.468.844.119 6.193.119 12.767c0 2.099.549 4.148 1.593 5.962L0 24.086l5.509-1.445a12.054 12.054 0 0 0 5.612 1.393h.005c6.574 0 11.923-5.349 11.923-11.923 0-3.187-1.241-6.182-3.475-8.416z"/>
                            </svg>
                            <span>WhatsApp</span>
                        </a>
                    </div>
                </article>
            `;
        }).join("");
    }

    // Search Input Real-Time Listener
    if (courseSearchInput) {
        courseSearchInput.addEventListener("input", (e) => {
            currentSearchTerm = e.target.value;
            renderCourses();
        });
    }

    // Search Clear Button Listener
    if (courseSearchClearBtn) {
        courseSearchClearBtn.addEventListener("click", () => {
            currentSearchTerm = "";
            courseSearchInput.value = "";
            courseSearchInput.focus();
            renderCourses();
        });
    }

    // Category Filter Buttons & Popular Category Pills Listener
    if (courseFilterGroup) {
        courseFilterGroup.addEventListener("click", (e) => {
            const btn = e.target.closest(".course-filter-btn") || e.target.closest(".pop-cat-btn");
            if (!btn) return;

            courseFilterGroup.querySelectorAll(".course-filter-btn, .pop-cat-btn").forEach(b => {
                b.classList.remove("active");
                b.setAttribute("aria-selected", "false");
            });

            btn.classList.add("active");
            btn.setAttribute("aria-selected", "true");

            currentCategoryFilter = btn.getAttribute("data-category") || "all";
            const catSelect = document.getElementById("courseCategorySelect");
            if (catSelect) catSelect.value = currentCategoryFilter;
            renderCourses();
        });
    }

    // Category Select Dropdown Listener
    const courseCategorySelect = document.getElementById("courseCategorySelect");
    if (courseCategorySelect) {
        courseCategorySelect.addEventListener("change", (e) => {
            currentCategoryFilter = e.target.value;
            if (courseFilterGroup) {
                courseFilterGroup.querySelectorAll(".course-filter-btn, .pop-cat-btn").forEach(b => {
                    const match = (b.getAttribute("data-category") || "all") === currentCategoryFilter;
                    b.classList.toggle("active", match);
                    b.setAttribute("aria-selected", match ? "true" : "false");
                });
            }
            renderCourses();
        });
    }

    // University Select Dropdown Listener
    const courseUnivSelect = document.getElementById("courseUnivSelect");
    if (courseUnivSelect) {
        courseUnivSelect.addEventListener("change", (e) => {
            currentUnivFilter = e.target.value;
            renderCourses();
        });
    }

    // Search Button Listener
    const courseSearchBtn = document.getElementById("courseSearchBtn");
    if (courseSearchBtn && courseSearchInput) {
        courseSearchBtn.addEventListener("click", () => {
            currentSearchTerm = courseSearchInput.value;
            renderCourses();
        });
    }

    // Floating Universities Card Click-to-Scroll Listener
    document.querySelectorAll("[data-univ-scroll]").forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const univKey = item.getAttribute("data-univ-scroll");
            const targetCard = document.getElementById("univCard-" + univKey);
            if (targetCard) {
                targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
                targetCard.classList.add("card-highlight");
                setTimeout(() => targetCard.classList.remove("card-highlight"), 1800);
            }
        });
    });

    // University Filter Buttons Listener
    if (courseUnivFilterGroup) {
        courseUnivFilterGroup.addEventListener("click", (e) => {
            const btn = e.target.closest(".course-univ-filter-btn");
            if (!btn) return;

            courseUnivFilterGroup.querySelectorAll(".course-univ-filter-btn").forEach(b => {
                b.classList.remove("active");
                b.setAttribute("aria-selected", "false");
            });

            btn.classList.add("active");
            btn.setAttribute("aria-selected", "true");

            currentUnivFilter = btn.getAttribute("data-univ") || "all";
            if (courseUnivSelect) courseUnivSelect.value = currentUnivFilter;
            renderCourses();
        });
    }

    // Clear All Filters Handler (Search, Category & University)
    function clearAllCourseFilters() {
        currentSearchTerm = "";
        currentCategoryFilter = "all";
        currentUnivFilter = "all";

        if (courseSearchInput) {
            courseSearchInput.value = "";
        }

        if (courseCategorySelect) {
            courseCategorySelect.value = "all";
        }

        if (courseUnivSelect) {
            courseUnivSelect.value = "all";
        }

        if (courseFilterGroup) {
            courseFilterGroup.querySelectorAll(".course-filter-btn, .pop-cat-btn").forEach(b => {
                const isAll = b.getAttribute("data-category") === "all";
                b.classList.toggle("active", isAll);
                b.setAttribute("aria-selected", isAll ? "true" : "false");
            });
        }

        if (courseUnivFilterGroup) {
            courseUnivFilterGroup.querySelectorAll(".course-univ-filter-btn").forEach(b => {
                const isAll = b.getAttribute("data-univ") === "all";
                b.classList.toggle("active", isAll);
                b.setAttribute("aria-selected", isAll ? "true" : "false");
            });
        }

        renderCourses();
    }

    if (courseToolbarClearAllBtn) {
        courseToolbarClearAllBtn.addEventListener("click", clearAllCourseFilters);
    }

    // Reset Filters Button Listener (inside Empty State)
    if (resetCoursesFilterBtn) {
        resetCoursesFilterBtn.addEventListener("click", clearAllCourseFilters);
    }

    // ---------------------------------------------------------
    // 6. Course Details Modal (Accessible Dialog)
    // ---------------------------------------------------------
    function openCourseModal(courseId, triggerEl) {
        const course = courseData.find(c => c.id === courseId);
        if (!course) return;

        activeCourseId = courseId;
        triggerElementBeforeCourseModal = triggerEl;

        // Populate Modal Fields
        if (modalCourseCategoryBadge) {
            modalCourseCategoryBadge.textContent = course.categoryLabel;
            modalCourseCategoryBadge.className = `modal-badge badge-${course.category}`;
        }
        if (modalCourseTitle) modalCourseTitle.textContent = course.name;
        if (modalCourseLevel) modalCourseLevel.textContent = course.level;
        if (modalCourseDuration) modalCourseDuration.textContent = course.duration;
        if (modalCourseCategoryName) modalCourseCategoryName.textContent = course.categoryLabel;
        if (modalCourseOverview) modalCourseOverview.textContent = course.overview;
        if (modalCourseEligibility) modalCourseEligibility.textContent = course.eligibility;

        // Render University Availability List
        if (modalCourseUnivList) {
            modalCourseUnivList.innerHTML = course.universities.map(u => `
                <div class="course-univ-item ${u.isOffered ? 'is-offered' : 'not-offered'}">
                    <div class="univ-item-info">
                        <span class="univ-item-name">${escapeHtml(u.name)}</span>
                        <span class="univ-item-note">${escapeHtml(u.note)}</span>
                    </div>
                    <span class="univ-status-tag ${u.isOffered ? 'verified' : 'unverified'}">
                        ${u.isOffered ? '✓ Verified' : 'Confirm'}
                    </span>
                </div>
            `).join("");
        }

        // Update Course Modal WhatsApp button with prefilled message
        if (modalCourseWhatsAppBtn) {
            let targetUnivName = "";
            if (currentUnivFilter !== "all" && universityData[currentUnivFilter]) {
                targetUnivName = universityData[currentUnivFilter].fullName;
            } else if (course.universities) {
                const offeredUnivs = course.universities.filter(u => u.isOffered);
                if (offeredUnivs.length === 1) {
                    targetUnivName = offeredUnivs[0].name;
                }
            }
            modalCourseWhatsAppBtn.href = buildWhatsAppUrl(targetUnivName, course.name);
        }

        // Open Modal
        if (courseModalBackdrop) {
            courseModalBackdrop.classList.add("is-open");
            courseModalBackdrop.setAttribute("aria-hidden", "false");
            document.body.classList.add("modal-open");

            setTimeout(() => {
                if (courseModalCloseBtn) courseModalCloseBtn.focus();
            }, 100);
        }
    }

    function closeCourseModal() {
        if (courseModalBackdrop) {
            courseModalBackdrop.classList.remove("is-open");
            courseModalBackdrop.setAttribute("aria-hidden", "true");
            document.body.classList.remove("modal-open");

            if (triggerElementBeforeCourseModal && typeof triggerElementBeforeCourseModal.focus === "function") {
                triggerElementBeforeCourseModal.focus();
                triggerElementBeforeCourseModal = null;
            }
        }
    }

    // Event Delegation for Course Card Actions ("View Details" and "Enquire")
    if (coursesDiscoveryGrid) {
        coursesDiscoveryGrid.addEventListener("click", (e) => {
            const detailsBtn = e.target.closest(".btn-course-details");
            const enquireBtn = e.target.closest(".btn-course-enquire");

            if (detailsBtn) {
                e.preventDefault();
                const courseId = detailsBtn.getAttribute("data-course-id");
                openCourseModal(courseId, detailsBtn);
            } else if (enquireBtn) {
                e.preventDefault();
                const courseId = enquireBtn.getAttribute("data-course-id");
                const course = courseData.find(c => c.id === courseId);
                if (course) {
                    preselectCourse(course.name);

                    // Preselect university: prioritize current university filter or single offered university
                    if (currentUnivFilter !== "all") {
                        preselectUniversity(currentUnivFilter);
                    } else if (course.universities) {
                        const offeredUnivs = course.universities.filter(u => u.isOffered);
                        if (offeredUnivs.length === 1) {
                            preselectUniversity(offeredUnivs[0].univId);
                        }
                    }

                    if (studentMessageInput && studentMessageInput.value.trim() === "") {
                        studentMessageInput.value = `I would like free admission guidance regarding ${course.name}.`;
                    }

                    scrollToContact();
                }
            }
        });
    }

    // Course Modal Close Handlers
    if (courseModalCloseBtn) {
        courseModalCloseBtn.addEventListener("click", closeCourseModal);
    }
    if (courseModalDismissBtn) {
        courseModalDismissBtn.addEventListener("click", closeCourseModal);
    }
    if (courseModalBackdrop) {
        courseModalBackdrop.addEventListener("click", (e) => {
            if (e.target === courseModalBackdrop) closeCourseModal();
        });
    }

    // Course Modal "Enquire Now" Button Listener
    if (courseModalEnquireBtn) {
        courseModalEnquireBtn.addEventListener("click", () => {
            const course = courseData.find(c => c.id === activeCourseId);
            closeCourseModal();

            if (course) {
                // Preselect Course
                preselectCourse(course.name);

                // If course has verified university offerings, preselect relevant university
                if (course.universities) {
                    const offeredUnivs = course.universities.filter(u => u.isOffered);
                    if (offeredUnivs.length === 1) {
                        preselectUniversity(offeredUnivs[0].univId);
                    } else if (currentUnivFilter !== "all" && offeredUnivs.some(u => u.univId === currentUnivFilter)) {
                        preselectUniversity(currentUnivFilter);
                    } else if (activeUnivKey) {
                        const currentUnivOffers = offeredUnivs.find(u => u.univId === activeUnivKey);
                        if (currentUnivOffers) {
                            preselectUniversity(activeUnivKey);
                        }
                    }
                }

                // Fill enquiry message context if empty
                if (studentMessageInput && studentMessageInput.value.trim() === "") {
                    studentMessageInput.value = `I would like free admission guidance regarding ${course.name}.`;
                }
            }

            scrollToContact();
        });
    }

    // Initial render of courses catalog
    renderCourses();

    // ---------------------------------------------------------
    // 7. Global Keyboard Accessibility
    // ---------------------------------------------------------
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (univModalBackdrop && univModalBackdrop.classList.contains("is-open")) {
                closeModal();
            }
            if (courseModalBackdrop && courseModalBackdrop.classList.contains("is-open")) {
                closeCourseModal();
            }
        }
    });

    // ---------------------------------------------------------
    // 8. University Card Buttons Event Delegation
    // ---------------------------------------------------------
    const universitiesSection = document.getElementById("universities");
    if (universitiesSection) {
        universitiesSection.addEventListener("click", (e) => {
            const coursesBtn = e.target.closest(".btn-card-courses");
            const exploreBtn = e.target.closest(".btn-card-explore, .btn-card-details");
            const enquireBtn = e.target.closest(".btn-card-enquire");
            const card = e.target.closest(".university-card");

            if (coursesBtn) {
                e.preventDefault();
                const univKey = coursesBtn.getAttribute("data-univ") || "dpu";
                openModal(univKey, "courses", coursesBtn);
            } else if (exploreBtn) {
                e.preventDefault();
                const univKey = exploreBtn.getAttribute("data-univ") || "dpu";
                openModal(univKey, "overview", exploreBtn);
            } else if (enquireBtn) {
                e.preventDefault();
                const univKey = enquireBtn.getAttribute("data-univ") || "dpu";
                preselectUniversity(univKey);

                if (studentMessageInput && studentMessageInput.value.trim() === "") {
                    const uData = universityData[univKey];
                    const uName = uData ? uData.fullName : "your university";
                    studentMessageInput.value = `I would like admission guidance for ${uName}.`;
                }

                scrollToContact();
            } else if (card && !e.target.closest("a")) {
                // Clicking anywhere on the university card opens the factual overview
                const univKey = card.getAttribute("data-univ-id") || "dpu";
                openModal(univKey, "overview", card);
            }
        });
    }

    // ---------------------------------------------------------
    // 9. Mobile Menu Toggle
    // ---------------------------------------------------------
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("is-open");
            mobileToggle.classList.toggle("is-active", isOpen);
            mobileToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        navMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("is-open");
                mobileToggle.classList.remove("is-active");
                mobileToggle.setAttribute("aria-expanded", "false");
            });
        });

        document.addEventListener("click", (event) => {
            if (!navMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
                navMenu.classList.remove("is-open");
                mobileToggle.classList.remove("is-active");
                mobileToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    // ---------------------------------------------------------
    // 10. Navbar Elevation on Scroll
    // ---------------------------------------------------------
    const handleNavbarScroll = () => {
        if (window.scrollY > 20) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    };
    window.addEventListener("scroll", handleNavbarScroll, { passive: true });
    handleNavbarScroll();

    // ---------------------------------------------------------
    // 11. Active Nav Link Highlighting on Scroll (Intersection Observer)
    // ---------------------------------------------------------
    const sections = document.querySelectorAll("section[id]");
    if ("IntersectionObserver" in window && sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: "-25% 0px -65% 0px",
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");
                    navLinks.forEach((link) => {
                        const href = link.getAttribute("href");
                        if (href === `#${id}`) {
                            link.classList.add("active");
                        } else {
                            link.classList.remove("active");
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach((section) => sectionObserver.observe(section));
    }

    // ---------------------------------------------------------
    // 12. Helper Navigation & Preselection Utilities
    // ---------------------------------------------------------
    function preselectUniversity(univKeyOrName) {
        if (!preferredUnivSelect || !univKeyOrName) return;
        const key = univKeyOrName.toLowerCase().trim();
        for (let i = 0; i < preferredUnivSelect.options.length; i++) {
            const optVal = preferredUnivSelect.options[i].value.toLowerCase();
            if (optVal.includes(key) || key.includes(optVal) ||
                (key === "dpu" && optVal.includes("dpu")) ||
                (key === "amity" && optVal.includes("amity")) ||
                (key === "manipal" && optVal.includes("manipal")) ||
                (key === "ipu" && optVal.includes("ipu"))) {
                preferredUnivSelect.selectedIndex = i;
                preferredUnivSelect.dispatchEvent(new Event("change"));
                updateFormWhatsAppButton();
                if (groupPreferredUniversity) groupPreferredUniversity.classList.remove("has-error");
                break;
            }
        }
    }

    function preselectCourse(courseName) {
        if (!preferredCourseSelect || !courseName) return;
        const cleanTarget = courseName.toLowerCase().trim();
        for (let i = 0; i < preferredCourseSelect.options.length; i++) {
            const optVal = preferredCourseSelect.options[i].value.toLowerCase().trim();
            const optText = preferredCourseSelect.options[i].textContent.toLowerCase().trim();
            if (optVal === cleanTarget || optText === cleanTarget ||
                optVal.includes(cleanTarget) || cleanTarget.includes(optVal)) {
                preferredCourseSelect.selectedIndex = i;
                preferredCourseSelect.dispatchEvent(new Event("change"));
                updateFormWhatsAppButton();
                if (groupPreferredCourse) groupPreferredCourse.classList.remove("has-error");
                break;
            }
        }
    }

    function scrollToContact() {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            if (navMenu && navMenu.classList.contains("is-open")) {
                navMenu.classList.remove("is-open");
                if (mobileToggle) {
                    mobileToggle.classList.remove("is-active");
                    mobileToggle.setAttribute("aria-expanded", "false");
                }
            }

            const navHeight = navbar ? navbar.offsetHeight : 76;
            const targetPos = contactSection.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
            window.scrollTo({
                top: targetPos,
                behavior: "smooth"
            });

            const cardContainer = document.querySelector(".contact-card-container");
            if (cardContainer) {
                cardContainer.classList.add("highlight-pulse");
                setTimeout(() => cardContainer.classList.remove("highlight-pulse"), 1600);
            }

            setTimeout(() => {
                if (fullNameInput) {
                    fullNameInput.focus();
                }
            }, 450);
        }
    }

    // Attach smooth scroll listeners to all internal anchor links (#contact, #universities, etc.)
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
            const targetHref = anchor.getAttribute("href");
            if (!targetHref || targetHref === "#") return;
            const targetElement = document.querySelector(targetHref);
            if (!targetElement) return;

            e.preventDefault();

            if (navMenu && navMenu.classList.contains("is-open")) {
                navMenu.classList.remove("is-open");
                if (mobileToggle) {
                    mobileToggle.classList.remove("is-active");
                    mobileToggle.setAttribute("aria-expanded", "false");
                }
            }

            if (targetHref === "#contact") {
                scrollToContact();
            } else {
                const navHeight = navbar ? navbar.offsetHeight : 76;
                const targetPos = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
                window.scrollTo({
                    top: targetPos,
                    behavior: "smooth"
                });
            }

            if (window.history && window.history.pushState) {
                window.history.pushState(null, null, targetHref);
            }
        });
    });

    // ---------------------------------------------------------
    // 13. Student Enquiry Form Validation & Honest Submission
    // ---------------------------------------------------------
    if (guidanceForm) {
        // Validation helper functions
        function isValidIndianPhone(phoneStr) {
            if (!phoneStr) return false;
            const cleaned = phoneStr.trim().replace(/[\s\-\(\)]/g, "");
            // Validates 10-digit Indian mobile starting with 6, 7, 8, or 9
            // with optional country code (+91 or 91) or trunk prefix (0)
            return /^(?:\+91|91|0)?[6-9]\d{9}$/.test(cleaned);
        }

        function normalizeIndianPhone(phoneStr) {
            const cleaned = phoneStr.trim().replace(/[\s\-\(\)]/g, "");
            const match = cleaned.match(/(?:(?:\+91|91|0))?([6-9]\d{9})$/);
            return match ? match[1] : cleaned;
        }

        function isValidEmail(emailStr) {
            if (!emailStr || emailStr.trim() === "") return true; // Optional!
            // Standard RFC compliant regex for email validation
            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
            return emailRegex.test(emailStr.trim());
        }

        function setFieldError(groupEl, isError) {
            if (!groupEl) return;
            groupEl.classList.toggle("has-error", isError);
            const control = groupEl.querySelector("input, select, textarea");
            if (control) {
                control.setAttribute("aria-invalid", isError ? "true" : "false");
            }
        }

        // Real-time validation listeners to dynamically clear errors
        if (fullNameInput) {
            fullNameInput.addEventListener("input", () => {
                if (fullNameInput.value.trim().length >= 2) {
                    setFieldError(groupFullName, false);
                }
            });
        }

        if (mobileNumberInput) {
            mobileNumberInput.addEventListener("input", () => {
                if (isValidIndianPhone(mobileNumberInput.value)) {
                    setFieldError(groupMobileNumber, false);
                }
            });
        }

        if (emailInput) {
            emailInput.addEventListener("input", () => {
                if (isValidEmail(emailInput.value)) {
                    setFieldError(groupEmailAddress, false);
                }
            });
        }

        if (preferredUnivSelect) {
            preferredUnivSelect.addEventListener("change", () => {
                if (preferredUnivSelect.value.trim() !== "") {
                    setFieldError(groupPreferredUniversity, false);
                }
                updateFormWhatsAppButton();
            });
        }

        if (preferredCourseSelect) {
            preferredCourseSelect.addEventListener("change", () => {
                if (preferredCourseSelect.value.trim() !== "") {
                    setFieldError(groupPreferredCourse, false);
                }
                updateFormWhatsAppButton();
            });
        }

        if (enquiryConsentCheckbox) {
            enquiryConsentCheckbox.addEventListener("change", () => {
                if (enquiryConsentCheckbox.checked) {
                    setFieldError(groupConsent, false);
                }
            });
        }

        // Full validation on submission
        function validateGuidanceForm() {
            let isValid = true;
            let firstInvalidField = null;

            // 1. Full Name (Required, minimum 2 characters)
            const nameVal = fullNameInput ? fullNameInput.value.trim() : "";
            if (!nameVal || nameVal.length < 2) {
                setFieldError(groupFullName, true);
                isValid = false;
                if (!firstInvalidField) firstInvalidField = fullNameInput;
            } else {
                setFieldError(groupFullName, false);
            }

            // 2. Mobile Number (Required, Indian Mobile format)
            const mobileVal = mobileNumberInput ? mobileNumberInput.value.trim() : "";
            if (!isValidIndianPhone(mobileVal)) {
                setFieldError(groupMobileNumber, true);
                isValid = false;
                if (!firstInvalidField) firstInvalidField = mobileNumberInput;
            } else {
                setFieldError(groupMobileNumber, false);
            }

            // 3. Email (Optional, validate only if provided)
            const emailVal = emailInput ? emailInput.value.trim() : "";
            if (!isValidEmail(emailVal)) {
                setFieldError(groupEmailAddress, true);
                isValid = false;
                if (!firstInvalidField) firstInvalidField = emailInput;
            } else {
                setFieldError(groupEmailAddress, false);
            }

            // 4. Preferred University (Required)
            const univVal = preferredUnivSelect ? preferredUnivSelect.value.trim() : "";
            if (!univVal) {
                setFieldError(groupPreferredUniversity, true);
                isValid = false;
                if (!firstInvalidField) firstInvalidField = preferredUnivSelect;
            } else {
                setFieldError(groupPreferredUniversity, false);
            }

            // 5. Preferred Course (Required)
            const courseVal = preferredCourseSelect ? preferredCourseSelect.value.trim() : "";
            if (!courseVal) {
                setFieldError(groupPreferredCourse, true);
                isValid = false;
                if (!firstInvalidField) firstInvalidField = preferredCourseSelect;
            } else {
                setFieldError(groupPreferredCourse, false);
            }

            // 6. Consent Checkbox (Required)
            const consentVal = enquiryConsentCheckbox ? enquiryConsentCheckbox.checked : false;
            if (!consentVal) {
                setFieldError(groupConsent, true);
                isValid = false;
                if (!firstInvalidField) firstInvalidField = enquiryConsentCheckbox;
            } else {
                setFieldError(groupConsent, false);
            }

            return { isValid, firstInvalidField };
        }

        guidanceForm.addEventListener("submit", (event) => {
            event.preventDefault();

            // Prevent duplicate submissions if already submitting
            if (isSubmitting) return;

            const { isValid, firstInvalidField } = validateGuidanceForm();

            if (!isValid) {
                formAlert.className = "form-alert error";
                formAlert.innerHTML = `
                    <div style="display: flex; align-items: flex-start; gap: 10px;">
                        <span style="font-size: 1.15rem; line-height: 1;">⚠</span>
                        <div>
                            <strong>Please correct the highlighted fields:</strong>
                            <p style="margin: 4px 0 0 0; font-size: 0.88rem;">Please provide a valid full name, a 10-digit Indian mobile number, select your preferred university and course, and check the authorization consent.</p>
                        </div>
                    </div>
                `;
                if (firstInvalidField && typeof firstInvalidField.focus === "function") {
                    firstInvalidField.focus();
                }
                return;
            }

            // Lock submission & show loading state
            isSubmitting = true;
            if (submitBtn) {
                submitBtn.disabled = true;
                const btnText = submitBtn.querySelector(".btn-text");
                const btnSpinner = submitBtn.querySelector(".btn-spinner");
                const btnIcon = submitBtn.querySelector(".btn-arrow-icon");

                if (btnText) btnText.textContent = "Recording Enquiry in Database...";
                if (btnSpinner) btnSpinner.style.display = "inline-block";
                if (btnIcon) btnIcon.style.display = "none";
            }

            // Prepare payload
            const payload = {
                fullName: fullNameInput.value.trim(),
                mobileNumber: normalizeIndianPhone(mobileNumberInput.value),
                emailAddress: emailInput ? emailInput.value.trim() : "",
                preferredUniversity: preferredUnivSelect.value,
                preferredCourse: preferredCourseSelect.value,
                studyMode: studyModeSelect ? studyModeSelect.value : "Regular / Full-time On-Campus",
                studentMessage: studentMessageInput ? studentMessageInput.value.trim() : "",
                enquiryConsent: enquiryConsentCheckbox ? enquiryConsentCheckbox.checked : false
            };

            // Send to actual backend API endpoint (handles Flask 5000, live-server 5500/3000, and file preview)
            let apiUrl = '/api/enquiries';
            if (window.location.protocol === 'file:' || !window.location.origin || window.location.origin === 'null') {
                apiUrl = 'http://localhost:5000/api/enquiries';
            } else if (window.location.port && window.location.port !== '5000' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
                apiUrl = 'http://localhost:5000/api/enquiries';
            }

            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(async (response) => {
                const data = await response.json().catch(() => ({}));

                if ((response.status === 201 || response.status === 200) && data.success && data.enquiry) {
                    const enquiry = data.enquiry;
                    const isDup = Boolean(data.duplicate);
                    const dateFormatted = new Date(enquiry.createdAt).toLocaleString('en-IN', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                    });

                    // Render confirmed database success card
                    formAlert.className = "form-alert success";
                    formAlert.innerHTML = `
                        <div class="alert-header">
                            <span class="alert-header-icon">✓</span>
                            <span>${isDup ? 'Enquiry Confirmed (Already in Database)' : 'Enquiry Successfully Recorded'}</span>
                        </div>
                        <div class="enquiry-ref-badge" style="display: inline-block; background-color: #dcfce7; color: #166534; font-weight: 700; padding: 4px 12px; border-radius: 9999px; font-size: 0.85rem; margin-bottom: 12px; border: 1px solid #86efac;">
                            Enquiry Reference: #${escapeHtml(enquiry.referenceNo)}
                        </div>
                        <p>Thank you, <strong>${escapeHtml(enquiry.studentName)}</strong>. Your admission guidance request has been successfully recorded in Acadment's admissions database.</p>
                        <div class="enquiry-summary-grid">
                            <div class="enquiry-item">
                                <span class="enquiry-item-label">Student Name</span>
                                <strong>${escapeHtml(enquiry.studentName)}</strong>
                            </div>
                            <div class="enquiry-item">
                                <span class="enquiry-item-label">Mobile Number</span>
                                <span>+91 ${escapeHtml(enquiry.mobileNumber)}</span>
                            </div>
                            <div class="enquiry-item">
                                <span class="enquiry-item-label">Email Address</span>
                                <span>${enquiry.emailAddress ? escapeHtml(enquiry.emailAddress) : '<em>Not provided (Optional)</em>'}</span>
                            </div>
                            <div class="enquiry-item">
                                <span class="enquiry-item-label">Preferred University</span>
                                <strong>${escapeHtml(enquiry.preferredUniversity)}</strong>
                            </div>
                            <div class="enquiry-item">
                                <span class="enquiry-item-label">Preferred Course</span>
                                <span>${escapeHtml(enquiry.preferredCourse)}</span>
                            </div>
                            <div class="enquiry-item">
                                <span class="enquiry-item-label">Study Mode</span>
                                <span>${escapeHtml(enquiry.studyMode)}</span>
                            </div>
                        </div>
                        <div style="font-size: 0.84rem; color: #15803d; margin-top: 10px; display: flex; align-items: center; gap: 6px;">
                            <span>🔒 Successfully verified and saved to Acadment SQLite database on ${escapeHtml(dateFormatted)}.</span>
                        </div>
                        <button type="button" class="btn-reset-form" id="btnResetAlert">Submit Another Enquiry</button>
                    `;

                    // Reset form inputs & clear inline error classes
                    guidanceForm.reset();
                    updateFormWhatsAppButton();
                    document.querySelectorAll(".form-group.has-error").forEach(group => group.classList.remove("has-error"));

                    // Attach reset alert listener
                    const resetBtn = document.getElementById("btnResetAlert");
                    if (resetBtn) {
                        resetBtn.addEventListener("click", () => {
                            formAlert.className = "form-alert";
                            formAlert.innerHTML = "";
                            formAlert.style.display = "none";
                            if (fullNameInput) fullNameInput.focus();
                        });
                    }
                } else if (response.status === 400 && data.fieldErrors) {
                    // Server-side validation failure
                    formAlert.className = "form-alert error";
                    const errorMessages = Object.values(data.fieldErrors).map(err => `<li>${escapeHtml(err)}</li>`).join("");
                    formAlert.innerHTML = `
                        <div style="display: flex; align-items: flex-start; gap: 10px;">
                            <span style="font-size: 1.15rem; line-height: 1;">⚠</span>
                            <div>
                                <strong>Please correct the following:</strong>
                                <ul style="margin: 6px 0 0 16px; padding: 0; font-size: 0.88rem;">${errorMessages}</ul>
                            </div>
                        </div>
                    `;

                    // Highlight fields based on server response
                    if (data.fieldErrors.fullName && groupFullName) groupFullName.classList.add("has-error");
                    if (data.fieldErrors.mobileNumber && groupMobileNumber) groupMobileNumber.classList.add("has-error");
                    if (data.fieldErrors.emailAddress && groupEmailAddress) groupEmailAddress.classList.add("has-error");
                    if (data.fieldErrors.preferredUniversity && groupPreferredUniversity) groupPreferredUniversity.classList.add("has-error");
                    if (data.fieldErrors.preferredCourse && groupPreferredCourse) groupPreferredCourse.classList.add("has-error");
                    if (data.fieldErrors.enquiryConsent && groupConsent) groupConsent.classList.add("has-error");
                } else {
                    // Other server errors
                    formAlert.className = "form-alert error";
                    formAlert.innerHTML = `
                        <div style="display: flex; align-items: flex-start; gap: 10px;">
                            <span style="font-size: 1.15rem; line-height: 1;">⚠</span>
                            <div>
                                <strong>Submission Failed:</strong>
                                <p style="margin: 4px 0 0 0; font-size: 0.88rem;">${escapeHtml(data.error || "A server error occurred while recording your enquiry. Please try again.")}</p>
                            </div>
                        </div>
                    `;
                }
            })
            .catch((err) => {
                // Network or connection failure
                formAlert.className = "form-alert error";
                formAlert.innerHTML = `
                    <div style="display: flex; align-items: flex-start; gap: 10px;">
                        <span style="font-size: 1.15rem; line-height: 1;">⚠</span>
                        <div>
                            <strong>Backend Server Unavailable:</strong>
                            <p style="margin: 4px 0 0 0; font-size: 0.88rem;">Unable to connect to the admission server. Please ensure the Flask application is running on your localhost.</p>
                        </div>
                    </div>
                `;
            })
            .finally(() => {
                // Release submission lock
                isSubmitting = false;

                // Restore submit button state
                if (submitBtn) {
                    submitBtn.disabled = false;
                    const btnText = submitBtn.querySelector(".btn-text");
                    const btnSpinner = submitBtn.querySelector(".btn-spinner");
                    const btnIcon = submitBtn.querySelector(".btn-arrow-icon");

                    if (btnText) btnText.textContent = "Submit Enquiry";
                    if (btnSpinner) btnSpinner.style.display = "none";
                    if (btnIcon) btnIcon.style.display = "inline-block";
                }

                // Smooth scroll to feedback
                formAlert.scrollIntoView({ behavior: "smooth", block: "nearest" });
            });
        });
    }

    // ---------------------------------------------------------
    // 13. Accessible FAQ Accordion Handler
    // ---------------------------------------------------------
    const faqButtons = document.querySelectorAll(".faq-question");
    if (faqButtons.length > 0) {
        faqButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                const isExpanded = btn.getAttribute("aria-expanded") === "true";
                const answer = btn.nextElementSibling;
                const faqItem = btn.closest(".faq-item");

                // Close other open FAQ items for clean, focused reading
                faqButtons.forEach((otherBtn) => {
                    if (otherBtn !== btn) {
                        otherBtn.setAttribute("aria-expanded", "false");
                        const otherItem = otherBtn.closest(".faq-item");
                        if (otherItem) otherItem.classList.remove("active");
                        if (otherBtn.nextElementSibling) {
                            otherBtn.nextElementSibling.style.maxHeight = null;
                        }
                    }
                });

                // Toggle targeted item
                if (isExpanded) {
                    btn.setAttribute("aria-expanded", "false");
                    if (faqItem) faqItem.classList.remove("active");
                    if (answer) answer.style.maxHeight = null;
                } else {
                    btn.setAttribute("aria-expanded", "true");
                    if (faqItem) faqItem.classList.add("active");
                    if (answer) answer.style.maxHeight = `${answer.scrollHeight + 30}px`;
                }
            });
        });
    }

    // Helper: Basic HTML escape for security
    function escapeHtml(str) {
        if (!str) return "";
        return String(str).replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
    // Initialize form WhatsApp button with current select values
    updateFormWhatsAppButton();
});
