import React, { Component } from 'react';
import classNames from 'classnames';

import './ImageInput.scss';

class ImageInput extends Component {
  // processes uploaded image
  changeImage = async (e) => {
    const { onChange, multiple } = this.props;

    if (multiple) {
      onChange(e.target.files);
    } else {
      const file = e.target.files[0];
      if (file) {
        onChange(file);
      }
    }
  };

  renderPreview() {
    const { value, multiple } = this.props;

    if (
      multiple &&
      value &&
      (value instanceof FileList || Array.isArray(value))
    ) {
      return <div>{value.length}</div>;
    }

    if (value instanceof File) {
      const imageUrl = URL.createObjectURL(value);
      return (
        <div className="image-input__preview">
          <img alt={'preview'} src={imageUrl} />
        </div>
      );
    }
    return (
      value && (
        <div className="image-input__preview">
          <img alt={'preview'} src={value} />
        </div>
      )
    );
  }

  render() {
    const { name, className, disabled, multiple } = this.props;

    return (
      <div className={classNames(className, 'image-input')}>
        <div className="image-input__preview">{this.renderPreview()}</div>
        <div className="image-input__change-image">
          <input
            multiple={multiple}
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
}

export { ImageInput };
