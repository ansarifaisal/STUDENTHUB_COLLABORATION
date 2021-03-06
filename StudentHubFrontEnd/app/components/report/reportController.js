ReportModule.controller('BlogReportController', [
    'ReportFactory',
    '$location',
    '$scope',
    '$timeout',
    '$routeParams',
    '$filter',
    '$route',
    '$rootScope',
    function (ReportFactory, $location, $scope, $timeout, $routeParams, $filter, $route, $rootScope) {

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
            ReportFactory.fetchReportsByCategory(categoryName).then(function (blogs) {

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
            ReportFactory.getReport(id).then(function (report) {
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
            ReportFactory.handleReport(handle).then(function () {
                deleteReport(blogReportId);
            },
                function (errorResponse) {
                    Materialize.toast('Error Handling Report', 6000);
                }
            );
        }
        //function to delete the report
        function deleteReport(id) {
            ReportFactory.deleteReport(id).then(function () {
                $route.reload();
            },
                function (errorResponse) {
                    Materialize.toast('Error Deleting Report', 6000);
                }
            );
        }

        me.fetchHandledBlogs = function () {
            var categoryName = "BLOG";
            ReportFactory.fetchHandleReports(categoryName).then(function (handled) {
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
    'ReportFactory',
    '$location',
    '$scope',
    '$timeout',
    '$routeParams',
    '$filter',
    '$route',
    '$rootScope',
    function (ReportFactory, $location, $scope, $timeout, $routeParams, $filter, $route, $rootScope) {

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
            ReportFactory.fetchReportsByCategory(categoryName).then(function (blogComments) {
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
            ReportFactory.getReport(id).then(function (report) {
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
            ReportFactory.handleReport(handle).then(function () {
                deleteReport(blogReportId);
            },
                function (errorResponse) {
                    Materialize.toast('Error Handling Report', 6000);
                }
            );
        }

        //function to delete the report
        function deleteReport(id) {
            ReportFactory.deleteReport(id).then(function () {
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
            ReportFactory.fetchHandleReports(categoryName).then(function (handled) {
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

ReportModule.controller('JobReportController', [
    'ReportFactory',
    '$location',
    '$scope',
    '$timeout',
    '$routeParams',
    '$filter',
    '$route',
    '$rootScope',
    function (ReportFactory, $location, $scope, $timeout, $routeParams, $filter, $route, $rootScope) {

        var me = this;

        me.jobReport = {};

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
            status: ''
        }

        //load jquery
        $timeout(function () {
            //this method is declared in the myScript file to this is use to instantiate the methods
            settings();
        }, 100);

        me.fetchJobReports = function () {
            var categoryName = "JOB"
            ReportFactory.fetchReportsByCategory(categoryName).then(function (jobs) {
                var sortingOrder = 'id'; //default sort

                $scope.sortingOrder = sortingOrder;
                $scope.pageSizes = [5, 10, 25, 50];
                $scope.reverse = true;
                $scope.filteredItems = [];
                $scope.groupedItems = [];
                $scope.itemsPerPage = 10;
                $scope.pagedItems = [];
                $scope.currentPage = 0;
                $scope.items = jobs;

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
                    Materialize.toast('Error Fetching Job Reports', 6000);
                });
        }

        //function to handle the report
        me.handleReport = function (id) {
            ReportFactory.getReport(id).then(function (report) {
                me.jobReport = report;

                me.handle.typeOfReport = me.jobReport.typeOfReport;
                var now = new Date();
                me.handle.dateTime = dateTimeFormat(now);
                me.handle.details = me.jobReport.details;
                me.handle.userId = me.jobReport.userId;
                me.handle.userName = me.jobReport.userName;
                me.handle.title = me.jobReport.title;
                me.handle.handledBy = user.userName;
                me.handle.handledByUserId = user.id;
                me.handle.reportId = me.jobReport.reportId;
                me.handle.status = 'HANDLED';

                reportHandle(me.handle, me.jobReport.id);

            },
                function (errorResponse) {
                    Materialize.toast('Error Handling Report', 6000);
                }
            );
        }

        //function to handle the report
        function reportHandle(handle, jobReportId) {
            ReportFactory.handleReport(handle).then(function () {
                deleteReport(jobReportId);
            },
                function (errorResponse) {
                    Materialize.toast('Error Handling Report', 6000);
                }
            );
        }

        //function to delete the report
        function deleteReport(id) {
            ReportFactory.deleteReport(id).then(function () {
                $route.reload();
                Materialize.toast('Report Handled Successfully', 6000)
            },
                function (errorResponse) {
                    Materialize.toast('Error Deleting Report', 6000);
                }
            );
        }

        //Fetch Handled Report
        me.fetchHandledJobs = function () {
            var categoryName = "JOB";
            ReportFactory.fetchHandleReports(categoryName).then(function (handled) {
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


ReportModule.controller('EventReportController', [
    'ReportFactory',
    '$location',
    '$scope',
    '$timeout',
    '$routeParams',
    '$filter',
    '$route',
    '$rootScope',
    function (ReportFactory, $location, $scope, $timeout, $routeParams, $filter, $route, $rootScope) {

        var me = this;

        me.eventReport = {};

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
            status: ''
        }

        //load jquery
        $timeout(function () {
            //this method is declared in the myScript file to this is use to instantiate the methods
            settings();
        }, 100);

        me.fetchEventReports = function () {
            var categoryName = "EVENT"
            ReportFactory.fetchReportsByCategory(categoryName).then(function (events) {
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
                    Materialize.toast('Error Fetching Job Reports', 6000);
                });
        }

        //function to handle the report
        me.handleReport = function (id) {
            ReportFactory.getReport(id).then(function (report) {
                me.eventReport = report;

                me.handle.typeOfReport = me.eventReport.typeOfReport;
                var now = new Date();
                me.handle.dateTime = dateTimeFormat(now);
                me.handle.details = me.eventReport.details;
                me.handle.userId = me.eventReport.userId;
                me.handle.userName = me.eventReport.userName;
                me.handle.title = me.eventReport.title;
                me.handle.handledBy = user.userName;
                me.handle.handledByUserId = user.id;
                me.handle.reportId = me.eventReport.reportId;
                me.handle.status = 'HANDLED';

                reportHandle(me.handle, me.eventReport.id);

            },
                function (errorResponse) {
                    Materialize.toast('Error Handling Report', 6000);
                }
            );
        }

        //function to handle the report
        function reportHandle(handle, eventReportId) {
            ReportFactory.handleReport(handle).then(function () {
                deleteReport(eventReportId);
            },
                function (errorResponse) {
                    Materialize.toast('Error Handling Report', 6000);
                }
            );
        }

        //function to delete the report
        function deleteReport(id) {
            ReportFactory.deleteReport(id).then(function () {
                $route.reload();
                Materialize.toast('Report Handled Successfully', 6000)
            },
                function (errorResponse) {
                    Materialize.toast('Error Deleting Report', 6000);
                }
            );
        }

        //Fetch Handled Report
        me.fetchHandledEvents = function () {
            var categoryName = "EVENT";
            ReportFactory.fetchHandleReports(categoryName).then(function (handled) {
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
                    Materialize.toast('Error Fetching Handled Report', 6000);
                }
            );
        }

    }
]);


ReportModule.controller('ForumReportController', [
    'ReportFactory',
    '$location',
    '$scope',
    '$timeout',
    '$routeParams',
    '$filter',
    '$route',
    '$rootScope',
    function (ReportFactory, $location, $scope, $timeout, $routeParams, $filter, $route, $rootScope) {

        var me = this;

        me.forumReport = {};

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
            status: ''
        }

        //load jquery
        $timeout(function () {
            //this method is declared in the myScript file to this is use to instantiate the methods
            settings();
        }, 100);

        me.fetchForumReports = function () {
            var categoryName = "FORUM"
            ReportFactory.fetchReportsByCategory(categoryName).then(function (forums) {
                var sortingOrder = 'id'; //default sort

                $scope.sortingOrder = sortingOrder;
                $scope.pageSizes = [5, 10, 25, 50];
                $scope.reverse = true;
                $scope.filteredItems = [];
                $scope.groupedItems = [];
                $scope.itemsPerPage = 10;
                $scope.pagedItems = [];
                $scope.currentPage = 0;
                $scope.items = forums;

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
                    Materialize.toast('Error Fetching Job Reports', 6000);
                });
        }

        //function to handle the report
        me.handleReport = function (id) {
            ReportFactory.getReport(id).then(function (report) {
                me.forumReport = report;

                me.handle.typeOfReport = me.forumReport.typeOfReport;
                var now = new Date();
                me.handle.dateTime = dateTimeFormat(now);
                me.handle.details = me.forumReport.details;
                me.handle.userId = me.forumReport.userId;
                me.handle.userName = me.forumReport.userName;
                me.handle.title = me.forumReport.title;
                me.handle.handledBy = user.userName;
                me.handle.handledByUserId = user.id;
                me.handle.reportId = me.forumReport.reportId;
                me.handle.status = 'HANDLED';

                reportHandle(me.handle, me.forumReport.id);

            },
                function (errorResponse) {
                    Materialize.toast('Error Handling Report', 6000);
                }
            );
        }

        //function to handle the report
        function reportHandle(handle, forumReportId) {
            ReportFactory.handleReport(handle).then(function () {
                deleteReport(forumReportId);
            },
                function (errorResponse) {
                    Materialize.toast('Error Handling Report', 6000);
                }
            );
        }

        //function to delete the report
        function deleteReport(id) {
            ReportFactory.deleteReport(id).then(function () {
                $route.reload();
                Materialize.toast('Report Handled Successfully', 6000)
            },
                function (errorResponse) {
                    Materialize.toast('Error Deleting Report', 6000);
                }
            );
        }

        //Fetch Handled Report
        me.fetchHandledForums = function () {
            var categoryName = "FORUM";
            ReportFactory.fetchHandleReports(categoryName).then(function (handled) {
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
                    Materialize.toast('Error Fetching Handled Report', 6000);
                }
            );
        }

    }
]);


ReportModule.controller('ForumCommentReportController', [
    'ReportFactory',
    '$location',
    '$scope',
    '$timeout',
    '$routeParams',
    '$filter',
    '$route',
    '$rootScope',
    function (ReportFactory, $location, $scope, $timeout, $routeParams, $filter, $route, $rootScope) {

        var me = this;

        me.forumCommentReport = {};

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

        me.fetchForumCommentReports = function () {
            var categoryName = "FORUM COMMENT";
            ReportFactory.fetchReportsByCategory(categoryName).then(function (forumComments) {
                var sortingOrder = 'id'; //default sort

                $scope.sortingOrder = sortingOrder;
                $scope.pageSizes = [5, 10, 25, 50];
                $scope.reverse = true;
                $scope.filteredItems = [];
                $scope.groupedItems = [];
                $scope.itemsPerPage = 10;
                $scope.pagedItems = [];
                $scope.currentPage = 0;
                $scope.items = forumComments;

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
            ReportFactory.getReport(id).then(function (report) {
                me.forumCommentReport = report;

                me.handle.typeOfReport = me.forumCommentReport.typeOfReport;
                var now = new Date();
                me.handle.dateTime = dateTimeFormat(now);
                me.handle.details = me.forumCommentReport.details;
                me.handle.userId = me.forumCommentReport.userId;
                me.handle.userName = me.forumCommentReport.userName;
                me.handle.title = me.forumCommentReport.title;
                me.handle.commentId = me.forumCommentReport.commentId;
                me.handle.handledBy = user.userName;
                me.handle.handledByUserId = user.id;
                me.handle.reportId = me.forumCommentReport.reportId;
                me.handle.commentId = me.forumCommentReport.commentId;
                me.handle.status = 'HANDLED';

                reportHandle(me.handle, me.forumCommentReport.id);

            },
                function (errorResponse) {
                    Materialize.toast('Error Handling Report', 6000);
                }
            );
        }

        //function to handle the report
        function reportHandle(handle, forumReportId) {
            ReportFactory.handleReport(handle).then(function () {
                deleteReport(forumReportId);
            },
                function (errorResponse) {
                    Materialize.toast('Error Handling Report', 6000);
                }
            );
        }

        //function to delete the report
        function deleteReport(id) {
            ReportFactory.deleteReport(id).then(function () {
                $route.reload();
                Materialize.toast('Report Handled Successfully', 6000)
            },
                function (errorResponse) {
                    Materialize.toast('Error Deleting Report', 6000);
                }
            );
        }

        me.fetchHandledForumComments = function () {
            var categoryName = "FORUM COMMENT";
            ReportFactory.fetchHandleReports(categoryName).then(function (handled) {
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

ReportModule.controller('TopicReportController', [
    'ReportFactory',
    '$location',
    '$scope',
    '$timeout',
    '$routeParams',
    '$filter',
    '$route',
    '$rootScope',
    function (ReportFactory, $location, $scope, $timeout, $routeParams, $filter, $route, $rootScope) {

        var me = this;

        me.topicReport = {};

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
            status: ''
        }

        //load jquery
        $timeout(function () {
            //this method is declared in the myScript file to this is use to instantiate the methods
            settings();
        }, 100);

        me.fetchTopicReports = function () {
            var categoryName = "TOPIC";
            ReportFactory.fetchReportsByCategory(categoryName).then(function (topics) {
                var sortingOrder = 'id'; //default sort

                $scope.sortingOrder = sortingOrder;
                $scope.pageSizes = [5, 10, 25, 50];
                $scope.reverse = true;
                $scope.filteredItems = [];
                $scope.groupedItems = [];
                $scope.itemsPerPage = 10;
                $scope.pagedItems = [];
                $scope.currentPage = 0;
                $scope.items = topics;

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
                    Materialize.toast('Error Fetching Topic Reports', 6000);
                }
            );
        }

        //function to handle the report
        me.handleReport = function (id) {
            ReportFactory.getReport(id).then(function (report) {
                me.topicReport = report;

                me.handle.typeOfReport = me.topicReport.typeOfReport;
                var now = new Date();
                me.handle.dateTime = dateTimeFormat(now);
                me.handle.details = me.topicReport.details;
                me.handle.userId = me.topicReport.userId;
                me.handle.userName = me.topicReport.userName;
                me.handle.title = me.topicReport.title;
                me.handle.handledBy = user.userName;
                me.handle.handledByUserId = user.id;
                me.handle.reportId = me.topicReport.reportId;
                me.handle.status = 'HANDLED';

                reportHandle(me.handle, me.topicReport.id);

            },
                function (errorResponse) {
                    Materialize.toast('Error Handling Report', 6000);
                }
            );
        }

        //function to handle the report
        function reportHandle(handle, topicReportId) {
            ReportFactory.handleReport(handle).then(function () {
                deleteReport(topicReportId);
            },
                function (errorResponse) {
                    Materialize.toast('Error Handling Report', 6000);
                }
            );
        }

        //function to delete the report
        function deleteReport(id) {
            ReportFactory.deleteReport(id).then(function () {
                $route.reload();
                Materialize.toast('Report Handled Successfully', 6000)
            },
                function (errorResponse) {
                    Materialize.toast('Error Deleting Report', 6000);
                }
            );
        }

        //Fetch Handled Report
        me.fetchHandledForums = function () {
            var categoryName = "TOPIC";
            ReportFactory.fetchHandleReports(categoryName).then(function (handled) {
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
                    Materialize.toast('Error Fetching Handled Report', 6000);
                }
            );
        }

    }
]);


ReportModule.controller('TopicCommentReportController', [
    'ReportFactory',
    '$location',
    '$scope',
    '$timeout',
    '$routeParams',
    '$filter',
    '$route',
    '$rootScope',
    function (ReportFactory, $location, $scope, $timeout, $routeParams, $filter, $route, $rootScope) {

        var me = this;

        me.topicCommentReport = {};

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

        me.fetchTopicCommentReports = function () {
            var categoryName = "TOPIC COMMENT";
            ReportFactory.fetchReportsByCategory(categoryName).then(function (topicComments) {
                var sortingOrder = 'id'; //default sort

                $scope.sortingOrder = sortingOrder;
                $scope.pageSizes = [5, 10, 25, 50];
                $scope.reverse = true;
                $scope.filteredItems = [];
                $scope.groupedItems = [];
                $scope.itemsPerPage = 10;
                $scope.pagedItems = [];
                $scope.currentPage = 0;
                $scope.items = topicComments;

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
            ReportFactory.getReport(id).then(function (report) {
                me.topicCommentReport = report;

                me.handle.typeOfReport = me.topicCommentReport.typeOfReport;
                var now = new Date();
                me.handle.dateTime = dateTimeFormat(now);
                me.handle.details = me.topicCommentReport.details;
                me.handle.userId = me.topicCommentReport.userId;
                me.handle.userName = me.topicCommentReport.userName;
                me.handle.title = me.topicCommentReport.title;
                me.handle.commentId = me.topicCommentReport.commentId;
                me.handle.handledBy = user.userName;
                me.handle.handledByUserId = user.id;
                me.handle.reportId = me.topicCommentReport.reportId;
                me.handle.commentId = me.topicCommentReport.commentId;
                me.handle.status = 'HANDLED';

                reportHandle(me.handle, me.topicCommentReport.id);

            },
                function (errorResponse) {
                    Materialize.toast('Error Handling Report', 6000);
                }
            );
        }

        //function to handle the report
        function reportHandle(handle, topicReportId) {
            ReportFactory.handleReport(handle).then(function () {
                deleteReport(topicReportId);
            },
                function (errorResponse) {
                    Materialize.toast('Error Handling Report', 6000);
                }
            );
        }

        //function to delete the report
        function deleteReport(id) {
            ReportFactory.deleteReport(id).then(function () {
                $route.reload();
                Materialize.toast('Report Handled Successfully', 6000)
            },
                function (errorResponse) {
                    Materialize.toast('Error Deleting Report', 6000);
                }
            );
        }

        me.fetchHandledTopicComments = function () {
            var categoryName = "TOPIC COMMENT";
            ReportFactory.fetchHandleReports(categoryName).then(function (handled) {
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


ReportModule.controller('UserReportController', [
    'ReportFactory',
    '$location',
    '$scope',
    '$timeout',
    '$routeParams',
    '$filter',
    '$route',
    '$rootScope',
    function (ReportFactory, $location, $scope, $timeout, $routeParams, $filter, $route, $rootScope) {

        var me = this;

        me.userReport = {};

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
            status: ''
        }

        //load jquery
        $timeout(function () {
            //this method is declared in the myScript file to this is use to instantiate the methods
            settings();
        }, 100);

        me.fetchUserReports = function () {
            var categoryName = "USER";
            ReportFactory.fetchReportsByCategory(categoryName).then(function (users) {
                var sortingOrder = 'id'; //default sort

                $scope.sortingOrder = sortingOrder;
                $scope.pageSizes = [5, 10, 25, 50];
                $scope.reverse = true;
                $scope.filteredItems = [];
                $scope.groupedItems = [];
                $scope.itemsPerPage = 10;
                $scope.pagedItems = [];
                $scope.currentPage = 0;
                $scope.items = users;

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
                    Materialize.toast('Error Fetching Topic Reports', 6000);
                }
            );
        }

        //function to handle the report
        me.handleReport = function (id) {
            ReportFactory.getReport(id).then(function (report) {
                me.userReport = report;

                me.handle.typeOfReport = me.userReport.typeOfReport;
                var now = new Date();
                me.handle.dateTime = dateTimeFormat(now);
                me.handle.details = me.userReport.details;
                me.handle.userId = me.userReport.userId;
                me.handle.userName = me.userReport.userName;
                me.handle.title = me.userReport.title;
                me.handle.handledBy = user.userName;
                me.handle.handledByUserId = user.id;
                me.handle.reportId = me.userReport.reportId;
                me.handle.status = 'HANDLED';

                reportHandle(me.handle, me.userReport.id);

            },
                function (errorResponse) {
                    Materialize.toast('Error Handling Report', 6000);
                }
            );
        }

        //function to handle the report
        function reportHandle(handle, userReportId) {
            ReportFactory.handleReport(handle).then(function () {
                deleteReport(userReportId);
            },
                function (errorResponse) {
                    Materialize.toast('Error Handling Report', 6000);
                }
            );
        }

        //function to delete the report
        function deleteReport(id) {
            ReportFactory.deleteReport(id).then(function () {
                $route.reload();
                Materialize.toast('Report Handled Successfully', 6000)
            },
                function (errorResponse) {
                    Materialize.toast('Error Deleting Report', 6000);
                }
            );
        }

        //Fetch Handled Report
        me.fetchHandledUsers = function () {
            var categoryName = "USER";
            ReportFactory.fetchHandleReports(categoryName).then(function (handled) {
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
                    Materialize.toast('Error Fetching Handled Report', 6000);
                }
            );
        }

    }
]);