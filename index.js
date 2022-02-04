var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var audio = document.getElementById("beep");

var SetTimer = function SetTimer(props) {
  var id = props.title.toLowerCase();
  return React.createElement(
    "div",
    { className: "timer-container" },
    React.createElement(
      "h2",
      { id: id + "-label" },
      props.title,
      " Length"
    ),
    React.createElement(
      "div",
      { className: "flex actions-wrapper" },
      React.createElement(
        "button",
        { id: id + "-decrement", onClick: props.handleDecrease },
        React.createElement("i", { className: "fas fa-minus" })
      ),
      React.createElement(
        "span",
        { id: id + "-length" },
        props.count
      ),
      React.createElement(
        "button",
        { id: id + "-increment", onClick: props.handleIncrease },
        React.createElement("i", { className: "fas fa-plus" })
      )
    )
  );
};

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      breakCount: 5,
      sessionCount: 25,
      clockCount: 25 * 60,
      currentTimer: 'Session',
      isPlaying: false
    };

    _this.handlePlayPause = function () {
      var isPlaying = _this.state.isPlaying;


      if (isPlaying) {
        clearInterval(_this.loop);
        _this.setState({
          isPlaying: false
        });
      } else {
        _this.setState({
          isPlaying: true
        });
        _this.loop = setInterval(function () {
          var _this$state = _this.state,
              clockCount = _this$state.clockCount,
              currentTimer = _this$state.currentTimer,
              breakCount = _this$state.breakCount,
              sessionCount = _this$state.sessionCount;


          if (clockCount === 0) {
            _this.setState({
              currentTimer: currentTimer === "Session" ? "Break" : "Session",
              clockCount: currentTimer === "Session" ? breakCount * 60 : sessionCount * 60
            });

            audio.play();
          } else {
            _this.setState({
              clockCount: clockCount - 1
            });
          }
        }, 1000);
      }
    };

    _this.handleReset = function () {
      _this.setState({
        breakCount: 5,
        sessionCount: 25,
        clockCount: 25 * 60,
        currentTimer: 'Session',
        isPlaying: false
      });
      clearInterval(_this.loop);

      audio.pause();
      audio.currentTime = 0;
    };

    _this.convertToTime = function (count) {
      var minutes = Math.floor(count / 60);
      var seconds = count % 60;

      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      return minutes + ":" + seconds;
    };

    _this.handleBreakIncrease = function () {
      var _this$state2 = _this.state,
          breakCount = _this$state2.breakCount,
          isPlaying = _this$state2.isPlaying,
          currentTimer = _this$state2.currentTimer;


      if (breakCount < 60) {
        if (!isPlaying && currentTimer === 'Break') {
          _this.setState({
            breakCount: breakCount + 1,
            clockCount: (breakCount + 1) * 60
          });
        } else {
          _this.setState({
            breakCount: breakCount + 1
          });
        }
      }
    };

    _this.handleBreakDecrease = function () {
      var _this$state3 = _this.state,
          breakCount = _this$state3.breakCount,
          isPlaying = _this$state3.isPlaying,
          currentTimer = _this$state3.currentTimer;


      if (breakCount > 1) {
        if (!isPlaying && currentTimer === 'Break') {
          _this.setState({
            breakCount: breakCount - 1,
            clockCount: (breakCount - 1) * 60
          });
        } else {
          _this.setState({
            breakCount: breakCount - 1
          });
        }
      }
    };

    _this.handleSessionIncrease = function () {
      var _this$state4 = _this.state,
          sessionCount = _this$state4.sessionCount,
          isPlaying = _this$state4.isPlaying,
          currentTimer = _this$state4.currentTimer;


      if (sessionCount < 60) {
        if (!isPlaying && currentTimer === 'Session') {
          _this.setState({
            sessionCount: sessionCount + 1,
            clockCount: (sessionCount + 1) * 60
          });
        } else {
          _this.setState({
            sessionCount: sessionCount + 1
          });
        }
      }
    };

    _this.handleSessionDecrease = function () {
      var _this$state5 = _this.state,
          sessionCount = _this$state5.sessionCount,
          isPlaying = _this$state5.isPlaying,
          currentTimer = _this$state5.currentTimer;


      if (sessionCount > 1) {
        if (!isPlaying && currentTimer === 'Session') {
          _this.setState({
            sessionCount: sessionCount - 1,
            clockCount: (sessionCount - 1) * 60
          });
        } else {
          _this.setState({
            sessionCount: sessionCount - 1
          });
        }
      }
    };

    _this.loop = undefined;
    return _this;
  }

  _createClass(App, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.loop);
    }
  }, {
    key: "render",
    value: function render() {
      var _state = this.state,
          breakCount = _state.breakCount,
          sessionCount = _state.sessionCount,
          clockCount = _state.clockCount,
          currentTimer = _state.currentTimer,
          isPlaying = _state.isPlaying;


      var breakProps = {
        title: 'Break',
        count: breakCount,
        handleDecrease: this.handleBreakDecrease,
        handleIncrease: this.handleBreakIncrease
      };

      var sessionProps = {
        title: 'Session',
        count: sessionCount,
        handleDecrease: this.handleSessionDecrease,
        handleIncrease: this.handleSessionIncrease
      };

      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "flex" },
          React.createElement(SetTimer, breakProps),
          React.createElement(SetTimer, sessionProps)
        ),
        React.createElement(
          "div",
          { className: "clock-container" },
          React.createElement(
            "h1",
            { id: "timer-label" },
            currentTimer
          ),
          React.createElement(
            "span",
            { id: "time-left" },
            this.convertToTime(clockCount)
          ),
          React.createElement(
            "div",
            { className: "flex" },
            React.createElement(
              "button",
              { id: "start_stop", onClick: this.handlePlayPause },
              React.createElement("i", { className: "fas fa-" + (isPlaying ? 'pause' : 'play') })
            ),
            React.createElement(
              "button",
              { id: "reset", onClick: this.handleReset },
              React.createElement("i", { className: "fas fa-sync" })
            )
          )
        )
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));