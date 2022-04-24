import { Profile } from './_profile';

export const profile: Profile = {
  name: 'Maksim',
  lastname: 'Kapalin',
  type: 'Applicant',
  selfDescription: `A full-stack developer which has been working mostly on
                back-end apps and some DevOps activities the last half of the
                year, but can switch to front-end and back easily.`,
  slogan: 'We Do What We Must Because We Can!',
  education: [
    {
      title: `Bachelor's degree, “Radio-electronic device engineering”.`,
      institution: 'Samara National Research University',
      years: '2013 - 2017',
    },
    {
      title: `Master degree, “Electronic instrumentation quality assurance,
              projection and certification”`,
      institution: 'Samara National Research University',
      years: '2017 - 2019',
    },
    {
      title: `Postgraduate degree, “Informatics and computer technology"`,
      institution: 'Samara National Research University',
      years: '2019 - Present',
    },
  ],
  workExperience: [
    {
      title: 'Software Engineer',
      company: 'State Space Corporation «Roscosmos»',
      years: '2018 – 2021',
    },
    {
      title: 'Software Engineer',
      company: 'EPAM Systems, Inc.',
      years: '2021 - Present',
    },
  ],
  primarySkills: [
    'JavaScript',
    'Typescript',
    'Angular',
    'React',
    'MongoDB',
    'HTML',
    'CSS',
    'DataLoader',
    'WSL',
  ],
  secondarySkills: [
    'Redux',
    'RxJS',
    'Jira',
    'Gerrit',
    'Robo3T',
    'Jaeger',
    'Grafana',
    'Jenkins',
    'Webpack',
    'Git',
    'NodeJS',
    'Express',
    'Docker',
    'Lens',
    'Kubectl',
  ],
  languages: [
    {
      name: 'Russian',
      level: 'Native',
    },
    {
      name: 'English',
      level: 'B1+',
    },
  ],
  interests: [
    'Read tech and software news',
    'Setting up a linux pc',
    'Do useless but original projects',
  ],
  updatedDate: 1650727246205,
  systemEstimation: `"Here come the test results: 
                      Maksim is a horrible person...
                      I'm serious, that's what it says: 
                      "A horrible person." We weren't even testing for that.
                      So he fits us perfectly, the contract is being prepared`,
  links: [
    {
      title: 'Aperture Labs CV (Angular)',
      href: 'https://no95typem.github.io/aperture-cv',
    },
    {
      title: `Pointing poker (React, Redux, Redux-toolkit, NodeJS, WebSockets, 
              Typescript, Webpack)`,
      href: 'https://no95typem.github.io/pp/',
    },
    {
      title: `Online chess with offline pvp and two bots (Typescript, Webpack,
              WebSockets, WebWorkers, NodeJS)`,
      href: 'https://rolling-scopes-school.github.io/no95typem-JSFE2021Q1/codejam-chess/dist/client/#lobby',
    },
    {
      title: `Beautiful Async Race (Typescript, Webpack, WebSockets, 
              WebWorkers, NodeJS)`,
      href: 'https://no95typem.github.io/async-race/#garage',
    },
    {
      title: `A simple wallhaven client (React, SSR, Redux, Router, 
              Express, Typescript, Webpack, NodeJS, JSON Server)`,
      href: 'https://rss-react-2021-q3-wallhaven.herokuapp.com/',
    },
    {
      title: 'Match-match game (Typescript, Webpack)',
      href: 'https://rolling-scopes-school.github.io/no95typem-JSFE2021Q1/match-match-game/dist/#about',
    },
    {
      title:
        'Online-zoo (Plain JS, HTML & CSS (SCSS), adaptive and responsive)',
      href: 'https://rolling-scopes-school.github.io/no95typem-JSFE2021Q1/online-zoo/pages/landing/landing.html',
    },
    {
      title: 'My old, simple CV',
      href: 'https://no95typem.github.io/cv/',
    },
    {
      title: 'My old, not styled, easy breezy portfolio',
      href: 'https://no95typem.github.io/portfolio/',
    },
  ],
  contacts: [
    {
      type: 'mail',
      title: 'no95typem@gmail.com',
      href: 'mailto:no95typem@gmail.com',
    },
    {
      type: 'phone',
      title: 'Mobile phone (Megafon)',
      href: 'tel:+79270269879',
    },
    {
      type: 'link',
      title: 'Telegram',
      href: 'https://t.me/no95typem',
    },
    {
      type: 'link',
      title: 'LinkedIn profile',
      href: 'https://www.linkedin.com/in/maksim-kapalin-827a33219/',
    },
    {
      type: 'link',
      title: 'GitHub profile',
      href: 'https://github.com/no95typem',
    },
  ],
  imgSrc: './assets/data/profiles/maksim_kapalin.png',
};
