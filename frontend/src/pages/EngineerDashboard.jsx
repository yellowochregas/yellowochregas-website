import { useEffect, useState } from "react";
import { CheckCircle, ClipboardEdit, FileText, Upload } from "lucide-react";
import { EmptyState, JobCard } from "../components/DashboardList";
import { useAuth } from "../context/AuthContext";
import { getEngineerReport, getMyEngineerJobs, updateEngineerJob } from "../services/api";

export default function EngineerDashboard() {
  const { token } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState({ loading: true, message: "" });

  useEffect(() => {
    let active = true;

    async function loadJobs() {
      try {
        const data = await getMyEngineerJobs(token);
        if (active) setJobs(Array.isArray(data) ? data : []);
      } catch {
        if (active) setStatus({ loading: false, message: "Could not load assigned jobs." });
        return;
      }

      if (active) setStatus({ loading: false, message: "" });
    }

    loadJobs();
    return () => {
      active = false;
    };
  }, [token]);

  const updateJob = async (id, payload) => {
    setStatus({ loading: false, message: "Updating job..." });
    try {
      const updated = await updateEngineerJob(token, id, payload);
      setJobs((current) => current.map((job) => job._id === id ? updated : job));
      setStatus({ loading: false, message: "Job updated." });
    } catch {
      setStatus({ loading: false, message: "Update failed. You can only manage jobs assigned to you." });
    }
  };

  const addNote = (id) => {
    const note = window.prompt("Add a short job note");
    if (note) updateJob(id, { note });
  };

  const addPhotoNote = (id) => {
    const photoUrl = window.prompt("Paste a photo URL or storage link");
    if (photoUrl) updateJob(id, { photoUrl, photoCaption: "Engineer completion evidence" });
  };

  const downloadReport = async (id) => {
    try {
      const report = await getEngineerReport(token, id);
      const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${report.reportId || "yellow-ochre-service-report"}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      setStatus({ loading: false, message: "Report could not be generated for this job." });
    }
  };

  return (
    <section className="dashboard-page">
      <div className="page-heading">
        <span className="eyebrow">Engineer area foundation</span>
        <h1>Assigned jobs</h1>
        <p>Engineers can see the customer problem summary, postcode, call link, status and notes foundation.</p>
        {status.message && <p className="quote-submit-state offline" role="status">{status.message}</p>}
      </div>

      <div className="panel-grid two">
        {status.loading ? (
          <EmptyState title="Loading assigned jobs" text="Checking your current Yellow Ochre Gas jobs." />
        ) : jobs.length ? jobs.map((job) => {
          const booking = job.booking || {};
          return (
          <JobCard
            key={job._id}
            job={{
              ...job,
              publicId: booking.publicId || job._id,
              issueType: booking.issueType,
              postcode: booking.postcode,
              urgency: booking.urgency,
              customer: booking.customer
            }}
            actions={(
              <>
                <button className="mini-button" type="button" onClick={() => addNote(job._id)}><ClipboardEdit size={16} aria-hidden="true" /> Notes</button>
                <button className="mini-button" type="button" onClick={() => addPhotoNote(job._id)}><Upload size={16} aria-hidden="true" /> Photos</button>
                <button className="mini-button" type="button" onClick={() => downloadReport(job._id)}><FileText size={16} aria-hidden="true" /> Report</button>
                <button className="mini-button success" type="button" onClick={() => updateJob(job._id, { status: "Complete" })}><CheckCircle size={16} aria-hidden="true" /> Complete</button>
              </>
            )}
          />
          );
        }) : (
          <EmptyState title="No assigned jobs" text="Assigned jobs will appear here after admin allocation." />
        )}
      </div>
    </section>
  );
}
