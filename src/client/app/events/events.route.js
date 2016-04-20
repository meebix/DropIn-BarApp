(function() {
  'use strict';

  angular
    .module('app.events')
    .run(appRun);

  appRun.$inject = ['routerHelper', 'ROLES'];
  /* @ngInject */
  function appRun(routerHelper, ROLES) {
    routerHelper.configureStates(getStates(ROLES));
  }

  function getStates(ROLES) {
    return [
      {
        state: 'events',
        config: {
          url: '/events',
          views: {
            'main': {
              templateUrl: 'app/events/list.html',
              controller: 'EventsController',
              controllerAs: 'vm'
            }
          },
          title: 'Events',
          data: {
            authorizedRoles: [
              ROLES.admin,
              ROLES.bar,
              ROLES.uatAdmin,
              ROLES.uatBar
            ]
          }
        }
      },
      {
        state: 'events-new',
        config: {
          url: '/events/new',
          views: {
            'main': {
              templateUrl: 'app/events/new.html',
              controller: 'EventsController',
              controllerAs: 'vm'
            }
          },
          title: 'Create Event',
          data: {
            authorizedRoles: [
              ROLES.admin,
              ROLES.bar,
              ROLES.uatAdmin,
              ROLES.uatBar
            ]
          }
        }
      },
      {
        state: 'events-show',
        config: {
          url: '/events/:id',
          views: {
            'main': {
              templateUrl: 'app/events/show.html',
              controller: 'EventsController',
              controllerAs: 'vm'
            }
          },
          title: 'Event',
          data: {
            authorizedRoles: [
              ROLES.admin,
              ROLES.bar,
              ROLES.uatAdmin,
              ROLES.uatBar
            ]
          }
        }
      },
      {
        state: 'events-edit',
        config: {
          url: '/events/:id/edit',
          views: {
            'main': {
              templateUrl: 'app/events/edit.html',
              controller: 'EventsController',
              controllerAs: 'vm'
            }
          },
          title: 'Edit Event',
          data: {
            authorizedRoles: [
              ROLES.admin,
              ROLES.bar,
              ROLES.uatAdmin,
              ROLES.uatBar
            ]
          }
        }
      }
    ];
  }
})();
