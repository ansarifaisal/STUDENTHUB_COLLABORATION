
BlogModule.controller('BlogController', [
    'BlogFactory',
    '$location',
    '$scope',
    '$timeout',
    '$routeParams',
    '$filter',
    '$route',
    '$rootScope',
    function (BlogFactory, $location, $scope, $timeout, $routeParams, $filter, $route, $rootScope) {

        var me = this;

        me.blogs = [];

        me.myBlogs = [];

        me.blogComments = [];

        me.blog = {}

        me.blogComment = {}

        me.createBlog = {
            blogId: null,
            title: '',
            userId: null,
            userName: '',
            description: '',
            postDate: '',
            imageUrl: ''
        };

        me.createBlogComment = {
            id: null,
            blog: null,
            userId: null,
            userName: '',
            blogComment: '',
            commentDate: ''
        };

        me.likeBlog = {
            id: null,
            blogId: null,
            blogName: '',
            userId: '',
            userName: '',
            dateTime: ''
        }

        me.reportBlog = {
            id: null,
            userName: '',
            userId: '',
            title: '',
            typeOfReport: '',
            dateTime: '',
            details: '',
            reportId: null
        }

        me.reportBlogComment = {
            id: null,
            userName: '',
            userId: '',
            title: '',
            typeOfReport: '',
            dateTime: '',
            details: '',
            reportId: null
        }

        //load jquery
        $timeout(function () {
            //this method is declared in the myScript file to this is use to instantiate the methods
            settings();
        }, 100);


        me.fetchAllBlogs = function () {
            BlogFactory.fetchAllBlogs().then(function (blogs) {

                var sortingOrder = 'postedDate'; //default sort

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

                getMyBlogs();
            },
                function (errorResponse) {
                    Materialize.toast('<strong>Error Fetching The Blogs</strong>', 6000);
                }
            );
        }


        function getMyBlogs() {
            var userID = user.id;
            BlogFactory.getMyBlogs(userID).then(function (myBlogs) {

                var sortingOrder = 'postedDate'; //default sort

                $scope.sortingOrder = sortingOrder;
                $scope.pageSizes = [5, 10, 25, 50];
                $scope.reverse = true;
                $scope.filteredItems = [];
                $scope.groupedItems = [];
                $scope.itemsPerPage = 10;
                $scope.pagedItems = [];
                $scope.currentPage = 0;
                $scope.items = myBlogs;

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
                    Materialize.toast('<strong>Error Fetching Your Blogs</strong>', 6000)
                }
            );
        }

        me.getBlog = function () {
            var blogId = $routeParams.id;
            BlogFactory.getBlog(blogId).then(function (blog) {
                me.blog = blog;
                getComments();
            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Blog', 6000);
                }
            );
        }


        function getComments() {
            var blogId = $routeParams.id;
            BlogFactory.getComments(blogId).then(function (blogComments) {

                var sortingOrder = 'commentDate'; //default sort

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
                    Materialize.toast('Error Fetching Comments', 6000);
                }
            );
        }

        //function to create blog
        me.createEditBlog = function () {

            me.createBlog.userId = user.id;
            me.createBlog.userName = user.userName;
            var dateNow = new Date();
            me.createBlog.postDate = dateTimeFormat(dateNow);
            me.createBlog.imageUrl = "noPic.jgp";

            BlogFactory.createEditBlog(me.createBlog).then(function () {
                $location.path("/user/blogs");
                Materialize.toast('Blog Created Sucessfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error While Creating The Blog', 6000);
                }
            );

        }
        //function to edit blog
        me.editBlog = function () {

            BlogFactory.createEditBlog(me.blog).then(function () {
                $location.path("/user/blogs");
                Materialize.toast('Blog Successfully Updated!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error While Updating The Blog', 6000);
                }
            );

        }

        //function to create or Edit blog comment
        me.createEditBlogComment = function () {
            var blogId = $routeParams.id;
            me.createBlogComment.blog = blogId;
            me.createBlogComment.userId = user.id;
            me.createBlogComment.userName = user.userName;
            var now = new Date();
            me.createBlogComment.commentDate = dateTimeFormat(now);

            BlogFactory.createEditBlogComment(me.createBlogComment).then(function () {
                $route.reload();
                Materialize.toast("Comment Added Sucessfully!", 6000);
            },
                function (errorResponse) {
                    Materialize.toast("Error Adding Comment", 6000);
                }
            );
        }

        //function to Like the blog
        me.blogLike = function () {
            var blogId = $routeParams.id;
            me.likeBlog.blogId = blogId;
            me.likeBlog.blogName = me.blog.title;
            console.log(me.likeBlog.blogName);
            me.likeBlog.userId = user.id;
            me.likeBlog.userName = user.userName;
            var now = new Date();
            me.likeBlog.dateTime = dateTimeFormat(now);

            console.log(me.likeBlog);

            BlogFactory.likeBlog(me.likeBlog).then(function () {
                $route.reload();
                Materialize.toast('Liked Blog Successfully!', 6000);
            },
                function (erorrResponse) {
                    Materialize.toast('Error Liking The Blog', 6000);
                }
            );
        }

        //function to report blog
        me.blogReport = function () {
            me.reportBlog.typeOfReport = 'BLOG';
            me.reportBlog.userName = user.userName;
            me.reportBlog.userId = user.id;
            var now = new Date();
            me.reportBlog.dateTime = dateTimeFormat(now);
            me.reportBlog.reportId = me.blog.blogId;
            me.reportBlog.title = me.blog.title;

            //console.log(me.reportBlog);

            BlogFactory.blogReport(me.reportBlog).then(function () {
                $route.reload();
                Materialize.toast('Blog Reported Sucessfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Reporting Blog', 6000);
                }
            );
        }

        // //function to handle blog report
        // me.handleReport = function () {
        //     var handleId = $routeParams.id;
        //     BlogFactory.handleReport(handleId).then(function () {
        //         $route.reload();
        //         Materialize('Report Handled Successfully!', 6000);
        //     },
        //         function (errorResponse) {
        //             Materialize.toast('Erorr Handling Report', 6000);
        //         }
        //     );
        // }

        //function to report a blog
        me.blogReportComment = function () {
            me.reportBlogComment.typeOfReport = 'BLOG COMMENT';

            var now = new Date();
            me.reportBlogComment.dateTime = dateTimeFormat(now);
            me.reportBlogComment.userName = user.userName;
            me.reportBlogComment.userId = user.id;
            var commentId = $routeParams.id;
            me.reportBlogComment.reportId = commentId;
            me.reportBlogComment.title = me.blogComment.blogComment;
            //console.log(me.reportBlogComment);
            BlogFactory.blogReportComment(me.reportBlogComment).then(function () {
                $location.path('/user/blogs');
                Materialize.toast('Comment Reported Sucessfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Reporting Blog Comment', 6000);
                }
            );
        }

        //function to get comment
        me.getComment = function () {
            var commentId = $routeParams.id;
            BlogFactory.getComment(commentId).then(function (comment) {
                me.blogComment = comment;
            },
                function (errorResponse) {
                    Materialize.toast('Error Fetching Comment', 6000);
                }
            );
        }

        //function to Edit blog comment
        me.editComment = function () {
            BlogFactory.createEditBlogComment(me.blogComment).then(function () {
                $location.path('/user/blog/view/' + me.blogComment.blog);
                Materialize.toast('Comment Edited Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Editing Blog', 6000);
                }
            );
        }

        //function to delete blog
        me.deleteBlog = function (action, id) {
            BlogFactory.deleteBlog(action, id).then(function () {
                $route.reload();
                Materialize.toast('Blog Deleted Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Deleting Blogs', 6000);
                }
            );
        }

        //function to delete blog comment
        me.deleteComment = function (id) {
            BlogFactory.deleteBlogComment(id).then(function () {
                $route.reload();
                Materialize.toast('Comment Deleted Successfully!', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('Error Deleting Comment', 6000);
                }
            );
        }

    }
]);