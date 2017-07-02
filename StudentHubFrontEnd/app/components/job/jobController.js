JobModule.controller('JobController', [
    'JobFactory',
    'ManageJobFactory',
    '$location',
    '$scope',
    '$timeout',
    '$routeParams',
    '$filter',
    '$route',
    '$rootScope',
    function (JobFactory, ManageJobFactory, $location, $scope, $timeout, $routeParams, $filter, $route, $rootScope) {

        var me = this;

        me.job = {}

        me.jobs = [];

        me.jobApplied = {
            id: null,
            userId: null,
            job: '',
            userName: '',
            appliedDate: '',
            status: ''
        }

        me.createJob = {

            id: null,
            title: '',
            company: '',
            experience: null,
            description: '',
            userId: null,
            userName: '',
            qualification: '',
            postDate: null,
            salary: null,
            keySkills: '',
            location: '',
            report: '',
            status: ''

        };

        me.reportJob = {
            id: null,
            userName: '',
            userId: '',
            title: '',
            typeOfReport: '',
            dateTime: '',
            details: '',
            reportId: null
        }

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

        me.fetchAllJobs = function () {
            JobFactory.fetchAllJobs().then(function (jobs) {

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

                me.appliedJob(jobs);

                me.createdJobList(jobs);
            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Jobs', 6000);
                }
            );
        }

        //function to fetch applied job
        me.appliedJob = function (jobs) {

            me.appliedJobs = [];

            for (var i = 0; i < jobs.length; i++) {
                for (var j = 0; j < jobs[i].jobApplied.length; j++) {
                    if (jobs[i].jobApplied[j].userId == user.id) {
                        me.appliedJobs.push(jobs[i]);
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
            $scope.items_ONE = me.appliedJobs;

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
                        if (searchMatch_ONE(item['title'], $scope.query_ONE))
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

        };

        //function to get job
        me.getJob = function () {
            var jobId = $routeParams.id;
            JobFactory.getJob(jobId).then(function (job) {
                me.job = job;
            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Job', 6000);
                }
            );
        }

        //function to apply job
        me.applyJob = function (id) {
            JobFactory.getJob(id).then(function (job) {
                me.jobApplied.userId = user.id;
                me.jobApplied.job = job;
                me.jobApplied.userName = user.userName;
                var now = new Date();
                me.jobApplied.appliedDate = dateTimeFormat(now);
                me.jobApplied.status = 'PENDING';

                JobFactory.applyJob(me.jobApplied).then(function () {
                    $route.reload();
                    Materialize.toast('Job Applied Successfully!', 6000);
                },
                    function (errorResponse) {
                        Materialize.toast('Error Applying Job', 6000);
                    }
                );
            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Job', 6000);
                }
            );
        }

        //function to del applied job
        me.delAppliedJob = function (id) {
            JobFactory.delAppliedJob(id).then(function () {
                $route.reload();
                Materialize.toast('Job Removed From Your List Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error While Deleting', 6000);
                });
        }

        //function to fetch created jobs
        me.createdJobList = function (jobs) {

            me.createdJobs = [];

            for (var i = 0; i < jobs.length; i++) {
                if (jobs[i].userId == user.id) {
                    me.createdJobs.push(jobs[i]);
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
            $scope.items_TWO = me.createdJobs;

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
                        if (searchMatch_TWO(item['title'], $scope.query_TWO))
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
        };

        //function to create job
        me.jobCreate = function () {

            me.createJob.userId = user.id;
            me.createJob.userName = user.userName;
            var now = new Date();
            me.createJob.postDate = dateTimeFormat(now);
            me.createJob.report = 'NO';
            if (user.role == 'Super_Admin' || user.role == 'ADMIN') {
                me.createJob.status = 'APPROVED';
            } else {
                me.createJob.status = 'PENDING';
            }

            JobFactory.createJob(me.createJob).then(function () {
                $route.reload();
                Materialize.toast('Job Created Sucessfully', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Creating Job', 6000);
                }
            );
        }

        //function to delete or disable job
        me.deleteJob = function (action, id) {
            JobFactory.deleteJob(action, id).then(function () {
                $route.reload();
                Materialize.toast('Job Delete Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error While Deleting Job', 6000);
                });
        }

        //function to edit job
        me.editJob = function () {
            JobFactory.editJob(me.job).then(function () {
                $location.path('/user/job/view/' + me.job.id);
                Materialize.toast('Job Edited Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error While Deleting Job', 6000);
                }
            );
        }

        //function job report
        me.jobReport = function () {
            me.reportJob.typeOfReport = 'JOB';
            me.reportJob.userName = user.userName;
            me.reportJob.userId = user.id;
            var now = new Date();
            me.reportJob.dateTime = dateTimeFormat(now);
            me.reportJob.reportId = me.job.id;
            me.reportJob.title = me.job.title;

            console.log(me.reportJob);

            JobFactory.reportJob(me.reportJob).then(function () {
                $location.path('/user/job/view/' + me.reportJob.reportId);
                Materialize.toast('Job Reported Sucessfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Reporting Job', 6000);
                }
            );
        }

        me.approveJob = function (id, action) {
            ManageJobFactory.validateJob(id, action).then(function () {
                $route.reload();
                Materialize.toast('Job Approved Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Approving Job', 6000);
                });
        }


    }]);