import { DocumentNode } from './NavTreeDocItem';

export const stubNavTreeDocs: DocumentNode[] = [
  {
    id: 'c15e3c12-1fa4-4973-815e-a81bee6d2aec',
    title: "Dr Banner's Tingly Feet",
    createdDate: new Date('2024-01-09T03:24:00'),
    modifiedDate: new Date('2024-01-10T05:34:07'),
    children: [
      {
        id: '79aad31c-28ed-4373-abb8-89907c34bc4a',
        title: 'Gamma Rays?',
        createdDate: new Date('2024-01-11T05:29:10'),
        modifiedDate: new Date('2024-01-12T9:12:32'),
        children: [],
      },
      {
        id: '4ef93f32-6302-44c4-a432-a639f16e7ebb',
        title: 'Crushed by Planet?',
        createdDate: new Date('2024-01-13T12:24:60'),
        modifiedDate: new Date('2024-01-14T14:56:54'),
        children: [],
      },
    ],
  },
  {
    id: 'cee09815-27c5-4a69-9bcd-8445f4d12d71',
    title: "Tony Stark's Tinnitus",
    createdDate: new Date('2024-01-10T06:29:34'),
    modifiedDate: new Date('2024-01-11T16:46:09'),
    children: [
      {
        id: '5b805c6c-6fc4-4832-8b1a-16aac91c1490',
        title: 'No Ear Space in Helmet',
        createdDate: new Date('2024-01-12T18:21:10'),
        modifiedDate: new Date('2024-01-14T01:01:01'),
        children: [],
      },
      {
        id: '1fc959c9-d27c-44d3-9ad6-2d5d10e53b1f',
        title: 'Jarvis Too Loud',
        createdDate: new Date('2024-01-16T20:03:00'),
        modifiedDate: new Date('2024-01-18T01:14:10'),
        children: [],
      },
    ],
  },
];
