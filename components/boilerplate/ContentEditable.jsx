ContentEditable = React.createClass({
  shouldComponentUpdate(nextProps) {
    return !this.htmlEl || nextProps.html !== this.htmlEl.innerHTML ||
            this.props.disabled !== nextProps.disabled;
  },
  componentDidUpdate() {
    if ( this.htmlEl && this.props.html !== this.htmlEl.innerHTML ) {
     this.htmlEl.innerHTML = this.props.html;
    }
  },
  emitChange(event) {
    if (!this.htmlEl) return;

    var html = this.htmlEl.innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      event.target = { value: html };
      this.props.onChange(event);
    }

    this.lastHtml = html;
  },
  cancelOnEscape(event) {
    if(event.which === 27) {
      event.preventDefault();

      this.resetValue(event);
    }
  },
  emitOnEnter(event) {
    if(event.which === 13) {
      event.preventDefault();

      this.emitChange(event);
    }
  },
  resetValue(event) {
    //console.log('resetting');
    this.forceUpdate();
  },
  render() {
    return React.createElement(
      this.props.tagName || 'div',
      Object.assign({}, this.props, {
        ref: (e) => this.htmlEl = e,
        onInput: this.setValue,
        onBlur: this.resetValue,
        onKeyDown: this.emitOnEnter,
        onKeyUp: this.cancelOnEscape,
        contentEditable: !this.props.disabled,
        dangerouslySetInnerHTML: {__html: this.props.html}
      }),
      this.props.children
    );
  }
});