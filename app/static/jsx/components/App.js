/** @jsx React.DOM */

define([
    'react',
], function(React) {
    var App = React.createClass({
        getInitialState: function() {
            return {
                suggestions: []
            }
        },

        getAutoSuggestions: function(keywords) {
            /*
                @keywords - array of keywords

                Returns:
                JSON Response
            */

            var self = this;

            if (_.isArray(keywords)) {
                this._xhr = $.get('/api/complete/search?client=firefox&q=' + keywords.join('+'), function(data) {
                    self.setState({suggestions: data[1]})
                });
            }
            else {
                return false;
            }
        },

        handleChange: function(e) {
            var keywords = e.target.value.match(/\S+/g),
                self = this;

            // clear timeout if timeout is already set
            if (this._t) {
                clearTimeout(this._t);
            }

            // abort any ajax calls
            if (this._xhr) {
                this._xhr.abort();
            }

            // if no keywords then set the suggestions to empty array
            if (keywords === null) {
                this.setState({suggestions: []});
            }
            else {
                this._t = setTimeout(function() { self.getAutoSuggestions(keywords) }, 500);
            }
        },

        render: function() {
            var suggestions = [];

            _.forEach(this.state.suggestions, function(s, i) {
                suggestions.push(<li key={i}><a>{s}</a></li>);
            })

            return (<div className='r-container'>
                        <h1>Google Auto Suggestion</h1>
                        <input autoFocus autoComplete='off' type='text' onChange={this.handleChange} defaultValue='' placeholder='type something here...' />
                        {suggestions.length > 0 ? <ul className='list'>{suggestions}</ul> : null}
                    </div>);
        }
    });

    return App;
});