// Client-side Application Logic for oU1TS Question Bank SPA

// Mock database of past exam questions
const QUESTIONS_DB = [
  {
    id: 1,
    title: "Art of Living & Engineering Ethics",
    department: "EEE",
    course: "Art of Living",
    semester: "Summer 26",
    examType: "Quiz",
    date: "Jun 30, 2026",
    submissions: 1,
    fileSize: "1.2 MB",
    downloads: 142
  },
  {
    id: 2,
    title: "Probability & Statistics",
    department: "EEE",
    course: "Probability and Statistics",
    semester: "Summer 26",
    examType: "Mid",
    date: "Jun 30, 2026",
    submissions: 1,
    fileSize: "2.1 MB",
    downloads: 89
  },
  {
    id: 3,
    title: "Energy Conversion-II",
    department: "EEE",
    course: "Energy Conversion-II",
    semester: "Summer 26",
    examType: "Mid",
    date: "Jun 30, 2026",
    submissions: 1,
    fileSize: "1.8 MB",
    downloads: 210
  },
  {
    id: 4,
    title: "Data Structures and Algorithms",
    department: "CSE",
    course: "Data Structures",
    semester: "Spring 26",
    examType: "Final",
    date: "May 15, 2026",
    submissions: 2,
    fileSize: "3.4 MB",
    downloads: 512
  },
  {
    id: 5,
    title: "Object Oriented Programming (Java)",
    department: "CSE",
    course: "OOP",
    semester: "Spring 26",
    examType: "Mid",
    date: "Apr 10, 2026",
    submissions: 1,
    fileSize: "1.5 MB",
    downloads: 304
  },
  {
    id: 6,
    title: "Introduction to Microeconomics",
    department: "BBA",
    course: "Microeconomics",
    semester: "Fall 25",
    examType: "Final",
    date: "Jan 18, 2026",
    submissions: 1,
    fileSize: "1.1 MB",
    downloads: 120
  },
  {
    id: 7,
    title: "Organic Chemistry II",
    department: "Pharmacy",
    course: "Organic Chemistry",
    semester: "Spring 26",
    examType: "Quiz",
    date: "Jun 02, 2026",
    submissions: 1,
    fileSize: "950 KB",
    downloads: 65
  },
  {
    id: 8,
    title: "Compiler Design",
    department: "CSE",
    course: "Compiler Design",
    semester: "Summer 26",
    examType: "Mid",
    date: "Jun 28, 2026",
    submissions: 1,
    fileSize: "2.8 MB",
    downloads: 180
  },
  {
    id: 9,
    title: "Signals and Systems",
    department: "EEE",
    course: "Signals and Systems",
    semester: "Fall 25",
    examType: "Final",
    date: "Jan 22, 2026",
    submissions: 1,
    fileSize: "3.0 MB",
    downloads: 145
  },
  {
    id: 10,
    title: "Business Communication & Ethics",
    department: "BBA",
    course: "Business Communication",
    semester: "Spring 26",
    examType: "Mid",
    date: "Apr 12, 2026",
    submissions: 1,
    fileSize: "1.3 MB",
    downloads: 98
  }
];

// DOM elements and app state
let currentTheme = localStorage.getItem('theme') || 'dark';
let activeSection = 'home';
let questionsList = [...QUESTIONS_DB];

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Theme
  applyTheme(currentTheme);

  // Initialize Routing
  window.addEventListener('hashchange', handleRouting);
  handleRouting();

  // Setup Event Listeners
  setupEventListeners();

  // Populate Dropdown Options
  populateFilters();

  // Render initial list of questions
  renderQuestions();
});

// Theme Management
function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
  }
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(currentTheme);
  showToast("Theme switched successfully!");
}

// Router Management
function handleRouting() {
  const hash = window.location.hash.substring(1) || 'home';
  const targetSection = document.getElementById(hash);

  if (targetSection) {
    // Deactivate previous active sections & links
    document.querySelectorAll('.page-section').forEach(sec => {
      sec.classList.remove('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.classList.remove('active');
    });

    // Activate current target section
    targetSection.classList.add('active');
    activeSection = hash;

    // Highlight active nav links (both header and footer if matches)
    const matchingLinks = document.querySelectorAll(`[href="#${hash}"]`);
    matchingLinks.forEach(link => {
      if (link.classList.contains('nav-link')) {
        link.classList.add('active');
      }
      if (link.classList.contains('mobile-nav-link')) {
        link.classList.add('active');
      }
    });

    // Scroll to top of viewport
    window.scrollTo({ top: 0, behavior: 'instant' });
  } else {
    // fallback if section not found (redirect to home)
    window.location.hash = '#home';
  }
}

// Populate search filter selects dynamically
function populateFilters() {
  const departments = [...new Set(QUESTIONS_DB.map(q => q.department))];
  const courses = [...new Set(QUESTIONS_DB.map(q => q.course))];
  const semesters = [...new Set(QUESTIONS_DB.map(q => q.semester))];
  const examTypes = [...new Set(QUESTIONS_DB.map(q => q.examType))];

  const fillSelect = (id, items) => {
    const el = document.getElementById(id);
    if (!el) return;
    items.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item;
      opt.textContent = item;
      el.appendChild(opt);
    });
  };

  fillSelect('filter-dept', departments);
  fillSelect('filter-course', courses);
  fillSelect('filter-semester', semesters);
  fillSelect('filter-type', examTypes);
}

// Render questions inside questions-list container
function renderQuestions() {
  const container = document.getElementById('questions-list');
  if (!container) return;

  container.innerHTML = '';

  if (questionsList.length === 0) {
    container.innerHTML = `
      <div class="card" style="text-align: center; padding: 4rem 2rem;">
        <i class="fa-solid fa-folder-open" style="font-size: 3rem; color: var(--muted-foreground); margin-bottom: 1rem;"></i>
        <h3 class="card-title">No question papers found</h3>
        <p class="card-desc">Try modifying your search keywords or filter terms.</p>
      </div>
    `;
    return;
  }

  questionsList.forEach(q => {
    const card = document.createElement('div');
    card.className = 'question-card';
    card.onclick = () => downloadQuestion(q.id);

    card.innerHTML = `
      <div class="question-header">
        <h3 class="question-title">${q.title}</h3>
      </div>
      <div class="tag-container">
        <span class="badge badge-blue">
          <i class="fa-solid fa-school"></i> ${q.department}
        </span>
        <span class="badge badge-amber">
          ${q.examType}
        </span>
        <span class="badge badge-purple">
          <i class="fa-solid fa-calendar"></i> ${q.semester}
        </span>
      </div>
      <div class="question-meta">
        <div class="question-meta-item">
          <i class="fa-solid fa-clock"></i>
          <span>${q.date}</span>
        </div>
        <div class="question-meta-item">
          <i class="fa-solid fa-file-pdf"></i>
          <span>${q.fileSize}</span>
        </div>
        <div class="question-meta-item">
          <i class="fa-solid fa-download"></i>
          <span>${q.downloads} downloads</span>
        </div>
      </div>
      <div class="question-action-arrow">
        <i class="fa-solid fa-arrow-down"></i>
      </div>
    `;
    container.appendChild(card);
  });
}

// Handle question downloading triggers
function downloadQuestion(id) {
  const q = QUESTIONS_DB.find(item => item.id === id);
  if (q) {
    q.downloads++;
    showToast(`Downloading "${q.title}" (${q.fileSize})...`);
    renderQuestions();
  }
}

// Setup Event Listeners
function setupEventListeners() {
  // Theme Toggle Button
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  // Search & Filter listeners
  const searchInput = document.getElementById('search-input');
  const deptSelect = document.getElementById('filter-dept');
  const courseSelect = document.getElementById('filter-course');
  const semesterSelect = document.getElementById('filter-semester');
  const typeSelect = document.getElementById('filter-type');

  const triggerFilters = () => {
    const query = searchInput ? searchInput.value.toLowerCase() : '';
    const dept = deptSelect ? deptSelect.value : '';
    const course = courseSelect ? courseSelect.value : '';
    const semester = semesterSelect ? semesterSelect.value : '';
    const type = typeSelect ? typeSelect.value : '';

    questionsList = QUESTIONS_DB.filter(q => {
      const matchQuery = q.title.toLowerCase().includes(query) || q.course.toLowerCase().includes(query);
      const matchDept = dept === '' || q.department === dept;
      const matchCourse = course === '' || q.course === course;
      const matchSemester = semester === '' || q.semester === semester;
      const matchType = type === '' || q.examType === type;

      return matchQuery && matchDept && matchCourse && matchSemester && matchType;
    });

    renderQuestions();
  };

  if (searchInput) searchInput.addEventListener('input', triggerFilters);
  if (deptSelect) deptSelect.addEventListener('change', triggerFilters);
  if (courseSelect) courseSelect.addEventListener('change', triggerFilters);
  if (semesterSelect) semesterSelect.addEventListener('change', triggerFilters);
  if (typeSelect) typeSelect.addEventListener('change', triggerFilters);

  // Modal Open/Close handlers
  const openModalBtn = document.getElementById('upload-trigger-btn');
  const openModalHeroBtn = document.getElementById('upload-trigger-hero-btn');
  const closeModalBtn = document.getElementById('modal-close-btn');
  const modalBackdrop = document.getElementById('upload-modal');

  const toggleModal = (show) => {
    if (modalBackdrop) {
      if (show) {
        modalBackdrop.style.display = 'flex';
        setTimeout(() => modalBackdrop.classList.add('open'), 10);
      } else {
        modalBackdrop.classList.remove('open');
        setTimeout(() => modalBackdrop.style.display = 'none', 300);
      }
    }
  };

  if (openModalBtn) openModalBtn.addEventListener('click', () => toggleModal(true));
  if (openModalHeroBtn) openModalHeroBtn.addEventListener('click', () => toggleModal(true));
  if (closeModalBtn) closeModalBtn.addEventListener('click', () => toggleModal(false));

  // Modal Submission simulated action
  const uploadForm = document.getElementById('upload-form');
  if (uploadForm) {
    uploadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('up-title').value;
      const department = document.getElementById('up-dept').value;
      const semester = document.getElementById('up-semester').value;
      const examType = document.getElementById('up-type').value;

      if (!title || !department || !semester || !examType) {
        alert("Please fill out all required details.");
        return;
      }

      // Append new question to database
      const newQuestion = {
        id: QUESTIONS_DB.length + 1,
        title: title,
        department: department,
        course: title,
        semester: semester,
        examType: examType,
        date: "Today",
        submissions: 1,
        fileSize: "1.5 MB",
        downloads: 0
      };

      QUESTIONS_DB.unshift(newQuestion);
      questionsList = [...QUESTIONS_DB];

      // Refresh filters & views
      populateFilters();
      renderQuestions();
      toggleModal(false);
      uploadForm.reset();

      showToast("Question paper submitted successfully!");
    });
  }

  // Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.reset();
      showToast("Message sent! We'll get back to you soon.");
    });
  }

  // Auth Form toggle
  const authToggle = document.getElementById('auth-toggle-link');
  if (authToggle) {
    authToggle.addEventListener('click', () => {
      const isLogin = document.getElementById('auth-submit-btn').textContent === 'Sign In';
      const submitBtn = document.getElementById('auth-submit-btn');
      const title = document.getElementById('auth-title');
      const subtitle = document.getElementById('auth-subtitle');
      const nameGroup = document.getElementById('auth-name-group');

      if (isLogin) {
        title.textContent = 'Create Account';
        subtitle.textContent = 'Join oU1TS Question Bank community';
        submitBtn.textContent = 'Sign Up';
        nameGroup.style.display = 'flex';
        authToggle.innerHTML = 'Already have an account? <span>Sign In</span>';
      } else {
        title.textContent = 'Welcome Back';
        subtitle.textContent = 'Sign in to contribute your question papers';
        submitBtn.textContent = 'Sign In';
        nameGroup.style.display = 'none';
        authToggle.innerHTML = "Don't have an account? <span>Register</span>";
      }
    });
  }

  // Auth Form Submit
  const authForm = document.getElementById('auth-form');
  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const isLogin = document.getElementById('auth-submit-btn').textContent === 'Sign In';
      authForm.reset();
      window.location.hash = '#home';
      showToast(isLogin ? "Signed in successfully!" : "Account created successfully!");
    });
  }

  // Mobile Navigation Drawer handlers
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawerClose = document.getElementById('mobile-drawer-close');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileUploadBtn = document.getElementById('mobile-upload-btn');

  const toggleMobileDrawer = (show) => {
    if (mobileDrawer) {
      if (show) {
        mobileDrawer.style.display = 'block';
        setTimeout(() => mobileDrawer.classList.add('open'), 10);
      } else {
        mobileDrawer.classList.remove('open');
        setTimeout(() => mobileDrawer.style.display = 'none', 300);
      }
    }
  };

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => toggleMobileDrawer(true));
  }
  if (mobileDrawerClose) {
    mobileDrawerClose.addEventListener('click', () => toggleMobileDrawer(false));
  }
  if (mobileDrawer) {
    // Close drawer when clicking outside the panel content (on backdrop)
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) {
        toggleMobileDrawer(false);
      }
    });
  }
  
  // Close drawer when clicking any nav link
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => toggleMobileDrawer(false));
  });

  // Handle upload button in mobile drawer
  if (mobileUploadBtn) {
    mobileUploadBtn.addEventListener('click', () => {
      toggleMobileDrawer(false);
      toggleModal(true);
    });
  }
}

// Toast Notifications Helper
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast toast-success';
  toast.innerHTML = `
    <i class="fa-solid fa-circle-check"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);

  // Auto remove toast
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
