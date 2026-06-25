M. RIFQI DZAKY AZHAD
Portfolio of Selected Work
rifqiazhad21@gmail.com · github.com/Liamours · portofolio-app-puce.vercel.app


WHO I AM

Third-year Informatics student at Telkom University. My work sits at the boundary between research and deployment: I annotate clinical data, train models, and ship them as running systems. Two published papers, one system in production, GPA 4.0/4.0.

I focus on medical imaging. I have also worked on audio classification, industrial ML, and multimodal detection. Everything I ship has a metric attached to it.


PROJECT 1 — BONE METASTASIS DIAGNOSIS FRAMEWORK

Period: August 2024 – February 2025
Role: Lead Coder
Funding: Ministry of Higher Education RI
Code: github.com/Liamours/wbbs-nnunetv2
Preprint: ssrn.com/abstract=5187453

The problem: bone metastasis staging relies on commercial software (EXINI, BONENAVI) with proprietary pipelines and no open-source alternative. This project built a fully open pipeline.

What I did: Annotated 600+ whole-body bone scan images manually, working under supervision of nuclear medicine physicians at Dr. Hasan Sadikin Hospital, Universitas Padjadjaran. Built detection and segmentation code covering all 12 skeletal regions.

Results:
Hotspot detection with YOLOv8 — mAP@0.5 = 0.599
Skeletal segmentation with nnU-Net v2 — IoU 0.879
Patient-level classification AUC 0.956 with XGBoost and LightGBM
Surpasses EXINI (0.83–0.88) and BONENAVI (0.84–0.89)

This pipeline became Telplastina: a full-stack clinical application with Vue 3 frontend, Rust backend, and Docker deployment. Doctors can open it and use it.

Evidence: journal paper accepted at IJIES-INASS, dataset released on Zenodo, preprint on SSRN.


PROJECT 2 — BIRD SOUND IDENTIFICATION

Period: November 2024 – August 2025
Role: Research Lead
Institution: Telkom University · Universiti Malaysia Sarawak
Paper: ieeexplore.ieee.org/document/11233192
Code: github.com/Liamours/Research_Birdsound-Classification_Whisper-Implementation

The problem: species monitoring in Indonesian and Malaysian biodiversity hotspots is manual and expensive. Passive acoustic monitoring using AI can cover large areas continuously.

What I did: Built the dataset from scratch — 12,511 recordings across 219 species endemic or endangered in Indonesia, Malaysia, and Borneo. Fine-tuned BirdNET v2.4 with MixIT source separation. Field-tested at Bandung Zoo and Malaysia National Zoo.

Results:
Macro F1 improved 44.1% over the BirdNET v2.4 baseline on the endemic subset
Full test set: accuracy 0.72, macro F1 0.554, weighted F1 0.724
Validated under real field conditions — no controlled environment

Published at ICITACEE 2025 (IEEE Xplore) as first author.


PROJECT 3 — DRIVER FATIGUE DETECTION SYSTEM

Period: March 2025 – Present
Role: AI Engineer Intern
Collaboration: Bandung Techno Park · Trans Track
Code: github.com/TelU-TransTrack-Fatigue-Detection/transtrack-cloud-review
Demo: github.com/TelU-TransTrack-Fatigue-Detection/transtrack-demonstration

The problem: Trans Track needed a better fatigue detection model for their commercial mining fleet dashcam system. The existing model was in production but underperforming.

What I did: Designed MultiscaleTCN from scratch, trained on real dashcam footage from active mining fleets (BIB, PAMA MTBU, SIS). Built a 3-service async cloud-review API and verified it against the live production MDVR server.

Results:
Macro F1 0.78 — 11% gain over the production baseline (0.67)
Test accuracy 0.85 at 10 FPS
Deployed and running in production

This is the only project in this portfolio where the system is running on real industrial infrastructure serving real users.


PROJECT 4 — MULTIMODAL DEEPFAKE DETECTION

Period: 2025 – Present
Role: Research Lead
Code: github.com/Liamours/research-deepfake_classification

The problem: most deepfake detectors handle video or audio, not both. And they fail on datasets they were not trained on.

What I did: Built a mixture-of-experts architecture with two frozen encoders (video and audio) and a learned routing gate that decides which expert to use per input. Applied domain-adversarial training to improve generalization across datasets.

Results:
Intra-dataset F1 0.94
Cross-dataset F1 0.60 after domain-adversarial regularization
Trained on 223,445 segments across PolyglotFake, FakeAVCeleb, HiDF, CelebDFv2, and FF++
Targeting submission to ICODSA 2026


PROJECT 5 — TELPLASTINA: MULTI-TASK CXR PLATFORM

Period: 2026 – Present
Role: Classification and Segmentation Module Lead

The problem: clinical CXR reading is slow and variable. A multi-task AI platform can assist radiologists by classifying pathologies, segmenting organs, generating structured reports, and answering visual questions.

What I did: Led two of five AI modules — pathology classifier and organ segmentation. Developed the 14-class (expanding to 20+) hierarchical classifier with fallback uncertainty estimation, aligned to Indonesian healthcare standards. Packaged both modules as microservices.

System scope: classification, organ segmentation, report generation, VQA, visual grounding — ships as web app and desktop app.


PUBLICATIONS SUMMARY

Two published papers (journal + IEEE conference). One preprint under review. One public dataset on Zenodo.

Deep Learning-Based Segmentation of Whole-Body Bone Scan Images Using nnU-Netv2
IJIES-INASS, 2025 — 2nd author

Deep Learning for Bird Identification Using Sound
ICITACEE 2025 (IEEE Xplore) — 1st author

From Segmentation to Biomarker Quantification (preprint, under review)
SSRN, 2025 — 2nd author

WBBS Segmentation Masks Dataset
Zenodo, 2025 — 2nd author


SELECTED AWARDS

Best Paper Award — ADIKARA 2025, School of Computing, Telkom University
Best Proposal Honorable Mention — ADIKARA 2024, School of Computing, Telkom University
National Qualifier D3/D4/S1 Category — Samsung Solve for Tomorrow 2025
Top 25 — Data Slayer 2.0, 2025
3rd Place — CCI Summit Kaggle Data Research Competition, 2024
