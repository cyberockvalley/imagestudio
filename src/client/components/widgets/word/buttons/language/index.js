/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dropdown, DropdownOption } from '../../components/Dropdown';
import './styles.css';

class Language extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        modalHandler: PropTypes.object,
        translations: PropTypes.object,
      };
    
    constructor(props) {
        super(props);
        const { modalHandler } = props;
        this.state = {
            expanded: undefined
        };
        modalHandler.registerCallBack(this.expandCollapse);
    }

    componentWillUnmount() {
        const { modalHandler } = this.props;
        modalHandler.deregisterCallBack(this.expandCollapse);
    }

    onExpandEvent = () => {
        this.signalExpanded = !this.state.expanded;
    };

    expandCollapse = () => {
        this.setState({
            expanded: this.signalExpanded,
        });
        this.signalExpanded = false;
    };

    doExpand = () => {
        this.setState({
            expanded: true,
        });
    };

    doCollapse = () => {
        this.setState({
            expanded: false,
        });
    };

    render() {
        const { translations, currentLanguage, onLanguageChange } = this.props;
        const { expanded } = this.state;
        return (
            <div className="rdw-fontfamily-wrapper" aria-label="rdw-font-family-control">
              <Dropdown
                className={'rdw-fontfamily-dropdown'}
                optionWrapperClassName={'rdw-fontfamily-optionwrapper'}
                onChange={onLanguageChange}
                expanded={expanded}
                doExpand={this.doExpand}
                doCollapse={this.doCollapse}
                onExpandEvent={this.onExpandEvent}
                title={this.props.title || translations['components.controls.language.title']}
              >
                <span className="rdw-fontfamily-placeholder">
                  {currentLanguage.title || translations['components.controls.language.title']}
                </span>
                {
                  this.props.options.map((lang, index) =>
                    (<DropdownOption
                      active={currentLanguage.key === lang.key}
                      value={lang}
                      key={index}
                    >
                      {lang.title}
                    </DropdownOption>))
                }
              </Dropdown>
            </div>
        )
    }
}

export default Language;