const { useEffect, useState } = React;

/*
 * ============================================================
 * KAILAS MUTKULE PORTFOLIO
 * SEO-friendly React application
 * ============================================================
 */

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
    title: "SigmaGPT",
    category: "AI",
    description:
      "An AI-powered conversational web application that provides an interactive chat experience through a responsive interface with deployed frontend and backend services.",
    tech: ["React", "Vite", "Node.js", "Express.js", "AI API"],
    github: "https://github.com/kailasmutkule/SigmaGPT",
    live: "https://sigmagpt1.netlify.app/",
  },
  {
    title: "Wanderlust",
    category: "Full Stack",
    description:
      "A full-stack hotel and property platform where users can list hotels, explore properties, make bookings, and share reviews. Built using Node.js, Express.js, MongoDB, EJS and Bootstrap.",
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
      "A responsive personal portfolio website for Kailas Mutkule, built to showcase Full-Stack Development skills, projects, education, technical experience and contact information.",
    tech: ["React", "Bootstrap", "Node.js", "Express.js"],
    github: "https://github.com/kailasmutkule/kailas-portfolio",
    live: "https://kailasmutkule.netlify.app/",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({
    type: "",
    text: "",
  });

  const [sending, setSending] = useState(false);

  /*
   * ============================================================
   * PAGE TITLE + SCROLL ANIMATIONS
   * ============================================================
   */

  useEffect(() => {
    document.title =
      "Kailas Mutkule | Full-Stack Developer & Computer Engineering Student";

    const revealItems = document.querySelectorAll(
      ".reveal-on-scroll, .hero-reveal",
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
      {
        threshold: 0.12,
      },
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  /*
   * ============================================================
   * PROJECT FILTER
   * ============================================================
   */

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  /*
   * ============================================================
   * SMOOTH SCROLL
   * ============================================================
   */

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

    setMenuOpen(false);
  };

  /*
   * ============================================================
   * CONTACT FORM
   * ============================================================
   */

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({
      type: "",
      text: "",
    });

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({
        type: "danger",
        text: "Please fill in all fields.",
      });

      return;
    }

    setSending(true);

    try {
      const response = await fetch(
        "https://kailas-portfolio-backend.onrender.com/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to send message.");
      }

      setStatus({
        type: "success",
        text: data.message,
      });

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      setStatus({
        type: "warning",
        text: "Database contact form is unavailable. You can contact me directly at kailasmutkule99@gmail.com.",
      });
    } finally {
      setSending(false);
    }
  };

  /*
   * ============================================================
   * APPLICATION UI
   * ============================================================
   */

  return React.createElement(
    React.Fragment,
    null,

    /*
     * ========================================================
     * NAVIGATION
     * ========================================================
     */

    React.createElement(
      "nav",
      {
        className:
          "navbar navbar-expand-lg navbar-dark fixed-top portfolio-nav",
        "aria-label": "Main navigation",
      },

      React.createElement(
        "div",
        {
          className: "container",
        },

        React.createElement(
          "a",
          {
            className: "navbar-brand fw-bold",
            href: "#home",
            onClick: () => scrollTo("home"),
            "aria-label":
              "Kailas Mutkule - Full-Stack Developer portfolio home",
          },

          "Kailas Mutkule",

          React.createElement("span", {
            className: "brand-dot",
            "aria-hidden": "true",
          }),
        ),

        React.createElement(
          "button",
          {
            className: "navbar-toggler",
            type: "button",
            onClick: () => setMenuOpen(!menuOpen),
            "aria-label": menuOpen
              ? "Close navigation menu"
              : "Open navigation menu",
            "aria-expanded": menuOpen,
            "aria-controls": "portfolio-navigation",
          },

          React.createElement("span", {
            className: "navbar-toggler-icon",
          }),
        ),

        React.createElement(
          "div",
          {
            id: "portfolio-navigation",
            className: `collapse navbar-collapse ${menuOpen ? "show" : ""}`,
          },

          React.createElement(
            "ul",
            {
              className: "navbar-nav ms-auto align-items-lg-center gap-lg-2",
            },

            [
              ["home", "Home"],
              ["about", "About"],
              ["skills", "Skills"],
              ["projects", "Projects"],
              ["contact", "Contact"],
            ].map(([id, label]) =>
              React.createElement(
                "li",
                {
                  className: "nav-item",
                  key: id,
                },

                React.createElement(
                  "a",
                  {
                    className: "nav-link",
                    href: `#${id}`,
                    onClick: () => scrollTo(id),
                  },
                  label,
                ),
              ),
            ),
          ),
        ),
      ),
    ),

    /*
     * ============================================================
     * MAIN CONTENT
     * ============================================================
     */

    React.createElement(
      "main",
      null,

      /*
       * ========================================================
       * HERO SECTION
       * ========================================================
       */

      React.createElement(
        "section",
        {
          id: "home",
          className: "hero-section",
          "aria-labelledby": "hero-title",
        },

        React.createElement(
          "div",
          {
            className: "container",
          },

          React.createElement(
            "div",
            {
              className: "row align-items-center g-5",
            },

            React.createElement(
              "div",
              {
                className: "col-lg-7 hero-reveal hero-reveal-left",
              },

              React.createElement(
                "span",
                {
                  className: "eyebrow",
                },
                "THIRD-YEAR COMPUTER ENGINEERING STUDENT",
              ),

              React.createElement(
                "h1",
                {
                  id: "hero-title",
                  className: "hero-title",
                },

                "Hi, I'm ",

                React.createElement(
                  "span",
                  {
                    className: "gradient-text",
                  },
                  "Kailas Mutkule",
                ),

                ", a Full-Stack Developer.",
              ),

              React.createElement(
                "p",
                {
                  className: "hero-subtitle",
                },
                "I'm a Computer Engineering student and Full-Stack Developer who builds clean, responsive and practical web applications using React, Node.js, Express.js, MongoDB and modern web technologies.",
              ),

              React.createElement(
                "div",
                {
                  className: "d-flex flex-wrap gap-3 mt-4",
                },

                React.createElement(
                  "button",
                  {
                    className: "btn btn-primary-custom",
                    onClick: () => scrollTo("projects"),
                    type: "button",
                  },
                  "View My Work",
                ),

                React.createElement(
                  "button",
                  {
                    className: "btn btn-outline-light-custom",
                    onClick: () => scrollTo("contact"),
                    type: "button",
                  },
                  "Contact Me",
                ),
              ),

              React.createElement(
                "div",
                {
                  className: "hero-stats mt-5",
                  "aria-label": "Academic and technical highlights",
                },

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

            /*
             * PROFILE PHOTO
             */

            React.createElement(
              "div",
              {
                className: "col-lg-5 hero-reveal hero-reveal-right",
              },

              React.createElement(
                "div",
                {
                  className: "hero-card",
                },

                React.createElement("div", {
                  className: "orb orb-one",
                  "aria-hidden": "true",
                }),

                React.createElement("div", {
                  className: "orb orb-two",
                  "aria-hidden": "true",
                }),

                React.createElement(
                  "div",
                  {
                    className: "profile-photo-wrap",
                  },

                  React.createElement("img", {
                    src: "./assets/kailas-profile.png",
                    alt: "Kailas Mutkule, Computer Engineering student and Full-Stack Developer",
                    className: "profile-photo",
                    loading: "eager",
                    decoding: "async",
                    width: "500",
                    height: "500",
                  }),
                ),

                React.createElement(
                  "div",
                  {
                    className: "code-card",
                    "aria-label": "Kailas Mutkule developer profile",
                  },

                  React.createElement(
                    "div",
                    {
                      className: "code-top",
                      "aria-hidden": "true",
                    },

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

      /*
       * ========================================================
       * ABOUT SECTION
       * ========================================================
       */

      React.createElement(
        "section",
        {
          id: "about",
          className: "section-padding about-section reveal-on-scroll",
          "aria-labelledby": "about-title",
        },

        React.createElement(
          "div",
          {
            className: "container",
          },

          React.createElement(
            "div",
            {
              className: "about-heading reveal-child",
            },

            React.createElement(
              "div",
              {
                className: "section-label",
              },
              "ABOUT ME",
            ),

            React.createElement(
              "h2",
              {
                id: "about-title",
                className: "section-title",
              },
              "Turning Ideas Into Practical Technology",
            ),

            React.createElement("div", {
              className: "section-accent",
              "aria-hidden": "true",
            }),
          ),

          React.createElement(
            "div",
            {
              className: "row g-5 mt-3 align-items-start",
            },

            /*
             * ABOUT CONTENT
             */

            React.createElement(
              "div",
              {
                className: "col-lg-7",
              },

              React.createElement(
                "div",
                {
                  className: "about-content-card",
                },

                React.createElement(
                  "div",
                  {
                    className: "about-intro",
                  },

                  React.createElement(
                    "span",
                    {
                      className: "about-number",
                    },
                    "01",
                  ),

                  React.createElement(
                    "p",
                    {
                      className: "about-text about-highlight",
                    },
                    "I'm Kailas Mutkule, a third-year Computer Engineering student at ISBM College of Engineering, affiliated with Savitribai Phule Pune University, with a current CGPA of 8.5. I'm passionate about Full-Stack Web Development and enjoy building practical applications that solve real-world problems.",
                  ),
                ),

                React.createElement(
                  "div",
                  {
                    className: "about-item",
                  },

                  React.createElement(
                    "span",
                    {
                      className: "about-number",
                    },
                    "02",
                  ),

                  React.createElement(
                    "p",
                    {
                      className: "about-text",
                    },
                    "I completed my Diploma in Computer Engineering from Government Polytechnic Nagpur with 87.30%. My diploma final-year project focused on Real-Time Data Processing using Java, Apache Flink, Apache Kafka, and Ubuntu, where I gained practical experience in stream processing and data analytics.",
                  ),
                ),

                React.createElement(
                  "div",
                  {
                    className: "about-item",
                  },

                  React.createElement(
                    "span",
                    {
                      className: "about-number",
                    },
                    "03",
                  ),

                  React.createElement(
                    "p",
                    {
                      className: "about-text",
                    },
                    "During my internship at RB Tech Services, I developed Wanderlust, a full-stack web application where users can list hotels, explore properties, make bookings, and share reviews. This project strengthened my skills in Java, JavaScript, Node.js, Express.js, MongoDB, SQL, HTML, CSS, Git, and REST APIs.",
                  ),
                ),

                React.createElement(
                  "div",
                  {
                    className: "about-item",
                  },

                  React.createElement(
                    "span",
                    {
                      className: "about-number",
                    },
                    "04",
                  ),

                  React.createElement(
                    "p",
                    {
                      className: "about-text",
                    },
                    "I'm continuously improving my problem-solving skills, learning Data Structures & Algorithms, and building projects to prepare for a Software Engineer role. I'm always excited to connect with developers, recruiters, and tech enthusiasts.",
                  ),
                ),
              ),
            ),

            /*
             * EDUCATION TIMELINE
             */

            React.createElement(
              "div",
              {
                className: "col-lg-5",
              },

              React.createElement(
                "div",
                {
                  className: "education-wrapper",
                },

                React.createElement(
                  "div",
                  {
                    className: "education-heading",
                  },

                  React.createElement(
                    "span",
                    {
                      className: "education-icon",
                      "aria-hidden": "true",
                    },
                    "🎓",
                  ),

                  React.createElement(
                    "div",
                    null,

                    React.createElement(
                      "span",
                      {
                        className: "education-label",
                      },
                      "EDUCATION",
                    ),

                    React.createElement("h3", null, "Academic Journey"),
                  ),
                ),

                React.createElement(
                  "div",
                  {
                    className: "education-timeline",
                  },

                  /*
                   * B.E.
                   */

                  React.createElement(
                    "article",
                    {
                      className: "education-card",
                    },

                    React.createElement("div", {
                      className: "education-dot",
                      "aria-hidden": "true",
                    }),

                    React.createElement(
                      "div",
                      {
                        className: "education-card-top",
                      },

                      React.createElement(
                        "span",
                        {
                          className: "education-year",
                        },
                        "2024 – 2028",
                      ),

                      React.createElement(
                        "span",
                        {
                          className: "education-status",
                        },
                        "CURRENT",
                      ),
                    ),

                    React.createElement(
                      "h4",
                      null,
                      "B.E. Computer Engineering",
                    ),

                    React.createElement(
                      "p",
                      {
                        className: "education-institute",
                      },
                      "ISBM College of Engineering",
                    ),

                    React.createElement(
                      "p",
                      {
                        className: "education-university",
                      },
                      "Affiliated with Savitribai Phule Pune University",
                    ),

                    React.createElement(
                      "div",
                      {
                        className: "education-result",
                      },

                      React.createElement("strong", null, "8.5"),

                      React.createElement("span", null, "Current CGPA"),
                    ),
                  ),

                  /*
                   * Diploma
                   */

                  React.createElement(
                    "article",
                    {
                      className: "education-card",
                    },

                    React.createElement("div", {
                      className: "education-dot",
                      "aria-hidden": "true",
                    }),

                    React.createElement(
                      "div",
                      {
                        className: "education-card-top",
                      },

                      React.createElement(
                        "span",
                        {
                          className: "education-year",
                        },
                        "2022 – 2024",
                      ),

                      React.createElement(
                        "span",
                        {
                          className: "education-status completed",
                        },
                        "COMPLETED",
                      ),
                    ),

                    React.createElement(
                      "h4",
                      null,
                      "Diploma in Computer Engineering",
                    ),

                    React.createElement(
                      "p",
                      {
                        className: "education-institute",
                      },
                      "Government Polytechnic Nagpur",
                    ),

                    React.createElement(
                      "p",
                      {
                        className: "education-university",
                      },
                      "Computer Engineering",
                    ),

                    React.createElement(
                      "div",
                      {
                        className: "education-result",
                      },

                      React.createElement("strong", null, "87.30%"),

                      React.createElement("span", null, "Final Percentage"),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),

      /*
       * ========================================================
       * SKILLS SECTION
       * ========================================================
       */

      React.createElement(
        "section",
        {
          id: "skills",
          className: "section-padding section-dark reveal-on-scroll",
          "aria-labelledby": "skills-title",
        },

        React.createElement(
          "div",
          {
            className: "container",
          },

          React.createElement(
            "p",
            {
              className: "section-label",
            },
            "TECH STACK",
          ),

          React.createElement(
            "h2",
            {
              id: "skills-title",
              className: "section-title",
            },
            "Technical Skills & Technologies",
          ),

          React.createElement(
            "div",
            {
              className: "skills-grid mt-4",
              role: "list",
              "aria-label": "Kailas Mutkule technical skills",
            },

            skills.map((skill) =>
              React.createElement(
                "div",
                {
                  className: "skill-pill",
                  key: skill,
                  role: "listitem",
                },
                skill,
              ),
            ),
          ),
        ),
      ),

      /*
       * ========================================================
       * PROJECTS SECTION
       * ========================================================
       */

      React.createElement(
        "section",
        {
          id: "projects",
          className: "section-padding reveal-on-scroll",
          "aria-labelledby": "projects-title",
        },

        React.createElement(
          "div",
          {
            className: "container",
          },

          React.createElement(
            "p",
            {
              className: "section-label",
            },
            "PROJECTS",
          ),

          React.createElement(
            "h2",
            {
              id: "projects-title",
              className: "section-title",
            },
            "Projects & Web Applications",
          ),

          React.createElement(
            "div",
            {
              className: "filter-buttons mt-4 mb-4",
              role: "group",
              "aria-label": "Filter portfolio projects",
            },

            ["All", "Full Stack", "Data Engineering", "Web Development"].map(
              (item) =>
                React.createElement(
                  "button",
                  {
                    key: item,
                    type: "button",
                    className: `filter-btn ${filter === item ? "active" : ""}`,
                    onClick: () => setFilter(item),
                    "aria-pressed": filter === item,
                  },
                  item,
                ),
            ),
          ),

          React.createElement(
            "div",
            {
              className: "row g-4",
            },

            filteredProjects.map((project) =>
              React.createElement(
                "div",
                {
                  className: "col-md-6 col-lg-4",
                  key: project.title,
                },

                React.createElement(
                  "article",
                  {
                    className: "project-card h-100",
                  },

                  React.createElement(
                    "div",
                    {
                      className: "project-icon",
                      "aria-hidden": "true",
                    },

                    project.title === "Wanderlust"
                      ? "W"
                      : project.title === "Real-Time Data Processing"
                        ? "R"
                        : project.title === "SigmaGPT"
                          ? "S"
                          : "P",
                  ),

                  React.createElement(
                    "span",
                    {
                      className: "project-category",
                    },
                    project.category,
                  ),

                  React.createElement("h3", null, project.title),

                  React.createElement("p", null, project.description),

                  React.createElement(
                    "div",
                    {
                      className: "tech-list",
                      "aria-label": `${project.title} technologies`,
                    },

                    project.tech.map((tech) =>
                      React.createElement(
                        "span",
                        {
                          key: tech,
                        },
                        tech,
                      ),
                    ),
                  ),

                  React.createElement(
                    "div",
                    {
                      className: "project-links",
                    },

                    project.github !== "#" &&
                      React.createElement(
                        "a",
                        {
                          href: project.github,
                          target: "_blank",
                          rel: "noopener noreferrer",
                          "aria-label": `View ${project.title} source code on GitHub`,
                        },
                        "GitHub ↗",
                      ),

                    project.live !== "#" &&
                      React.createElement(
                        "a",
                        {
                          href: project.live,
                          target: "_blank",
                          rel: "noopener noreferrer",
                          "aria-label": `View live ${project.title} project`,
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

      /*
       * ========================================================
       * CONTACT SECTION
       * ========================================================
       */

      React.createElement(
        "section",
        {
          id: "contact",
          className: "section-padding section-dark reveal-on-scroll",
          "aria-labelledby": "contact-title",
        },

        React.createElement(
          "div",
          {
            className: "container",
          },

          React.createElement(
            "p",
            {
              className: "section-label",
            },
            "CONTACT",
          ),

          React.createElement(
            "h2",
            {
              id: "contact-title",
              className: "section-title",
            },
            "Contact Kailas Mutkule",
          ),

          React.createElement(
            "div",
            {
              className: "row g-5 mt-2",
            },

            React.createElement(
              "div",
              {
                className: "col-lg-5",
              },

              React.createElement(
                "p",
                {
                  className: "about-text",
                },
                "Have an opportunity, project idea, or just want to connect? Send me a message or reach me directly.",
              ),

              React.createElement(
                "div",
                {
                  className: "contact-list",
                },

                React.createElement(
                  "a",
                  {
                    href: "mailto:kailasmutkule99@gmail.com",
                    className: "contact-item",
                    "aria-label": "Email Kailas Mutkule",
                  },

                  React.createElement(
                    "span",
                    {
                      className: "contact-icon",
                      "aria-hidden": "true",
                    },
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
                  {
                    href: "tel:+919699721767",
                    className: "contact-item",
                    "aria-label": "Call Kailas Mutkule",
                  },

                  React.createElement(
                    "span",
                    {
                      className: "contact-icon",
                      "aria-hidden": "true",
                    },
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
                  {
                    className: "social-links-block",
                  },

                  React.createElement("small", null, "Connect with me"),

                  React.createElement(
                    "div",
                    {
                      className: "social-links",
                    },

                    React.createElement(
                      "a",
                      {
                        href: "https://github.com/kailasmutkule",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "social-link",
                        "aria-label": "Kailas Mutkule on GitHub",
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
                        "aria-label": "Kailas Mutkule on LinkedIn",
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
                        "aria-label": "Kailas Mutkule on Instagram",
                      },
                      "Instagram ↗",
                    ),
                  ),
                ),
              ),
            ),

            React.createElement(
              "div",
              {
                className: "col-lg-7",
              },

              React.createElement(
                "form",
                {
                  className: "contact-form",
                  onSubmit: handleSubmit,
                  "aria-label": "Contact Kailas Mutkule",
                },

                React.createElement(
                  "div",
                  {
                    className: "row g-3",
                  },

                  React.createElement(
                    "div",
                    {
                      className: "col-md-6",
                    },

                    React.createElement(
                      "label",
                      {
                        htmlFor: "name",
                        className: "form-label",
                      },
                      "Name",
                    ),

                    React.createElement("input", {
                      id: "name",
                      name: "name",
                      value: form.name,
                      onChange: handleChange,
                      className: "form-control custom-input",
                      placeholder: "Your name",
                      autoComplete: "name",
                      required: true,
                    }),
                  ),

                  React.createElement(
                    "div",
                    {
                      className: "col-md-6",
                    },

                    React.createElement(
                      "label",
                      {
                        htmlFor: "email",
                        className: "form-label",
                      },
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
                      autoComplete: "email",
                      required: true,
                    }),
                  ),

                  React.createElement(
                    "div",
                    {
                      className: "col-12",
                    },

                    React.createElement(
                      "label",
                      {
                        htmlFor: "message",
                        className: "form-label",
                      },
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
                        "aria-live": "polite",
                      },
                      status.text,
                    ),

                  React.createElement(
                    "div",
                    {
                      className: "col-12",
                    },

                    React.createElement(
                      "button",
                      {
                        type: "submit",
                        className: "btn btn-primary-custom",
                        disabled: sending,
                        "aria-busy": sending,
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

    /*
     * ============================================================
     * FOOTER
     * ============================================================
     */

    React.createElement(
      "footer",
      {
        className: "footer",
      },

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
          {
            className: "back-top",
            onClick: () => scrollTo("home"),
            type: "button",
            "aria-label": "Back to top of page",
          },
          "Back to top ↑",
        ),
      ),
    ),
  );
}

/*
 * ============================================================
 * RENDER APPLICATION
 * ============================================================
 */

ReactDOM.createRoot(document.getElementById("root")).render(
  React.createElement(App),
);
