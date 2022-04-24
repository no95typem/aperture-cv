export interface Education {
  title: string;
  institution: string;
  years: string;
}

export interface experience {
  title: string;
  company: string;
  years: string;
  description?: string;
}

export interface Contact {
  type: 'mail' | 'phone' | 'link';
  title: string;
  text?: string;
  href?: string;
}

export interface Profile {
  type: 'Employee' | 'Applicant';
  name: string;
  lastname: string;
  selfDescription?: string;
  slogan?: string;
  education?: Education[];
  workExperience?: experience[];
  primarySkills?: string[];
  secondarySkills?: string[];
  languages?: {
    name: string;
    level: string;
  }[];
  interests?: string[];
  updatedDate?: number;
  systemEstimation?: string;
  links?: {
    title: string;
    href: string;
  }[];
  contacts?: Contact[];
  imgSrc?: string;
}
