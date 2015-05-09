var app = angular.module('app', []);


app.factory('dataFactory', function($http) {
    var factory = [];

    factory.getWord = function() {
        return $http.get('http://dictionary.reference.com/wordoftheday/wotd.rss');
    }

    return factory;
});


app.controller('data', function($scope, dataFactory) {
    dataFactory.getWord().success(function(data) {
        data = x2js.xml_str2json(data);
        data = data.rss.channel.item;

        description = data.description;
        length = description.length;

        $scope.link = data.link;
        $scope.word = description.substring(0, description.indexOf(':'))
        $scope.description = description.substring(description.indexOf(':') + 2, length-1);
    });
});
