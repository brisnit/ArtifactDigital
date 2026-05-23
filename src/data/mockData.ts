import { SearchResult, AIAnswer } from '../types'

export const allResults: SearchResult[] = [
  // Doctors
  {
    id: 'dr-1',
    title: 'Dr. James Carter, MD — Cardiologist',
    description:
      'Board-certified cardiologist specializing in heart failure, coronary artery disease, and preventive cardiology. Accepting new patients at Baptist Health Louisville.',
    contentType: 'Doctor',
    specialty: 'Cardiology',
    location: 'Louisville, KY',
    url: '#',
    tags: ['Cardiology', 'Heart Care', 'Louisville', 'Heart Failure'],
  },
  {
    id: 'dr-2',
    title: 'Dr. Sarah Nguyen, MD — Orthopedic Surgeon',
    description:
      'Fellowship-trained orthopedic surgeon specializing in joint replacement, sports medicine, and minimally invasive procedures. Accepting new patients in Lexington.',
    contentType: 'Doctor',
    specialty: 'Orthopedics',
    location: 'Lexington, KY',
    url: '#',
    tags: ['Orthopedics', 'Joint Replacement', 'Lexington', 'Sports Medicine'],
  },
  {
    id: 'dr-3',
    title: 'Dr. Michael Torres, MD — Robotic Surgeon',
    description:
      'Experienced robotic-assisted surgeon with expertise in general surgery, urological, and thoracic procedures using the da Vinci Surgical System.',
    contentType: 'Doctor',
    specialty: 'Robotic Surgery',
    location: 'Corbin, KY',
    url: '#',
    tags: ['Robotic Surgery', 'Minimally Invasive', 'Corbin', 'General Surgery'],
  },
  {
    id: 'dr-4',
    title: 'Dr. Lisa Park, MD — Primary Care Physician',
    description:
      'Family medicine physician dedicated to preventive care, chronic disease management, and whole-family health. Seeing patients in Paducah.',
    contentType: 'Doctor',
    specialty: 'Primary Care',
    location: 'Paducah, KY',
    url: '#',
    tags: ['Primary Care', 'Family Medicine', 'Paducah', 'Prevention'],
  },
  {
    id: 'dr-5',
    title: 'Dr. Robert Ellison, MD — Cardiologist',
    description:
      'Interventional cardiologist specializing in cardiac catheterization, stent placement, and structural heart disease. Available at Baptist Health Lexington.',
    contentType: 'Doctor',
    specialty: 'Cardiology',
    location: 'Lexington, KY',
    url: '#',
    tags: ['Cardiology', 'Heart Care', 'Lexington', 'Interventional'],
  },
  {
    id: 'dr-6',
    title: 'Dr. Angela Brooks, MD — Bariatric Surgeon',
    description:
      'Specializes in weight loss surgery including gastric sleeve, gastric bypass, and LAP-BAND procedures. Accepting new patients in Louisville.',
    contentType: 'Doctor',
    specialty: 'Bariatric Surgery',
    location: 'Louisville, KY',
    url: '#',
    tags: ['Weight Loss', 'Bariatric', 'Surgery', 'Louisville'],
  },
  // Locations
  {
    id: 'loc-1',
    title: 'Baptist Health Louisville',
    description:
      'Our flagship hospital offering comprehensive medical services including cardiac care, cancer treatment, neurology, orthopedics, and 24/7 emergency services.',
    contentType: 'Location',
    location: 'Louisville, KY',
    url: '#',
    tags: ['Hospital', 'Louisville', 'Full Service', 'Emergency'],
  },
  {
    id: 'loc-2',
    title: 'Baptist Health Lexington',
    description:
      'Full-service hospital and medical campus in the heart of Lexington, featuring orthopedic, cardiac, and women\'s health services. Robotic surgery available.',
    contentType: 'Location',
    location: 'Lexington, KY',
    url: '#',
    tags: ['Hospital', 'Lexington', 'Orthopedics', 'Robotic Surgery'],
  },
  {
    id: 'loc-3',
    title: 'Baptist Health Urgent Care — Lexington Richmond Rd',
    description:
      'Walk-in urgent care open 7 days a week for non-emergency medical needs including minor injuries, infections, and illness. No appointment needed.',
    contentType: 'Location',
    location: 'Lexington, KY',
    url: '#',
    tags: ['Urgent Care', 'Walk-In', 'Lexington', 'Minor Injuries'],
  },
  {
    id: 'loc-4',
    title: 'Baptist Health Corbin',
    description:
      'Regional hospital providing advanced cardiac, robotic surgical, and emergency care to southeastern Kentucky communities.',
    contentType: 'Location',
    location: 'Corbin, KY',
    url: '#',
    tags: ['Hospital', 'Corbin', 'Regional', 'Cardiac'],
  },
  {
    id: 'loc-5',
    title: 'Baptist Health Paducah',
    description:
      'Western Kentucky\'s leading medical center offering surgery, cancer care, orthopedics, behavioral health, and 24-hour emergency services.',
    contentType: 'Location',
    location: 'Paducah, KY',
    url: '#',
    tags: ['Hospital', 'Paducah', 'Western Kentucky', 'Full Service'],
  },
  {
    id: 'loc-6',
    title: 'Baptist Health Urgent Care — Louisville Shelbyville Rd',
    description:
      'Convenient walk-in care for the Louisville area. Open 8am–8pm daily. Lab and imaging services on-site.',
    contentType: 'Location',
    location: 'Louisville, KY',
    url: '#',
    tags: ['Urgent Care', 'Walk-In', 'Louisville', 'Lab Services'],
  },
  // Services
  {
    id: 'svc-1',
    title: 'Robotic Surgery Program',
    description:
      'Baptist Health offers robotic-assisted surgery across multiple specialties using the da Vinci Surgical System — with less pain, smaller incisions, and faster recovery.',
    contentType: 'Service',
    url: '#',
    tags: ['Robotic Surgery', 'Minimally Invasive', 'Surgery', 'da Vinci'],
  },
  {
    id: 'svc-2',
    title: 'Heart & Vascular Care',
    description:
      'Comprehensive cardiac services from prevention and diagnosis to advanced interventional procedures, structural heart care, and cardiac rehabilitation.',
    contentType: 'Service',
    url: '#',
    tags: ['Cardiology', 'Heart Care', 'Vascular', 'Cardiac Rehab'],
  },
  {
    id: 'svc-3',
    title: 'Orthopedic & Joint Care',
    description:
      'Expert care for bone, joint, and muscle conditions including knee and hip replacement, sports injuries, spine care, and physical therapy.',
    contentType: 'Service',
    url: '#',
    tags: ['Orthopedics', 'Joint Replacement', 'Sports Medicine', 'Spine'],
  },
  {
    id: 'svc-4',
    title: 'Primary & Preventive Care',
    description:
      'Routine checkups, immunizations, screenings, and chronic disease management to keep you and your family healthy throughout every stage of life.',
    contentType: 'Service',
    url: '#',
    tags: ['Primary Care', 'Prevention', 'Wellness', 'Screenings'],
  },
  {
    id: 'svc-5',
    title: 'Urgent Care Services',
    description:
      'Fast, convenient care for minor injuries and illnesses with no appointment required. Check wait times online before you arrive.',
    contentType: 'Service',
    url: '#',
    tags: ['Urgent Care', 'Walk-In', 'Minor Injuries', 'Illness'],
  },
  {
    id: 'svc-6',
    title: 'Weight Loss & Bariatric Surgery',
    description:
      'Medically supervised weight loss programs including bariatric surgery, nutrition counseling, behavioral health support, and long-term follow-up care.',
    contentType: 'Service',
    url: '#',
    tags: ['Weight Loss', 'Bariatric', 'Wellness', 'Nutrition'],
  },
  {
    id: 'svc-7',
    title: 'Cancer Care Services',
    description:
      'Comprehensive cancer care including medical oncology, radiation therapy, surgical oncology, and integrative medicine to support patients through treatment.',
    contentType: 'Service',
    url: '#',
    tags: ['Cancer', 'Oncology', 'Radiation', 'Surgery'],
  },
  // Articles
  {
    id: 'art-1',
    title: 'What to Expect From Your First Cardiology Appointment',
    description:
      'A guide to preparing for your first cardiology visit — including what tests you may need, what questions to ask, and how to share your health history.',
    contentType: 'Article',
    url: '#',
    tags: ['Cardiology', 'Patient Guide', 'Heart Health', 'Appointments'],
  },
  {
    id: 'art-2',
    title: 'Is Robotic Surgery Right for You?',
    description:
      'Learn how robotic-assisted surgery works, its advantages over traditional surgery, and which conditions and procedures qualify.',
    contentType: 'Article',
    url: '#',
    tags: ['Robotic Surgery', 'Patient Education', 'Surgery', 'Recovery'],
  },
  {
    id: 'art-3',
    title: 'Understanding Hip and Knee Replacement',
    description:
      'Everything you need to know about joint replacement surgery — from candidacy and preparation to recovery timelines and physical therapy.',
    contentType: 'Article',
    url: '#',
    tags: ['Orthopedics', 'Joint Replacement', 'Recovery', 'Hip', 'Knee'],
  },
  {
    id: 'art-4',
    title: 'Managing Chronic Back Pain: What Actually Works',
    description:
      'Evidence-based strategies for managing back pain, including physical therapy, medication, lifestyle changes, and when to consider surgery.',
    contentType: 'Article',
    url: '#',
    tags: ['Pain Management', 'Orthopedics', 'Wellness', 'Spine'],
  },
  {
    id: 'art-5',
    title: 'Bariatric Surgery: A Guide for Patients',
    description:
      'Understand your options for weight loss surgery — including gastric sleeve, bypass, and adjustable banding — and how to prepare for the process.',
    contentType: 'Article',
    url: '#',
    tags: ['Weight Loss', 'Bariatric', 'Patient Guide', 'Surgery'],
  },
  // FAQs
  {
    id: 'faq-1',
    title: 'What are the visiting hours at Baptist Health?',
    description:
      'General visiting hours are 8 AM–8 PM daily. ICU, NICU, and specialty units may have different policies. Call your facility to confirm.',
    contentType: 'FAQ',
    url: '#',
    tags: ['Visiting Hours', 'Patients & Visitors', 'Hospital Policy'],
  },
  {
    id: 'faq-2',
    title: 'How do I schedule an appointment online?',
    description:
      'Book appointments through MyChart, our secure patient portal, or by calling your provider\'s office directly. Same-day appointments may be available.',
    contentType: 'FAQ',
    url: '#',
    tags: ['Appointments', 'MyChart', 'Patient Resources', 'Scheduling'],
  },
  {
    id: 'faq-3',
    title: 'Does Baptist Health accept my insurance?',
    description:
      'We accept most major insurance plans including Medicare and Medicaid. Contact your local Baptist Health facility to confirm your specific coverage.',
    contentType: 'FAQ',
    url: '#',
    tags: ['Insurance', 'Billing', 'Patient Resources', 'Coverage'],
  },
  {
    id: 'faq-4',
    title: 'What should I bring to my hospital visit?',
    description:
      'Bring a photo ID, insurance card, list of current medications, emergency contact information, and any relevant medical records or recent imaging.',
    contentType: 'FAQ',
    url: '#',
    tags: ['Patient Preparation', 'Hospital Visit', 'Checklist', 'Patients & Visitors'],
  },
  {
    id: 'faq-5',
    title: 'Can I access my medical records online?',
    description:
      'Yes — your medical records, test results, visit summaries, and care plans are accessible through the MyChart patient portal 24/7.',
    contentType: 'FAQ',
    url: '#',
    tags: ['Medical Records', 'MyChart', 'Patient Resources', 'Online'],
  },
]

// AI Answer templates

const cardiologyAnswer: AIAnswer = {
  summary:
    'Baptist Health has board-certified cardiologists at multiple locations across Kentucky, including Louisville, Lexington, Corbin, and Paducah. Our Heart & Vascular Care program offers a full spectrum of services — from preventive screenings and diagnostic imaging to advanced interventional cardiology and cardiac rehabilitation. You can find a cardiologist near you using our provider search tool below.',
  sources: [
    {
      id: 's1',
      title: 'Heart & Vascular Care',
      url: '#',
      description: 'Overview of cardiac services across Baptist Health',
    },
    {
      id: 's2',
      title: 'Find a Cardiologist',
      url: '#',
      description: 'Search for cardiologists by location or specialty',
    },
    {
      id: 's3',
      title: 'Baptist Health Louisville',
      url: '#',
      description: 'Cardiac care services and providers in Louisville',
    },
  ],
  followUpQuestions: [
    'What cardiac screenings and tests are available?',
    'How do I schedule a cardiology appointment?',
    'Does Baptist Health offer cardiac rehabilitation?',
  ],
}

const roboticSurgeryAnswer: AIAnswer = {
  summary:
    'Baptist Health offers robotic-assisted surgical options across several specialties, including general surgery, gynecology, urology, orthopedics, and thoracic care — using the da Vinci Surgical System. These minimally invasive procedures typically result in smaller incisions, less pain, reduced blood loss, and faster recovery times compared to traditional open surgery. Availability may vary by location.',
  sources: [
    {
      id: 's1',
      title: 'Robotic Surgery Program',
      url: '#',
      description: 'Overview of robotic-assisted surgery at Baptist Health',
    },
    {
      id: 's2',
      title: 'Surgical Services',
      url: '#',
      description: 'Full list of surgical specialties and procedures offered',
    },
    {
      id: 's3',
      title: 'Find a Location',
      url: '#',
      description: 'Find a Baptist Health facility that offers robotic surgery',
    },
  ],
  followUpQuestions: [
    'Which Baptist Health locations offer robotic surgery?',
    'Am I a candidate for robotic-assisted surgery?',
    'How do I schedule a surgical consultation?',
  ],
}

const visitingHoursAnswer: AIAnswer = {
  summary:
    "General visiting hours at Baptist Health hospitals are 8:00 AM to 8:00 PM daily. However, hours can vary by unit — ICU, NICU, and certain specialty floors may have restricted visiting windows or require advance check-in. For the most accurate information, contact your specific Baptist Health facility directly or visit the patient and visitors page for your location.",
  sources: [
    {
      id: 's1',
      title: 'Patients & Visitors Guide',
      url: '#',
      description: 'Visiting policies, parking, and what to expect',
    },
    {
      id: 's2',
      title: 'Find a Baptist Health Location',
      url: '#',
      description: 'Contact information for all facilities',
    },
    {
      id: 's3',
      title: 'What to Bring to Your Visit',
      url: '#',
      description: 'Checklist for hospital visits and appointments',
    },
  ],
  followUpQuestions: [
    'Are there visiting restrictions for children?',
    'What should I bring when visiting a patient?',
    'Where can I park at the hospital?',
  ],
}

const orthopedicsAnswer: AIAnswer = {
  summary:
    'Yes — Baptist Health offers a full range of orthopedic services in Lexington at Baptist Health Lexington. Our fellowship-trained orthopedic surgeons provide expert care for bone, joint, and muscle conditions, including knee and hip replacement, sports injury treatment, spine care, and physical therapy. The team is currently accepting new patients.',
  sources: [
    {
      id: 's1',
      title: 'Orthopedic & Joint Care',
      url: '#',
      description: 'Our orthopedic specialties and treatment options',
    },
    {
      id: 's2',
      title: 'Baptist Health Lexington',
      url: '#',
      description: 'Orthopedic care and providers in Lexington, KY',
    },
    {
      id: 's3',
      title: 'Joint Replacement Program',
      url: '#',
      description: 'Hip and knee replacement surgery details',
    },
  ],
  followUpQuestions: [
    'How do I get a referral to an orthopedic specialist?',
    'What is the recovery like after joint replacement?',
    'Does insurance cover orthopedic surgery?',
  ],
}

const weightLossAnswer: AIAnswer = {
  summary:
    'Baptist Health offers comprehensive weight loss and bariatric programs designed for lasting results. Our medically supervised options include surgical procedures (gastric sleeve, gastric bypass, and adjustable gastric banding), as well as non-surgical approaches like nutrition counseling, behavioral health support, and lifestyle coaching. Long-term follow-up care is included to help you maintain your results.',
  sources: [
    {
      id: 's1',
      title: 'Weight Loss & Bariatric Surgery',
      url: '#',
      description: 'Overview of our weight management programs',
    },
    {
      id: 's2',
      title: 'Bariatric Surgery Options',
      url: '#',
      description: 'Surgical weight loss procedures and eligibility criteria',
    },
    {
      id: 's3',
      title: 'Nutrition & Wellness Services',
      url: '#',
      description: 'Nutrition counseling and non-surgical weight loss',
    },
  ],
  followUpQuestions: [
    'Am I a candidate for bariatric surgery?',
    'How do I get started with a weight loss program?',
    'Does insurance cover weight loss surgery?',
  ],
}

const urgentCareAnswer: AIAnswer = {
  summary:
    'Baptist Health Urgent Care centers are open 7 days a week for non-emergency medical needs including minor injuries, illnesses, infections, and more. No appointment is necessary — simply walk in. Our centers are staffed by experienced providers and many offer on-site lab work and imaging. You can also check current wait times online before you arrive.',
  sources: [
    {
      id: 's1',
      title: 'Urgent Care Services',
      url: '#',
      description: 'Walk-in urgent care locations, hours, and services',
    },
    {
      id: 's2',
      title: 'Find Urgent Care Near You',
      url: '#',
      description: 'Locations with real-time wait times',
    },
    {
      id: 's3',
      title: 'What Urgent Care Treats',
      url: '#',
      description: 'Common conditions treated at Baptist Health Urgent Care',
    },
  ],
  followUpQuestions: [
    'What conditions does urgent care treat?',
    'Can I check wait times before arriving?',
    'What is the difference between urgent care and the ER?',
  ],
}

const defaultAnswer: AIAnswer = {
  summary:
    'Baptist Health is here to connect you with the right care. We offer a wide range of medical services across multiple Kentucky locations — including cardiology, orthopedics, oncology, primary care, urgent care, and more. Use the filters below to explore providers, services, and locations near you.',
  sources: [
    {
      id: 's1',
      title: 'Find a Provider',
      url: '#',
      description: 'Search our network of physicians and specialists',
    },
    {
      id: 's2',
      title: 'Find a Location',
      url: '#',
      description: 'Explore Baptist Health facilities near you',
    },
    {
      id: 's3',
      title: 'All Services',
      url: '#',
      description: 'Browse our full list of healthcare services',
    },
  ],
  followUpQuestions: [
    'How do I make an appointment?',
    'What services are available near me?',
    'Do you accept my insurance plan?',
  ],
}

function dedupe(results: SearchResult[]): SearchResult[] {
  const seen = new Set<string>()
  return results.filter(r => {
    if (seen.has(r.id)) return false
    seen.add(r.id)
    return true
  })
}

export function getAIResponse(query: string): { answer: AIAnswer; results: SearchResult[] } {
  const q = query.toLowerCase().trim()

  if (!q || q.length < 2) {
    return { answer: defaultAnswer, results: [] }
  }

  if (q.includes('robotic') || q.includes('robot') || (q.includes('da vinci'))) {
    return {
      answer: roboticSurgeryAnswer,
      results: dedupe([
        ...allResults.filter(r => r.tags.some(t => ['Robotic Surgery', 'Minimally Invasive'].includes(t))),
        ...allResults.filter(r => r.contentType === 'Location').slice(0, 2),
      ]),
    }
  }

  if (q.includes('cardiolog') || q.includes('heart') || q.includes('cardiac') || q.includes('vascular')) {
    return {
      answer: cardiologyAnswer,
      results: dedupe(allResults.filter(r => r.tags.some(t => ['Cardiology', 'Heart Care', 'Vascular', 'Cardiac Rehab'].includes(t)))),
    }
  }

  if (q.includes('visit') || q.includes('hours') || q.includes('visiting hour')) {
    return {
      answer: visitingHoursAnswer,
      results: dedupe(allResults.filter(r =>
        r.tags.some(t => ['Visiting Hours', 'Patients & Visitors', 'Hospital Policy', 'Patient Resources', 'Checklist'].includes(t))
      )),
    }
  }

  if (
    q.includes('orthopedic') ||
    q.includes('ortho') ||
    q.includes('knee') ||
    q.includes('hip') ||
    q.includes('joint') ||
    q.includes('lexington') ||
    q.includes('bone')
  ) {
    return {
      answer: orthopedicsAnswer,
      results: dedupe([
        ...allResults.filter(r => r.tags.some(t => ['Orthopedics', 'Joint Replacement', 'Sports Medicine', 'Spine'].includes(t))),
        ...allResults.filter(r => r.location === 'Lexington, KY'),
      ]),
    }
  }

  if (q.includes('weight') || q.includes('bariatric') || q.includes('obesity') || q.includes('gastric')) {
    return {
      answer: weightLossAnswer,
      results: dedupe(allResults.filter(r => r.tags.some(t => ['Weight Loss', 'Bariatric', 'Nutrition'].includes(t)))),
    }
  }

  if (q.includes('urgent') || q.includes('walk-in') || q.includes('walk in') || q.includes('minor injur')) {
    return {
      answer: urgentCareAnswer,
      results: dedupe(allResults.filter(r => r.tags.some(t => ['Urgent Care', 'Walk-In', 'Minor Injuries'].includes(t)))),
    }
  }

  if (q.includes('primary') || q.includes('family doctor') || q.includes('checkup') || q.includes('preventive')) {
    return {
      answer: defaultAnswer,
      results: dedupe(allResults.filter(r => r.tags.some(t => ['Primary Care', 'Family Medicine', 'Prevention', 'Screenings', 'Wellness'].includes(t)))),
    }
  }

  if (q.includes('appointment') || q.includes('schedule') || q.includes('mychart')) {
    return {
      answer: defaultAnswer,
      results: dedupe(allResults.filter(r => r.tags.some(t => ['Appointments', 'MyChart', 'Patient Resources', 'Scheduling'].includes(t)))),
    }
  }

  if (q.includes('cancer') || q.includes('oncolog')) {
    return {
      answer: defaultAnswer,
      results: dedupe(allResults.filter(r => r.tags.some(t => ['Cancer', 'Oncology', 'Radiation'].includes(t)))),
    }
  }

  // Generic text match across all results
  const matched = allResults.filter(r =>
    r.title.toLowerCase().includes(q) ||
    r.description.toLowerCase().includes(q) ||
    r.tags.some(t => t.toLowerCase().includes(q))
  )

  return { answer: defaultAnswer, results: dedupe(matched) }
}

export function getDefaultResults(): SearchResult[] {
  return allResults.slice(0, 8)
}

export const suggestedQueries = [
  'Where can I find a cardiologist near me?',
  'What robotic surgery options are available?',
  'What are the visiting hours?',
  'Do you offer orthopedic care in Lexington?',
  'Weight loss programs',
  'Urgent care near me',
]
