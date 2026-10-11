import {
  SiCss,
  SiHtml5,
  SiJquery,
  SiJavascript,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiNextdotjs,
  SiPhp,
  SiReact,
} from 'react-icons/si'

export const skillGroups = [
  {
    id: 'frontend',
    skills: [
      { name: 'HTML5', Icon: SiHtml5 },
      { name: 'CSS3', Icon: SiCss },
      { name: 'JavaScript', Icon: SiJavascript },
      { name: 'React', Icon: SiReact },
      { name: 'Next.js', Icon: SiNextdotjs },
      { name: 'jQuery', Icon: SiJquery },
    ],
  },
  {
    id: 'backend',
    skills: [
      { name: 'Node.js', Icon: SiNodedotjs },
      { name: 'PHP', Icon: SiPhp },
      { name: 'Laravel', Icon: SiLaravel },
    ],
  },
  {
    id: 'databases',
    skills: [
      { name: 'MySQL', Icon: SiMysql },
      { name: 'MongoDB', Icon: SiMongodb },
    ],
  },
]

export default skillGroups
