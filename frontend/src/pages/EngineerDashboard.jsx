import { useState } from "react";
import { CheckCircle, ClipboardEdit, Upload } from "lucide-react";
import { JobCard } from "../components/DashboardList";

const sampleJobs = [
  { id: "JOB-201", publicId: "YOG-8201", issueType: "Water leak", postcode: "CM7 3DP", urgency: "Emergency", status: "Assigned", customer: { name: "Mrs Taylor", phone: "07593 217699" } },
  { id: "JOB-202", publicId: "YOG-8202", issueType: "Annual service", postcode: "CM77 7WT", urgency: "This week", status: "Scheduled", customer: { name: "Great Notley Offices", phone: "07593 217699" } }
];

export default function EngineerDashboard() {
  const [jobs, setJobs] = useState(sampleJobs);

  const markComplete = (id) => {
    setJobs((current) => current.map((job) => job.id === id ? { ...job, status: "Complete" } : job));
  };

  return (
    <section className="dashboard-page">
      <div className="page-heading">
        <span className="eyebrow">Engineer area foundation</span>
        <h1>Assigned jobs</h1>
        <p>Engineers can see the customer problem summary, postcode, call link, status and notes foundation.</p>
      </div>

      <div className="panel-grid two">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            actions={(
              <>
                <button className="mini-button" type="button"><ClipboardEdit size={16} aria-hidden="true" /> Notes</button>
                <button className="mini-button" type="button"><Upload size={16} aria-hidden="true" /> Photos</button>
                <button className="mini-button success" type="button" onClick={() => markComplete(job.id)}><CheckCircle size={16} aria-hidden="true" /> Complete</button>
              </>
            )}
          />
        ))}
      </div>
    </section>
  );
}
