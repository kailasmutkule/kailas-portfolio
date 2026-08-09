const { useEffect, useState } = React;

const skills = [
  "Java",
  "JavaScript",
  "C++",
  "Python",
  "HTML",
  "CSS",
  "Bootstrap",
  "Node.js",
  "Express.js",
  "MongoDB",
  "SQL",
  "REST APIs",
  "Git",
  "GitHub",
  "React",
];

const projects = [
  {
    title: "Wanderlust",
    category: "Full Stack",
    description:
      "A full-stack property platform where users can list hotels, explore properties, make bookings, and share reviews.",
    tech: ["Node.js", "Express.js", "MongoDB", "EJS", "Bootstrap"],
    github: "#",
    live: "#",
  },
  {
    title: "Real-Time Data Processing",
    category: "Data Engineering",
    description:
      "A diploma final-year project focused on real-time stream processing and data analytics using Java, Apache Flink, Apache Kafka, and Ubuntu.",
    tech: ["Java", "Apache Flink", "Apache Kafka", "Ubuntu"],
    github: "#",
    live: "#",
  },
  {
    title: "Portfolio Website",
    category: "Web Development",
    description:
      "A responsive personal portfolio built to showcase my skills, projects, education, and contact information.",
    tech: ["React", "Bootstrap", "Node.js", "Express.js"],
    github: "#",
    live: "#",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", text: "" });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    document.title = "Kailas Mutkule | Full-Stack Developer";

    const revealItems = document.querySelectorAll(
      ".reveal-on-scroll, .hero-reveal"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", text: "" });

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: "danger", text: "Please fill in all fields." });
      return;
    }

    setSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Unable to send message.");

      setStatus({ type: "success", text: data.message });
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus({
        type: "warning",
        text: "Database contact form is unavailable. You can contact me directly at kailasmutkule99@gmail.com.",
      });
    } finally {
      setSending(false);
    }
  };

  return React.createElement(
    React.Fragment,
    null,

    React.createElement(
      "nav",
      {
        className:
          "navbar navbar-expand-lg navbar-dark fixed-top portfolio-nav",
      },
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "a",
          {
            className: "navbar-brand fw-bold",
            href: "#home",
            onClick: () => scrollTo("home"),
          },
          "Kailas Mutkule",
          React.createElement("span", { className: "brand-dot" }, ""),
        ),
        React.createElement(
          "button",
          {
            className: "navbar-toggler",
            type: "button",
            onClick: () => setMenuOpen(!menuOpen),
            "aria-label": "Toggle navigation",
          },
          React.createElement("span", { className: "navbar-toggler-icon" }),
        ),
        React.createElement(
          "div",
          { className: `collapse navbar-collapse ${menuOpen ? "show" : ""}` },
          React.createElement(
            "ul",
            { className: "navbar-nav ms-auto align-items-lg-center gap-lg-2" },
            ["home", "about", "skills", "projects", "contact"].map((item) =>
              React.createElement(
                "li",
                { className: "nav-item", key: item },
                React.createElement(
                  "a",
                  {
                    className: "nav-link text-capitalize",
                    href: `#${item}`,
                    onClick: () => scrollTo(item),
                  },
                  item,
                ),
              ),
            ),
          ),
        ),
      ),
    ),

    React.createElement(
      "main",
      null,

      React.createElement(
        "section",
        { id: "home", className: "hero-section" },
        React.createElement(
          "div",
          { className: "container" },
          React.createElement(
            "div",
            { className: "row align-items-center g-5" },
            React.createElement(
              "div",
              { className: "col-lg-7 hero-reveal hero-reveal-left" },
              React.createElement(
                "span",
                { className: "eyebrow" },
                "THIRD-YEAR COMPUTER ENGINEERING STUDENT",
              ),
              React.createElement(
                "h1",
                { className: "hero-title" },
                "Hi, I'm ",
                React.createElement(
                  "span",
                  { className: "gradient-text" },
                  "Kailas Mutkule",
                ),
                ".",
              ),
              React.createElement(
                "p",
                { className: "hero-subtitle" },
                "I build clean, responsive and practical web applications with the MERN stack.",
              ),
              React.createElement(
                "div",
                { className: "d-flex flex-wrap gap-3 mt-4" },
                React.createElement(
                  "button",
                  {
                    className: "btn btn-primary-custom",
                    onClick: () => scrollTo("projects"),
                  },
                  "View My Work",
                ),
                React.createElement(
                  "button",
                  {
                    className: "btn btn-outline-light-custom",
                    onClick: () => scrollTo("contact"),
                  },
                  "Contact Me",
                ),
              ),
              React.createElement(
                "div",
                { className: "hero-stats mt-5" },
                React.createElement(
                  "div",
                  null,
                  React.createElement("strong", null, "8.5"),
                  React.createElement("span", null, "CGPA"),
                ),
                React.createElement(
                  "div",
                  null,
                  React.createElement("strong", null, "87.30%"),
                  React.createElement("span", null, "Diploma"),
                ),
                React.createElement(
                  "div",
                  null,
                  React.createElement("strong", null, "MERN"),
                  React.createElement("span", null, "Stack"),
                ),
              ),
            ),
            React.createElement(
              "div",
              { className: "col-lg-5 hero-reveal hero-reveal-right" },
              React.createElement(
                "div",
                { className: "hero-card" },
                React.createElement("div", { className: "orb orb-one" }),
                React.createElement("div", { className: "orb orb-two" }),
                React.createElement(
                  "div",
                  { className: "profile-photo-wrap" },
                  React.createElement("img", {
                    src: "./assets/kailas-profile.png",
                    alt: "Kailas Mutkule - Computer Engineering student and Full-Stack Developer",
                    className: "profile-photo",
                  }),
                ),
                React.createElement(
                  "div",
                  { className: "code-card" },
                  React.createElement(
                    "div",
                    { className: "code-top" },
                    React.createElement("span", null, "● ● ●"),
                  ),
                  React.createElement(
                    "pre",
                    null,
                    React.createElement(
                      "code",
                      null,
                      `const developer = {
  name: "Kailas",
  role: "Full-Stack Developer",
  stack: ["MongoDB", "Express",
          "React", "Node.js"],
  goal: "Software Engineer"
};`,
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),

      React.createElement(
        "section",
        { id: "about", className: "section-padding reveal-on-scroll" },
        React.createElement(
          "div",
          { className: "container" },
          React.createElement("p", { className: "section-label" }, "ABOUT ME"),
          React.createElement(
            "h2",
            { className: "section-title" },
            "Turning ideas into useful applications.",
          ),
          React.createElement(
            "div",
            { className: "row g-5 mt-2" },
            React.createElement(
              "div",
              { className: "col-lg-8" },
              React.createElement(
                "p",
                { className: "about-text" },
                "Hi, I'm Kailas Mutkule, a third-year Computer Engineering student at ISBM College of Engineering, affiliated with Savitribai Phule Pune University, with a current CGPA of 8.5. I'm passionate about Full-Stack Web Development and enjoy building applications that solve real-world problems.",
              ),
              React.createElement(
                "p",
                { className: "about-text" },
                "I completed my Diploma in Computer Engineering from Government Polytechnic Nagpur with 87.30%. My diploma final-year project focused on Real-Time Data Processing using Java, Apache Flink, Apache Kafka, and Ubuntu, where I gained practical experience in stream processing and data analytics.",
              ),
              React.createElement(
                "p",
                { className: "about-text" },
                "During my internship at RB Tech Services, I developed Wanderlust, a full-stack web application where users can list hotels, explore properties, make bookings, and share reviews. This project strengthened my skills in Java, JavaScript, Node.js, Express.js, MongoDB, SQL, HTML, CSS, Git, and REST APIs.",
              ),
              React.createElement(
                "p",
                { className: "about-text" },
                "I'm continuously improving my problem-solving skills, learning Data Structures & Algorithms, and building projects to prepare for a Software Engineer role. I'm always excited to connect with developers, recruiters, and tech enthusiasts.",
              ),
            ),
            React.createElement(
              "div",
              { className: "col-lg-4" },
              React.createElement(
                "div",
                { className: "info-card" },
                React.createElement("h5", null, "Education"),
                React.createElement("p", null, "B.E. Computer Engineering"),
                React.createElement(
                  "small",
                  null,
                  "ISBM College of Engineering",
                ),
                React.createElement("hr"),
                React.createElement(
                  "p",
                  null,
                  "Diploma in Computer Engineering",
                ),
                React.createElement(
                  "small",
                  null,
                  "Government Polytechnic Nagpur • 87.30%",
                ),
              ),
            ),
          ),
        ),
      ),

      React.createElement(
        "section",
        { id: "skills", className: "section-padding section-dark reveal-on-scroll" },
        React.createElement(
          "div",
          { className: "container" },
          React.createElement(
            "p",
            { className: "section-label" },
            "TECH STACK",
          ),
          React.createElement(
            "h2",
            { className: "section-title" },
            "Tools I work with.",
          ),
          React.createElement(
            "div",
            { className: "skills-grid mt-4" },
            skills.map((skill) =>
              React.createElement(
                "div",
                { className: "skill-pill", key: skill },
                skill,
              ),
            ),
          ),
        ),
      ),

      React.createElement(
        "section",
        { id: "projects", className: "section-padding reveal-on-scroll" },
        React.createElement(
          "div",
          { className: "container" },
          React.createElement("p", { className: "section-label" }, "PROJECTS"),
          React.createElement(
            "h2",
            { className: "section-title" },
            "Things I've built.",
          ),
          React.createElement(
            "div",
            { className: "filter-buttons mt-4 mb-4" },
            ["All", "Full Stack", "Data Engineering", "Web Development"].map(
              (item) =>
                React.createElement(
                  "button",
                  {
                    key: item,
                    className: `filter-btn ${filter === item ? "active" : ""}`,
                    onClick: () => setFilter(item),
                  },
                  item,
                ),
            ),
          ),
          React.createElement(
            "div",
            { className: "row g-4" },
            filteredProjects.map((project) =>
              React.createElement(
                "div",
                { className: "col-md-6 col-lg-4", key: project.title },
                React.createElement(
                  "article",
                  { className: "project-card h-100" },
                  React.createElement(
                    "div",
                    { className: "project-icon" },
                    project.title === "Wanderlust"
                      ? "W"
                      : project.title === "Real-Time Data Processing"
                        ? "R"
                        : "P",
                  ),
                  React.createElement(
                    "span",
                    { className: "project-category" },
                    project.category,
                  ),
                  React.createElement("h3", null, project.title),
                  React.createElement("p", null, project.description),
                  React.createElement(
                    "div",
                    { className: "tech-list" },
                    project.tech.map((tech) =>
                      React.createElement("span", { key: tech }, tech),
                    ),
                  ),
                  React.createElement(
                    "div",
                    { className: "project-links" },
                    project.github !== "#" &&
                      React.createElement(
                        "a",
                        {
                          href: project.github,
                          target: "_blank",
                          rel: "noreferrer",
                        },
                        "GitHub ↗",
                      ),
                    project.live !== "#" &&
                      React.createElement(
                        "a",
                        {
                          href: project.live,
                          target: "_blank",
                          rel: "noreferrer",
                        },
                        "Live ↗",
                      ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),

      React.createElement(
        "section",
        { id: "contact", className: "section-padding section-dark reveal-on-scroll" },
        React.createElement(
          "div",
          { className: "container" },
          React.createElement("p", { className: "section-label" }, "CONTACT"),
          React.createElement(
            "h2",
            { className: "section-title" },
            "Let's build something together.",
          ),
          React.createElement(
            "div",
            { className: "row g-5 mt-2" },
            React.createElement(
              "div",
              { className: "col-lg-5" },
              React.createElement(
                "p",
                { className: "about-text" },
                "Have an opportunity, project idea, or just want to connect? Send me a message or reach me directly.",
              ),
              React.createElement(
                "div",
                { className: "contact-list" },
                React.createElement(
                  "a",
                  {
                    href: "mailto:kailasmutkule99@gmail.com",
                    className: "contact-item",
                  },
                  React.createElement(
                    "span",
                    { className: "contact-icon" },
                    "✉",
                  ),
                  React.createElement(
                    "div",
                    null,
                    React.createElement("small", null, "Email"),
                    React.createElement(
                      "strong",
                      null,
                      "kailasmutkule99@gmail.com",
                    ),
                  ),
                ),
                React.createElement(
                  "a",
                  { href: "tel:+919699721767", className: "contact-item" },
                  React.createElement(
                    "span",
                    { className: "contact-icon" },
                    "☎",
                  ),
                  React.createElement(
                    "div",
                    null,
                    React.createElement("small", null, "Mobile"),
                    React.createElement("strong", null, "+91 9699721767"),
                  ),
                ),
                React.createElement(
                  "div",
                  { className: "social-links-block" },
                  React.createElement("small", null, "Connect with me"),
                  React.createElement(
                    "div",
                    { className: "social-links" },
                    React.createElement(
                      "a",
                      {
                        href: "https://github.com/kailasmutkule",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "social-link",
                        "aria-label": "GitHub",
                      },
                      "GitHub ↗",
                    ),
                    React.createElement(
                      "a",
                      {
                        href: "https://www.linkedin.com/in/kailas-mutkule",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "social-link",
                        "aria-label": "LinkedIn",
                      },
                      "LinkedIn ↗",
                    ),
                    React.createElement(
                      "a",
                      {
                        href: "https://www.instagram.com/kailas_mutkule_18/",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "social-link",
                        "aria-label": "Instagram",
                      },
                      "Instagram ↗",
                    ),
                  ),
                ),
              ),
            ),
            React.createElement(
              "div",
              { className: "col-lg-7" },
              React.createElement(
                "form",
                { className: "contact-form", onSubmit: handleSubmit },
                React.createElement(
                  "div",
                  { className: "row g-3" },
                  React.createElement(
                    "div",
                    { className: "col-md-6" },
                    React.createElement(
                      "label",
                      { htmlFor: "name", className: "form-label" },
                      "Name",
                    ),
                    React.createElement("input", {
                      id: "name",
                      name: "name",
                      value: form.name,
                      onChange: handleChange,
                      className: "form-control custom-input",
                      placeholder: "Your name",
                      required: true,
                    }),
                  ),
                  React.createElement(
                    "div",
                    { className: "col-md-6" },
                    React.createElement(
                      "label",
                      { htmlFor: "email", className: "form-label" },
                      "Email",
                    ),
                    React.createElement("input", {
                      id: "email",
                      name: "email",
                      type: "email",
                      value: form.email,
                      onChange: handleChange,
                      className: "form-control custom-input",
                      placeholder: "you@example.com",
                      required: true,
                    }),
                  ),
                  React.createElement(
                    "div",
                    { className: "col-12" },
                    React.createElement(
                      "label",
                      { htmlFor: "message", className: "form-label" },
                      "Message",
                    ),
                    React.createElement("textarea", {
                      id: "message",
                      name: "message",
                      value: form.message,
                      onChange: handleChange,
                      className: "form-control custom-input",
                      rows: 5,
                      placeholder: "Tell me about your opportunity or idea...",
                      required: true,
                    }),
                  ),
                  status.text &&
                    React.createElement(
                      "div",
                      {
                        className: `alert alert-${status.type} mb-0`,
                        role: "alert",
                      },
                      status.text,
                    ),
                  React.createElement(
                    "div",
                    { className: "col-12" },
                    React.createElement(
                      "button",
                      {
                        type: "submit",
                        className: "btn btn-primary-custom",
                        disabled: sending,
                      },
                      sending ? "Sending..." : "Send Message",
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    ),

    React.createElement(
      "footer",
      { className: "footer" },
      React.createElement(
        "div",
        {
          className:
            "container d-flex flex-column flex-md-row justify-content-between gap-2",
        },
        React.createElement(
          "span",
          null,
          "© 2026 Kailas Mutkule. All rights reserved.",
        ),
        React.createElement(
          "button",
          { className: "back-top", onClick: () => scrollTo("home") },
          "Back to top ↑",
        ),
      ),
    ),
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  React.createElement(App),
);
