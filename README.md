# WellPak Android App

A mobile application built for **Lady Health Workers (LHWs)** in Pakistan to deliver structured mental health sessions and conduct patient assessments in community settings. Developed as part of the [HISP Pakistan](https://hisppk.net) initiative and integrated with the DHIS2 ecosystem.

---

## Introduction

WellPak supports community-based mental health care delivery by equipping Lady Health Workers with a digital tool to manage their patient caseload, deliver evidence-based psychoeducation sessions, and capture structured assessments ("Psyclops"). The app is designed for both phone and tablet, with Urdu-language support throughout.

---

## Core Functionality

### Patient Dashboard
- LHWs log in and see their full assigned patient list on the Home screen.
- Each patient row shows name, age, phone number, CNIC, and number of completed sessions.
- Patients can be searched by name or CNIC in real time.

### Session Delivery
- Tapping a patient navigates to their session list — a grid of health topic cards (e.g. Session 1–5), each showing its active/complete status.
- Tapping a session opens the **Session Details** screen, which lists content headings the LHW works through with the patient.
- A session timer counts up while the screen is open; the LHW submits the session once the assessment for that session is complete.

### Assessment (Psyclops)
- Each session has an associated questionnaire called a **Psyclops assessment**.
- Questions are either free-text or multiple-choice.
- If a patient scores high on question 4 (score 4 or 5), a conditional suicide-risk follow-up question is automatically shown.
- Completed assessments are locked (read-only) on subsequent views.
- On submission, the session list and patient dashboard are refreshed automatically.

### Imdad Sessions
- A separate session type ("Imdad") opens as a modal with its own content headings and PDF viewer.

### Authentication
- Credential-based login; access token is persisted locally so the LHW stays logged in across app restarts.
- A 401 response automatically clears the stored token and logs the user out.

---

## How to Use

### For Lady Health Workers

1. **Login** — Enter your registered email and password on the Login screen.
2. **Find a patient** — On the Dashboard, scroll or search by name/CNIC to find your patient.
3. **Start a session** — Tap the patient, then tap the session card you want to deliver.
4. **Work through content** — On the Session Details screen, tap each heading button to view the material (videos, PDFs, audio). The session timer starts automatically.
5. **Complete the assessment** — After reviewing all content, tap the **Assessment** button that appears once the Psyclops questionnaire is ready. Answer all questions.
   - For multiple-choice question 4, selecting a high-risk score (4 or 5) will reveal an additional suicide-risk question — complete it before submitting.
6. **Submit** — Tap **Submit Psyclops** to save the assessment, then tap **Submit Session** on the Session Details screen to record the session as complete.
7. **Logout** — Tap the logout icon in the top-right corner at any time.

---

## Developer Setup

### Prerequisites

- Node.js >= 16
- React Native CLI
- Android Studio (for Android) or Xcode 13+ (for iOS)
- Ruby (for iOS CocoaPods — version in `.ruby-version`)

### Install dependencies

```bash
cd well-pak-app
yarn install          # or npm install
```

### iOS

```bash
cd ios && pod install && cd ..
yarn ios
```

### Android

```bash
yarn android
```

### ADB port forwarding (for a physical device)

```bash
yarn adb
```

This reverses ports 9090, 3000, 9001, and 8081 from the device to the host.

### API

The app connects to `https://wellpak.hisppk.net/api/`. To point at a different backend, update `baseURL` in `well-pak-app/src/api/axios.ts`.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native 0.69.4 (TypeScript) |
| State management | Redux + redux-persist + redux-thunk |
| Navigation | React Navigation (native stack) |
| HTTP | Axios |
| Media | react-native-video, react-native-audio-recorder-player, react-native-pdf |
| UI | react-native-paper, react-native-linear-gradient, styled-components |
| Localisation | i18next / react-i18next |

---

## Authors

- Maham Saleem, MSPH — Leibniz Institute for Prevention Research and Epidemiology (BIPS), Bremen, Germany
- Shamsa Zafar, Prof. Dr. Med — Fazaia Medical College, Air University, Islamabad, Pakistan
- Thomas Klein, MSc — Department of Psychiatry and Psychotherapy II, Ulm University, Germany
- Markus Koesters, Prof. Dr. — Technische Universität Dresden, Germany
- Adnan Bashir, MCS — Health Information Systems Program (HISP), Islamabad, Pakistan
- Daniela C. Fuhr, Prof. Dr. — Leibniz Institute for Prevention Research and Epidemiology (BIPS), Bremen, Germany
- Siham Sikander, FCPS, PhD — University of Liverpool, United Kingdom
- Hajo Zeeb, Prof. Dr. Med — Leibniz Institute for Prevention Research and Epidemiology (BIPS), Bremen, Germany
