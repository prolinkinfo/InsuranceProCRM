// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;


const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'User Management',
    path: '/dashboard/user',
    icon: icon('ic_user'),
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
  // {
  //   title: 'Communication',
  //   path: '/dashboard/communication',
  //   icon: icon('ic_communication'),
  // },
  {
    title: 'Calendar',
    path: '/dashboard/calendar',
    icon: icon('ic_calendar'),
  },
  // {
  //   title: 'Renewal',
  //   path: '/dashboard/renewal',
  //   icon: icon('ic_renewal'),
  // },
  // {
  //   title: 'Policy Plans',
  //   path: '/dashboard/policyplans',
  //   icon: icon('ic_plan'),
  // },
  {
    title: 'History',
    path: '/dashboard/history',
    icon: icon('ic_history'),
  },

  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),/
  // },

  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
