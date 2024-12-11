const SubmitImage = ({ image, onChangeImage, onSubmit }) => {
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChangeImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="submit-image">
      <div
        className={image ? "submit-image-container has-image" : "submit-image-container no-image"}
        onClick={() => document.getElementById('file-input').click()}
      >
        {!image && (
          <div className="placeholder-content">
            <img
              src="/images/svg/ico-submit_img.svg"
              alt="Share Icon"
              width="30"
              height="30"
            />
            <p>Upload your screenshot</p>
            <span>Select your screenshot with proof that you have completed this task.</span>
          </div>
        )}
        {image && (
          <img
            src={image}
            alt="Uploaded screenshot"
            className="uploaded-image"
          />
        )}

        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </div>
      <button className="submit-image-button" onClick={onSubmit}>Submit</button>
    </div>

  );
};

export default SubmitImage;
