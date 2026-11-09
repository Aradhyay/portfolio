# 📋 Step-by-Step Guide: Uploading Projects & Customizing Your Portfolio

This guide explains how to easily add your own projects, update your profile picture, change resume details, and configure the contact form.

---

## 1. How to Add a New Project Card

Adding a project requires just **two simple steps**:

### Step 1: Add the Project Image
1. Place your project preview image or screenshot inside the `assets/images/` folder (e.g., `assets/images/my-new-project.png` or use `project-template.svg`).

### Step 2: Add the Project Card in `index.html`
Open `index.html` and scroll to the `<div class="projects-grid">` section (around line 340). Copy and paste this block:

```html
<!-- New Project Card -->
<div class="project-card" data-project-card data-category="ai web">
  <div class="project-banner">
    <!-- Project image banner -->
    <img src="./assets/images/my-new-project.png" alt="My New Project Name">
    <div class="project-overlay">
      <!-- Button to open popup details modal -->
      <button class="overlay-action-btn" data-open-modal="my-new-project" title="View Project Details">
        <ion-icon name="eye-outline"></ion-icon>
      </button>
      <!-- Link to GitHub repository -->
      <a href="https://github.com/Aradhyay/my-repo" target="_blank" rel="noopener noreferrer" class="overlay-action-btn secondary" title="View GitHub Repository">
        <ion-icon name="logo-github"></ion-icon>
      </a>
    </div>
  </div>
  <div class="project-details">
    <span class="project-category-tag">Category (e.g. AI & ML / Web Development)</span>
    <h4 class="project-title">Your Project Name</h4>
    <p class="project-desc">
      A concise 2-sentence description of what problem the project solves, what tools were used, and the measurable outcome.
    </p>
    <div class="project-tags">
      <span class="project-tag">Python</span>
      <span class="project-tag">FastAPI</span>
      <span class="project-tag">React</span>
    </div>
  </div>
</div>
```

> **Note on Categories (`data-category` attribute)**:
> - Use `ai` for AI/ML projects
> - Use `web` for Web development
> - Use `data` for Scraping/Data pipelines
> - Use `system` for Workstation & systems
> You can also put multiple like `data-category="ai web"` so it appears in both filters!

---

### Step 3: (Optional) Add Details for the Modal Popup
Open `assets/js/script.js` and look for the `PROJECT_DETAILS` object (around line 125). Add your project entry:

```javascript
'my-new-project': {
  title: 'Your Project Name',
  category: 'AI & Web Application',
  img: 'assets/images/my-new-project.png',
  desc: 'Comprehensive overview of your project architecture and how it works.',
  highlights: [
    'Key feature or performance achievement 1.',
    'Key architecture or library used 2.',
    'User impact or accuracy achieved 3.'
  ],
  github: 'https://github.com/Aradhyay/my-repo',
  live: 'https://my-live-demo.com' // Set to '#' if no live demo exists
},
```

---

## 2. How to Use Your Own Profile Photo

1. Save your photograph inside `assets/images/` as `profile.jpg` (or `.png`).
2. Open `index.html` and search for `<div class="avatar-wrapper">`.
3. Change the `src` attribute from:
   ```html
   <img src="./assets/images/my-avatar.svg" alt="Aradhya Dwivedi" id="profile-img">
   ```
   To:
   ```html
   <img src="./assets/images/profile.jpg" alt="Aradhya Dwivedi" id="profile-img">
   ```

---

## 3. How to Update Your Resume PDF

1. When you update your resume, export it as a PDF.
2. Replace `ARADHYA DWIVEDI.pdf` in the root folder, or name it `Resume.pdf`.
3. In `index.html`, ensure the download button links to it:
   ```html
   <a href="./ARADHYA DWIVEDI.pdf" target="_blank" download="Aradhya_Dwivedi_Resume.pdf" class="resume-btn-sidebar">
     <ion-icon name="cloud-download-outline"></ion-icon>
     <span>Download CV</span>
   </a>
   ```

---

## 4. How to Receive Contact Form Messages to Your Email for Free

The contact form already supports opening your default email client (`mailto:`) automatically. 

If you want people to submit messages directly on the page without opening an email app:
1. Go to [Formspree.io](https://formspree.io) (Free) and enter your email `aradhy033@gmail.com`.
2. Formspree gives you an endpoint like: `https://formspree.io/f/xbjnqopq`.
3. In `index.html`, find the `<form class="contact-form" ...>` and change:
   ```html
   action="https://formspree.io/f/YOUR_ENDPOINT_HERE"
   ```
Every time a recruiter or visitor fills the form, you will receive an instant email in your inbox!

---

## 5. How to Add New Certifications

In `index.html`, go to the `certificates` section (`<article class="page-article" data-article="certificates">`).
Duplicate any `.cert-card` element, update the title, issuer, date, and link to your new certificate image or PDF!

