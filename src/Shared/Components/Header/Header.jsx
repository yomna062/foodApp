import React from 'react';

export default function Header({
  title,
  subtitle,
  description,
  imgUrl,
  altText,
  minHeight = "250px",
  imgWidth = "75",
}) {
  return (
    <header
      className="secondary-bg rounded-4 px-5"
      style={{ minHeight }}
    >
      <div className="container-fluid h-100">
        <div className="row h-100 align-items-center">

          {/* Text Section */}
          <div className="col-md-7">
            <div className="text-white d-flex flex-column justify-content-center h-100">
              <h3>
                {title}
                <span className="opacity-50 fw-light ms-2">
                  {subtitle}
                </span>
              </h3>
              <p className="mb-0">{description}</p>
            </div>
          </div>

          {/* Image Section */}
          <div className="col-md-5 text-end">
            <img
              className={`img-fluid w-${imgWidth}`}
              src={imgUrl}
              alt={altText || "header image"}
            />
          </div>

        </div>
      </div>
    </header>
  );
}
