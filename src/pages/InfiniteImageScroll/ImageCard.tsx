// import { CloudDownload } from "@material-ui/icons";
// import { useState } from "react";
import { useState } from "react";
import css from "./inifiniteImageScroll.module.css";
import { ArrowDownward } from "@material-ui/icons";

interface ImageDetails {
  likes?: number;
  downloads?: number;
  views?: number;
  webformatURL?: string;
  user?: string;
  userImageURL?: string;
  largeImageURL?: string;
  tags?: string;
}

const ImageCard = ({ image }: { image: ImageDetails }) => {
  const {
    likes,
    downloads,
    views,
    webformatURL,
    user,
    userImageURL,
    largeImageURL,
  } = image;

  const tags = image.tags && image.tags.split(",");
  const [imageHover, setImageHover] = useState(false);

  const downloadImage = async (url: string) => {
    try {
      await fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          console.log(blob);
          const blobUrl = window.URL.createObjectURL(new Blob([blob]));
          const fileName = url.split("get/")[1];
          console.log(`url`, blobUrl);
          const imageAnchorTag = document.createElement("a");
          imageAnchorTag.href = blobUrl;
          imageAnchorTag.setAttribute("download", fileName);
          document.body.appendChild(imageAnchorTag);
          imageAnchorTag.click();
          imageAnchorTag.remove();
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        onMouseOver={() => {
          setImageHover(true);
        }}
        onMouseLeave={() => {
          setImageHover(false);
        }}
      >
        <img src={webformatURL} alt="title" className={css["img"]} />
        {imageHover && (
          <div className={css["hover-wrapper"]}>
            <div>
              <img
                src={userImageURL}
                alt="title"
                className={css["image-uploader"]}
              />
              <span>
                <strong>{user}</strong>
              </span>
            </div>
            <div className="w-full flex justify-start ">
              <span className="mr-5">
                <strong>Likes:</strong> {likes}
              </span>
              <span className="mr-5">
                <strong>Views:</strong> {views}
              </span>
              <span className="mr-5">
                <strong>Downloads:</strong> {downloads}
              </span>
            </div>
            {tags && tags.length > 0 && (
              <div>
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-purple-200 rounded-sm px-3 py-1 text-[15px] font-semibold text-gray-700 mb-3 mx-2 shadow-md"
                  >
                    <span>{`#${tag.trim()}`}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
        {imageHover && (
          <div
            className="flex justify-end items-end absolute bottom-0 right-0 bg-white rounded-tl-full cursor-pointer"
            onClick={() => {
              if (largeImageURL) {
                downloadImage(largeImageURL);
              }
            }}
          >
            <ArrowDownward />
          </div>
        )}
      </div>
    </>
  );
};

export default ImageCard;
