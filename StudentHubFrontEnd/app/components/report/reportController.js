ReportModule.controller('BlogReportController', [
    'BlogReportFactory',
    '$location',
    '$scope',
    '$timeout',
    '$routeParams',
    '$filter',
    '$route',
    '$rootScope',
    function (BlogReportFactory, $location, $scope, $timeout, $routeParams, $filter, $route, $rootScope) {

        var me = this;

        me.blogReports = [];

        me.blogReport = {};

        me.handled = [];

        me.handle = {
            id: null,
            typeOfReport: '',
            dateTime: '',
            details: '',
            userId: null,
            userName: '',
            title: '',
            handledBy: '',
            handledByUserId: null,
            reportId: null,
            commentId: null,
            status: ''
        }

        //load jquery
        $timeout(function () {
            //this method is declared in the myScript file to this is use to instantiate the methods
            settings();
        }, 100);

        //function to fetch blog reports
        me.fetchBlogReports = function () {
            var categoryName = "BLOG";
            BlogReportFactory.fetchReportsByCategory(categoryName).then(function (blogs) {

                var sortingOrder = 'id'; //default sort

                $scope.sortingOrder = sortingOrder;
                $scope.pageSizes = [5, 10, 25, 50];
                $scope.reverse = true;
                $scope.filteredItems = [];
                $scope.groupedItems = [];
                $scope.itemsPerPage = 10;
                $scope.pagedItems = [];
                $scope.currentPage = 0;
                $scope.items = blogs;

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
                            if (searchMatch(item['title'], $scope.query))
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
                    Materialize.toast("Error Fetching Data", 6000);
                }
            );
        }

        //function to handle the report
        me.handleReport = function (id) {
            BlogReportFactory.getReport(id).then(function (report) {
                me.blogReport = report;

                me.handle.typeOfReport = me.blogReport.typeOfReport;
                var now = new Date();
                me.handle.dateTime = dateTimeFormat(now);
                me.handle.details = me.blogReport.details;
                me.handle.userId = me.blogReport.userId;
                me.handle.userName = me.blogReport.userName;
                me.handle.title = me.blogReport.title;
                me.handle.handledBy = user.userName;
                me.handle.handledByUserId = user.id;
                me.handle.reportId = me.blogReport.reportId;
                me.handle.commentId = me.blogReport.commentId;
                me.handle.status = 'HANDLED';

                reportHandle(me.handle, me.blogReport.id);

            },
                function (errorResponse) {
                    Materialize.toast('Error Handling Report', 6000);
                }
            );
        }

        //function to handle the report
        function reportHandle(handle, blogReportId) {
            BlogReportFactory.handleReport(handle).then(function () {
                deleteReport(blogReportId);
            },
                function (errorResponse) {
                    Materialize.toast('Error Handling Report', 6000);
                }
            );
        }
        //function to delete the report
        function deleteReport(id) {
            BlogReportFactory.deleteReport(id).then(function () {
                $route.reload();
            },
                function (errorResponse) {
                    Materialize.toast('Error Deleting Report', 6000);
                }
            );
        }

        me.fetchHandledBlogs = function () {
            var categoryName = "BLOG";
            BlogReportFactory.fetchHandleReports(categoryName).then(function (handled) {
                var sortingOrder = 'id'; //default sort

                $scope.sortingOrder = sortingOrder;
                $scope.pageSizes = [5, 10, 25, 50];
                $scope.reverse = true;
                $scope.filteredItems = [];
                $scope.groupedItems = [];
                $scope.itemsPerPage = 10;
                $scope.pagedItems = [];
                $scope.currentPage = 0;
                $scope.items = handled;

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
                            if (searchMatch(item['title'], $scope.query))
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
                    Materialize.toast('Error Handling Report', 6000);
                }
            );
        }

    }
]);


ReportModule.controller('BlogCommentReportController', [
    'BlogCommentReportFactory',
    '$location',
    '$scope',
    '$timeout',
    '$routeParams',
    '$filter',
    '$route',
    '$rootScope',
    function (BlogCommentReportFactory, $location, $scope, $timeout, $routeParams, $filter, $route, $rootScope) {

        var me = this;

        me.blogCommentReport = {};

        me.handle = {
            id: null,
            typeOfReport: '',
            dateTime: '',
            details: '',
            userId: null,
            userName: '',
            title: '',
            handledBy: '',
            handledByUserId: null,
            reportId: null,
            commentId: null,
            status: ''
        }

        //load jquery
        $timeout(function () {
            //this method is declared in the myScript file to this is use to instantiate the methods
            settings();
        }, 100);

        me.fetchBlogCommentReports = function () {
            var categoryName = "BLOG COMMENT"
            BlogCommentReportFactory.fetchReportsByCategory(categoryName).then(function (blogComments) {
                var sortingOrder = 'id'; //default sort

                $scope.sortingOrder = sortingOrder;
                $scope.pageSizes = [5, 10, 25, 50];
                $scope.reverse = true;
                $scope.filteredItems = [];
                $scope.groupedItems = [];
                $scope.itemsPerPage = 10;
                $scope.pagedItems = [];
                $scope.currentPage = 0;
                $scope.items = blogComments;

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
                            if (searchMatch(item['title'], $scope.query))
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
                    Materialize.toast('Error Fetching Comment Reports', 6000);
                });
        }

        //function to handle the report
        me.handleReport = function (id) {
            BlogCommentReportFactory.getReport(id).then(function (report) {
                me.blogCommentReport = report;

                me.handle.typeOfReport = me.blogCommentReport.typeOfReport;
                var now = new Date();
                me.handle.dateTime = dateTimeFormat(now);
                me.handle.details = me.blogCommentReport.details;
                me.handle.userId = me.blogCommentReport.userId;
                me.handle.userName = me.blogCommentReport.userName;
                me.handle.title = me.blogCommentReport.title;
                me.handle.commentId = me.blogCommentReport.commentId;
                me.handle.handledBy = user.userName;
                me.handle.handledByUserId = user.id;
                me.handle.reportId = me.blogCommentReport.reportId;
                me.handle.commentId = me.blogCommentReport.commentId;
                me.handle.status = 'HANDLED';

                reportHandle(me.handle, me.blogCommentReport.id);

            },
                function (errorResponse) {
                    Materialize.toast('Error Handling Report', 6000);
                }
            );
        }

        //function to handle the report
        function reportHandle(handle, blogReportId) {
            BlogCommentReportFactory.handleReport(handle).then(function () {
                deleteReport(blogReportId);
            },
                function (errorResponse) {
                    Materialize.toast('Error Handling Report', 6000);
                }
            );
        }

        //function to delete the report
        function deleteReport(id) {
            BlogCommentReportFactory.deleteReport(id).then(function () {
                $route.reload();
                Materialize.toast('Report Handled Successfully', 6000)
            },
                function (errorResponse) {
                    Materialize.toast('Error Deleting Report', 6000);
                }
            );
        }

        me.fetchHandledBlogComments = function () {
            var categoryName = "BLOG COMMENT";
            BlogCommentReportFactory.fetchHandleReports(categoryName).then(function (handled) {
                var sortingOrder = 'id'; //default sort

                $scope.sortingOrder = sortingOrder;
                $scope.pageSizes = [5, 10, 25, 50];
                $scope.reverse = true;
                $scope.filteredItems = [];
                $scope.groupedItems = [];
                $scope.itemsPerPage = 10;
                $scope.pagedItems = [];
                $scope.currentPage = 0;
                $scope.items = handled;

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
                            if (searchMatch(item['title'], $scope.query))
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
                    Materialize.toast('Error Handling Report', 6000);
                }
            );
        }

    }
]);