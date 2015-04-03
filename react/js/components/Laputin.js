var Header = require("./Header.js");
var Search = require("./Search.js");
var Files = require("./Files.js");
var LaputinAPI = require("../utils/LaputinAPI");

var Laputin = React.createClass({
    getInitialState: function () {
        var self = this;
        LaputinAPI.getFiles(function (files) {
            self.setState({ files: files });
        });

        return {
            files: []
        }
    },
    render: function() {
        return <div>
            <Header />
            <Search />
            <Files files={this.state.files} />
        </div>;
    }
});

module.exports = Laputin;