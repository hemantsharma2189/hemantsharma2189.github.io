const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navAnchors = [...document.querySelectorAll('.nav-links a[href^="#"]')];

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 20);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuToggle.addEventListener('click', () => {
  const open = menuToggle.classList.toggle('open');
  navLinks.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

navAnchors.forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const sections = [...document.querySelectorAll('main section[id]')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navAnchors.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((section) => sectionObserver.observe(section));

const roles = [
  'DevOps & Cloud Infrastructure Engineer',
  'AWS & Terraform Builder',
  'CI/CD Automation Engineer',
  'Kubernetes & Observability Enthusiast'
];
const typedRole = document.getElementById('typed-role');
let roleIndex = 0;
let charIndex = roles[0].length;
let deleting = true;

function typeRole() {
  const role = roles[roleIndex];
  if (deleting) {
    charIndex -= 1;
    typedRole.textContent = role.slice(0, charIndex);
    if (charIndex <= 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 500);
      return;
    }
    setTimeout(typeRole, 35);
  } else {
    const nextRole = roles[roleIndex];
    charIndex += 1;
    typedRole.textContent = nextRole.slice(0, charIndex);
    if (charIndex >= nextRole.length) {
      deleting = true;
      setTimeout(typeRole, 1700);
      return;
    }
    setTimeout(typeRole, 65);
  }
}
setTimeout(typeRole, 1800);

const projectData = {
  terraform: {
    title: 'AI-Powered Terraform Change Guardian',
    description: 'A pull-request safety system that analyzes Terraform plan JSON before infrastructure changes are deployed.',
    features: [
      'Detects destructive changes, public exposure, overly permissive IAM, missing encryption, and untagged resources.',
      'Assigns risk severity and generates evidence-based business impact and remediation guidance.',
      'Publishes reports in GitHub Actions and requires manual approval for high-risk deployments.',
      'Uses GitHub OIDC and short-lived AWS credentials instead of long-term repository secrets.'
    ],
    tech: ['AWS', 'Terraform', 'Python', 'GitHub Actions', 'GitHub OIDC', 'AI API']
  },
  incident: {
    title: 'AI-Assisted Incident Investigation & Recovery Platform',
    description: 'A reliability platform that brings logs, metrics, container status, and deployment context together for faster troubleshooting.',
    features: [
      'Collects application logs, Linux system events, container status, deployment history, and performance metrics.',
      'Correlates errors, HTTP failures, container restarts, and recent deployments to suggest probable root causes.',
      'Generates evidence-based troubleshooting guidance, confidence scores, and post-incident reports.',
      'Keeps restarts and rollbacks behind human approval, followed by automated health validation.'
    ],
    tech: ['Linux', 'Docker', 'Python', 'OpenTelemetry', 'Prometheus', 'Grafana']
  },
  canary: {
    title: 'Intelligent Canary Deployment & Automated Rollback',
    description: 'A progressive delivery workflow that protects production by evaluating live health signals before expanding a release.',
    features: [
      'Gradually sends traffic to new application versions while tracking availability, latency, error rate, and container health.',
      'Uses Argo Rollouts and Prometheus analysis templates to pause or roll back unhealthy releases.',
      'Runs tests, builds images, updates manifests, and initiates controlled releases through GitHub Actions.',
      'Generates explanations describing why a rollout succeeded, paused, or rolled back.'
    ],
     tech: ['Kubernetes', 'Docker', 'GitHub Actions', 'Prometheus', 'Argo Rollouts', 'CI/CD']
  },
  gameday: {
    title: 'Cloud Resilience GameDay Orchestrator',
    description: 'A safety-first Kubernetes resilience platform that tests workload recovery through controlled failure experiments.',
    features: [
      'Validates YAML-based failure scenarios and measurable recovery objectives using Pydantic.',
      'Protects critical namespaces and requires explicit approval before live failure injection.',
      'Performs controlled pod termination and monitors Kubernetes Deployment recovery.',
      'Evaluates recovery time, availability, and error-rate objectives before generating JSON and Markdown evidence reports.',
      'Uses GitHub Actions for automated testing, Docker builds, dry-run validation, and Trivy container security scanning.'
    ],
    tech: ['Kubernetes', 'Python', 'Docker', 'GitHub Actions', 'SRE', 'SLO', 'Trivy'],
    url: 'https://github.com/hemantsharma2189/cloud-resilience-gameday-orchestrator'
  }
};

const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalFeatures = document.getElementById('modal-features');
const modalTech = document.getElementById('modal-tech');
const modalProjectLink = modal.querySelector('.btn-primary');
let lastFocusedElement = null;

function openModal(projectKey) {
  const project = projectData[projectKey];
  if (!project) return;
  lastFocusedElement = document.activeElement;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalFeatures.innerHTML = project.features.map((item) => `<li>${item}</li>`).join('');
  modalTech.innerHTML = project.tech.map((item) => `<span>${item}</span>`).join('');
  modalProjectLink.href = project.url || 'https://github.com/hemantsharma2189';
  modalProjectLink.innerHTML = project.url
    ? 'View GitHub Repository <span>↗</span>'
    : 'View GitHub Profile <span>↗</span>';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modal.querySelector('.modal-close').focus();
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  if (lastFocusedElement) lastFocusedElement.focus();
}

document.querySelectorAll('[data-project]').forEach((button) => {
  button.addEventListener('click', () => openModal(button.dataset.project));
});
document.querySelectorAll('[data-close-modal]').forEach((el) => el.addEventListener('click', closeModal));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

document.getElementById('contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:hemantsharma2189@gmail.com?subject=${subject}&body=${body}`;
});

document.getElementById('current-year').textContent = new Date().getFullYear();
