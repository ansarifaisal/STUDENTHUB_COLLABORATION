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

                var test = {
                    "Pascal": [
                        { "Name": "Pascal Made Simple", "price": 700 },
                        { "Name": "Guide to Pascal", "price": 400 }],

                    "Scala": [
                        { "Name": "Scala for the Impatient", "price": 1000 },
                        { "Name": "Scala in Depth", "price": 1300 }]
                }
                events.push(test);

                console.log(events);


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
            me.createEvent.status = 'PENDING';

            console.log(me.createEvent);

            EventFactory.createEvent(me.createEvent).then(function () {
                $route.reload();
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
                eventJoined(me.joinEvent);
            },
                function (errorResponse) {
                    Materialize.toast('Error Joining Event', 6000);
                });
        }

        function eventJoined(joinEvent) {
            EventFactory.applyEvent(joinEvent).then(function () {
                $route.reload();
                Materialize.toast('Event Joined Successfully!', 6000);
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

                console.log(me.event);
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
                    Materialize.toast('Error Leaving Event', 6000);
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

        me.fetchJoinevents = function () {
            var userID = user.id;

            EventFactory.fetchAppliedEvents(userID).then(function (myEvents) {
                var sortingOrder = 'id'; //default sort

                $scope.sortingOrder = sortingOrder;
                $scope.pageSizes = [5, 10, 25, 50];
                $scope.reverse = true;
                $scope.filteredItems = [];
                $scope.groupedItems = [];
                $scope.itemsPerPage = 10;
                $scope.pagedItems = [];
                $scope.currentPage = 0;
                $scope.items = myEvents;

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
            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Events', 6000);
                });

        }

        me.createdEvents = function () {
            var userID = user.id;

            EventFactory.fetchCreatedEvents(userID).then(function (createdEvent) {
                var sortingOrder = 'id'; //default sort

                $scope.sortingOrder = sortingOrder;
                $scope.pageSizes = [5, 10, 25, 50];
                $scope.reverse = true;
                $scope.filteredItems = [];
                $scope.groupedItems = [];
                $scope.itemsPerPage = 10;
                $scope.pagedItems = [];
                $scope.currentPage = 0;
                $scope.items = createdEvent;

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
            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Events', 6000);
                }
            );
        }

    }]);