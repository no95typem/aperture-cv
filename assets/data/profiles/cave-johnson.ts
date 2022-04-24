import { Profile } from './_profile';

export const profile: Profile = {
  name: 'Cave',
  lastname: 'Johnson',
  type: 'Employee',
  selfDescription: `The founder of the applied sciences company 
                    Aperture Science, and CEO until the death`,
  slogan: `Science isn't about WHY It's about WHY NOT!... 
          In fact, why not invent a special safety door that 
          won't hit you in the butt on the way out because you're fired.`,
  workExperience: [
    {
      title: 'The Founder, CEO',
      company: 'Aperture Fixtures',
      years: '1943 – 1947',
    },
    {
      title: 'The Founder, CEO',
      company: 'Aperture Science',
      years: '1947 - 1982',
    },
  ],
  primarySkills: [
    'Leadership experience',
    'Communication skills',
    'Organizational know-how',
    'People skills',
    'Collaboration talent',
    'Problem-solving abilities',
  ],
  secondarySkills: ['Computer proficiency'],
  languages: [
    {
      name: 'English',
      level: 'Native',
    },
  ],
  interests: ['Science', 'Immortality', 'Black humor'],
  updatedDate: 1650727246205,
  systemEstimation: `Tests tell that Johnson does not see crises - 
                    only challenging opportunities ("challengitunities") 
                    he chooses to scale like mountains, 
                    that he is a can-do, shoot-from-the-hip, 
                    silver-tongued self-starter, and a good match 
                    for any cooperative test partner, providing 
                    they shut up and listen. `,
  imgSrc: '/assets/data/profiles/cave-johnson.png',
};
