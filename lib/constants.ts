export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Subsidiaries', href: '/subsidiaries' },
  { label: 'Team', href: '/team' },
  { label: 'Careers', href: '/careers' },
  { label: 'Media', href: '/media' },
  { label: 'Contact', href: '/contact' },
] as const

export const STATS = [
  { value: 14, suffix: '+', label: 'Sectors of Activity' },
  { value: 2, suffix: '', label: 'Country Offices' },
  { value: 50, suffix: '+', label: 'Qualified Experts' },
  { value: null, symbol: '\u221E', label: 'Ambition' },
] as const

export const SERVICES = [
  {
    step: '01',
    title: 'Feasibility Studies',
    description: 'Market Study, Technical Study, Financial Study. Desk and field work for a well-thought techno-commercial decision.',
    icon: 'search',
  },
  {
    step: '02',
    title: 'Design & Execution',
    description: 'From concept to commissioning. Best-in-class engineering with sustainability goals at every stage.',
    icon: 'compass',
  },
  {
    step: '03',
    title: 'Furniture & Supply',
    description: "Best quality furniture and equipment sourced from the world's most reliable brands.",
    icon: 'package',
  },
  {
    step: '04',
    title: 'Project Management',
    description: 'Knowledge, tools and techniques to complete activities with efficacy and efficiency.',
    icon: 'gantt',
  },
] as const

export const PHILOSOPHY_PILLARS = [
  {
    icon: 'globe',
    title: 'VISION',
    description: 'Become a World Leading Conglomerate bridging continents and creating lasting value.',
  },
  {
    icon: 'lightbulb',
    title: 'INNOVATION',
    description: 'Smart and State-of-the-art industries that redefine standards across every sector.',
  },
  {
    icon: 'leaf',
    title: 'SUSTAINABILITY',
    description: 'Solutions for basic and high-standard development needs with minimal environmental footprint.',
  },
] as const

export const SOCIAL_CARDS = [
  {
    icon: 'leaf',
    title: 'ECO-FRIENDLY',
    description: 'All our projects and services respect nature and promote environmental preservation.',
  },
  {
    icon: 'users',
    title: 'COMMUNITY IMPACT',
    description: 'Empowering lives and communities through inclusive development and opportunity.',
  },
  {
    icon: 'check-circle',
    title: 'BEYOND COMPLIANCE',
    description: 'Driven by a desire to contribute meaningfully, not just meet minimum standards.',
  },
] as const

export const SECTORS = [
  { name: 'Banking & Finance', icon: 'landmark', size: 'large' },
  { name: 'Mining & Resources', icon: 'mountain', size: 'tall' },
  { name: 'Public Works', icon: 'building-2', size: 'wide' },
  { name: 'Agriculture', icon: 'wheat', size: 'small' },
  { name: 'Food & Beverage', icon: 'utensils', size: 'small' },
  { name: 'Electronics', icon: 'cpu', size: 'small' },
  { name: 'Energy Industry', icon: 'zap', size: 'small' },
  { name: 'Health & Sciences', icon: 'heart-pulse', size: 'wide' },
  { name: 'Education & Training', icon: 'graduation-cap', size: 'wide' },
  { name: 'Telecom & Media', icon: 'radio', size: 'small' },
  { name: 'Transport & Logistics', icon: 'truck', size: 'small' },
  { name: 'Textile Industry', icon: 'shirt', size: 'small' },
  { name: 'Supermarkets', icon: 'shopping-cart', size: 'small' },
  { name: 'Automotive', icon: 'car', size: 'small' },
] as const

export const TEAM_MEMBERS = [
  { firstName: 'firstName', lastName: 'lastName', position: 'position', department: 'department', image: '/teams/membre1.png' },
  { firstName: 'firstName', lastName: 'lastName', position: 'position', department: 'department', image: '/teams/membre2.png' },
  { firstName: 'firstName', lastName: 'lastName', position: 'position', department: 'department', image: '/teams/membre3.png' },
  { firstName: 'firstName', lastName: 'lastName', position: 'position', department: 'department', image: '/teams/membre4.png' },
  //{ firstName: 'firstName', lastName: 'lastName', position: 'position', department: 'department', image: undefined },
  //{ firstName: 'firstName', lastName: 'lastName', position: 'position', department: 'department', image: undefined },
] as const

export const OFFICES = [
  {
    country: 'Canada',
    flag: 'CA',
    type: 'type',
    city: 'Vancouver, British Columbia, Canada',
    email: 'mail',
    phone: '+1(778)381-1325',
  },
  {
    country: 'Cameroon',
    flag: 'CM',
    type: 'type',
    city: "Bel'air Road, Kribi, South, Cameroon.",
    email: 'mail',
    phone: '(237)677151188',
  },
] as const

export const CAREERS_OPENINGS = [
  { title: 'Senior Project Manager', department: 'Operations', location: 'Toronto, CA', type: 'Full-time' },
  { title: 'Financial Analyst', department: 'Finance', location: 'Toronto, CA', type: 'Full-time' },
  { title: 'Mining Engineer', department: 'Engineering', location: 'Douala, CM', type: 'Full-time' },
  { title: 'Agricultural Consultant', department: 'Agriculture', location: 'Douala, CM', type: 'Contract' },
  { title: 'Digital Marketing Manager', department: 'Marketing', location: 'Remote', type: 'Full-time' },
] as const
