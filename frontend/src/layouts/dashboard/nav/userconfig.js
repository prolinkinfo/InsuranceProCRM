// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;


const UserConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Lead Management',
    path: '/dashboard/lead',
    icon: icon('ic_lead'),
  },
  {
    title: 'Contact Management',
    path: '/dashboard/contact',
    icon: icon('ic_contact'),
  },
  {
    title: 'Policy Management',
    path: '/dashboard/policy',
    icon: icon('ic_policy'),
  },
  {
    title: 'Document Management',
    path: '/dashboard/document',
    icon: icon('ic_document'),
  },

  {
    title: 'Calendar',
    path: '/dashboard/calendar',
    icon: icon('ic_calendar'),
  },
 
  
  {
    title: 'History',
    path: '/dashboard/history',
    icon: icon('ic_history'),
  },
];

export default UserConfig;
