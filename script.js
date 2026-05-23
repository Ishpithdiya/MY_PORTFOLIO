// Check local storage theme on init
if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

// Theme Switch Toggle Functionality
const themeToggleBtn = document.getElementById('themeToggle');
const mobileThemeToggleBtn = document.getElementById('mobileThemeToggle');

function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        showToast("Theme Updated", "Light mode enabled successfully.", "fa-sun");
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        showToast("Theme Updated", "Dark mode enabled successfully.", "fa-moon");
    }
}

themeToggleBtn.addEventListener('click', toggleTheme);
mobileThemeToggleBtn.addEventListener('click', toggleTheme);

// Mobile Menu Toggling
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');

mobileMenuButton.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    if (isHidden) {
        mobileMenu.classList.remove('hidden');
        menuIcon.className = "fa-solid fa-xmark text-lg";
    } else {
        mobileMenu.classList.add('hidden');
        menuIcon.className = "fa-solid fa-bars text-lg";
    }
});

// Close mobile menu when links are clicked
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.className = "fa-solid fa-bars text-lg";
    });
});

// Clipboard Copy Action Helper
function copyToClipboard(text) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    showToast("Copied to Clipboard!", text + " copied successfully.", "fa-copy");
}

// Custom non-blocking Toast feedback setup
function showToast(title, message, iconClass = "fa-circle-check") {
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toastTitle');
    const toastMsg = document.getElementById('toastMessage');
    const toastIcon = document.getElementById('toastIcon');

    toastTitle.innerText = title;
    toastMsg.innerText = message;
    toastIcon.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;

    toast.classList.remove('translate-y-24', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
        toast.classList.add('translate-y-24', 'opacity-0');
        toast.classList.remove('translate-y-0', 'opacity-100');
    }, 3000);
}

// Demo handling details
let currentDemo = "";
function triggerDemo(projectName) {
    currentDemo = projectName;
    const modal = document.getElementById('demoModal');
    document.getElementById('modalTitle').innerText = `${projectName} - Demo`;
    document.getElementById('modalText').innerText = `You are opening the sandbox simulation demo for the ${projectName} application. Live operations perform standard computations and front-end state rendering without data modification.`;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeModal() {
    const modal = document.getElementById('demoModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function confirmDemo() {
    closeModal();
    showToast("Demo Initialized", `Launching the simulated container for: ${currentDemo}`, "fa-rocket");
}

// Resume download helper opening the provided local PDF file
function downloadResume() {
    const resumePath = 'file:///C:/Users/alpes/Downloads/ISHA_PITHADIYA_RESUME.pdf';
    window.open(resumePath, '_blank');
    showToast("Resume Opened", "Attempting to open your PDF resume.", "fa-file-arrow-down");
}

// Handle Interactive Contact Form Submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form_name').value;
    const subject = document.getElementById('form_subject').value;

    contactForm.reset();

    showToast("Message Received!", `Thank you, ${name}. Your message regarding "${subject}" has been logged successfully!`, "fa-paper-plane");
});
