import React from 'react';
import PropTypes from 'prop-types';
import './ToolTip.css';
import {truncate} from 'lodash';

/**
 * @description Tooltip component displaying a piece of text eg. a book description. It is truncated to 80 characters. It shows up only when its parent is in hover state.
 */
const ToolTip = ({text}) => (
  <div className="tooltip">
    {truncate(text, {
      length: 150,
      separator: /[,.?!]? +/,
      omission: '…'
    })}
  </div>
);

ToolTip.propTypes = {
  text: PropTypes.string
};
export default ToolTip;
