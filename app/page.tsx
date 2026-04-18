'use client'
import { useState } from 'react';
import { submitReflection } from './actions';

export default function TutorReflection() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selfAssessment, setSelfAssessment] = useState('');

  const nextStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(step + 1);
  };
  const prevStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(step - 1);
  };

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    try {
      await submitReflection(formData);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      console.error(e);
      alert("Submission failed. Check your Supabase RLS policies and terminal logs.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <main>
        <div id="success-screen" style={{ display: 'block' }}>
          <div className="success-icon">✓</div>
          <h2>Thank you for your honesty.</h2>
          <p>Your reflection has been submitted and received by the Gradely team.</p>
          <p style={{ marginTop: '14px', fontSize: '.83rem', color: 'var(--ink-muted)' }}>
            You can now close this tab.
          </p>
        </div>
      </main>
    );
  }

  return (
    <>
      <div id="pb-wrap">
        <div id="pb" style={{ width: `${(step / 7) * 100}%` }}></div>
      </div>

      <header>
        <div className="logo">Gradely <span>·</span> Tutor Reflection</div>
        <div className="step-ind">Section <strong>{step}</strong> of <strong>7</strong></div>
      </header>

      <main>
        <form action={handleSubmit}>

          {/* ═══════ SECTION 0 · INTRO ═══════ */}
          <section className={`fs ${step === 0 ? 'active' : ''}`}>
            <div className="intro-card">
              <h1>This is not a test.<br /><em>Not a performance review.</em></h1>
              <p className="intro-body">This reflection is designed to understand how you think during your sessions, your decisions, and your challenges.</p>
              <ul className="intro-bullets">
                <li>Your effectiveness as a tutor</li>
                <li>Learner outcomes</li>
                <li>The tutoring system</li>
              </ul>
              <p className="intro-note">Takes roughly 15–20 mins. Confidential.</p>
            </div>

            <div style={{ marginTop: '28px' }}>
              <div className="name-card">
                <div className="q-label">Before you begin</div>
                <div className="q-text">Your full name<span className="req">*</span></div>
                <input type="text" name="tutor_name" required={step === 0} placeholder="Enter your full name" />
                <div style={{ marginTop: '18px' }}>
                  <div className="q-text">Your email address<span className="req">*</span></div>
                  <input type="email" name="tutor_email" required={step === 0} placeholder="e.g. yourname@example.com" />
                </div>
              </div>
            </div>

            <div className="nav-row" style={{ justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-primary" onClick={nextStep}>
                Begin Reflection <ArrowRight />
              </button>
            </div>
          </section>

          {/* ═══════ SECTION 1 · REAL SESSION ═══════ */}
          <section className={`fs ${step === 1 ? 'active' : ''}`}>
            <div className="sec-label">Section 1</div>
            <div className="sec-title">Real Session Reflection</div>
            <div className="sec-sub">Think back across your recent sessions.</div>

            <div className="qb">
              <div className="q-label">Question 1</div>
              <div className="q-text">Which of your last 3 sessions felt most effective, and what made it work?<span className="req">*</span></div>
              <textarea name="s1_effective_session" className="long" required={step === 1}></textarea>
            </div>

            <div className="qb">
              <div className="q-label">Question 2</div>
              <div className="q-text">Think about a session that did not go as planned. Walk us through it.<span className="req">*</span></div>
              <textarea name="s1_failed_session" className="long" required={step === 1}></textarea>
            </div>

            <div className="qb">
              <div className="q-label">Question 3</div>
              <div className="q-text">At what point during a session do you feel most unsure?<span className="req">*</span></div>
              <textarea name="s1_unsure_moments" className="short" required={step === 1}></textarea>
            </div>

            <div className="nav-row">
              <button type="button" className="btn btn-secondary" onClick={prevStep}><ArrowLeft /> Back</button>
              <button type="button" className="btn btn-primary" onClick={nextStep}>Continue <ArrowRight /></button>
            </div>
          </section>

          {/* ═══════ SECTION 2 · SCENARIOS ═══════ */}
          <section className={`fs ${step === 2 ? 'active' : ''}`}>
            <div className="sec-label">Section 2</div>
            <div className="sec-title">Scenario Thinking</div>

            <div className="sc-card">
              <div className="sc-head"><span className="sc-num">Scenario 1</span><span className="sc-title">"I understand," but results don't show it</span></div>
              <div className="sc-body">
                <div className="q-label">Your reading of the situation</div>
                <textarea name="s2_sc1_reading" className="short"></textarea>
                <div className="q-label">Your next steps</div>
                <textarea name="s2_sc1_steps"></textarea>
              </div>
            </div>

            <div className="sc-card">
              <div className="sc-head"><span className="sc-num">Scenario 2</span><span className="sc-title">Learner is lost mid-session</span></div>
              <div className="sc-body">
                <div className="q-label">Your decision</div>
                <textarea name="s2_sc2_decision" className="short"></textarea>
                <div className="q-label">Immediate action</div>
                <textarea name="s2_sc2_action" className="short"></textarea>
              </div>
            </div>

            <div className="sc-card" style={{ borderColor: '#f4c4b8' }}>
              <div className="sc-head" style={{ background: '#3d1a0f' }}>
                <span className="sc-num" style={{ background: 'var(--warm)', color: 'white' }}>Scenario 3</span>
                <span className="sc-title">Back-to-back sessions. Limited prep time.</span>
              </div>
              <div className="sc-body">
                <div className="q-label">Honest description</div>
                <textarea name="s2_sc3_reality"></textarea>
                <div className="q-label">What you prioritize</div>
                <textarea name="s2_sc3_priorities" className="short"></textarea>
              </div>
            </div>

            <div className="nav-row">
              <button type="button" className="btn btn-secondary" onClick={prevStep}><ArrowLeft /> Back</button>
              <button type="button" className="btn btn-primary" onClick={nextStep}>Continue <ArrowRight /></button>
            </div>
          </section>

          {/* ═══════ SECTION 3 · HUMAN DYNAMICS ═══════ */}
          <section className={`fs ${step === 3 ? 'active' : ''}`}>
            <div className="sec-label">Section 3</div>
            <div className="sec-title">Human Dynamics</div>

            <div className="qb">
              <div className="q-label">Question 1. The Difficult Learner</div>
              <div className="q-text">How did you handle a learner who was hard to engage?<span className="req">*</span></div>
              <textarea name="s3_difficult_learner" className="long" required={step === 3}></textarea>
            </div>

            <div className="qb">
              <div className="q-label">Question 2. Parent Expectations</div>
              <div className="q-text">How do you handle high or unclear parent expectations?<span className="req">*</span></div>
              <textarea name="s3_parent_expectations" required={step === 3}></textarea>
            </div>

            <div className="qb">
              <div className="q-label">Question 3. Hardest Situation</div>
              <div className="q-text">What situation do you find hardest to manage?<span className="req">*</span></div>
              <textarea name="s3_hardest_situation" required={step === 3}></textarea>
            </div>

            <div className="nav-row">
              <button type="button" className="btn btn-secondary" onClick={prevStep}><ArrowLeft /> Back</button>
              <button type="button" className="btn btn-primary" onClick={nextStep}>Continue <ArrowRight /></button>
            </div>
          </section>

          {/* ═══════ SECTION 4 · PRESSURES ═══════ */}
          <section className={`fs ${step === 4 ? 'active' : ''}`}>
            <div className="sec-label">Section 4</div>
            <div className="sec-title">Invisible Pressures</div>
            <div className="pressure-note">These questions are confidential.</div>

            <div className="qb">
              <div className="q-label">Question 1</div>
              <div className="q-text">What part of tutoring feels most stressful that others don't see?<span className="req">*</span></div>
              <textarea name="s4_invisible_stress" required={step === 4}></textarea>
            </div>

            <div className="qb">
              <div className="q-label">Question 2</div>
              <div className="q-text">When you are not at your best, what is usually the reason?<span className="req">*</span></div>
              <textarea name="s4_off_day_reason" required={step === 4}></textarea>
            </div>

            <div className="qb">
              <div className="q-label">Question 3</div>
              <div className="q-text">What do you wish Gradely understood better?<span className="req">*</span></div>
              <textarea name="s4_gradely_understands" className="long" required={step === 4}></textarea>
            </div>

            <div className="nav-row">
              <button type="button" className="btn btn-secondary" onClick={prevStep}><ArrowLeft /> Back</button>
              <button type="button" className="btn btn-primary" onClick={nextStep}>Continue <ArrowRight /></button>
            </div>
          </section>

          {/* ═══════ SECTION 5 · SELF AWARENESS ═══════ */}
          <section className={`fs ${step === 5 ? 'active' : ''}`}>
            <div className="sec-label">Section 5</div>
            <div className="sec-title">Self-Awareness</div>

            <div className="qb">
              <div className="q-label">Question 1</div>
              <div className="q-text">What is a habit you know is not ideal, but it still happens?<span className="req">*</span></div>
              <textarea name="s5_habit" required={step === 5}></textarea>
            </div>

            <div className="qb">
              <div className="q-label">Question 2</div>
              <div className="q-text">What would a neutral observer notice about your sessions?<span className="req">*</span></div>
              <textarea name="s5_observer_notice" required={step === 5}></textarea>
            </div>

            <hr className="divider" />
            <div className="q-text">Which best describes where you are right now?<span className="req">*</span></div>

            <div className="choice-group">
              {[
                { id: 'knd', text: "I know what to do, but I don't always do it" },
                { id: 'uns', text: "I try, but I'm not always sure what to do" },
                { id: 'con', text: "I feel confident in most of my sessions" },
                { id: 'fig', text: "I am still figuring things out" }
              ].map((opt) => (
                <label key={opt.id} className={`choice-opt ${selfAssessment === opt.id ? 'selected' : ''}`}>
                  <input type="radio" name="s5_self_assessment" value={opt.id} onChange={() => setSelfAssessment(opt.id)} />
                  <div className="c-dot"></div>
                  <div className="c-text">{opt.text}</div>
                </label>
              ))}
            </div>

            {/* Follow-ups (Always present in HTML, visibility by CSS) */}
            <div className={`cond-block ${selfAssessment === 'knd' ? 'visible' : ''}`}>
              <div className="q-text">What usually gets in the way?<span className="req">*</span></div>
              <textarea name="s6_gap_reason" className="short"></textarea>
            </div>
            <div className={`cond-block ${selfAssessment === 'uns' ? 'visible' : ''}`}>
              <div className="q-text">What areas do you feel least confident in?<span className="req">*</span></div>
              <textarea name="s6_low_confidence_areas" className="short"></textarea>
            </div>
            <div className={`cond-block ${selfAssessment === 'con' ? 'visible' : ''}`}>
              <div className="q-text">What sets your sessions apart?<span className="req">*</span></div>
              <textarea name="s6_what_i_do_differently" className="short"></textarea>
            </div>
            <div className={`cond-block ${selfAssessment === 'fig' ? 'visible' : ''}`}>
              <div className="q-text">What feels most unresolved?<span className="req">*</span></div>
              <textarea name="s6_most_unclear" className="short"></textarea>
            </div>

            <div className="nav-row">
              <button type="button" className="btn btn-secondary" onClick={prevStep}><ArrowLeft /> Back</button>
              <button type="button" className="btn btn-primary" onClick={nextStep}>Continue <ArrowRight /></button>
            </div>
          </section>

          {/* ═══════ SECTION 6 · SYSTEM ═══════ */}
          <section className={`fs ${step === 6 ? 'active' : ''}`}>
            <div className="sec-label">Section 6</div>
            <div className="sec-title">System Feedback</div>

            <div className="qb">
              <div className="q-label">Question 1</div>
              <div className="q-text">What part of the system makes it harder to do your work?<span className="req">*</span></div>
              <textarea name="s7_system_obstacle" required={step === 6}></textarea>
            </div>

            <div className="qb">
              <div className="q-label">Question 2</div>
              <div className="q-text">One change that would make the biggest difference?<span className="req">*</span></div>
              <textarea name="s7_one_change" className="short" required={step === 6}></textarea>
            </div>

            <div className="qb">
              <div className="q-label">Question 3</div>
              <div className="q-text">What does Gradely do well?</div>
              <textarea name="s7_what_works" className="short"></textarea>
            </div>

            <div className="nav-row">
              <button type="button" className="btn btn-secondary" onClick={prevStep}><ArrowLeft /> Back</button>
              <button type="button" className="btn btn-primary" onClick={nextStep}>Continue <ArrowRight /></button>
            </div>
          </section>

          {/* ═══════ SECTION 7 · COMMITMENT ═══════ */}
          <section className={`fs ${step === 7 ? 'active' : ''}`}>
            <div className="commit-card">
              <div className="sec-label">Section 7</div>
              <div className="sec-title">Your Commitment</div>
              <div className="qb" style={{ borderTop: 'none', paddingTop: 0 }}>
                <div className="q-text">What is one specific action you will take this week?<span className="req">*</span></div>
                <textarea name="s8_commitment" required={step === 7}></textarea>
              </div>
              <div className="commit-divider"></div>
              <div className="qb" style={{ borderTop: 'none', paddingTop: 0 }}>
                <div className="q-label" style={{ color: 'rgba(255,255,255,0.4)' }}>Optional</div>
                <div className="q-text">Anything else you want us to know?</div>
                <textarea name="s8_extra" className="short"></textarea>
              </div>
            </div>

            <div className="nav-row">
              <button type="button" className="btn btn-secondary" onClick={prevStep}><ArrowLeft /> Back</button>
              <button type="submit" className="btn btn-submit btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Reflection'} <ArrowRight />
              </button>
            </div>
          </section>

        </form>
      </main>
    </>
  );
}

function ArrowRight() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M5 12h14M12 5l7 7-7 7" /></svg>;
}
function ArrowLeft() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>;
}