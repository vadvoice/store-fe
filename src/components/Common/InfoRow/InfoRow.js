import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./InfoRow.scss";

const InfoRow = props => {
   const {
      data: { name, value },
      className,
      column,
      centered,
      separator
   } = props;
   return (
      <div className={classNames("common-info-row", className, {
         'common-info-row--column': column,
         'common-info-row--centered': centered,
      })}>
         <strong>{name}{separator || ':'}</strong>
         <div>{value}</div>
      </div>
   );
};

InfoRow.propTypes = {
   data: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.any
   }).isRequired,
   column: PropTypes.bool,
   centered: PropTypes.bool,
};

export default InfoRow;
