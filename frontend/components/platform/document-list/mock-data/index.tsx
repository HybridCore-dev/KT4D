interface DataType {
  id: number;
  title: string;
  author: string;
  documentType: string;
  year: string;
  link: string;
}

const data: DataType[] = [
  {
    id: 1,
    title:
      "Major job loss fears over AI threat as Minister issues ‘some roles will disappear in future’ alert after shock report",
    author: "Jason Johnson, The Irish Sun",
    documentType: "Newspaper Articles",
    year: "2024",
    link: "/documents/newspaper-articles/1.pdf",
  },
  {
    id: 2,
    title: "What Impact Could the EU's AI Act Have on Jobs?",
    author: "Euronews",
    documentType: "Newspaper Articles",
    year: "2024",
    link: "/documents/newspaper-articles/2.pdf",
  },
  {
    id: 3,
    title: "UK Grapples with AI Job Crisis: Why Europe Stays Calm",
    author: "M Moiz",
    documentType: "Newspaper Articles",
    year: "2024",
    link: "/documents/newspaper-articles/3.pdf",
  },
  {
    id: 4,
    title: "The 5 new jobs being created in Europe because of AI",
    author: "Euronews",
    documentType: "Newspaper Articles",
    year: "2024",
    link: "/documents/newspaper-articles/4.pdf",
  },
  {
    id: 5,
    title:
      "AI to affect millions of Belgian jobs but unemployment not inevitable",
    author: "The Brussels Times",
    documentType: "Newspaper Articles",
    year: "2024",
    link: "/documents/newspaper-articles/5.pdf",
  },
  {
    id: 6,
    title: "We all want a similar outcome': Citizens' panel has its say on AI",
    author: "The Brussels Times",
    documentType: "Newspaper Articles",
    year: "2024",
    link: "/documents/newspaper-articles/6.pdf",
  },
  {
    id: 7,
    title:
      "Belgium's cultural sector calls for urgent regulation of artificial intelligence",
    author: "The Brussels Times",
    documentType: "Newspaper Articles",
    year: "2024",
    link: "/documents/newspaper-articles/7.pdf",
  },
  {
    id: 8,
    title:
      "The future of work: How to navigate the changing job market in the age of AI",
    author: "Euronews",
    documentType: "Newspaper Articles",
    year: "2023",
    link: "/documents/newspaper-articles/8.pdf",
  },
  {
    id: 9,
    title: "AI could replace equivalent of 300 million jobs",
    author: "BBC",
    documentType: "Newspaper Articles",
    year: "2023",
    link: "/documents/newspaper-articles/9.pdf",
  },
  {
    id: 10,
    title:
      "Impact of AI on Jobs in the UK: 10-30% of Jobs Could be Automated with AI",
    author: "Tech Republic",
    documentType: "Newspaper Articles",
    year: "2023",
    link: "/documents/newspaper-articles/10.pdf",
  },

  {
    id: 11,
    title:
      "Will This Time Be Different? A Review of the Literature on the Impact of Artificial Intelligence on Employment, Incomes and Growth",
    author:
      "Bertin Martens, Songül Tolan, JRC Digital Economy Working Paper 2018-08",
    documentType: "Academic Papers",
    year: "2019",
    link: "/documents/academic-papers/1.pdf",
  },
  {
    id: 12,
    title:
      "The Digital Revolution and the Labour Economics of Automation: A Review",
    author: "Nick Deschacht",
    documentType: "Academic Papers",
    year: "2021",
    link: "/documents/academic-papers/2.pdf",
  },
  {
    id: 13,
    title:
      "The impact of Artificial Intelligence on the labour market: What do we know so far?",
    author: "Marguerita Lane, Anne Saint-Martin",
    documentType: "Academic Papers",
    year: "2021",
    link: "/documents/academic-papers/3.pdf",
  },
  {
    id: 14,
    title:
      "The Role of the Artificial Intelligence in the Labour Law: Relations in European and Asian Aspect",
    author: "DergiPark",
    documentType: "Academic Papers",
    year: "2021",
    link: "/documents/academic-papers/4.pdf",
  },
  {
    id: 15,
    title:
      "Between Risk Mitigation and Labour Rights Enforcement: Assessing the Transatlantic Race to Govern AI-driven Decision-Making Through a Comparative Lens",
    author: "De Stefano, Valerio",
    documentType: "Academic Papers",
    year: "2023",
    link: "/documents/academic-papers/5.pdf",
  },
  {
    id: 16,
    title:
      "Automation and New Tasks: How Technology Displaces and Reinstates Labor",
    author: "Daron Acemoglu, Pascual Restrepo",
    documentType: "Academic Papers",
    year: "2019",
    link: "/documents/academic-papers/6.pdf",
  },
  {
    id: 17,
    title: "The Impact of Artificial Intelligence on the Labor Market",
    author: "Michael Webb",
    documentType: "Academic Papers",
    year: "2020",
    link: "/documents/academic-papers/7.pdf",
  },
  {
    id: 18,
    title: "AI and the Economy",
    author: "Jason Furman, Robert Seamans",
    documentType: "Academic Papers",
    year: "2018",
    link: "/documents/academic-papers/8.pdf",
  },
  {
    id: 19,
    title: "Governing the Work-Related Risks of AI",
    author: "Anke Hassel, Didem Özkiziltan",
    documentType: "Academic Papers",
    year: "2023",
    link: "/documents/academic-papers/9.pdf",
  },
  {
    id: 20,
    title: "Promoting Human-Centred AI in the Workplace",
    author: "Martin Krzywdzinski, Detlef Gerst, Florian Butollo",
    documentType: "Academic Papers",
    year: "2023",
    link: "/documents/academic-papers/10.pdf",
  },

  {
    id: 21,
    title: "Improving Working Conditions Using AI",
    author:
      "Policy Department for Economic, Scientific and Quality of Life Policies Directorate",
    documentType: "Policy Papers",
    year: "2021",
    link: "/documents/policy-papers/1.pdf",
  },
  {
    id: 22,
    title: "ChatGPT in the Public Sector",
    author: " General Secretariat of the Council",
    documentType: "Policy Papers",
    year: "2023",
    link: "/documents/policy-papers/2.pdf",
  },
  {
    id: 23,
    title: "ArtificiaI Intelligence and Public Services",
    author:
      "Policy Department for Economic, Scientific and Quality of Life Policies Directorate",
    documentType: "Policy Papers",
    year: "2021",
    link: "/documents/policy-papers/3.pdf",
  },
  {
    id: 24,
    title:
      "Artificial Intelligence for Interoperability in the European Public Sector",
    author: "Joint Research Centre (JRC)",
    documentType: "Policy Papers",
    year: "2023",
    link: "/documents/policy-papers/4.pdf",
  },
  {
    id: 25,
    title: "Explainable Artificial Intelligence",
    author: "European Data Protection Supervisor",
    documentType: "Policy Papers",
    year: "2023",
    link: "/documents/policy-papers/5.pdf",
  },
  {
    id: 26,
    title: "Skills for People, Competitiveness, Sustainability",
    author: "Cedefop",
    documentType: "Policy Papers",
    year: "2023",
    link: "/documents/policy-papers/6.pdf",
  },
  {
    id: 27,
    title: "Towards Recovery and Resilience",
    author: "Eurofound",
    documentType: "Policy Papers",
    year: "2024",
    link: "/documents/policy-papers/7.pdf",
  },
  {
    id: 28,
    title:
      "Trends, Challenges and Opportunities in the EU Transport Labour Market",
    author: "Policy Department for Structural and Cohesion Policies",
    documentType: "Policy Papers",
    year: "2024",
    link: "/documents/policy-papers/8.pdf",
  },
  {
    id: 29,
    title: "Algorithmic Management Practices in Regular Workplaces",
    author: "Joint Research Centre (JRC)",
    documentType: "Policy Papers",
    year: "2024",
    link: "/documents/policy-papers/9.pdf",
  },
  {
    id: 30,
    title: "Artificial Intelligence in EU Securities Markets",
    author: "European Securities and Markets Authority (ESMA)",
    documentType: "Policy Papers",
    year: "2023",
    link: "/documents/policy-papers/10.pdf",
  },
];

export default data;
