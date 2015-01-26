var test=1;
angular.module('kmpTree', ['RecursionHelper'])

    .directive('kmpTree', function factory(RecursionHelper) {
        function link(iElement) {
            console.log("link gets called");
            iElement.find(".line").prepend("t"+test);
            test++;
            iElement.on("dragstart", '>.linef', function dragStart(e) {
                console.log(e.originalEvent.dataTransfer);
                var dragIcon = document.createElement('img');
                dragIcon.src = 'img/arrow-left.png';
                dragIcon.width = 20;
                dragIcon.height = 20;
                e.originalEvent.dataTransfer.setDragImage(dragIcon, -10, -10);

            });
            iElement.on("dragover", '>.linef', function dragOver(e) {
                if(e.target){
                    //console.log(this);

                }
                var dragIcon = document.createElement('img');
                dragIcon.src = 'img/stripe.png';
                dragIcon.width = 100;
                e.originalEvent.dataTransfer.setDragImage(dragIcon, -10, -10);
            });
            iElement.on("drop", '>.linef', function dragOver(e) {
                if(e.target){
                    //console.log('leave',this);
                    //$(this).removeClass("over");
                }

            });
            iElement.on("dragleave", '>.linef', function dragOver(e) {
                if(e.target){
                    //console.log('leave',this);

                }

            });
        }

        return {
            restrict: "E",
            transclude: true,

            templateUrl: "tree.html",
            scope: {
                things: "=",
                g: "@"
            },
            controllerAs: "ctrl",
            compile: function (element, attr, transclude) {
                return RecursionHelper.compile(element, function link2(scope, iElement, iAttrs, controller, transcludeFn) {
                    link(iElement);
                }, transclude);
            },
            bindToController: true,
            controller: function ($scope) {
                var self = this;
                self.hidden = false;

                self.h = function (index) {
                    var oldT = self.g;
                    var isLastChild = index==self.things.children.length-1;
                    var hasChildren = !self.things.children[index].children.length == 0;

                    var expand = function expand() {
                        return hasChildren? "⊟" : "─";
                    };

                    function extracted() {
                        if (oldT.includes("├")) {
                            return "│└";
                        } else if (isLastChild) {
                            return " └";
                        } else if (oldT.includes("└")) {
                            return " ├";
                        }
                    }

                    var newT = oldT.slice(0, -2) + extracted() + expand();
                    return newT;
                };

            }
        };
    }).directive('ngTranscludeReplace', ['$log', function ($log) {
        return {
            terminal: true,
            restrict: 'EA',

            link: function ($scope, $element, $attr, ctrl, transclude) {
                if (!transclude) {
                    $log.error('orphan',
                        'Illegal use of ngTranscludeReplace directive in the template! ' +
                        'No parent directive that requires a transclusion found. ');
                    return;
                }
                transclude(function (clone) {
                    if (clone.length) {
                        $element.replaceWith(clone);
                    }
                    else {
                        $element.remove();
                    }
                });
            }
        };
    }]);
