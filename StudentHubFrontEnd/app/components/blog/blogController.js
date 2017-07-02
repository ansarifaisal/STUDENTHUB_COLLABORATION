
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
            noOfComments: null,
            noOfLikes: null,
            status: '',
            report: '',
            imageUrl: ''
        };

        //load jquery
        $timeout(function () {
            //this method is declared in the myScript file to this is use to instantiate the methods
            settings();
        }, 100);


        me.createBlogComment = {
            id: null,
            blog: null,
            userId: null,
            userName: '',
            blogComment: '',
            commentDate: '',
            report: ''
        };

        me.likeBlog = {
            id: null,
            blog: null,
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
            reportId: null,
            commentId: null,
            status: ''
        }

        me.fetchAllBlogs = function () {

            BlogFactory.fetchAllBlogs().then(function (blogs) {

                var sortingOrder = 'blogId'; //default sort

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

                me.fetchMyBlogs(blogs);
            },
                function (errorResponse) {
                    Materialize.toast('<strong>Error Fetching The Blogs</strong>', 6000);
                }
            );
        }

        me.fetchMyBlogs = function (blogs) {
            me.myBlogs = [];

            for (var i = 0; i < blogs.length; i++) {
                if (blogs[i].userId == user.id) {
                    me.myBlogs.push(blogs[i]);
                }
            }
            var sortingOrder_ONE = 'blogId'; //default sort

            $scope.sortingOrder_ONE = sortingOrder_ONE;
            $scope.pageSizes_ONE = [5, 10, 25, 50];
            $scope.reverse_ONE = true;
            $scope.filteredItems_ONE = [];
            $scope.groupedItems_ONE = [];
            $scope.itemsPerPage_ONE = 10;
            $scope.pagedItems_ONE = [];
            $scope.currentPage_ONE = 0;
            $scope.items_ONE = me.myBlogs;

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

        }

        me.getBlog = function () {
            var blogId = $routeParams.id;
            BlogFactory.getBlog(blogId).then(function (blog) {
                me.blog = blog;
                me.getComments();
            },
                function (errorResponse) {
                    Materialize.toast('<strong>Error Fetching Blog</strong>', 6000);
                }
            );
        }


        me.getComments = function () {
            var blogId = $routeParams.id;
            BlogFactory.getComments(blogId).then(function (blogComments) {

                var sortingOrder = 'blogId'; //default sort

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
                    Materialize.toast('<strong>Error Fetching Comments</strong>', 6000);
                }
            );
        }

        //function to create blog
        me.createEditBlog = function () {

            me.createBlog.userId = user.id;
            me.createBlog.userName = user.userName;
            var dateNow = new Date();
            me.createBlog.postDate = dateTimeFormat(dateNow);
            me.createBlog.noOfComments = 0;
            me.createBlog.noOfLikes = 0;
            if (user.role == "Super_Admin" || user.role == "ADMIN") {
                me.createBlog.status = "APPROVED";
            } else {
                me.createBlog.status = "PENDING";
            }
            me.createBlog.report = "NO";
            me.createBlog.imageUrl = "noPic.jgp";

            BlogFactory.createEditBlog(me.createBlog).then(function () {
                $location.path("/user/blogs");
                Materialize.toast('<strong>Blog Created Sucessfully!</strong>', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('<strong>Error While Creating The Blog</strong>', 6000);
                }
            );

        }
        //function to edit blog
        me.editBlog = function () {

            BlogFactory.createEditBlog(me.blog).then(function () {
                $location.path("/user/blog/view/" + me.blog.blogId);
                Materialize.toast('<strong>Blog Successfully Updated!</strong>', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('<strong>Error While Updating The Blog</strong>', 6000);
                }
            );

        }

        //function to create or Edit blog comment
        me.createEditBlogComment = function () {
            var blogId = $routeParams.id;
            me.createBlogComment.blog = me.blog;
            me.createBlogComment.userId = user.id;
            me.createBlogComment.userName = user.userName;
            var now = new Date();
            me.createBlogComment.commentDate = dateTimeFormat(now);
            me.createBlogComment.report = 'NO';

            BlogFactory.createEditBlogComment(me.createBlogComment).then(function () {
                $route.reload();
                Materialize.toast("<strong>Comment Added Sucessfully!</strong>", 6000);
            },
                function (errorResponse) {
                    Materialize.toast("<strong>Error Adding Comment</strong>", 6000);
                }
            );
        }

        //function to Like the blog
        me.blogLike = function () {
            var blogId = $routeParams.id;
            me.likeBlog.blog = me.blog;
            me.likeBlog.userId = user.id;
            me.likeBlog.userName = user.userName;
            var now = new Date();
            me.likeBlog.dateTime = dateTimeFormat(now);

            BlogFactory.likeBlog(me.likeBlog).then(function () {
                $route.reload();
                Materialize.toast('<strong>Liked Blog Successfully!</strong>', 6000);
            },
                function (erorrResponse) {
                    Materialize.toast('Error Liking The Blog', 6000);
                }
            );
        }


        //function to dislike the blog
        me.disLikeBlog = function (id) {
            BlogFactory.disLikeBlog(id).then(function () {
                $route.reload();
                Materialize.toast('<strong>Blog Disliked Successfully!</strong>', 6000);
            },
                function (erorrResponse) {
                    Materialize.toast('Error Disliking The Blog', 6000);
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
                Materialize.toast('<strong>Blog Reported Sucessfully!</strong>', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('<strong>Error Reporting Blog</strong>', 6000);
                }
            );
        }

        //function to report a blog
        me.blogReportComment = function () {
            me.reportBlogComment.typeOfReport = 'BLOG COMMENT';

            var now = new Date();
            me.reportBlogComment.dateTime = dateTimeFormat(now);
            me.reportBlogComment.userName = user.userName;
            me.reportBlogComment.userId = user.id;
            me.reportBlogComment.reportId = me.blogComment.blog.blogId;
            me.reportBlogComment.title = me.blogComment.blogComment;
            var commentId = $routeParams.id;
            me.reportBlogComment.commentId = commentId;
            me.reportBlogComment.status = "UNREAD";
            //console.log(me.reportBlogComment);
            BlogFactory.blogReportComment(me.reportBlogComment).then(function () {
                $location.path('/user/blog/view/' + me.blogComment.blog.blogId);
                Materialize.toast('<strong>Comment Reported Sucessfully!</strong>', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('<strong>Error Reporting Blog Comment</strong>', 6000);
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
                    Materialize.toast('<strong>Error Fetching Comment</strong>', 6000);
                }
            );
        }

        //function to Edit blog comment
        me.editComment = function () {
            BlogFactory.createEditBlogComment(me.blogComment).then(function () {
                $location.path('/user/blog/view/' + me.blogComment.blog.blogId);
                Materialize.toast('<strong>Comment Edited Successfully!</strong>', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('<strong>Error Editing Blog</strong>', 6000);
                }
            );
        }

        //function to delete blog
        me.deleteBlog = function (action, id) {
            BlogFactory.deleteBlog(action, id).then(function () {
                $route.reload();
                Materialize.toast('<strong>Blog Deleted Successfully!</strong>', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('<strong>Error Deleting Blogs</strong>', 6000);
                }
            );
        }

        //function to delete blog comment
        me.deleteComment = function (id) {
            BlogFactory.deleteBlogComment(id).then(function () {
                $route.reload();
                Materialize.toast('<strong>Comment Deleted Successfully!</strong>', 6000);
            },
                function (errorResponse) {
                    Materialize.toast('<strong>Error Deleting Comment</strong>', 6000);
                }
            );
        }

    }
]);