import { Profile } from './_profile';

export const profile: Profile = {
  name: 'Caroline',
  lastname: 'Unknown',
  type: 'Employee',
  selfDescription: `A loyal and enthusiastic assistant to Cave Johnson`,
  slogan: 'Yes Mr. Johnson!',
  workExperience: [
    {
      title: 'Secretary',
      company: 'Aperture Science',
      years: 'unknown – 1982',
    },
    {
      title: 'CEO',
      company: 'Aperture Science',
      years: '1947 - 20xx',
    },
    {
      title: 'GLaDOS',
      company: 'Aperture Science',
      years: '20xx - Present',
    },
  ],
  primarySkills: ['Do tests', 'Do what Cave Johnson says'],
  languages: [
    {
      name: 'English',
      level: 'Native',
    },
  ],
  updatedDate: 1650727246205,
  systemEstimation: `The human, in the profile. She looks so familiar...`,
  imgSrc: '/assets/data/profiles/caroline-unknown.png',
};
