
import { useState } from "react";
import "./styles.css";

const initialServices = [
  { name: "React Frontend", type: "Docker Container", status: "Healthy", port: "8081" },
  { name: "Jenkins CI/CD", type: "Build Automation", status: "Healthy", port: "8080" },
  { name: "Prometheus", type: "Metrics Collection", status: "Pending", port: "9090" },
  { name: "Grafana", type: "Monitoring Dashboard", status: "Pending", port: "3000" },
];

const pipeline = [
  { name: "Source", detail: "GitHub repository", icon: "01" },
  { name: "Build", detail: "React production build", icon: "02" },
  { name: "Package", detail: "Docker image creation", icon: "03" },
  { name: "Deploy", detail: "EC2 container deployment", icon: "04" },
];

function App() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [services, setServices] = useState(initialServices);

  const healthyCount = services.filter(
    (service) => service.status === "Healthy"
  ).length;

  function simulateDeployment() {
    setServices((current) =>
      current.map((service, index) =>
        index === 0
          ? { ...service, status: "Healthy" }
          : service
      )
    );
    setActiveTab("Pipeline");
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#overview">
          <span className="brand-mark">D</span>
          <span>DevOps<span className="brand-light">Flow</span></span>
        </a>

        <div className="workspace">
          <span className="workspace-icon">⌘</span>
          <div>
            <strong>Demo Project</strong>
            <small>Production environment</small>
          </div>
          <span className="chevron">⌄</span>
        </div>

        <p className="nav-label">WORKSPACE</p>
        <nav className="navigation">
          {[
            ["Overview", "◫"],
            ["Pipeline", "⇢"],
            ["Services", "▤"],
          ].map(([label, icon]) => (
            <button
              key={label}
              className={`nav-item ${activeTab === label ? "active" : ""}`}
              onClick={() => setActiveTab(label)}
            >
              <span>{icon}</span>{label}
              {label === "Services" && (
                <span className="nav-count">{services.length}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="connection-dot" />
          <div>
            <strong>EC2 Environment</strong>
            <small>Demo configuration</small>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> {activeTab}</div>
          <div className="top-actions">
            <span className="environment-tag">
              <span className="status-dot" /> DEVELOPMENT
            </span>
            <div className="avatar">DV</div>
          </div>
        </header>

        <section className="page-content">
          <div className="page-heading">
            <div>
              <p className="eyebrow">INFRASTRUCTURE OVERVIEW</p>
              <h1>{activeTab === "Overview" ? "Abhinav's TE-IT-B Project" : activeTab}</h1>
              <p className="subtitle">
                Your deployment workspace at a glance.
              </p>
            </div>
            <button className="primary-button" onClick={simulateDeployment}>
              <span>↻</span> View deployment
            </button>
          </div>

          {activeTab === "Overview" && (
            <>
              <div className="welcome-banner">
                <div className="welcome-copy">
                  <span className="banner-label">YOUR DEVOPS WORKSPACE</span>
                  <h2>Build. Ship. Monitor.Play</h2>
                  <p>
                    A central place to track your application, deployment
                    workflow and infrastructure services.
                  </p>
                  <button
                    className="banner-button"
                    onClick={() => setActiveTab("Pipeline")}
                  >
                    Explore pipeline <span>→</span>
                  </button>
                </div>
                <div className="banner-art" aria-hidden="true">
                  <div className="orbit orbit-one" />
                  <div className="orbit orbit-two" />
                  <div className="terminal-window">
                    <div className="terminal-top">
                      <i /><i /><i />
                    </div>
                    <div className="terminal-body">
                      <p><span>$</span> git push origin main</p>
                      <p className="terminal-green">✓ Build completed</p>
                      <p className="terminal-green">✓ Image packaged</p>
                      <p><span>$</span> deploy --target ec2</p>
                      <div className="terminal-cursor" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="section-heading">
                <div>
                  <h2>System overview</h2>
                  <p>Summary of your project environment</p>
                </div>
                <span className="demo-label">DEMO DATA</span>
              </div>

              <div className="stats-grid">
                <StatCard
                  label="Total services"
                  value={services.length}
                  note="Application & tooling"
                  icon="▦"
                  color="blue"
                />
                <StatCard
                  label="Healthy services"
                  value={`${healthyCount}/${services.length}`}
                  note="Demo status only"
                  icon="✓"
                  color="green"
                />
                <StatCard
                  label="Pipeline stages"
                  value="4"
                  note="Source to deployment"
                  icon="⇢"
                  color="purple"
                />
                <StatCard
                  label="Deployment target"
                  value="EC2"
                  note="Ubuntu environment"
                  icon="⌘"
                  color="orange"
                />
              </div>

              <div className="content-grid">
                <section className="panel pipeline-panel">
                  <div className="panel-heading">
                    <div>
                      <h2>CI/CD workflow</h2>
                      <p>From code commit to deployment</p>
                    </div>
                    <button
                      className="text-button"
                      onClick={() => setActiveTab("Pipeline")}
                    >
                      View details →
                    </button>
                  </div>

                  <div className="pipeline-list">
                    {pipeline.map((step, index) => (
                      <div className="pipeline-step" key={step.name}>
                        <div className={`step-number step-${index + 1}`}>
                          {step.icon}
                        </div>
                        <div className="step-info">
                          <strong>{step.name}</strong>
                          <small>{step.detail}</small>
                        </div>
                        <span className="step-arrow">
                          {index === pipeline.length - 1 ? "●" : "→"}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="panel services-panel">
                  <div className="panel-heading">
                    <div>
                      <h2>Services</h2>
                      <p>Configured project components</p>
                    </div>
                    <button
                      className="icon-button"
                      onClick={() => setActiveTab("Services")}
                      aria-label="View all services"
                    >
                      ↗
                    </button>
                  </div>
                  <ServiceList services={services.slice(0, 3)} />
                  <button
                    className="full-width-button"
                    onClick={() => setActiveTab("Services")}
                  >
                    View all services
                  </button>
                </section>
              </div>
            </>
          )}

          {activeTab === "Pipeline" && (
            <section className="panel detail-panel">
              <div className="panel-heading">
                <div>
                  <h2>Deployment workflow</h2>
                  <p>Expected stages in your Jenkins pipeline</p>
                </div>
                <span className="demo-label">ILLUSTRATIVE</span>
              </div>
              {pipeline.map((step, index) => (
                <div className="detail-step" key={step.name}>
                  <div className={`step-number step-${index + 1}`}>
                    {step.icon}
                  </div>
                  <div className="step-info">
                    <strong>{step.name}</strong>
                    <small>{step.detail}</small>
                    <p>
                      {[
                        "Jenkins checks out the latest source from GitHub.",
                        "The pipeline installs dependencies and builds React.",
                        "Docker packages the production build into an image.",
                        "Jenkins deploys the new container on EC2.",
                      ][index]}
                    </p>
                  </div>
                  <span className="status-pill neutral">Planned</span>
                </div>
              ))}
              <p className="footnote">
                This view describes the intended workflow. It does not read
                live Jenkins build results.
              </p>
            </section>
          )}

          {activeTab === "Services" && (
            <section className="panel detail-panel">
              <div className="panel-heading">
                <div>
                  <h2>Project services</h2>
                  <p>Components planned for the EC2 environment</p>
                </div>
                <span className="demo-label">DEMO DATA</span>
              </div>
              <ServiceList services={services} detailed />
              <p className="footnote">
                Statuses are local demonstration values, not actual health checks.
                Monitoring integrations will be added separately.
              </p>
            </section>
          )}

          <footer className="footer">
            <span>DevOpsFlow <span className="footer-separator">•</span> React Dashboard</span>
            <span>Built for CI/CD learning</span>
          </footer>
        </section>
      </main>
    </div>
  );
}

function StatCard({ label, value, note, icon, color }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>{icon}</div>
      <p className="stat-label">{label}</p>
      <div className="stat-value">{value}</div>
      <p className="stat-note">{note}</p>
    </div>
  );
}

function ServiceList({ services, detailed = false }) {
  return (
    <div className="service-list">
      {services.map((service) => (
        <div className="service-row" key={service.name}>
          <div className="service-icon">▣</div>
          <div className="service-info">
            <strong>{service.name}</strong>
            <small>{service.type}{detailed ? ` · Port ${service.port}` : ""}</small>
          </div>
          <span
            className={`status-pill ${service.status === "Healthy" ? "healthy" : "neutral"
              }`}
          >
            <span /> {service.status}
          </span>
        </div>
      ))}
    </div>
  );
}

export default App;
