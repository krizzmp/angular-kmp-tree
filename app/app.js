if (!String.prototype.endsWith) {
    Object.defineProperty(String.prototype, 'endsWith', {
        value: function(searchString, position) {
            var subjectString = this.toString();
            if (position === undefined || position > subjectString.length) {
                position = subjectString.length;
            }
            position -= searchString.length;
            var lastIndex = subjectString.indexOf(searchString, position);
            return lastIndex !== -1 && lastIndex === position;
        }
    });
}
if (!String.prototype.includes) {
    String.prototype.includes = function() {'use strict';
        return String.prototype.indexOf.apply(this, arguments) !== -1;
    };
}
angular.module('app', ['kmpTree','Split']).controller("mainCtrl", function mainCtrl($scope) {
    var self = this;
    self.start = ['8'];
    self.things = {
        name: "1",
        children: [
            {
                name: "1.1",
                children: [
                    {
                        name: "1.1.1",
                        children: [
                            {
                                name: "1.1.1.1",
                                children: [
                                ]
                            },
                            {
                                name: "1.1.1.2",
                                children: []
                            }
                        ]
                    }
                ]
            },
            {
                name: "1.2",
                children: [{
                    name: "1.2.1",
                    children: [
                        {
                            name: "1.2.1.1",
                            children: []
                        },
                        {
                            name: "1.2.1.2",
                            children: []
                        }
                    ]
                }]
            },
            {
                name: "1.2",
                children: [{
                    name: "1.2.1",
                    children: [
                        {
                            name: "1.2.1.1",
                            children: []
                        },
                        {
                            name: "1.2.1.2",
                            children: []
                        }
                    ]
                }]
            }
        ]
    };
});
