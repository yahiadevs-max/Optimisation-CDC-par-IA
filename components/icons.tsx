import React from 'react';

const IconWrapper: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    {props.children}
  </svg>
);

export const WorkspaceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconWrapper {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
  </IconWrapper>
);

export const SmartReaderIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconWrapper {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </IconWrapper>
);

export const CostPredictorIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconWrapper {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0h.75A.75.75 0 015.25 6v.75m0 0v-.75A.75.75 0 014.5 6h-.75m-6.75 0h.75a.75.75 0 01.75.75v.75m0 0v-.75a.75.75 0 01-.75-.75h-.75m7.5 0h.75a.75.75 0 01.75.75v.75m0 0v-.75a.75.75 0 01-.75-.75h-.75m-7.5 0h.75a.75.75 0 01.75.75v.75m0 0v-.75a.75.75 0 01-.75-.75h-.75m7.5 0h.75a.75.75 0 01.75.75v.75m0 0v-.75a.75.75 0 01-.75-.75h-.75M9.75 6h.75a.75.75 0 01.75.75v.75m0 0v-.75a.75.75 0 01-.75-.75h-.75M3.75 12h.75a.75.75 0 01.75.75v.75m0 0v-.75a.75.75 0 01-.75-.75h-.75m-6.75 0h.75a.75.75 0 01.75.75v.75m0 0v-.75a.75.75 0 01-.75-.75h-.75m7.5 0h.75a.75.75 0 01.75.75v.75m0 0v-.75a.75.75 0 01-.75-.75h-.75m-7.5 0h.75a.75.75 0 01.75.75v.75m0 0v-.75a.75.75 0 01-.75-.75h-.75m7.5 0h.75a.75.75 0 01.75.75v.75m0 0v-.75a.75.75 0 01-.75-.75h-.75M9.75 12h.75a.75.75 0 01.75.75v.75m0 0v-.75a.75.75 0 01-.75-.75h-.75m-6.75 0h.75a.75.75 0 01.75.75v.75m0 0v-.75a.75.75 0 01-.75-.75h-.75m7.5 0h.75a.75.75 0 01.75.75v.75m0 0v-.75a.75.75 0 01-.75-.75h-.75M3.75 18h.75a.75.75 0 01.75.75v.75m0 0v-.75a.75.75 0 01-.75-.75h-.75m-6.75 0h.75a.75.75 0 01.75.75v.75m0 0v-.75a.75.75 0 01-.75-.75h-.75m7.5 0h.75a.75.75 0 01.75.75v.75m0 0v-.75a.75.75 0 01-.75-.75h-.75m-7.5 0h.75a.75.75 0 01.75.75v.75m0 0v-.75a.75.75 0 01-.75-.75h-.75m7.5 0h.75a.75.75 0 01.75.75v.75m0 0v-.75a.75.75 0 01-.75-.75h-.75M9.75 18h.75a.75.75 0 01.75.75v.75m0 0v-.75a.75.75 0 01-.75-.75h-.75m9-13.5v.75c0 .414.336.75.75.75h.75m0 0v-.75a.75.75 0 00-.75-.75h-.75m-6.75 0h.75c.414 0 .75.336.75.75v.75m0 0v-.75a.75.75 0 00-.75-.75h-.75m7.5 0h.75c.414 0 .75.336.75.75v.75m0 0v-.75a.75.75 0 00-.75-.75h-.75m-7.5 0h.75c.414 0 .75.336.75.75v.75m0 0v-.75a.75.75 0 00-.75-.75h-.75m7.5 0h.75c.414 0 .75.336.75.75v.75m0 0v-.75a.75.75 0 00-.75-.75h-.75M15 12v.75c0 .414.336.75.75.75h.75m0 0v-.75a.75.75 0 00-.75-.75h-.75m-6.75 0h.75c.414 0 .75.336.75.75v.75m0 0v-.75a.75.75 0 00-.75-.75h-.75m7.5 0h.75c.414 0 .75.336.75.75v.75m0 0v-.75a.75.75 0 00-.75-.75h-.75m-7.5 0h.75c.414 0 .75.336.75.75v.75m0 0v-.75a.75.75 0 00-.75-.75h-.75m7.5 0h.75c.414 0 .75.336.75.75v.75m0 0v-.75a.75.75 0 00-.75-.75h-.75" />
  </IconWrapper>
);

export const XaiJustifierIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconWrapper {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 5.25a7.5 7.5 0 001.5-6.95V4.5a2.25 2.25 0 012.25-2.25h-5.25a2.25 2.25 0 01-2.25 2.25v5.305a7.5 7.5 0 001.5 6.95z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </IconWrapper>
);

export const ReportsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <IconWrapper {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM10.5 15H15" />
  </IconWrapper>
);

export const PlusCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></IconWrapper>
);

export const FolderPlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></IconWrapper>
);

export const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></IconWrapper>
);

export const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></IconWrapper>
);

export const DocumentTextIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></IconWrapper>
);

export const TableCellsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h12A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6zM3.75 12h16.5M12 3.75v16.5" /></IconWrapper>
);

export const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></IconWrapper>
);

export const EditIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></IconWrapper>
);

export const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></IconWrapper>
);

export const FolderOpenIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a1.5 1.5 0 00-1.5-1.5h-6a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h1.5v-2.25a3 3 0 013-3h3.75V10.5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A2.25 2.25 0 0018.75 6H12a2.25 2.25 0 00-2.25 2.25v.75" /></IconWrapper>
);


export default IconWrapper;
