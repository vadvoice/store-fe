import React, { Component, createRef } from 'react';
import classNames from 'classnames';

import './ImageInput.scss';

class ImageInput extends Component {
  // processes uploaded image
  changeImage = async (e) => {
    const { onChange } = this.props;
    const file = e.target.files[0];

    if (file) {
      onChange(file);
    }
  }

  renderPreview() {
    const { value } = this.props;

    if (value instanceof File) {
      const imageUrl = URL.createObjectURL(value);
      return <div className="image-input__preview">
        <img alt={'preview'} src={imageUrl} />
      </div>;
    }
    return value && <div className="image-input__preview">
      <img alt={'preview'} src={value} />
    </div>;
  }

  render() {
    const { name, className, disabled } = this.props;

    return (
      <div className={classNames(className, 'image-input')}>
        <div className="image-input__preview">
          {this.renderPreview()}
        </div>
        <div className="image-input__change-image">
          <input
            disabled={disabled}
            type="file"
            name={name}
            accept="image/*"
            onChange={this.changeImage}
          />
        </div>
      </div>
    );
  }
};

export { ImageInput };
