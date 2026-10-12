import { profile, projects } from '../data/content.js';

document.addEventListener('DOMContentLoaded', () => {
  renderPrintView();
});

function renderPrintView() {
  // 1. Header & Profil
  const printName = document.getElementById('print-name');
  if (printName) printName.textContent = profile.name;

  const printRole = document.getElementById('print-role');
  if (printRole) printRole.textContent = profile.role;

  const printLocation = document.getElementById('print-location');
  if (printLocation) printLocation.textContent = profile.location;

  // Foto Profil
  const printPhoto = document.getElementById('print-photo');
  if (printPhoto && profile.photo) {
    printPhoto.src = profile.photo;
  }

  // Kontak Inline
  const printContact = document.getElementById('print-contact');
  if (printContact && profile.contact) {
    const contacts = [];
    if (profile.phone) contacts.push(`<span>📞 ${profile.phone}</span>`);
    if (profile.contact.email) contacts.push(`<span>✉ ${profile.contact.email}</span>`);
    if (profile.contact.github) {
      const ghUser = profile.contact.github.replace('https://github.com/', '');
      contacts.push(`<span>GitHub: ${ghUser}</span>`);
    }
    printContact.innerHTML = contacts.join(' • ');
  }

  // Bio
  const printBio = document.getElementById('print-bio');
  if (printBio && Array.isArray(profile.bio)) {
    printBio.innerHTML = profile.bio.map(p => `<p>${p}</p>`).join('');
  }

  // Keahlian
  const printSkills = document.getElementById('print-skills');
  if (printSkills && Array.isArray(profile.skills)) {
    printSkills.textContent = profile.skills.join(' · ');
  }

  // Pendidikan
  const printEducation = document.getElementById('print-education');
  if (printEducation && Array.isArray(profile.education)) {
    printEducation.innerHTML = profile.education.map(edu => `
      <div class="print-education-item">
        <div class="print-edu-left">
          <div class="print-edu-school">${edu.school}</div>
          <div class="print-edu-major">${edu.major}</div>
        </div>
        <div class="print-edu-year">${edu.year}</div>
      </div>
    `).join('');
  }

  // Pengalaman (baru)
  const printExperience = document.getElementById('print-experience');
  if (printExperience && Array.isArray(profile.experience)) {
    printExperience.innerHTML = profile.experience.map(exp => `
      <div class="print-education-item" style="margin-bottom: 0.45rem;">
        <div class="print-edu-left">
          <div class="print-edu-school">${exp.role} — <span style="font-weight: normal; color: #524f4b;">${exp.institution}</span></div>
          ${exp.details && exp.details[0] ? `<div class="print-edu-major">${exp.details[0]}</div>` : ''}
        </div>
        <div class="print-edu-year">${exp.year}</div>
      </div>
    `).join('');
  }

  // 2. Halaman 2: Project
  const printProjects = document.getElementById('print-projects');
  if (printProjects && Array.isArray(projects)) {
    printProjects.innerHTML = projects.map(proj => {
      const stackStr = Array.isArray(proj.stack) ? proj.stack.join(' · ') : '';
      return `
        <article class="print-project-item">
          <div class="print-project-thumb">
            <img src="${proj.image}" alt="${proj.title}" onerror="this.style.display='none'">
          </div>
          <div class="print-project-details">
            <div class="print-project-meta">
              <span>${proj.year}</span>
              ${proj.role ? `<span>•</span><span>${proj.role}</span>` : ''}
            </div>
            <h3 class="print-project-title">${proj.title}</h3>
            <p class="print-project-summary">${proj.summary}</p>
            ${stackStr ? `<div class="print-project-stack"><strong>Stack:</strong> ${stackStr}</div>` : ''}
          </div>
        </article>
      `;
    }).join('');
  }
}
