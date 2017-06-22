JobAcceptModule.controller('JobAcceptController', [
    'JobAcceptFactory',
    '$location',
    '$scope',
    '$timeout',
    '$routeParams',
    '$filter',
    '$route',
    '$rootScope',
    function (JobAcceptFactory, $location, $scope, $timeout, $routeParams, $filter, $route, $rootScope) {

        var me = this;

        //load jquery
        $timeout(function () {
            //this method is declared in the myScript file to this is use to instantiate the methods
            settings();
        }, 100);

        me.fetchAllJob = function () {
            JobAcceptFactory.fetchAllJob().then(function (appliedJob) {
                var sortingOrder = 'id'; //default sort

                $scope.sortingOrder = sortingOrder;
                $scope.pageSizes = [5, 10, 25, 50];
                $scope.reverse = true;
                $scope.filteredItems = [];
                $scope.groupedItems = [];
                $scope.itemsPerPage = 10;
                $scope.pagedItems = [];
                $scope.currentPage = 0;
                $scope.items = appliedJob;

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
                            if (searchMatch(item['userName'], $scope.query))
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
                    Materialize.toast('Error Fetching Applied Job', 6000);
                }
            );
        }

        me.performAction = function (action, id) {
            JobAcceptFactory.performAction(action, id).then(function () {
                $route.reload();
                Materialize.toast(action + ' Performed Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error While ' + action + ' The Job', 6000);
                }
            );
        }

    }
]);