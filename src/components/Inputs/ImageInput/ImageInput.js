import React, { Component, createRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Button } from '../../Common/Button/Button';

import './ImageInput.scss';

class ImageInput extends Component {
  constructor(props) {
    super(props);

    this.fileInputRef = createRef();

    this.toggleImage = this.toggleImage.bind(this);
    this.changeImage = this.changeImage.bind(this);
    this.selectImage = this.selectImage.bind(this);
  }

  // Used to a trigger image upload or to remove existing image
  toggleImage(checked) {
    const { onChange } = this.props;
    const fileInputNode = this.fileInputRef.current;

    if (checked) {
      this.selectImage();
    } else {
      if (fileInputNode) {
        fileInputNode.value = null;
      }

      onChange(null);
    }
  }

  getBase64FromFile(image) {
    const fileReader = new FileReader();
    const img = new Image();

    return new Promise((resolve, reject) => {
      img.onload = () => {
        fileReader.onloadend = () => resolve(fileReader.result);
        fileReader.onerror = () => reject(fileReader.error);

        fileReader.readAsDataURL(image);
      };

      img.src = window.URL.createObjectURL(image);
    });
  }

  // processes uploaded image
  async changeImage(e) {
    const { onChange } = this.props;
    const file = e.target.files[0];

    if (file) {
      const encodedImage = await this.getBase64FromFile(file);
      onChange(encodedImage);
    }
  }

  selectImage() {
    const fileInputNode = this.fileInputRef.current;
    fileInputNode && fileInputNode.click();
  }

  renderPreview() {
    const { value } = this.props;

    return value && <div className="image-input__preview">
      <img alt={'t[language].image_preview'} src={value} />
    </div>;
  }

  render() {
    const { name, changeImageLabel, className, disabled } = this.props;

    return (
      <div className={classNames(className, 'image-input')}>
        <div className="image-input__toggle-image">
          {this.renderPreview()}
        </div>
        <div className="image-input__change-image">
          <input
            disabled={disabled}
            ref={this.fileInputRef}
            type="file"
            name={name}
            accept="image/*"
            onChange={this.changeImage}
          />
          <Button
            label={changeImageLabel || 'change image'}
            primary
            disabled={disabled}
            onClick={this.selectImage}
          />
        </div>
      </div>
    );
  }
};

ImageInput.propTypes = {
  toggleImageLabel: PropTypes.string,
  changeImageLabel: PropTypes.string,
};

export { ImageInput };
