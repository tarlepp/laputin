/*global _ */

function SingleFileCtrl($scope, LaputinAPI) {
    $scope.tagName = "";
    $scope.editing = false;

    $scope.edit = function () {
        $scope.editing = true;
    };

    $scope.closeEditing = function () {
        $scope.editing = false;
    };

    $scope.open = function () {
        LaputinAPI.openFile($scope.file);
    };

    $scope.addTag = function (tag) {
        $scope.file.tags.push(tag);
        LaputinAPI.linkTagToFile(tag, $scope.file, function (err) {
            if (err) {
                var idx = $scope.file.tags.indexOf(tag);
                if (idx !== -1) {
                    $scope.file.tags.splice(idx, 1);
                }
                alert(err);
            }
        });
        $scope.availableTagQuery = "";
    };

    $scope.removeTag = function (tag) {
        var idx = $scope.file.tags.indexOf(tag);
        if (idx !== -1) {
            $scope.file.tags.splice(idx, 1);
            LaputinAPI.unlinkTagFromFile(tag, $scope.file);
        }
    };

    $scope.createNewTag = function () {
        LaputinAPI.createNewTag($scope.newTagName, function (tag) {
            $scope.newTagName = "";
            $scope.addTag(tag);
        });
    };

    $scope.addTagFromSearch = function () {
        var tag = _.find($scope.tags, function (tag) {
            return tag.name === $scope.tagName;
        });

        if (tag) {
            $scope.addTag(tag);
            $scope.tagName = "";
        }
    };

    $scope.tagSearchFn = function() {
        return $.map($scope.tags, function(candidate) {
            return candidate.name;
        });
    };
};

module.exports = SingleFileCtrl;
