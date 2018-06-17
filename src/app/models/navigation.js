let arr = JSON.parse(localStorage.getItem('mockData'));
let data = arr===null?{
  email: '',
}:JSON.parse(localStorage.getItem('mockData'))


export const navigation = {
  brand:      'reactDirectorAdmin',
  leftLinks:  [],
  rightLinks: [
    {
      label:      'Home',
      link:       '/',
      view:       'home',
      isRouteBtn: true
    },
    {
      label:      'About',
      link:       '/about',
      view:       'about',
      isRouteBtn: true
    }
  ],
  sideMenu: [
    // group menu #1
    {
      id: 1,
      group: 'Offerte Power',
      menus: [
        {
          name: 'Dashboard',
          linkTo: '/offerte/dashboard',
          faIconName: 'fa-eye'
        },
        {
          name: 'Nuova offerta',
          linkTo: '/offerte/newoffer/',
          faIconName: 'fa fa-plus-square'
        },
        {
          name: 'Lista offerte',
          linkTo: '/Dashboard/statsCard',
          faIconName: 'fa-briefcase'
        }
      ]
     },
    {
      id: 2,
      group: 'Offerte Gas',
      menus: [
        {
          name: 'Dashboard',
          linkTo: '/offerte/dashboard',
          faIconName: 'fa-eye'
        },
        {
          name: 'Nuova offerta',
          linkTo: '/offerte/newoffer/',
          faIconName: 'fa fa-plus-square'
        },
        {
          name: 'Lista offerte',
          linkTo: '/Dashboard/statsCard',
          faIconName: 'fa-briefcase'
        }
      ]
     },
     {
      id: 3,
      group: 'Master',
      menus: [
        {
          name: 'Log Proxy Pun',
          linkTo: 'Dashboard/twitterFeed',
          faIconName: 'fa-eye'
        },
        {
          name: 'Log Consumi Power Clienti',
          linkTo: 'Dashboard/twitterFeed',
          faIconName: 'fa-eye'
        },
        {
          name: 'Xls Offerte Power',
          linkTo: 'Dashboard/twitterFeed',
          faIconName: 'fa-eye'
        },
        {
          name: 'Xls Offerte Gas',
          linkTo: 'Dashboard/twitterFeed',
          faIconName: 'fa-eye'
        },
        {
          name: 'Abilitazione Utenti',
          linkTo: 'Dashboard/twitterFeed',
          faIconName: 'fa-eye'
        }
      ]
    }
    /*,
     // group menu #2
     {
      id: 3,
      group: 'Dashboard  ',
      menus: [
        {
          name: 'Dashboard preview',
          linkTo: '/',
          faIconName: 'fa-eye'
        },
        {
          name: 'StatsCard',
          linkTo: '/Dashboard/statsCard',
          faIconName: 'fa-check-square-o'
        },
        {
          name: 'Notifications',
          linkTo: '/Dashboard/notifications',
          faIconName: 'fa-bell'
        },
        {
          name: 'Work progress',
          linkTo: '/Dashboard/workProgress',
          faIconName: 'fa-briefcase'
        },
        {
          name: 'Twitter feed',
          linkTo: '/Dashboard/twitterFeed',
          faIconName: 'fa-twitter'
        },
        {
          name: 'Team Mates',
          linkTo: '/Dashboard/teamMates',
          faIconName: 'fa-user'
        },
        {
          name: 'Todo list',
          linkTo: '/Dashboard/todoList',
          faIconName: 'fa-check'
        }
      ]
    },
    // group menu #3
    {
      id: 4,
      group: 'General',
      menus: [
        {
          name: 'General preview',
          linkTo: '/general',
          faIconName: 'fa-eye'
        },
        {
          name: 'Breadcrumb',
          linkTo: '/general/breadcrumb',
          faIconName: 'fa-bars'
        },
        {
          name: 'Stat',
          linkTo: '/general/stat',
          faIconName: 'fa-bar-chart'
        },
        {
          name: 'Basic progress bars',
          linkTo: '/general/basicProgressBars',
          faIconName: 'fa-tasks'
        },
        {
          name: 'Tab panels',
          linkTo: '/general/tabPanels',
          faIconName: 'fa-columns'
        },
        {
          name: 'Striped progress bar',
          linkTo: '/general/stripedProgressBars',
          faIconName: 'fa-tasks'
        },
        {
          name: 'Alerts',
          linkTo: '/general/alerts',
          faIconName: 'fa-exclamation-triangle'
        },
        {
          name: 'Pagination',
          linkTo: '/general/pagination',
          faIconName: 'fa-sort'
        },
        {
          name: 'Default buttons',
          linkTo: '/general/defaultButtons',
          faIconName: 'fa-hand-o-up'
        }
      ]
    },
    // group menu #4
    {
      id: 5,
      group: 'BasicElements',
      menus: [
        {
          name: 'Basic Elements preview',
          linkTo: '/basicElements',
          faIconName: 'fa-eye'
        }
      ]
    },
    // group menu #5
    {
      id: 6,
      group: 'SimpleTables',
      menus: [
        {
          name: 'Simple tables preview',
          linkTo: '/simpleTables',
          faIconName: 'fa-eye'
        }
      ]
    }

    */
  ]
};
