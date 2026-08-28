/**
 * Legal copy, ported from the previous site.
 *
 * The public contact address is `hello@figuredoutai.com`. The lead-delivery
 * address that the old pages published here is server-only and must never
 * reappear in this file.
 */

export interface LegalSection {
  heading: string
  paragraphs?: readonly string[]
  bullets?: readonly string[]
  closingParagraphs?: readonly string[]
  email?: string
}

export const PRIVACY_SECTIONS: readonly LegalSection[] = [
  {
    heading: '1. Information We Collect',
    paragraphs: ['We may collect:'],
    bullets: [
      'Name',
      'Email address',
      'Phone number',
      'Company name',
      'Job title',
      'Billing information',
      'Support communications',
      'Account credentials',
      'Search queries and prompts',
      'AI inputs and outputs',
      'Usage analytics',
      'Device information',
      'Browser information',
      'IP address',
      'Cookies and similar technologies',
    ],
  },
  {
    heading: '2. How We Use Information',
    paragraphs: ['Your information may be used to:'],
    bullets: [
      'Provide and improve our Services',
      'Authenticate users',
      'Process subscriptions and payments',
      'Personalize your experience',
      'Detect fraud, abuse, and security incidents',
      'Improve AI models and system performance',
      'Respond to support requests',
      'Comply with legal obligations',
      'Communicate important service updates',
    ],
    closingParagraphs: ['We do not sell your personal information.'],
  },
  {
    heading: '3. AI Processing',
    paragraphs: [
      'Some information you submit may be processed by AI models or trusted AI infrastructure providers in order to generate responses, automate workflows, or improve service quality.',
      'Please do not submit confidential, classified, or regulated information unless your subscription specifically supports secure processing for such data.',
    ],
  },
  {
    heading: '4. Cookies',
    paragraphs: ['We use cookies for:'],
    bullets: ['Authentication', 'Security', 'Preferences', 'Analytics', 'Performance optimization'],
    closingParagraphs: [
      'You may disable cookies through your browser settings, although certain features may not function properly.',
    ],
  },
  {
    heading: '5. Third-Party Services',
    paragraphs: ['We may work with trusted providers including:'],
    bullets: [
      'Cloud hosting providers',
      'Authentication providers',
      'Payment processors',
      'Analytics providers',
      'AI model providers',
      'Email providers',
      'CRM platforms',
      'Infrastructure partners',
    ],
    closingParagraphs: ['These providers receive only the information necessary to perform their services.'],
  },
  {
    heading: '6. Data Retention',
    paragraphs: ['We retain information only for as long as reasonably necessary to:'],
    bullets: [
      'Operate the Services',
      'Meet contractual obligations',
      'Resolve disputes',
      'Prevent fraud',
      'Comply with legal requirements',
    ],
    closingParagraphs: [
      'Upon account deletion, certain records may be retained where required by law or for legitimate business purposes.',
    ],
  },
  {
    heading: '7. Data Security',
    paragraphs: [
      'We use commercially reasonable administrative, technical, and organizational safeguards to protect your information.',
      'However, no online system is completely secure, and no security measure guarantees absolute protection.',
    ],
  },
  {
    heading: '8. International Transfers',
    paragraphs: [
      'Your information may be stored or processed in jurisdictions outside your country of residence where our service providers operate.',
    ],
  },
  {
    heading: '9. Your Rights',
    paragraphs: ['Depending on applicable law, you may request to:'],
    bullets: [
      'Access your data',
      'Correct inaccurate information',
      'Delete your information',
      'Restrict processing',
      'Object to processing',
      'Export your data',
      'Withdraw consent where applicable',
    ],
  },
  {
    heading: '10. GDPR & Global Privacy',
    paragraphs: [
      'Where applicable, we endeavor to comply with relevant privacy laws including GDPR and similar international privacy frameworks.',
      'Users may contact us regarding privacy requests using the details below.',
    ],
  },
  {
    heading: "11. Children's Privacy",
    paragraphs: [
      'Our Services are intended for users who are at least 18 years old. We do not knowingly collect information from children.',
    ],
  },
  {
    heading: '11. Changes',
    paragraphs: [
      'We may update this Privacy Policy periodically. Updated versions become effective when published on our website.',
    ],
  },
  {
    heading: '12. Contact',
    paragraphs: ['FiguredoutAI LLP'],
    email: 'hello@figuredoutai.com',
  },
]

export const TERMS_SECTIONS: readonly LegalSection[] = [
  {
    heading: '1. Eligibility',
    paragraphs: ['You must be at least 18 years old and legally capable of entering into binding agreements.'],
  },
  {
    heading: '2. Accounts',
    paragraphs: [
      'You are responsible for maintaining the confidentiality of your credentials and all activity under your account.',
    ],
  },
  {
    heading: '3. Acceptable Use',
    paragraphs: ['You agree not to:'],
    bullets: [
      'Break applicable laws',
      'Abuse or overload the platform',
      'Reverse engineer our software',
      'Circumvent security measures',
      'Share account credentials',
      'Upload malware',
      'Interfere with platform operation',
      'Attempt unauthorized access',
      'Use automated systems to abuse rate limits',
      'Use the Services for unlawful spam or fraud',
    ],
  },
  {
    heading: '4. AI Services Disclaimer',
    paragraphs: [
      'The Services use artificial intelligence and machine learning technologies.',
      'AI-generated outputs:',
    ],
    bullets: [
      'may contain inaccuracies,',
      'should not be treated as legal, financial, medical, or professional advice,',
      'should be independently verified before making business decisions.',
    ],
    closingParagraphs: ['You are solely responsible for decisions made using AI-generated content.'],
  },
  {
    heading: '5. Lead Data',
    paragraphs: [
      'Lead information may originate from public sources, licensed data providers, or customer-authorized integrations.',
      'You are solely responsible for complying with applicable marketing, privacy, anti-spam, and data protection laws when using such information.',
    ],
  },
  {
    heading: '6. Intellectual Property',
    paragraphs: [
      'All software, source code, designs, trademarks, branding, documentation, graphics, and platform content remain the exclusive property of FiguredoutAI LLP.',
      'No ownership rights are transferred through your use of the Services.',
    ],
  },
  {
    heading: '7. User Content',
    paragraphs: [
      'You retain ownership of information you submit.',
      'You grant FiguredoutAI LLP a limited license to process such information solely for operating and improving the Services.',
      'You represent that you have all necessary rights to submit such content.',
    ],
  },
  {
    heading: '8. API Usage & Fair Use',
    paragraphs: ['Access to APIs and automation features may be subject to:'],
    bullets: ['rate limits,', 'usage quotas,', 'fair use policies,', 'technical restrictions.'],
    closingParagraphs: ['We reserve the right to suspend excessive or abusive usage.'],
  },
  {
    heading: '9. Beta Features',
    paragraphs: ['Certain Services may be designated as Beta.', 'Beta features may change, contain bugs, or be discontinued without notice.'],
  },
  {
    heading: '10. Payments',
    paragraphs: [
      'Paid subscriptions renew according to the selected billing cycle unless canceled.',
      'Unless otherwise required by law, fees are non-refundable after payment.',
    ],
  },
  {
    heading: '11. Availability',
    paragraphs: [
      'We aim for high availability but do not guarantee uninterrupted service.',
      'Scheduled maintenance, infrastructure failures, or third-party outages may temporarily affect availability.',
    ],
  },
  {
    heading: '12. Suspension & Termination',
    paragraphs: ['We may suspend or terminate accounts that:'],
    bullets: [
      'violate these Terms,',
      'abuse platform resources,',
      'engage in fraud,',
      'create security risks,',
      'fail to pay applicable fees.',
    ],
  },
  {
    heading: '13. Disclaimer of Warranties',
    paragraphs: [
      'The Services are provided "AS IS" and "AS AVAILABLE."',
      'To the maximum extent permitted by law, FiguredoutAI LLP disclaims all warranties, whether express or implied.',
    ],
  },
  {
    heading: '14. Limitation of Liability',
    paragraphs: [
      'To the fullest extent permitted by law, FiguredoutAI LLP shall not be liable for indirect, incidental, consequential, exemplary, or punitive damages.',
      'Our total liability arising from any claim shall not exceed the total fees paid by you during the twelve (12) months preceding the event giving rise to the claim.',
    ],
  },
  {
    heading: '15. Indemnification',
    paragraphs: ['You agree to indemnify and hold harmless FiguredoutAI LLP, its partners, employees, contractors, and affiliates against claims arising from:'],
    bullets: [
      'your misuse of the Services,',
      'your violation of these Terms,',
      'your violation of applicable law,',
      'your infringement of third-party rights.',
    ],
  },
  {
    heading: '16. Export Controls',
    paragraphs: ['You agree not to use the Services in violation of applicable export control or sanctions laws.'],
  },
  {
    heading: '17. Copyright Complaints',
    paragraphs: [
      'If you believe content hosted through our Services infringes your intellectual property rights, please contact us with sufficient details to investigate the claim.',
    ],
  },
  {
    heading: '18. Governing Law',
    paragraphs: [
      'These Terms shall be governed by the laws of India.',
      'Any dispute shall be subject to the exclusive jurisdiction of the courts having jurisdiction over the registered office of FiguredoutAI LLP.',
    ],
  },
  {
    heading: '19. Changes',
    paragraphs: [
      'We may modify these Terms from time to time. Continued use of the Services constitutes acceptance of the updated Terms.',
    ],
  },
  {
    heading: '20. Contact',
    paragraphs: ['FiguredoutAI LLP'],
    email: 'hello@figuredoutai.com',
  },
]
