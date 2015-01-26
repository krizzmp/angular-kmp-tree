angular.module('Split', []).
    directive('pane', function factory() {
        return {
            restrict:"E",
            template:'<div class="content" ng-transclude></div>'+
                     '<div class="handle" ng-if="!lastChild"></div>',
            transclude:true,
            scope:{},
            require:"^splitPane",
            link: function (scope, element, attrs,ctrl) {
                scope.lastChild =element.is(":last-child");
                var horizontal = element.parent()[0].attributes.getNamedItem("horizontal");
                element.on("mousedown",">.handle", function (e) {
                    e.preventDefault();

                    if(horizontal){
                        changeWidth(e)
                    }else{
                        changeHeight(e);
                    }
                });
                function changeHeight(e) {
                    console.log("hi");
                    var initialY = e.pageY;
                    var initialHeight = element.innerHeight();
                    $(document).on("mousemove", function (e) {
                        var newY = e.pageY;
                        element.css("height", initialHeight + newY - initialY)
                    });
                    $(document).one("mouseup", function (e) {
                        $(document).off("mousemove")
                    });
                }
                function changeWidth(e) {
                    console.log("hi");
                    var initialX = e.pageX;
                    var initialWidth = element.innerWidth();
                    $(document).on("mousemove", function (e) {
                        var newX = e.pageX;
                        element.css("width", initialWidth + newX - initialX)
                    });
                    $(document).one("mouseup", function (e) {
                        $(document).off("mousemove")
                    });
                }

            }
        }
    }).directive('splitPane', function factory() {
        return {
            controller: function ($scope) {

            }
        }
});