EventModule.controller('EventController', [
    'EventFactory',
    '$location',
    '$scope',
    '$timeout',
    '$routeParams',
    '$filter',
    '$route',
    '$rootScope',
    function (EventFactory, $location, $scope, $timeout, $routeParams, $filter, $route, $rootScope) {

        var me = this;

        me.event = {};

        events = [];

        me.joinedEvent = [];

        me.createEvent = {

            id: null,
            userId: null,
            userName: '',
            eventTitle: '',
            imageURL: '',
            venue: '',
            description: '',
            startDate: null,
            endDate: null,
            postDate: null,
            noOfApplied: null,
            reported: '',
            eventStatus: '',
            status: ''

        };

        me.reportEvent = {
            id: null,
            userName: '',
            userId: '',
            title: '',
            typeOfReport: '',
            dateTime: '',
            details: '',
            reportId: null
        }

        me.joinEvent = {

            id: null,
            event: '',
            userId: null,
            userName: '',
            status: ''

        }

        //load jquery
        $timeout(function () {
            //this method is declared in the myScript file to this is use to instantiate the methods
            settings();
        }, 100);

        me.fetchAllEvents = function () {

            EventFactory.fetchAllEvents().then(function (events) {
                var sortingOrder = 'id'; //default sort

                $scope.sortingOrder = sortingOrder;
                $scope.pageSizes = [5, 10, 25, 50];
                $scope.reverse = true;
                $scope.filteredItems = [];
                $scope.groupedItems = [];
                $scope.itemsPerPage = 10;
                $scope.pagedItems = [];
                $scope.currentPage = 0;
                $scope.items = events;

                var searchMatch = function (haystack, needle) {
                    if (!needle) {

                        return true;
                    }
                    return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
                };

                // init the filtered items
                $scope.search = function () {
                    $scope.filteredItems = $filter('filter')($scope.items, function (item) {
                        for (var attr in item) {
                            if (searchMatch(item['eventTitle'], $scope.query))
                                return true;
                        }
                        return false;
                    });

                    //take care of the sorting order
                    if ($scope.sortingOrder !== '') {
                        $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
                    }

                    $scope.currentPage = 0;
                    // now group by pages
                    $scope.groupToPages();
                };

                // show items per page
                $scope.perPage = function () {
                    $scope.groupToPages();
                };

                // calculate page in place
                $scope.groupToPages = function () {
                    $scope.pagedItems = [];

                    for (var i = 0; i < $scope.filteredItems.length; i++) {
                        if (i % $scope.itemsPerPage === 0) {
                            $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.filteredItems[i]];
                        } else {
                            $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
                        }
                    }
                };

                $scope.prevPage = function () {
                    if ($scope.currentPage > 0) {
                        $scope.currentPage--;
                    }
                };

                $scope.nextPage = function () {
                    if ($scope.currentPage < $scope.pagedItems.length - 1) {
                        $scope.currentPage++;
                    }
                };

                $scope.setPage = function () {
                    $scope.currentPage = this.n;
                };

                // functions have been describe process the data for display
                $scope.search();


                // change sorting order
                $scope.sort_by = function (newSortingOrder) {
                    if ($scope.sortingOrder == newSortingOrder)
                        $scope.reverse = !$scope.reverse;

                    $scope.sortingOrder = newSortingOrder;
                };

                me.fetchJointEvents(events);
                me.createdEvents(events);
            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Events', 6000);
                }
            );

        }


        me.createNewEvent = function () {

            me.createEvent.userId = user.id;
            me.createEvent.userName = user.userName;
            me.createEvent.imageURL = 'noPic.jpg'
            var now = new Date();
            me.createEvent.postDate = dateTimeFormat(now);
            me.createEvent.noOfApplied = 0;
            me.createEvent.reported = 'NO';
            me.createEvent.eventStatus = 'COMING SOON';
            if (user.role == 'Super_Admin' || user.role == 'ADMIN') {
                me.createEvent.status = 'APPROVED';
            } else {
                me.createEvent.status = 'PENDING';
            }

            EventFactory.createEvent(me.createEvent).then(function () {
                $location.path('/user/events');
                Materialize.toast('Event Created Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Creating Event', 6000);
                }
            );

        }

        me.eventJoin = function (id) {
            EventFactory.getEvent(id).then(function (event) {
                me.joinEvent.event = event;
                me.joinEvent.userId = user.id;
                me.joinEvent.userName = user.userName;
                me.joinEvent.status = "APPLIED";
                EventFactory.applyEvent(me.joinEvent).then(function () {
                    $route.reload();
                    Materialize.toast('Event Joined Successfully!', 6000);
                },
                    function (errorResponse) {
                        console.log(errorResponse);
                        if (errorResponse.status == 302) {
                            Materialize.toast('You Already Applied For This Event', 6000);
                        } else {
                            Materialize.toast('Error Joining Event', 6000);
                        }
                    }
                );
            },
                function (errorResponse) {

                    Materialize.toast('Error Joining Event', 6000);
                }
            );
        }

        me.getEvent = function () {
            var eventId = $routeParams.id;
            EventFactory.getEvent(eventId).then(function (event) {
                me.event = event;
            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Event', 6000);
                }
            );
        }

        me.editEvent = function () {
            EventFactory.editEvent(me.event).then(function () {
                $location.path('/user/event/view/' + me.event.id);
                Materialize.toast('Event Edited Sucessfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Editing Event', 6000);
                }
            );
        }

        me.leaveEvent = function (id) {
            EventFactory.leaveEvent(id).then(function () {
                $route.reload();
                Materialize.toast('Event Left Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('<strong>Error Leaving Event</strong>', 6000);
                }
            );
        }

        //function event report
        me.eventReport = function () {

            me.reportEvent.typeOfReport = 'EVENT';
            me.reportEvent.userName = user.userName;
            me.reportEvent.userId = user.id;
            var now = new Date();
            me.reportEvent.dateTime = dateTimeFormat(now);
            me.reportEvent.reportId = me.event.id;
            me.reportEvent.title = me.event.eventTitle;

            console.log(me.reportEvent);

            EventFactory.reportEvent(me.reportEvent).then(function () {
                $location.path('/user/event/view/' + me.reportEvent.reportId);
                Materialize.toast('Event Reported Sucessfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Reporting Event', 6000);
                }
            );
        }

        me.fetchJointEvents = function (events) {

            me.appliedEvents = [];

            for (var i = 0; i < events.length; i++) {
                for (var j = 0; j < events[i].eventJoined.length; j++) {
                    if (events[i].eventJoined[j].userId == user.id) {
                        me.appliedEvents.push(events[i]);
                    }
                }
            }

            var sortingOrder_ONE = 'id'; //default sort

            $scope.sortingOrder_ONE = sortingOrder_ONE;
            $scope.pageSizes_ONE = [5, 10, 25, 50];
            $scope.reverse_ONE = true;
            $scope.filteredItems_ONE = [];
            $scope.groupedItems_ONE = [];
            $scope.itemsPerPage_ONE = 10;
            $scope.pagedItems_ONE = [];
            $scope.currentPage_ONE = 0;
            $scope.items_ONE = me.appliedEvents;

            var searchMatch_ONE = function (haystack, needle) {
                if (!needle) {
                    return true;
                }
                return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
            };

            // init the filtered items
            $scope.search_ONE = function () {
                $scope.filteredItems_ONE = $filter('filter')($scope.items_ONE, function (item) {
                    for (var attr in item) {
                        if (searchMatch_ONE(item['eventTitle'], $scope.query_ONE))
                            return true;
                    }
                    return false;
                });

                //take care of the sorting order
                if ($scope.sortingOrder_ONE !== '') {
                    $scope.filteredItems_ONE = $filter('orderBy')($scope.filteredItems_ONE, $scope.sortingOrder_ONE, $scope.reverse_ONE);
                }

                $scope.currentPage_ONE = 0;
                // now group by pages
                $scope.groupToPages_ONE();
            };

            // show items per page
            $scope.perPage_ONE = function () {
                $scope.groupToPages_ONE();
            };

            // calculate page in place
            $scope.groupToPages_ONE = function () {
                $scope.pagedItems_ONE = [];

                for (var i = 0; i < $scope.filteredItems_ONE.length; i++) {
                    if (i % $scope.itemsPerPage_ONE === 0) {
                        $scope.pagedItems_ONE[Math.floor(i / $scope.itemsPerPage_ONE)] = [$scope.filteredItems_ONE[i]];
                    } else {
                        $scope.pagedItems_ONE[Math.floor(i / $scope.itemsPerPage_ONE)].push($scope.filteredItems_ONE[i]);
                    }
                }
            };

            $scope.prevPage_ONE = function () {
                if ($scope.currentPage_ONE > 0) {
                    $scope.currentPage_ONE--;
                }
            };

            $scope.nextPage_ONE = function () {
                if ($scope.currentPage_ONE < $scope.pagedItems_ONE.length - 1) {
                    $scope.currentPage_ONE++;
                }
            };

            $scope.setPage_ONE = function () {
                $scope.currentPage_ONE = this.n;
            };

            // functions have been describe process the data for display
            $scope.search_ONE();


            // change sorting order
            $scope.sort_by_ONE = function (newSortingOrder) {
                if ($scope.sortingOrder_ONE == newSortingOrder)
                    $scope.reverse_ONE = !$scope.reverse_ONE;

                $scope.sortingOrder_ONE = newSortingOrder;
            };

        }

        me.createdEvents = function (events) {
            me.createdEvents = [];

            for (var i = 0; i < events.length; i++) {
                if (events[i].userId == user.id) {
                    me.createdEvents.push(events[i]);
                }
            }

            var sortingOrder_TWO = 'id'; //default sort

            $scope.sortingOrder_TWO = sortingOrder_TWO;
            $scope.pageSizes_TWO = [5, 10, 25, 50];
            $scope.reverse_TWO = true;
            $scope.filteredItems_TWO = [];
            $scope.groupedItems_TWO = [];
            $scope.itemsPerPage_TWO = 10;
            $scope.pagedItems_TWO = [];
            $scope.currentPage_TWO = 0;
            $scope.items_TWO = me.createdEvents;

            var searchMatch_TWO = function (haystack, needle) {
                if (!needle) {
                    return true;
                }
                return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
            };

            // init the filtered items
            $scope.search_TWO = function () {
                $scope.filteredItems_TWO = $filter('filter')($scope.items_TWO, function (item) {
                    for (var attr in item) {
                        if (searchMatch_TWO(item['eventTitle'], $scope.query_TWO))
                            return true;
                    }
                    return false;
                });

                //take care of the sorting order
                if ($scope.sortingOrder_TWO !== '') {
                    $scope.filteredItems_TWO = $filter('orderBy')($scope.filteredItems_TWO, $scope.sortingOrder_TWO, $scope.reverse_TWO);
                }

                $scope.currentPage_TWO = 0;
                // now group by pages
                $scope.groupToPages_TWO();
            };

            // show items per page
            $scope.perPage_TWO = function () {
                $scope.groupToPages_TWO();
            };

            // calculate page in place
            $scope.groupToPages_TWO = function () {
                $scope.pagedItems_TWO = [];

                for (var i = 0; i < $scope.filteredItems_TWO.length; i++) {
                    if (i % $scope.itemsPerPage_TWO === 0) {
                        $scope.pagedItems_TWO[Math.floor(i / $scope.itemsPerPage_TWO)] = [$scope.filteredItems_TWO[i]];
                    } else {
                        $scope.pagedItems_TWO[Math.floor(i / $scope.itemsPerPage_TWO)].push($scope.filteredItems_TWO[i]);
                    }
                }
            };

            $scope.prevPage_TWO = function () {
                if ($scope.currentPage_TWO > 0) {
                    $scope.currentPage_TWO--;
                }
            };

            $scope.nextPage_TWO = function () {
                if ($scope.currentPage_TWO < $scope.pagedItems_TWO.length - 1) {
                    $scope.currentPage_TWO++;
                }
            };

            $scope.setPage_TWO = function () {
                $scope.currentPage_TWO = this.n;
            };

            // functions have been describe process the data for display
            $scope.search_TWO();


            // change sorting order
            $scope.sort_by_TWO = function (newSortingOrder) {
                if ($scope.sortingOrder_TWO == newSortingOrder)
                    $scope.reverse_TWO = !$scope.reverse_TWO;

                $scope.sortingOrder_TWO = newSortingOrder;
            };

        }

        me.deleteEvent = function (action, id) {
            EventFactory.deleteEvent(action, id).then(function () {
                $route.reload();
                Materialize.toast('Event Deleted Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Deleting Event', 6000);
                }
            );
        }

    }]);