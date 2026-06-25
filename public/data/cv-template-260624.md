CV Template and Formula Research
AI Engineer, Data Scientist, Computer Vision, Researcher
Compiled 26 June 2024


SECTION ORDER

Two contexts, two orderings.

Industry (AI Engineer, Data Scientist, ML Engineer):
1. Contact header
2. Summary
3. Skills (comes early — recruiters scan this first)
4. Experience
5. Projects
6. Education
7. Certifications

Academic or research-leaning:
1. Contact header
2. Education (moves to top)
3. Research Experience
4. Publications (peer-reviewed before preprint before dataset)
5. Presentations and talks
6. Awards and grants
7. Teaching
8. Skills

Hybrid (research with industry deployment — Rifqi's case):
1. Contact header
2. Summary
3. Experience
4. Publications
5. Projects
6. Awards
7. Skills
8. Education (last, since research work speaks louder than the degree at this stage)
9. Certifications and Languages

Note on skills position: for AI/ML roles, recruiters scan skills within the first 6 seconds to decide if you pass technical minimum. Moving skills up (after summary, before experience) is now standard in AI engineer templates. For academic roles, skills stays near the bottom.


BULLET FORMULA

The dominant pattern in 2025–2026 for all three roles:

ACTION VERB + METHOD OR TOOL + OUTCOME + METRIC

"Deployed real-time fraud detection model using PyTorch and SageMaker serving 12M daily transactions, reducing false positive rate by 23% and saving $4.2M annually."

The XYZ variant (Google's formula):
Accomplished [X] as measured by [Y] by doing [Z]

The STAR-with-stack variant (most specific for ML/CV):
[Strong Verb] + [model or method name] + [data scale or context] + [metric improvement]

Rules that never change:
Every bullet starts with an action verb (past tense for ended, present tense for ongoing).
Every bullet contains at least one number: percentage, count, time, F1 score, AUC, latency, users.
Tools appear inside bullets, not only in the skills section.
Avoid: "assisted with", "helped", "was responsible for", "worked on".
Avoid: "familiar with", "knowledge of", "exposure to" in skills.


ACTION VERBS BY CATEGORY

Model/system building: Designed, Developed, Built, Implemented, Architected, Trained, Fine-tuned, Deployed
Research: Investigated, Analyzed, Evaluated, Validated, Benchmarked, Published, Presented
Data: Annotated, Curated, Collected, Preprocessed, Augmented, Filtered
Leadership: Led, Coordinated, Supervised, Recruited, Mentored, Evaluated
Results: Achieved, Improved, Reduced, Increased, Surpassed, Outperformed

Never use: "utilized", "leveraged", "facilitated", "streamlined" — AI writing tells.


SKILLS SECTION FORMAT

Group by category. Not alphabetical. Not a single flat list.

AI Engineer template grouping:
ML Frameworks     PyTorch, TensorFlow, Transformers, JAX
Computer Vision   OpenCV, YOLO, nnU-Net, SAM, CLIP, DETR
Audio / NLP       librosa, Whisper, Hugging Face Transformers
MLOps             Docker, Git, pytest, MLflow, Weights & Biases
Cloud             AWS SageMaker, GCP, Azure ML (if applicable)
Languages         Python, C++, Go, SQL
Research Tools    LaTeX, Zotero, Parsifal

Data Scientist template grouping:
Core ML           Scikit-learn, XGBoost, LightGBM, PyTorch, TensorFlow
Data Processing   Pandas, NumPy, SQL, Spark (if applicable)
Visualization     Matplotlib, seaborn, Plotly
MLOps             Docker, Git, Airflow, dbt (if applicable)
Languages         Python, R, SQL

Include certs in a separate section, not inside skills. Include languages (spoken) in a separate section or the header.

Pruning rule: if you cannot answer an interview question about the tool for two minutes, remove it.


SPECIFIC GUIDANCE BY ROLE

AI Engineer
The hiring signal recruiters weight most: shipped model in production with a measurable outcome. If you have one, lead with it everywhere — summary, first bullet of top experience.
LLM/RAG experience increasingly expected in 2026. If you have none, do not fake it. Medical imaging work is valued and differentiated; most AI engineers do not have clinical domain knowledge.
Full ML cycle matters: annotation → training → evaluation → deployment. Show all stages.

Data Scientist
Business impact over model accuracy. "$4M saved", "12M daily transactions" outperforms "AUC 0.95" for DS roles.
If no business metric exists (research context), use data scale and benchmark comparison instead.
Statistical rigor signals: p-values, confidence intervals, hold-out set specs — used sparingly, they signal you know the difference between training and real performance.

Computer Vision Engineer
Name the specific model used: YOLOv8, nnU-Net v2, DenseNet121, BirdNET v2.4 — not "a detection model".
Annotation experience is a plus, not a minus. Most CV engineers have never annotated 600 images under clinical supervision. That is differentiating.
Deployment metrics: latency (ms), FPS, throughput. Where applicable add these.
Medical imaging experience (DICOM, clinical validation, hospital collaboration) is considered gold-standard real-world data by recruiters.

Research Scientist / Research Assistant
Publications are the primary signal. Author position matters: 1st author = led the work, 2nd author = key contributor.
Independence signals: "took over as research lead", "built dataset from scratch", "no prior experience in [domain]" followed by results — these show learning speed.
Conference presentations count. ICITACEE 2025 IEEE Xplore = verifiable, international venue.
Funded research = external validation that the work was serious.


HOW LONG

1 page: under 5 years of experience, or applying to most industry roles.
2 pages: 5+ years, or academic/research applications where publications and teaching need full listing.
No page limit: faculty applications.

For Rifqi (3rd year undergrad, substantial research output): 1 page is achievable with tight editing. 2 pages is defensible given 3 RA roles, 2 internships, 2 published papers, and production deployment. Target 1 page for industry applications, allow 2 for research/academic applications.


CONTACT HEADER FORMAT

Standard (one line or two):
Name (large, bold)
email · github.com/username · linkedin.com/in/username · City, Country

Optional: phone number (required in some markets, Indonesia included)
Do not include: photo, DOB, nationality, home address, GPA in header (it goes in education).


SUMMARY FORMAT

2 to 4 sentences. Not more.
Sentence 1: role + specialization + institution or company.
Sentence 2: one or two flagship achievements with metrics.
Sentence 3 (optional): what you are seeking or what you offer.

Bad: "I am a passionate AI researcher who loves solving problems with deep learning."
Good: "Medical imaging ML researcher at Telkom University, GPA 4.0/4.0. Built a bone scan diagnostic pipeline surpassing two commercial clinical systems at patient-level AUC 0.956. First author on an IEEE Xplore conference paper, with one system running in production."


PUBLICATIONS FORMAT

For research CVs, divide into types with headers:

Peer-Reviewed Journal Articles
Peer-Reviewed Conference Papers
Preprints (Under Review)
Datasets and Other Research Outputs

Each entry: Authors (bold your name). Year. Title. Venue. DOI or URL.
Author order: list as written. If you are not first author, "2nd author" or "co-author" annotation is acceptable and honest.

Preprints: label as "under review" only if actually submitted. SSRN is a valid preprint server.


WHAT CHANGES WHEN APPLYING TO DIFFERENT ROLES

Same person, same experience — different document emphasis:

Applying for AI Engineer (industry):
Lead with TransTrack (production system, real data, outperformed existing model).
Summary mentions production deployment.
Skills section moves above experience.
Publications condensed to one line each.
Education goes last.

Applying for Research Position / PhD:
Lead with bone scan and bird sound RA roles.
Publications expanded with full citation format.
Education goes second (after contact).
Add research interests statement (1 paragraph).
Awards section expanded.

Applying for Data Scientist:
Lead with HUMIC (systematic review = large-scale data analysis).
CCI Kaggle (tabular ML, data cleaning, ensemble models) mentioned prominently.
Skills emphasize Scikit-learn, XGBoost, LightGBM, pandas.
Deepfake detection (large dataset, 223K segments) signals scale.


APPLIED TO RIFQI'S CURRENT DRAFT — GAPS

1. Skills section position: currently below publications. For industry applications, move skills above experience.

2. Some bullets still describe scope, not achievement:
Current: "Developing a hierarchical pathology classifier covering 20+ disease categories..."
Better: "Building a 20+ disease CXR classifier with hierarchical fallback uncertainty estimation, aligned to Indonesian healthcare standards. Deployed as microservices for web and desktop clients."

3. Summary can be tighter. Current version is 3 sentences and accurate. Consider:
"Medical imaging ML researcher at Telkom University, GPA 4.0/4.0. Bone scan diagnostic pipeline AUC 0.956, above two commercial clinical systems. IEEE Xplore first-authored paper. Production ML system on real mining fleet dashcams."

4. TransTrack bullet currently: "Designed fatigue detection model on real mining fleet dashcam footage..."
Better: "Designed MultiscaleTCN from scratch on real dashcam footage from active mining fleets. Macro F1 0.78, 11% above the production baseline. 3-service async API, live on company infrastructure."

5. Phone number missing from contact header. Optional but standard in Indonesia.

6. For academic applications: add Research Interests paragraph (2–3 sentences) between summary and education.

7. CCI/ADIKARA entries in awards are thin. For competition entries, add what the project was or why it won — one line context.


Sources:
resume.io/resume-examples/ai-engineer
cvcompiler.com/ai-engineer-resume-examples
tealhq.com/resume-example/ai-engineer
beamjobs.com/resumes/data-science-resume-example-guide
resumeworded.com/machine-learning-resume-examples
resumeoptimizerpro.com/blog/machine-learning-engineer-resume-examples
turing.com/resume/computer-vision
igotanoffer.com/blogs/tech/tech-resume-examples
resumegenius.com/blog/cv-help/academic-cv
resumeworded.com/undergraduate-research-assistant-resume-example
toptal.com/resume/en/career-center/the-perfect-tech-resume-in-2025-key-trends-ats-keywords-and-formatting-tips
